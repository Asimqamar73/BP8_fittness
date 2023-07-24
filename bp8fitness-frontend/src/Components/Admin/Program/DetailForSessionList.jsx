import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faGauge, faEye, faPencil, faArchive, faPlus, faArrowRight, faTable, faUsers, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import FormErrorBox from "../../Reusable/FormErrorBox";
import { getWorkoutProgramDetailAPI } from "../../../API/workout_program";
import { getWorkoutSessionListAPI, deleteWorkoutSessionAPI } from "../../../API/WorkoutSession";
import { topAlertMessageState, topAlertStatusState, currentUserState, workoutProgramDetailState } from "../../../AppState";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { PAGE_SIZE_OPTIONS } from "../../../Constants/FieldOptions";


function AdminWorkoutProgramDetailForSessionList() {
    ////
    //// URL Parameters.
    ////

    const { bid, pid } = useParams()

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [currentUser] = useRecoilState(currentUserState);
    const [workoutProgramDetail] = useRecoilState(workoutProgramDetailState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [workoutProgram, setWorkoutProgram] = useState({});
    const [listData, setListData] = useState("");
    const [selectedWorkoutSessionForDeletion, setSelectedWorkoutSessionForDeletion] = useState("");
    const [isFetching, setFetching] = useState(false);
    const [pageSize, setPageSize] = useState(10);                // Pagination
    const [previousCursors, setPreviousCursors] = useState([]);  // Pagination
    const [nextCursor, setNextCursor] = useState("");            // Pagination
    const [currentCursor, setCurrentCursor] = useState("");      // Pagination

    ////
    //// API.
    ////

    function onWorkoutProgramDetailSuccess(response){
        console.log("onWorkoutProgramDetailSuccess: Starting...");
        setWorkoutProgram(response);
    }

    function onWorkoutProgramDetailError(apiErr) {
        console.log("onWorkoutProgramDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onWorkoutProgramDetailDone() {
        console.log("onWorkoutProgramDetailDone: Starting...");
        setFetching(false);
    }

    function onWorkoutSessionListSuccess(response){
        console.log("onWorkoutSessionListSuccess: Starting...");
        if (response.results !== null) {
            setListData(response);
            if (response.hasNextPage) {
                setNextCursor(response.nextCursor); // For pagination purposes.
            }
        }
    }

    function onWorkoutSessionListError(apiErr) {
        console.log("onWorkoutSessionListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onWorkoutSessionListDone() {
        console.log("onWorkoutSessionListDone: Starting...");
        setFetching(false);
    }

    function onWorkoutSessionDeleteSuccess(response){
        console.log("onWorkoutSessionDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("Session deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch again an updated list.
        fetchList(currentCursor, pageSize);
    }

    function onWorkoutSessionDeleteError(apiErr) {
        console.log("onWorkoutSessionDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onWorkoutSessionDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onWorkoutSessionDeleteDone() {
        console.log("onWorkoutSessionDeleteDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const fetchList = (cur, limit) => {
        setFetching(true);
        setErrors({});

        getWorkoutProgramDetailAPI(
            pid,
            onWorkoutProgramDetailSuccess,
            onWorkoutProgramDetailError,
            onWorkoutProgramDetailDone
        );

        let params = new Map();
        params.set("page_size", limit);

        if (cur !== "") {
            params.set("cursor", cur);
        }
        params.set("workout_program_id", pid);
        getWorkoutSessionListAPI(
            params,
            onWorkoutSessionListSuccess,
            onWorkoutSessionListError,
            onWorkoutSessionListDone
        );
    }

    const onNextClicked = (e) => {
        console.log("onNextClicked");
        let arr = [...previousCursors];
        arr.push(currentCursor);
        setPreviousCursors(arr);
        setCurrentCursor(nextCursor);
    }

    const onPreviousClicked = (e) => {
        console.log("onPreviousClicked");
        let arr = [...previousCursors];
        const previousCursor = arr.pop();
        setPreviousCursors(arr);
        setCurrentCursor(previousCursor);
    }

    const onSelectWorkoutSessionForDeletion = (e, datum) => {
        console.log("onSelectWorkoutSessionForDeletion", datum);
        setSelectedWorkoutSessionForDeletion(datum);
    }

    const onDeselectWorkoutSessionForDeletion = (e) => {
        console.log("onDeselectWorkoutSessionForDeletion");
        setSelectedWorkoutSessionForDeletion("");
    }

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

        deleteWorkoutSessionAPI(
            selectedWorkoutSessionForDeletion.id,
            onWorkoutSessionDeleteSuccess,
            onWorkoutSessionDeleteError,
            onWorkoutSessionDeleteDone
        );
        setSelectedWorkoutSessionForDeletion("");

    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
            fetchList(currentCursor, pageSize);
        }

        return () => { mounted = false; }
    }, [currentCursor, pageSize]);

    ////
    //// Component rendering.
    ////

    return (
        <>
            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class=""><Link to="/admin/classes" aria-current="page"><FontAwesomeIcon className="fas" icon={faDumbbell} />&nbsp;Classes</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Calendar)</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class={`modal ${selectedWorkoutSessionForDeletion ? 'is-active' : ''}`}>
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Are you sure?</p>
                                    <button class="delete" aria-label="close" onClick={onDeselectWorkoutSessionForDeletion}></button>
                                </header>
                                <section class="modal-card-body">
                                    <p class="pb-3">You are about to do the following:</p>
                                    <p class="pb-3">
                                        <ul>
                                            <li class="pb-3">
                                                <b>Cancel</b> this workout schedule for all the members whom booked.
                                            </li>
                                            <li class="pb-3">
                                                <b>Archive</b> this workout schedule so it will no longer appear on your dashboard or your members dashboard.
                                            </li>
                                        </ul>
                                    </p>
                                    <p class="pb-3">This action can be undone but you'll need to contact the system administrator. Are you sure you would like to continue?</p>
                                </section>
                                <footer class="modal-card-foot">
                                    <button class="button is-success" onClick={onDeleteConfirmButtonClick}>Confirm</button>
                                    <button class="button" onClick={onDeselectWorkoutSessionForDeletion}>Cancel</button>
                                </footer>
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-4"><FontAwesomeIcon className="fas" icon={faDumbbell} />&nbsp;Class - {workoutProgramDetail.name}</h1>
                            </div>
                            <div class="column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/admin/branch/${bid}/class/${pid}/sessions/add`} class="button is-small is-primary is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New Schedule
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/admin/branch/${bid}/class/${pid}/sessions/add`} class="button is-small is-primary is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New Schedule
                                </Link>
                            </div>
                        </div>

                        {isFetching
                            ? <>
                                <PageLoadingContent displayMessage={"Please wait..."} />
                            </>
                            : <>
                                <div class="tabs is-medium">
                                  <ul>
                                    <li>
                                        <Link to={`/admin/branch/${bid}/class/${pid}`}>Detail</Link>
                                    </li>
                                    <li class="is-active">
                                        <Link><strong>Calendar</strong></Link>
                                    </li>
                                  </ul>
                                </div>

                                <FormErrorBox errors={errors} />
                                {listData && listData.results && (listData.results.length > 0 || previousCursors.length > 0)
                                    ?
                                    <>
                                        <div class="container">
                                            <div class="b-table">
                                                <div class="table-wrapper has-mobile-cards">
                                                    <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Start At</th>
                                                                <th>Duration</th>
                                                                <th>Bookings</th>
                                                                <th>Waitlist</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {listData && listData.results && listData.results.map(function(datum, i){
                                                                return <tr class={`${datum.isFullyBooked && "has-background-success-light"}`}>
                                                                    <td data-label="Name">{datum.name}</td>
                                                                    <td data-label="Start At">{datum.startAt}</td>
                                                                    <td data-label="End At">{datum.isOpenEnded ? "-" : datum.durationInMinutes} mins</td>
                                                                    <td data-label="Bookings">
                                                                        <Link to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}/bookings`} class="is-small is-warning">
                                                                            <FontAwesomeIcon className="mdi" icon={faCalendarCheck} />&nbsp;{datum.attendeesCount} / {datum.attendeesLimit}
                                                                        </Link>
                                                                    </td>
                                                                    <td data-label="Waitlist">
                                                                        <Link to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}/waitlisters`} class="is-small is-warning">
                                                                            <FontAwesomeIcon className="mdi" icon={faUsers} />&nbsp;{datum.waitlistersCount}
                                                                        </Link>
                                                                    </td>
                                                                    <td class="is-actions-cell">
                                                                        <div class="buttons is-right">
                                                                        {/*
                                                                            <Link to={`/admin/sessions/add?datum_id=${datum.id}&datum_name=${datum.name}`} class="button is-small is-success" type="button">
                                                                                <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                                                            </Link>
                                                                        */}
                                                                            <Link to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}`} class="button is-small is-primary" type="button">
                                                                                <FontAwesomeIcon className="mdi" icon={faEye} />&nbsp;View
                                                                            </Link>
                                                                            <Link to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}/update`} class="button is-small is-warning" type="button">
                                                                                <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                                                                            </Link>
                                                                            <button onClick={(e, ses) => onSelectWorkoutSessionForDeletion(e, datum)} class="button is-small is-danger" type="button">
                                                                                <FontAwesomeIcon className="mdi" icon={faArchive} />&nbsp;Archive
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>;
                                                            })}
                                                        </tbody>
                                                    </table>

                                                    <div class="columns">
                                                        <div class="column is-half">
                                                            <span class="select">
                                                                <select class={`input has-text-grey-light`}
                                                                         name="pageSize"
                                                                     onChange={(e)=>setPageSize(parseInt(e.target.value))}>
                                                                    {PAGE_SIZE_OPTIONS.map(function(option, i){
                                                                        return <option selected={pageSize === option.value} value={option.value}>{option.label}</option>;
                                                                    })}
                                                                </select>
                                                            </span>

                                                        </div>
                                                        <div class="column is-half has-text-right">
                                                            {previousCursors.length > 0 &&
                                                                <button class="button" onClick={onPreviousClicked}>Previous</button>
                                                            }
                                                            {listData.hasNextPage && <>
                                                                <button class="button" onClick={onNextClicked}>Next</button>
                                                            </>}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <section class="hero is-medium has-background-white-ter">
                                          <div class="hero-body">
                                            <p class="title">
                                                <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;No Schedule
                                            </p>
                                            <p class="subtitle">
                                                No scheduled session for this class. <b><Link to={`/admin/branch/${bid}/class/${pid}/sessions/add`}>Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your first session.
                                            </p>
                                          </div>
                                    </section>
                                }
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminWorkoutProgramDetailForSessionList;
