import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faDumbbell, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faMap, faCalendar, faCogs  } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { getWorkoutProgramDetailAPI } from "../../../API/workout_program";
import { getOrganizationBranchSelectOptionListAPI } from "../../../API/branch";
import FormErrorBox from "../../Reusable/FormErrorBox";
import FormInputField from "../../Reusable/FormInputField";
import FormTextareaField from "../../Reusable/FormTextareaField";
import FormRadioField from "../../Reusable/FormRadioField";
import FormMultiSelectField from "../../Reusable/FormMultiSelectField";
import FormSelectField from "../../Reusable/FormSelectField";
import FormCheckboxField from "../../Reusable/FormCheckboxField";
import FormDateField from "../../Reusable/FormDateField";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import FormSelectFieldForBranch from "../../Reusable/FormSelectFieldForBranch";
import FormSelectFieldForWorkoutProgramType from "../../Reusable/FormSelectFieldForWorkoutProgramType";
import FormSelectFieldForTrainer from "../../Reusable/FormSelectFieldForTrainer";
import {
    DURATION_IN_MINUTES_WITH_EMPTY_OPTIONS,
    ATTENDEE_LIMIT_WITH_EMPTY_OPTIONS,
    SELF_CANCEL_MINIMUM_HOUR_OPTIONS_WITH_EMPTY_OPTIONS
} from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState, workoutProgramDetailState } from "../../../AppState";


function AdminWorkoutProgramDetail() {
    ////
    //// URL Parameters.
    ////

    const { bid, pid } = useParams()

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [workoutProgramDetail, setWorkoutProgramDetail] = useRecoilState(workoutProgramDetailState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");

    ////
    //// Event handling.
    ////

    //

    ////
    //// API.
    ////

    function onWorkoutProgramDetailSuccess(response){
        console.log("onWorkoutProgramDetailSuccess: Starting...");
        setWorkoutProgramDetail(response);
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

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.

            setFetching(true);
            getWorkoutProgramDetailAPI(
                pid,
                onWorkoutProgramDetailSuccess,
                onWorkoutProgramDetailError,
                onWorkoutProgramDetailDone
            );
        }

        return () => { mounted = false; }
    }, [pid]);
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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        {workoutProgramDetail && <div class="columns">
                            <div class="column">
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faDumbbell} />&nbsp;Class - {workoutProgramDetail.name}</p>
                            </div>
                            <div class="column has-text-right">
                                {/* Mobile Specific
                                <Link to={`/submissions/add?member_id=${id}&member_name=${member.name}`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                                 Desktop Specific
                                <Link to={`/submissions/add?member_id=${id}&member_name=${member.name}`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                                */}
                            </div>
                        </div>}
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Please wait..."} />
                            :
                            <>
                                {workoutProgramDetail && <div class="container">

                                    {/*
                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Full Name</p>
                                    <hr />
                                    */}

                                    <div class="tabs is-medium">
                                      <ul>
                                        <li class="is-active">
                                            <Link><strong>Detail</strong></Link>
                                        </li>
                                        <li>
                                            <Link to={`/admin/branch/${bid}/class/${pid}/sessions`}>Calendar</Link>
                                        </li>
                                      </ul>
                                    </div>

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faMap} />&nbsp;Location & Staffing</p>
                                    <hr />

                                    <FormInputField
                                        label="Branch"
                                        name="branchID"
                                        placeholder="Text input"
                                        value={workoutProgramDetail.branchName}
                                        helpText="Primary gym location this class will be held at"
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <FormSelectFieldForTrainer
                                        branchID={workoutProgramDetail.branchId}
                                        trainerID={workoutProgramDetail.trainerId}
                                        setTrainerID={null}
                                        helpText="Trainer for the this class"
                                        maxWidth="310px"
                                        disabled={true}
                                    />

                                    <FormCheckboxField
                                        label="Is virtual?"
                                        name="isVirtual"
                                        checked={workoutProgramDetail.isVirtual}
                                        helpText="Indicates whether sessions take place at physical gym location or online only"
                                        maxWidth="100px"
                                        disabled={true}
                                    />

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faContactCard} />&nbsp;Information</p>
                                    <hr />

                                    <FormSelectFieldForWorkoutProgramType
                                        branchID={workoutProgramDetail.branchId}
                                        workoutProgramTypeID={workoutProgramDetail.workoutProgramTypeId}
                                        setWorkoutProgramDetailTypeID={workoutProgramDetail.setWorkoutProgramDetailTypeId}
                                        helpText="The type of class"
                                        maxWidth="310px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="Name"
                                        name="name"
                                        placeholder="Text input"
                                        value={workoutProgramDetail.name}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <FormTextareaField
                                        label="Description"
                                        name="description"
                                        placeholder="Text input"
                                        value={workoutProgramDetail.description}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="400px"
                                        rows={5}
                                        disabled={true}
                                    />

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faCalendar} />&nbsp;Dates</p>
                                    <hr />

                                    <FormDateField
                                        label="Start At"
                                        name="startAt"
                                        placeholder="Text input"
                                        value={workoutProgramDetail.startAt}
                                        helpText="The date this class will begin at"
                                        isRequired={true}
                                        maxWidth="120px"
                                        disabled={true}
                                    />

                                    <FormCheckboxField
                                        label="Is open ended?"
                                        name="isOpenEnded"
                                        checked={workoutProgramDetail.isOpenEnded}
                                        maxWidth="100px"
                                        disabled={true}
                                    />

                                    <FormDateField
                                        label="End At"
                                        name="endAt"
                                        placeholder="Text input"
                                        value={workoutProgramDetail.endAt}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="120px"
                                        disabled={true}
                                    />

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Settings</p>
                                    <hr />

                                    <FormCheckboxField
                                        label="Is paid session?"
                                        name="isPaidSession"
                                        checked={workoutProgramDetail.isPaidSession}
                                        helpText="Indicates if sessions are free for attendance to the public or require payment for entry"
                                        maxWidth="100px"
                                        disabled={true}
                                    />

                                    <FormSelectField
                                        label="Duration (in minutes)"
                                        name="durationInMinutes"
                                        placeholder="Pick"
                                        selectedValue={workoutProgramDetail.durationInMinutes}
                                        options={DURATION_IN_MINUTES_WITH_EMPTY_OPTIONS}
                                        disabled={true}
                                    />

                                    <FormSelectField
                                        label="Attendee(s) Limit"
                                        name="attendeesLimit"
                                        placeholder="Pick"
                                        selectedValue={workoutProgramDetail.attendeesLimit}
                                        helpText="Pick the maximum number of individuals that may attend a session in this class"
                                        isRequired={true}
                                        options={ATTENDEE_LIMIT_WITH_EMPTY_OPTIONS}
                                        disabled={true}
                                    />

                                    <FormCheckboxField
                                        label="Has Self Booking?"
                                        name="hasSelfBooking"
                                        checked={workoutProgramDetail.hasSelfBooking}
                                        helpText="Indicates if customers can join sessions freely or require invitation by trainer"
                                        maxWidth="100px"
                                        disabled={true}
                                    />

                                    <FormCheckboxField
                                        label="Has Self Cancellation?"
                                        name="hasSelfCancellation"
                                        checked={workoutProgramDetail.hasSelfCancellation}
                                        helpText="Indicates if customers can cancel sessions freely or require trainer handling of customer cancellations"
                                        maxWidth="100px"
                                        disabled={true}
                                    />

                                    <FormSelectField
                                        label="Self Cancel Minimum Hour"
                                        name="selfCancelMinimumHour"
                                        placeholder="Pick"
                                        selectedValue={workoutProgramDetail.selfCancelMinimumHour}
                                        helpText="Pick the acceptable hours the member can cancel by without incurring penalty"
                                        options={SELF_CANCEL_MINIMUM_HOUR_OPTIONS_WITH_EMPTY_OPTIONS}
                                        disabled={true}
                                    />

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-hidden-touch" to={`/admin/classes`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link class="button is-fullwidth is-hidden-desktop" to={`/admin/classes`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <Link to={`/admin/branch/${bid}/class/${pid}/update`} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                            <Link to={`/admin/branch/${bid}/class/${pid}/update`} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
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

export default AdminWorkoutProgramDetail;
