import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUser, faCogs, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faHandSparkles, faIdCard, faAddressBook, faContactCard, faChartPie, faDumbbell, faEye } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { getWorkoutSessionBookingDetailAPI } from "../../../../../API/WorkoutSessionBooking";
import PageLoadingContent from "../../../../Reusable/PageLoadingContent";
import FormErrorBox from "../../../../Reusable/FormErrorBox";
import FormSelectFieldForMember from "../../../../Reusable/FormSelectFieldForMember";
import FormRadioField from "../../../../Reusable/FormRadioField";
import FormInputField from "../../../../Reusable/FormInputField";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../../../AppState";
import {
    DURATION_IN_MINUTES_WITH_EMPTY_OPTIONS,
    ATTENDEE_LIMIT_WITH_EMPTY_OPTIONS,
    SELF_CANCEL_MINIMUM_HOUR_OPTIONS_WITH_EMPTY_OPTIONS
} from "../../../../../Constants/FieldOptions";


function AdminWorkoutProgramSessionBookingDetail() {
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
    const [datum, setDatum] = useState({});

    ////
    //// Event handling.
    ////

    // const onWorkoutProgramIDChange = (wpID) => {
    //     setWorkoutProgramID(wpID);
    //     if (wpID !== undefined && wpID !== null && wpID !== "") {
    //         getWorkoutSessionBookingDetailAPI(
    //             wpID,
    //             onWorkoutSessionBookingDetailSuccess,
    //             onWorkoutSessionBookingDetailError,
    //             onWorkoutSessionBookingDetailDone
    //         );
    //     } else {
    //         setWorkoutProgram({});
    //     }
    // }


    ////
    //// API.
    ////

    const onWorkoutSessionBookingDetailSuccess = (response) => {
        console.log("onWorkoutSessionBookingDetailSuccess: Starting...");
        if (response !== undefined && response !== null && response !== "") { // Defensive code.
            setDatum(response);
        }
    }

    const onWorkoutSessionBookingDetailError = (apiErr) => {
        console.log("onWorkoutSessionBookingDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    const onWorkoutSessionBookingDetailDone = () => {
        console.log("onWorkoutSessionBookingDetailDone: Starting...");
        setFetching(false);
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
            if (psbid !== undefined && psbid !== null && psbid !== "") {
                getWorkoutSessionBookingDetailAPI(
                    psbid,
                    onWorkoutSessionBookingDetailSuccess,
                    onWorkoutSessionBookingDetailError,
                    onWorkoutSessionBookingDetailDone
                );
            }
        }

        return () => { mounted = false; }
    }, [psbid]);

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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
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

                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Booking Detail</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>{datum && <div class="container">
                                <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faUser} />&nbsp;Member Details</p>
                                <hr />
                                {/*
                                <FormSelectFieldForMember
                                    branchID={bid}
                                    memberID={datum.memberId}
                                    setMemberID={null}
                                    errorText={null}
                                    helpText="Please select the member for the workout class"
                                    maxWidth="310px"
                                    disabled={true}
                                />
                                */}
                                <div class="field pb-4">
                                    <label class="label">Member ID</label>
                                    <div class="control">
                                        <p>{datum.memberId}</p>
                                    </div>
                                    <p class="help">The unique identifier used in our system for this user.</p>
                                </div>

                                <FormInputField
                                    label="Name"
                                    name="name"
                                    placeholder="Text input"
                                    value={datum.memberName}
                                    helpText=""
                                    isRequired={true}
                                    maxWidth="380px"
                                    disabled={true}
                                />

                                <FormInputField
                                    label="Email"
                                    name="email"
                                    placeholder="Text input"
                                    value={datum.memberEmail}
                                    helpText=""
                                    isRequired={true}
                                    maxWidth="380px"
                                    disabled={true}
                                />

                                <FormInputField
                                    label="Phone"
                                    name="phone"
                                    placeholder="Text input"
                                    value={datum.memberPhone}
                                    helpText=""
                                    isRequired={true}
                                    maxWidth="150px"
                                    disabled={true}
                                />

                                <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Booking Details</p>
                                <hr />

                                <div class="field pb-4">
                                    <label class="label">Booking ID</label>
                                    <div class="control">
                                        <p>{psbid}</p>
                                    </div>
                                    <p class="help">The unique identifier used in our system for this booking record.</p>
                                </div>

                                <FormRadioField
                                    label="Status"
                                    name="status"
                                    value={datum.status}
                                    opt2Value={2}
                                    opt2Label="Attending"
                                    opt4Value={4}
                                    opt4Label="Cancelled"
                                    errorText={errors && errors.status}
                                    onChange={null}
                                    maxWidth="180px"
                                    disabled={true}
                                />

                                <div class="columns pt-5">
                                    <div class="column is-half">
                                        <Link to={`/admin/branch/${bid}/class/${pid}/session/${sid}/bookings`} class="button is-medium is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        <Link to={`/admin/branch/${bid}/class/${pid}/session/${sid}/bookings`} class="button is-medium is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    </div>
                                    <div class="column is-half has-text-right">
                                        <Link to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.workoutSessionId}/booking/${datum.id}/update`} class="button is-medium is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                        <Link to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.workoutSessionId}/booking/${datum.id}/update`} class="button is-medium is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                    </div>
                                </div>

                            </div>}
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminWorkoutProgramSessionBookingDetail;
