import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faHandSparkles, faIdCard, faAddressBook, faContactCard, faChartPie, faDumbbell, faEye, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { getWorkoutSessionBookingDetailAPI } from "../../../../../API/WorkoutSessionBooking";
import { putWorkoutSessionBookingUpdateAPI } from "../../../../../API/WorkoutSessionBooking";
import PageLoadingContent from "../../../../Reusable/PageLoadingContent";
import FormErrorBox from "../../../../Reusable/FormErrorBox";
import FormSelectFieldForMember from "../../../../Reusable/FormSelectFieldForMember";
import FormRadioField from "../../../../Reusable/FormRadioField";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../../../AppState";
import {
    DURATION_IN_MINUTES_WITH_EMPTY_OPTIONS,
    ATTENDEE_LIMIT_WITH_EMPTY_OPTIONS,
    SELF_CANCEL_MINIMUM_HOUR_OPTIONS_WITH_EMPTY_OPTIONS
} from "../../../../../Constants/FieldOptions";


function AdminWorkoutProgramSessionBookingUpdate() {
    ////
    //// URL Parameters.
    ////

    const { bid, pid, sid, psbid } = useParams()

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
    const [isFetching, setFetching] = useState(false);
    const [showCancelWarning, setShowCancelWarning] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [memberID, setMemberID] = useState("");
    const [status, setStatus] = useState(0);

    ////
    //// Event handling.
    ////

    // const onWorkoutProgramIDChange = (wpID) => {
    //     setWorkoutProgramID(wpID);
    //     if (wpID !== undefined && wpID !== null && wpID !== "") {
    //         getWorkoutSessionBookingDetailAPI(
    //             wpID,
    //             onDetailSuccess,
    //             onDetailError,
    //             onDetailDone
    //         );
    //     } else {
    //         setWorkoutProgram({});
    //     }
    // }


    ////
    //// API.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        setFetching(true);
        setErrors({});
        const data = {
            id: psbid,
            workout_session_id: sid,
            member_id: memberID,
            status: status,
        };
        console.log("onSubmitClick, data:", data);
        putWorkoutSessionBookingUpdateAPI(data, onAdminWorkoutProgramSessionBookingUpdateSuccess, onAdminWorkoutProgramSessionBookingUpdateError, onAdminWorkoutProgramSessionBookingUpdateDone);
    }

    const onAdminWorkoutProgramSessionBookingUpdateSuccess = (response) => {
        // For debugging purposes only.
        console.log("onAdminWorkoutProgramSessionBookingUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Member was Booked!");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onAdminWorkoutProgramSessionBookingUpdateSuccess: Delayed for 2 seconds.");
            console.log("onAdminWorkoutProgramSessionBookingUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/admin/branch/" + bid + "/class/" + pid + "/session/"+ sid + "/bookings");
    }

    const onAdminWorkoutProgramSessionBookingUpdateError = (apiErr) => {
        console.log("onAdminWorkoutProgramSessionBookingUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminWorkoutProgramSessionBookingUpdateError: Delayed for 2 seconds.");
            console.log("onAdminWorkoutProgramSessionBookingUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    const onAdminWorkoutProgramSessionBookingUpdateDone = () => {
        console.log("onAdminWorkoutProgramSessionBookingUpdateDone: Starting...");
        setFetching(false);
    }

    const onDetailSuccess = (response) => {
        console.log("onDetailSuccess: Starting...");
        // setWorkoutProgram(response);

        if (response !== undefined && response !== null && response !== "") {
            setMemberID(response.memberId);
            setStatus(response.status);
        }
    }

    const onDetailError = (apiErr) => {
        console.log("onDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    const onDetailDone = () => {
        console.log("onDetailDone: Starting...");
        setFetching(false);
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
            if (pid !== undefined && pid !== null && pid !== "") {
                getWorkoutSessionBookingDetailAPI(
                    psbid,
                    onDetailSuccess,
                    onDetailError,
                    onDetailDone
                );
            }
        }

        return () => { mounted = false; }
    }, []);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    return (
        <>
            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class=""><Link to="/admin/workouts/classes" aria-current="page"><FontAwesomeIcon className="fas" icon={faDumbbell} />&nbsp;Classes</Link></li>
                            <li class=""><Link to={`/admin/branch/${bid}/class/${pid}/sessions`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Calendar)</Link></li>
                            <li class=""><Link to={`/admin/branch/${bid}/class/${pid}/session/${sid}/bookings`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Schedule Detail (Bookings)</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit Booking</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class={`modal ${showCancelWarning ? 'is-active' : ''}`}>
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Are you sure?</p>
                                    <button class="delete" aria-label="close" onClick={(e)=>setShowCancelWarning(false)}></button>
                                </header>
                                <section class="modal-card-body">
                                    Your record will be cancelled and your work will be lost. This cannot be undone. Do you want to continue?
                                </section>
                                <footer class="modal-card-foot">
                                    <Link class="button is-medium is-success" to={`/admin/branch/${bid}/class/${pid}/session/${sid}/bookings`}>Yes</Link>
                                    <button class="button is-medium" onClick={(e)=>setShowCancelWarning(false)}>No</button>
                                </footer>
                            </div>
                        </div>

                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit Booking</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <div class="container">
                                <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faUser} />&nbsp;Member Details</p>
                                <hr />
                                <FormSelectFieldForMember
                                    branchID={bid}
                                    memberID={memberID}
                                    setMemberID={setMemberID}
                                    errorText={errors && errors.memberId}
                                    helpText="Please select the member for the workout class"
                                    maxWidth="310px"
                                    disabled={true}
                                />
                                <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Booking Details</p>
                                <hr />
                                <FormRadioField
                                    label="Status"
                                    name="status"
                                    value={status}
                                    opt2Value={2}
                                    opt2Label="Attending"
                                    opt4Value={4}
                                    opt4Label="Cancelled"
                                    errorText={errors && errors.status}
                                    onChange={(e)=>setStatus(parseInt(e.target.value))}
                                    maxWidth="180px"
                                    disabled={true}
                                />

                                <div class="columns pt-5">
                                    <div class="column is-half">
                                        <Link to={`/admin/branch/${bid}/class/${pid}/session/${sid}/bookings`} class="button is-medium is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        <Link to={`/admin/branch/${bid}/class/${pid}/session/${sid}/bookings`} class="button is-medium is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    </div>
                                    <div class="column is-half has-text-right">
                                        <button class="button is-medium is-primary is-hidden-touch" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                        <button class="button is-medium is-primary is-fullwidth is-hidden-desktop" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                    </div>
                                </div>

                            </div>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminWorkoutProgramSessionBookingUpdate;
