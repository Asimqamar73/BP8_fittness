import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faHandSparkles, faIdCard, faAddressBook, faContactCard, faChartPie, faDumbbell, faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { getWorkoutProgramDetailAPI } from "../../../../API/workout_program";
import { getWorkoutSessionDetailAPI, putWorkoutSessionUpdateAPI } from "../../../../API/WorkoutSession";
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
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../../AppState";
import {
    DURATION_IN_MINUTES_WITH_EMPTY_OPTIONS,
    ATTENDEE_LIMIT_WITH_EMPTY_OPTIONS,
    SELF_CANCEL_MINIMUM_HOUR_OPTIONS_WITH_EMPTY_OPTIONS
} from "../../../../Constants/FieldOptions";


function AdminWorkoutProgramSessionUpdate() {
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

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [workoutProgram, setWorkoutProgram] = useState({});
    const [forceURL, setForceURL] = useState("");
    const [branchID, setBranchID] = useState(bid);
    const [workoutProgramID, setWorkoutProgramID] = useState(pid);
    const [startAt, setStartAt] = useState(null);
    const [hasWorkoutProgramOverride, setHasWorkoutProgramOverride] = useState(false);
    const [showCancelWarning, setShowCancelWarning] = useState(false);

    // The following section is what is controlled by fetching the workout program.
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [trainerID, setTrainerID] = useState("");
    const [isOpenEnded, setIsOpenEnded] = useState(false);
    const [endAt, setEndAt] = useState(null);
    const [durationInMinutes, setDurationInMinutes] = useState(0);
    const [attendeesLimit, setAttendeesLimit] = useState(0);
    const [isVirtual, setIsVirtual] = useState(false);
    const [isPaidSession, setIsPaidSession] = useState(true);
    const [hasSelfBooking, setHasSelfBooking] = useState(true);
    const [hasSelfCancellation, setHasSelfCancellation] = useState(true);
    const [selfCancelMinimumHour, setSelfCancelMinimumHour] = useState(1);

    ////
    //// Event handling.
    ////

    const onWorkoutProgramIDChange = (wpID) => {
        if (sid !== undefined && sid !== null && sid !== "") {
            getWorkoutSessionDetailAPI(
                sid,
                onWorkoutSessionDetailSuccess,
                onWorkoutSessionDetailError,
                onWorkoutSessionDetailDone
            );
        }
    }


    ////
    //// API.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        setFetching(true);
        setErrors({});
        const data = {
            id: sid,
            organization_id: currentUser.organizationID,
            branch_id: branchID,
            workout_program_id: workoutProgramID,
            start_at: startAt,
            has_workout_program_override: hasWorkoutProgramOverride,

            // Override
            trainer_id: trainerID,
            name: name,
            description: description,
            is_virtual: isVirtual,
            is_paid_session: isPaidSession,
            duration_in_minutes: durationInMinutes,
            end_at: endAt,
            attendees_limit: attendeesLimit,
            has_self_booking: hasSelfBooking,
            has_self_cancellation: hasSelfCancellation,
            self_cancel_minimum_hour: selfCancelMinimumHour,
        };
        console.log("onSubmitClick, data:", data);
        putWorkoutSessionUpdateAPI(data, onAdminWorkoutProgramSessionUpdateSuccess, onAdminWorkoutProgramSessionUpdateError, onAdminWorkoutProgramSessionUpdateDone);
    }

    const onAdminWorkoutProgramSessionUpdateSuccess = (response) => {
        // For debugging purposes only.
        console.log("onAdminWorkoutProgramSessionUpdateSuccess: Starting...");
        console.log(response);

        // Update a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Session created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onAdminWorkoutProgramSessionUpdateSuccess: Delayed for 2 seconds.");
            console.log("onAdminWorkoutProgramSessionUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/admin/branch/" + response.branchId+"/class/" + response.workoutProgramId + "/session/" + response.id);

    }

    const onAdminWorkoutProgramSessionUpdateError = (apiErr) => {
        console.log("onAdminWorkoutProgramSessionUpdateError: Starting...");
        setErrors(apiErr);

        // Update a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminWorkoutProgramSessionUpdateError: Delayed for 2 seconds.");
            console.log("onAdminWorkoutProgramSessionUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    const onAdminWorkoutProgramSessionUpdateDone = () => {
        console.log("onAdminWorkoutProgramSessionUpdateDone: Starting...");
        setFetching(false);
    }

    const onWorkoutSessionDetailSuccess = (response) => {
        console.log("onWorkoutSessionDetailSuccess: Starting...");
        console.log("onWorkoutSessionDetailSuccess: response:", response);

        if (response !== undefined && response !== null && response !== "") {
            setBranchID(response.branchId);
            setWorkoutProgramID(response.workoutProgramId);
            setStartAt(response.startAt);
            setHasWorkoutProgramOverride(response.hasWorkoutProgramOverride);
            setName(response.name);
            setDescription(response.description);
            setTrainerID(response.trainerId);
            setIsOpenEnded(response.isOpenEnded);
            setEndAt(response.endAt);
            setDurationInMinutes(response.durationInMinutes);
            setAttendeesLimit(response.attendeesLimit);
            setIsVirtual(response.isVirtual);
            setIsPaidSession(response.isPaidSession);
            setHasSelfBooking(response.hasSelfBooking);
            setHasSelfCancellation(response.hasSelfCancellation);
            setSelfCancelMinimumHour(response.selfCancelMinimumHour);
        }
    }

    const onWorkoutSessionDetailError = (apiErr) => {
        console.log("onWorkoutProgramDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    const onWorkoutSessionDetailDone = () => {
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
            getWorkoutSessionDetailAPI(
                sid,
                onWorkoutSessionDetailSuccess,
                onWorkoutSessionDetailError,
                onWorkoutSessionDetailDone
            );
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
                            <li class=""><Link to="/admin/classes" aria-current="page"><FontAwesomeIcon className="fas" icon={faDumbbell} />&nbsp;Classes</Link></li>
                            <li class=""><Link to={`/admin/branch/${bid}/class/${pid}/sessions`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Calendar)</Link></li>
                            <li class=""><Link to={`/admin/branch/${bid}/class/${pid}/session/${sid}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Schedule Detail</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Update</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Update Schedule</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <div class="container">
                                <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Schedule Details</p>
                                <hr />

                                <FormSelectFieldForBranch
                                    organizationID={currentUser.organizationID}
                                    branchID={branchID}
                                    setBranchID={setBranchID}
                                    errorText={errors && errors.branchId}
                                    helpText="Please select the primary gym location to associate with this type"
                                    maxWidth="310px"
                                    isHidden={bid}
                                />
                                <FormSelectFieldForWorkoutProgram
                                    branchID={branchID}
                                    workoutProgramID={workoutProgramID}
                                    setWorkoutProgramID={onWorkoutProgramIDChange}
                                    errorText={errors && errors.workoutProgramId}
                                    helpText="Please select the class to associate with this schedule"
                                    maxWidth="310px"
                                    isHidden={pid}
                                />
                                <FormDateTimeField
                                    label="Start At"
                                    name="startAt"
                                    placeholder="Text input"
                                    value={startAt}
                                    errorText={errors && errors.startAt}
                                    helpText="The date this class session is scheduled to start at"
                                    onChange={(date)=>setStartAt(date)}
                                    isRequired={true}
                                    maxWidth="280px"
                                />
                                <FormCheckboxField
                                    label="Override Class?"
                                    name="hasWorkoutProgramOverride"
                                    checked={hasWorkoutProgramOverride}
                                    errorText={errors && errors.hasWorkoutProgramOverride}
                                    onChange={(e)=>setHasWorkoutProgramOverride(!hasWorkoutProgramOverride)}
                                    helpText="Is there something different with this schedule compared to the default class information, i.e. substitute instructor? If so select this and proceed to overriding the details you want for this session only."
                                    maxWidth="100px"
                                    disabled={workoutProgramID === undefined || workoutProgramID === null || workoutProgramID === ""}
                                />
                                {workoutProgramID !== undefined && workoutProgramID !== null && workoutProgramID !== "" && hasWorkoutProgramOverride && <>
                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Override</p>
                                    <hr />
                                    <FormSelectFieldForTrainer
                                        branchID={branchID}
                                        trainerID={trainerID}
                                        setTrainerID={setTrainerID}
                                        errorText={errors && errors.trainerId}
                                        helpText="Please select the trainer for the workout class"
                                        maxWidth="310px"
                                        disabled={branchID === undefined || branchID === null || branchID === "" || !hasWorkoutProgramOverride}
                                    />
                                    <FormInputField
                                        label="Name"
                                        name="name"
                                        placeholder="Text input"
                                        value={name}
                                        errorText={errors && errors.name}
                                        helpText=""
                                        onChange={(e)=>setName(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={!hasWorkoutProgramOverride}
                                    />
                                    <FormTextareaField
                                        label="Description"
                                        name="description"
                                        placeholder="Text input"
                                        value={description}
                                        errorText={errors && errors.description}
                                        helpText=""
                                        onChange={(e)=>setDescription(e.target.value)}
                                        isRequired={true}
                                        maxWidth="400px"
                                        rows={5}
                                        disabled={false}
                                        disabled={!hasWorkoutProgramOverride}
                                    />
                                    <FormCheckboxField
                                        label="Is virtual?"
                                        name="isVirtual"
                                        checked={isVirtual}
                                        errorText={errors && errors.isVirtual}
                                        onChange={(e)=>setIsVirtual(!isVirtual)}
                                        helpText="Indicates whether sessions take place at physical gym location or online only"
                                        maxWidth="100px"
                                        disabled={!hasWorkoutProgramOverride}
                                    />

                                    <FormCheckboxField
                                        label="Is paid session?"
                                        name="isPaidSession"
                                        checked={isPaidSession}
                                        errorText={errors && errors.isPaidSession}
                                        onChange={(e)=>setIsPaidSession(!isPaidSession)}
                                        helpText="Indicates if sessions are free for attendance to the public or require payment for entry"
                                        maxWidth="100px"
                                        disabled={!hasWorkoutProgramOverride}
                                    />

                                    <FormSelectField
                                        label="Duration (in minutes)"
                                        name="durationInMinutes"
                                        placeholder="Pick"
                                        selectedValue={durationInMinutes}
                                        errorText={errors && errors.durationInMinutes}
                                        helpText="Pick the duration of each session for the class"
                                        isRequired={true}
                                        onChange={(e)=>setDurationInMinutes(parseInt(e.target.value))}
                                        options={DURATION_IN_MINUTES_WITH_EMPTY_OPTIONS}
                                        disabled={!hasWorkoutProgramOverride}
                                    />

                                    <FormSelectField
                                        label="Attendee(s) Limit"
                                        name="attendeesLimit"
                                        placeholder="Pick"
                                        selectedValue={attendeesLimit}
                                        errorText={errors && errors.attendeesLimit}
                                        helpText="Pick the maximum number of individuals that may attend a session in this class"
                                        isRequired={true}
                                        onChange={(e)=>setAttendeesLimit(parseInt(e.target.value))}
                                        options={ATTENDEE_LIMIT_WITH_EMPTY_OPTIONS}
                                        disabled={!hasWorkoutProgramOverride}
                                    />

                                    <FormCheckboxField
                                        label="Has Self Booking?"
                                        name="hasSelfBooking"
                                        checked={hasSelfBooking}
                                        errorText={errors && errors.hasSelfBooking}
                                        onChange={(e)=>setHasSelfBooking(!hasSelfBooking)}
                                        helpText="Indicates if customers can join sessions freely or require invitation by trainer"
                                        maxWidth="100px"
                                        disabled={!hasWorkoutProgramOverride}
                                    />

                                    <FormCheckboxField
                                        label="Has Self Cancellation?"
                                        name="hasSelfCancellation"
                                        checked={hasSelfCancellation}
                                        errorText={errors && errors.hasSelfCancellation}
                                        onChange={(e)=>setHasSelfCancellation(!hasSelfCancellation)}
                                        helpText="Indicates if customers can cancel sessions freely or require trainer handling of customer cancellations"
                                        maxWidth="100px"
                                        disabled={!hasWorkoutProgramOverride}
                                    />

                                    <FormSelectField
                                        label="Self Cancel Minimum Hour"
                                        name="selfCancelMinimumHour"
                                        placeholder="Pick"
                                        selectedValue={selfCancelMinimumHour}
                                        errorText={errors && errors.selfCancelMinimumHour}
                                        helpText="Pick the acceptable hours the member can cancel by without incurring penalty"
                                        isRequired={true}
                                        onChange={(e)=>setSelfCancelMinimumHour(parseInt(e.target.value))}
                                        options={SELF_CANCEL_MINIMUM_HOUR_OPTIONS_WITH_EMPTY_OPTIONS}
                                        disabled={!hasWorkoutProgramOverride}
                                    />
                                </>}

                                <div class="columns pt-5">
                                    <div class="column is-half">
                                        <Link to={`/admin/branch/${bid}/class/${pid}/session/${sid}`} class="button is-medium is-hidden-touch"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        <Link to={`/admin/branch/${bid}/class/${pid}/session/${sid}`} class="button is-medium is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
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

export default AdminWorkoutProgramSessionUpdate;
