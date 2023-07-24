import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faHandSparkles, faIdCard, faAddressBook, faContactCard, faChartPie, faDumbbell, faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { getWorkoutSessionDetailAPI } from "../../../../API/WorkoutSession";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import FormInputField from "../../../Reusable/FormInputField";
import FormTextareaField from "../../../Reusable/FormTextareaField";
import FormRadioField from "../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../Reusable/FormSelectField";
import FormCheckboxField from "../../../Reusable/FormCheckboxField";
import FormDateTimeField from "../../../Reusable/FormDateTimeField";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import FormSelectFieldForBranch from "../../../Reusable/FormSelectFieldForBranch";
import FormSelectFieldForWorkoutProgram from "../../../Reusable/FormSelectFieldForWorkoutProgram";
import FormSelectFieldForTrainer from "../../../Reusable/FormSelectFieldForTrainer";
import { topAlertMessageState, topAlertStatusState, currentUserState, currentWorkoutSessionState } from "../../../../AppState";
import {
    DURATION_IN_MINUTES_WITH_EMPTY_OPTIONS,
    ATTENDEE_LIMIT_WITH_EMPTY_OPTIONS,
    SELF_CANCEL_MINIMUM_HOUR_OPTIONS_WITH_EMPTY_OPTIONS
} from "../../../../Constants/FieldOptions";

