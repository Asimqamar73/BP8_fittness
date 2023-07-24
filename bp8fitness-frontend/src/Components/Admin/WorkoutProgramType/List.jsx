import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandSparkles, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable, faArrowUpRightFromSquare, faRefresh, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import FormErrorBox from "../../Reusable/FormErrorBox";
import { getWorkoutProgramTypeListAPI, deleteWorkoutProgramTypeAPI } from "../../../API/workout_program_type";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../AppState";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import FormInputFieldWithButton from "../../Reusable/FormInputFieldWithButton";
import FormSelectFieldForBranch from "../../Reusable/FormSelectFieldForBranch";
import { PAGE_SIZE_OPTIONS } from "../../../Constants/FieldOptions";


function AdminWorkoutProgramTypeList() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [currentUser] = useRecoilState(currentUserState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [listData, setListData] = useState("");
    const [selectedWorkoutProgramTypeForDeletion, setSelectedWorkoutProgramTypeForDeletion] = useState("");
    const [isFetching, setFetching] = useState(false);
    const [pageSize, setPageSize] = useState(10);                           // Pagination
    const [previousCursors, setPreviousCursors] = useState([]);             // Pagination
    const [nextCursor, setNextCursor] = useState("");                       // Pagination
    const [currentCursor, setCurrentCursor] = useState("");                 // Pagination
    const [showFilter, setShowFilter] = useState(false);                     // Filtering + Searching
    const [sortField, setSortField] = useState("created");                  // Sorting
    const [temporarySearchText, setTemporarySearchText] = useState("");     // Searching - The search field value as your writes their query.
    const [actualSearchText, setActualSearchText] = useState("");           // Searching - The actual search query value to submit to the API.
    const [branchID, setBranchID] = useState("");                           // Filtering

    ////
    //// API.
    ////

    function onWorkoutProgramTypeListSuccess(response){
        console.log("onWorkoutProgramTypeListSuccess: Starting...");
        if (response.results !== null) {
            setListData(response);
            if (response.hasNextPage) {
                setNextCursor(response.nextCursor); // For pagination purposes.
            }
        }
    }

    function onWorkoutProgramTypeListError(apiErr) {
        console.log("onWorkoutProgramTypeListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onWorkoutProgramTypeListDone() {
        console.log("onWorkoutProgramTypeListDone: Starting...");
        setFetching(false);
    }

    function onWorkoutProgramTypeDeleteSuccess(response){
        console.log("onWorkoutProgramTypeDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("Program Type deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch again an updated list.
        fetchList(currentCursor, pageSize, actualSearchText, branchID);
    }

    function onWorkoutProgramTypeDeleteError(apiErr) {
        console.log("onWorkoutProgramTypeDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onWorkoutProgramTypeDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onWorkoutProgramTypeDeleteDone() {
        console.log("onWorkoutProgramTypeDeleteDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const fetchList = (cur, limit, keywords, b) => {
        setFetching(true);
        setErrors({});

        let params = new Map();
        params.set("page_size", limit);     // Pagination
        params.set("sort_field", "created") // Sorting

        if (cur !== "") { // Pagination
            params.set("cursor", cur);
        }

        // Filtering
        if (keywords !== undefined && keywords !== null && keywords !== "") { // Searhcing
            params.set("search", keywords);
        }
        if (b !== undefined && b !== null && b !== "") {
            params.set("branch_id", b);
        }

        getWorkoutProgramTypeListAPI(
            params,
            onWorkoutProgramTypeListSuccess,
            onWorkoutProgramTypeListError,
            onWorkoutProgramTypeListDone
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

    const onSearchButtonClick = (e) => { // Searching
        console.log("Search button clicked...");
        setActualSearchText(temporarySearchText);
    }

    const onSelectWorkoutProgramTypeForDeletion = (e, member) => {
        console.log("onSelectWorkoutProgramTypeForDeletion", member);
        setSelectedWorkoutProgramTypeForDeletion(member);
    }

    const onDeselectWorkoutProgramTypeForDeletion = (e) => {
        console.log("onDeselectWorkoutProgramTypeForDeletion");
        setSelectedWorkoutProgramTypeForDeletion("");
    }

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

        deleteWorkoutProgramTypeAPI(
            selectedWorkoutProgramTypeForDeletion.id,
            onWorkoutProgramTypeDeleteSuccess,
            onWorkoutProgramTypeDeleteError,
            onWorkoutProgramTypeDeleteDone
        );
        setSelectedWorkoutProgramTypeForDeletion("");

    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
            fetchList(currentCursor, pageSize, actualSearchText, branchID);
        }

        return () => { mounted = false; }
    }, [currentCursor, pageSize, actualSearchText, branchID]);

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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faHandSparkles} />&nbsp;Class Types</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class={`modal ${selectedWorkoutProgramTypeForDeletion ? 'is-active' : ''}`}>
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Are you sure?</p>
                                    <button class="delete" aria-label="close" onClick={onDeselectWorkoutProgramTypeForDeletion}></button>
                                </header>
                                <section class="modal-card-body">
                                    You are about to <b>archive</b> this workout class type; it will no longer appear on your dashboard. This action can be undone but you'll need to contact the system administrator. Are you sure you would like to continue?
                                </section>
                                <footer class="modal-card-foot">
                                    <button class="button is-success" onClick={onDeleteConfirmButtonClick}>Confirm</button>
                                    <button class="button" onClick={onDeselectWorkoutProgramTypeForDeletion}>Cancel</button>
                                </footer>
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-4"><FontAwesomeIcon className="fas" icon={faHandSparkles} />&nbsp;Class Types</h1>
                            </div>
                            <div class="column has-text-right">
                                <button onClick={()=>fetchList(currentCursor, pageSize, actualSearchText, branchID)} class="button is-small is-info" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faRefresh} />
                                </button>
                                &nbsp;
                                <button onClick={(e)=>setShowFilter(!showFilter)} class="button is-small is-success" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faFilter} />&nbsp;Filter
                                </button>
                                &nbsp;
                                <Link to={`/admin/wp-types/add`} class="button is-small is-primary" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New Class Type
                                </Link>
                            </div>
                        </div>

                        {showFilter &&
                            <div class="columns has-background-white-bis" style={{borderRadius:"15px", padding:"20px"}}>
                                <div class="column">
                                    <FormInputFieldWithButton
                                        label={"Search"}
                                        name="temporarySearchText"
                                        type="text"
                                        placeholder="Search by name"
                                        value={temporarySearchText}
                                        helpText=""
                                        onChange={(e)=>setTemporarySearchText(e.target.value)}
                                        isRequired={true}
                                        maxWidth="100%"
                                        buttonLabel={<><FontAwesomeIcon className="fas" icon={faSearch} /></>}
                                        onButtonClick={onSearchButtonClick}
                                    />
                                </div>
                                <div class="column">
                                    <FormSelectFieldForBranch
                                        organizationID={currentUser.organizationID}
                                        branchID={branchID}
                                        setBranchID={setBranchID}
                                        errorText={errors && errors.branchId}
                                        helpText=""
                                    />
                                </div>
                            </div>
                        }

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Please wait..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />
                                {listData && listData.results && (listData.results.length > 0 || previousCursors.length > 0)
                                    ?
                                    <div class="container">
                                        <div class="b-table">
                                            <div class="table-wrapper has-mobile-cards">
                                                <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Branch</th>
                                                            <th>Created</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {listData && listData.results && listData.results.map(function(datum, i){
                                                            return <tr>
                                                                <td data-label="Name">{datum.name}</td>
                                                                <td data-label="Branch">
                                                                    <Link to={`/admin/branch/${datum.branchId}`} target="_blank" rel="noreferrer" class="">
                                                                        {datum.branchName}&nbsp;<FontAwesomeIcon className="fas" icon={faArrowUpRightFromSquare} />
                                                                    </Link>
                                                                </td>
                                                                <td data-label="Created">{datum.createdAt}</td>
                                                                <td class="is-actions-cell">
                                                                    <div class="buttons is-right">
                                                                    {/*
                                                                        <Link to={`/admin/wp-types/add?member_id=${member.id}&member_name=${member.name}`} class="button is-small is-success" type="button">
                                                                            <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                                                        </Link>
                                                                    */}
                                                                        <Link to={`/admin/wp-type/${datum.id}`} class="button is-small is-primary" type="button">
                                                                            <FontAwesomeIcon className="mdi" icon={faEye} />&nbsp;View
                                                                        </Link>
                                                                        <Link to={`/admin/wp-type/${datum.id}/update`} class="button is-small is-warning" type="button">
                                                                            <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                                                                        </Link>
                                                                        <button onClick={(e, ses) => onSelectWorkoutProgramTypeForDeletion(e, datum)} class="button is-small is-danger" type="button">
                                                                            <FontAwesomeIcon className="mdi" icon={faTrashCan} />&nbsp;Delete
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
                                    :
                                    <section class="hero is-medium has-background-white-ter">
                                          <div class="hero-body">
                                            <p class="title">
                                                <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;No Class Types
                                            </p>
                                            <p class="subtitle">
                                                No class types. <b><Link to="/admin/wp-types/add">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your first workout class type.
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

export default AdminWorkoutProgramTypeList;