function AdminWorkoutProgramSessionDetail() {
    ////
    //// URL Parameters.
    ////

    const { bid, pid, sid } = useParams()

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [currentUser] = useRecoilState(currentUserState);
    const [currentWorkoutSession, setCurrentWorkoutSession] = useRecoilState(currentWorkoutSessionState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");

    ////
    //// Event handling.
    ////

    // Do nothing...

    ////
    //// API.
    ////

    const onWorkoutSessionDetailSuccess = (response) => {
        // For debugging purposes only.
        console.log("onAdminWorkoutProgramSessionDetailSuccess: Starting...");
        console.log(response);
        setCurrentWorkoutSession(response);
    }

    const onWorkoutSessionDetailError = (apiErr) => {
        console.log("onAdminWorkoutProgramSessionDetailError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminWorkoutProgramSessionDetailError: Delayed for 2 seconds.");
            console.log("onAdminWorkoutProgramSessionDetailError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    const onWorkoutSessionDetailDone = () => {
        console.log("onAdminWorkoutProgramSessionDetailDone: Starting...");
        setFetching(false);
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
            getWorkoutSessionDetailAPI(
                sid,
                onWorkoutSessionDetailSuccess,
                onWorkoutSessionDetailError,
                onWorkoutSessionDetailDone
            );
        }

        return () => { mounted = false; }
    }, [sid]);
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
                            <li class=""><Link to="/admin/classes" aria-current="page"><FontAwesomeIcon className="fas" icon={faDumbbell} />&nbsp;Classes</Link></li>
                            <li class=""><Link to={`/admin/branch/${bid}/class/${pid}/sessions`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Calendar)</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Schedule Detail</Link></li>
                        </ul>

                    </nav>
                    <nav class="box">

                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Schedule Detail</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching || currentWorkoutSession === undefined || currentWorkoutSession === null || currentWorkoutSession === ""
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <div class="container">
                                <div class="tabs is-medium">
                                  <ul>
                                    <li class="is-active">
                                        <Link><strong>Detail</strong></Link>
                                    </li>
                                    <li>
                                        <Link to={`/admin/branch/${bid}/class/${pid}/session/${sid}/bookings`}>Bookings</Link>
                                    </li>
                                    <li>
                                        <Link to={`/admin/branch/${bid}/class/${pid}/session/${sid}/waitlisters`}>Waitlist</Link>
                                    </li>
                                  </ul>
                                </div>

                                {/*
                                <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Schedule Details</p>
                                <hr />*/}

                                <FormSelectFieldForBranch
                                    organizationID={currentUser.organizationID}
                                    branchID={currentWorkoutSession.branchId}
                                    helpText="Please select the primary gym location to associate with this type"
                                    maxWidth="310px"
                                    disabled={true}
                                />
                                <FormSelectFieldForWorkoutProgram
                                    branchID={currentWorkoutSession.branchId}
                                    workoutProgramID={currentWorkoutSession.workoutProgramId}
                                    helpText="Please select the class to associate with this schedule"
                                    maxWidth="310px"
                                    disabled={true}
                                />
                                <FormDateTimeField
                                    label="Start At"
                                    name="startAt"
                                    placeholder="Text input"
                                    value={currentWorkoutSession.startAt}
                                    helpText="The date this class session is scheduled to start at"
                                    isRequired={true}
                                    maxWidth="230px"
                                    disabled={true}
                                />
                                <FormCheckboxField
                                    label="Override Class?"
                                    name="hasWorkoutProgramOverride"
                                    checked={currentWorkoutSession.hasWorkoutProgramOverride}
                                    helpText="Is there something different with this schedule compared to the default class information, i.e. substitute instructor? If so select this and proceed to overriding the details you want for this session only."
                                    maxWidth="100px"
                                    disabled={true}
                                />
                                {currentWorkoutSession.hasWorkoutProgramOverride && <>
                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Override</p>
                                    <hr />
                                    <FormSelectFieldForTrainer
                                        branchID={currentWorkoutSession.branchId}
                                        trainerID={currentWorkoutSession.trainerId}
                                        helpText="Please select the trainer for the workout class"
                                        maxWidth="310px"
                                        disabled={true}
                                    />
                                    <FormInputField
                                        label="Name"
                                        name="name"
                                        placeholder="Text input"
                                        value={currentWorkoutSession.name}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />
                                    <FormTextareaField
                                        label="Description"
                                        name="description"
                                        placeholder="Text input"
                                        value={currentWorkoutSession.description}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="400px"
                                        rows={5}
                                        disabled={true}
                                    />
                                    <FormCheckboxField
                                        label="Is virtual?"
                                        name="isVirtual"
                                        checked={currentWorkoutSession.isVirtual}
                                        helpText="Indicates whether sessions take place at physical gym location or online only"
                                        maxWidth="100px"
                                        disabled={true}
                                    />

                                    <FormCheckboxField
                                        label="Is paid session?"
                                        name="isPaidSession"
                                        checked={currentWorkoutSession.isPaidSession}
                                        helpText="Indicates if sessions are free for attendance to the public or require payment for entry"
                                        maxWidth="100px"
                                        disabled={true}
                                    />

                                    <FormSelectField
                                        label="Duration (in minutes)"
                                        name="durationInMinutes"
                                        placeholder="Pick"
                                        selectedValue={currentWorkoutSession.durationInMinutes}
                                        helpText="Pick the duration of each session for the class"
                                        isRequired={true}
                                        options={DURATION_IN_MINUTES_WITH_EMPTY_OPTIONS}
                                        disabled={true}
                                    />

                                    <FormSelectField
                                        label="Attendee(s) Limit"
                                        name="attendeesLimit"
                                        placeholder="Pick"
                                        selectedValue={currentWorkoutSession.attendeesLimit}
                                        helpText="Pick the maximum number of individuals that may attend a session in this class"
                                        isRequired={true}
                                        options={ATTENDEE_LIMIT_WITH_EMPTY_OPTIONS}
                                        disabled={true}
                                    />

                                    <FormCheckboxField
                                        label="Has Self Booking?"
                                        name="hasSelfBooking"
                                        checked={currentWorkoutSession.hasSelfBooking}
                                        helpText="Indicates if customers can join sessions freely or require invitation by trainer"
                                        maxWidth="100px"
                                        disabled={true}
                                    />

                                    <FormCheckboxField
                                        label="Has Self Cancellation?"
                                        name="hasSelfCancellation"
                                        checked={currentWorkoutSession.hasSelfCancellation}
                                        helpText="Indicates if customers can cancel sessions freely or require trainer handling of customer cancellations"
                                        maxWidth="100px"
                                        disabled={true}
                                    />

                                    <FormSelectField
                                        label="Self Cancel Minimum Hour"
                                        name="selfCancelMinimumHour"
                                        placeholder="Pick"
                                        selectedValue={currentWorkoutSession.selfCancelMinimumHour}
                                        helpText="Pick the acceptable hours the member can cancel by without incurring penalty"
                                        isRequired={true}
                                        options={SELF_CANCEL_MINIMUM_HOUR_OPTIONS_WITH_EMPTY_OPTIONS}
                                        disabled={true}
                                    />
                                </>}

                                <div class="columns pt-5">
                                    <div class="column is-half">
                                        <Link to={`/admin/branch/${bid}/class/${pid}/sessions`} class="button is-medium is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        <Link to={`/admin/branch/${bid}/class/${pid}/sessions`} class="button is-medium is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                    </div>
                                    <div class="column is-half has-text-right">
                                        <Link to={`/admin/branch/${bid}/class/${pid}/session/${sid}/update`} class="button is-medium is-primary is-hidden-touch" ><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                        <Link to={`/admin/branch/${bid}/class/${pid}/session/${sid}/update`} class="button is-medium is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
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

export default AdminWorkoutProgramSessionDetail;
