import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardTeacher, faEye, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faDumbbell, faIdCard, faAddressBook, faContactCard, faChartPie, faMap, faCalendar, faCogs, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { getWorkoutProgramDetailAPI, postWorkoutProgramCreateAPI } from "../../../API/workout_program";
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
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../AppState";


function AdminWorkoutProgramAdd() {
    ////
    //// URL Parameters.
    ////

    const [searchParams] = useSearchParams(); // Special thanks via https://stackoverflow.com/a/65451140
    const forcedBranchID = searchParams.get("bid");
    const forcedTrainerID = searchParams.get("tid");

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
    const [forceURL, setForceURL] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [branchID, setBranchID] = useState(forcedBranchID);
    const [workoutProgramTypeID, setWorkoutProgramTypeID] = useState("");
    const [trainerID, setTrainerID] = useState(forcedTrainerID);
    const [startAt, setStartAt] = useState(null);
    const [isOpenEnded, setIsOpenEnded] = useState(false);
    const [endAt, setEndAt] = useState(null);
    const [durationInMinutes, setDurationInMinutes] = useState(0);
    const [attendeesLimit, setAttendeesLimit] = useState(0);
    const [isVirtual, setIsVirtual] = useState(false);
    const [isPaidSession, setIsPaidSession] = useState(true);
    const [hasSelfBooking, setHasSelfBooking] = useState(true);
    const [hasSelfCancellation, setHasSelfCancellation] = useState(true);
    const [selfCancelMinimumHour, setSelfCancelMinimumHour] = useState(1);
    const [showCancelWarning, setShowCancelWarning] = useState(false);

    ////
    //// Event handling.
    ////


    ////
    //// API.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        setFetching(true);
        setErrors({});
        const data = { // To Snake-case for API from camel-case in React.
            name: name,
            description: description,
            branch_id: branchID,
            trainer_id: trainerID,
            workout_program_type_id: workoutProgramTypeID,
            start_at: startAt,
            is_open_ended: isOpenEnded,
            end_at: isOpenEnded ? null : endAt,
            duration_in_minutes: durationInMinutes,
            attendees_limit: attendeesLimit,
            is_virtual: isVirtual,
            is_paid_session: isPaidSession,
            has_self_booking: hasSelfBooking,
            has_self_cancellation: hasSelfCancellation,
            self_cancel_minimum_hour: selfCancelMinimumHour,
        };
        console.log("onSubmitClick, data:", data);
        postWorkoutProgramCreateAPI(data, onAdminWorkoutProgramAddSuccess, onAdminWorkoutProgramAddError, onAdminWorkoutProgramAddDone);
    }

    function onAdminWorkoutProgramAddSuccess(response){
        // For debugging purposes only.
        console.log("onAdminWorkoutProgramAddSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Program created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onAdminWorkoutProgramAddSuccess: Delayed for 2 seconds.");
            console.log("onAdminWorkoutProgramAddSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.

        if (forcedBranchID !== undefined && forcedBranchID !== null && forcedBranchID !== "") {
            if (forcedTrainerID !== undefined && forcedTrainerID !== null && forcedTrainerID !== "") {
                setForceURL("/admin/branch/" + forcedBranchID + "/trainer/" + forcedTrainerID + "/classes");
            }
        } else {
            setForceURL("/admin/branch/" + response.branchId + "/class/"+response.id);
        }
    }

    function onAdminWorkoutProgramAddError(apiErr) {
        console.log("onAdminWorkoutProgramAddError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminWorkoutProgramAddError: Delayed for 2 seconds.");
            console.log("onAdminWorkoutProgramAddError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAdminWorkoutProgramAddDone() {
        console.log("onAdminWorkoutProgramAddDone: Starting...");
        setFetching(false);
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
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
                        {forcedBranchID !== undefined && forcedBranchID !== null && forcedBranchID !== ""
                            ? <>
                                {forcedTrainerID !== undefined && forcedTrainerID !== null && forcedTrainerID !== "" && <>
                                    <ul>
                                        <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                                        <li class=""><Link to="/admin/trainers" aria-current="page"><FontAwesomeIcon className="fas" icon={faChalkboardTeacher} />&nbsp;Trainers</Link></li>
                                        <li class=""><Link to={`/admin/branch/${forcedBranchID}/trainer/${forcedTrainerID}/classes`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Classes)</Link></li>
                                        <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New Class</Link></li>
                                    </ul>
                                </>}
                            </>
                            : <>
                                <ul>
                                    <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                                    <li class=""><Link to="/admin/classes" aria-current="page"><FontAwesomeIcon className="fas" icon={faDumbbell} />&nbsp;Classes</Link></li>
                                    <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;Add</Link></li>
                                </ul>
                            </>
                        }

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
                                    {forcedBranchID !== undefined && forcedBranchID !== null && forcedBranchID !== ""
                                        ? <>
                                            {forcedTrainerID !== undefined && forcedTrainerID !== null && forcedTrainerID !== "" && <Link class="button is-medium is-success" to={`/admin/branch/${forcedBranchID}/trainer/${forcedTrainerID}/classes`}>Yes</Link>}
                                        </>
                                        :
                                        <Link class="button is-medium is-success" to={`/admin/classes`}>Yes</Link>
                                    }
                                    <button class="button is-medium" onClick={(e)=>setShowCancelWarning(false)}>No</button>
                                </footer>
                            </div>
                        </div>

                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New Class</p>


                        {/* <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Please wait..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />
                                <div class="container">
                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faMap} />&nbsp;Location & Staffing</p>
                                    <hr />

                                    <FormSelectFieldForBranch
                                        organizationID={currentUser.organizationID}
                                        branchID={branchID}
                                        setBranchID={setBranchID}
                                        errorText={errors && errors.branchId}
                                        helpText="Please select the primary gym location this class will be held at"
                                        maxWidth="310px"
                                        disabled={forcedBranchID !== undefined && forcedBranchID !== null && forcedBranchID !== ""}

                                    />

                                    {branchID !== undefined && branchID !== null && branchID !== "" && <>

                                        <FormSelectFieldForTrainer
                                            branchID={branchID}
                                            trainerID={trainerID}
                                            setTrainerID={setTrainerID}
                                            errorText={errors && errors.trainerId}
                                            helpText={<>Please select a trainer to run this class. If you don't see any trainers then please <Link to="/admin/trainers/add">click here&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link> to add a trainer. Trainers are based on location this class is located at.</>}
                                            maxWidth="310px"
                                            disabled={branchID === undefined || branchID === null || branchID === "" || (forcedTrainerID !== undefined && forcedTrainerID !== null && forcedTrainerID !== "")}
                                        />

                                        {trainerID !== undefined && trainerID !== null && trainerID !== "" && <>
                                            <FormCheckboxField
                                                label="Is virtual?"
                                                name="isVirtual"
                                                checked={isVirtual}
                                                errorText={errors && errors.isVirtual}
                                                onChange={(e)=>setIsVirtual(!isVirtual)}
                                                helpText="Indicates whether sessions take place at physical gym location or online only"
                                                maxWidth="100px"
                                            />

                                            <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faContactCard} />&nbsp;Information</p>
                                            <hr />

                                            <FormSelectFieldForWorkoutProgramType
                                                branchID={branchID}
                                                workoutProgramTypeID={workoutProgramTypeID}
                                                setWorkoutProgramTypeID={setWorkoutProgramTypeID}
                                                errorText={errors && errors.workoutProgramTypeId}
                                                helpText={<>Please select the type of class.  If you don't see a type you want then please <Link to="/admin/wp-types/add">click here&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link> to add a new class type. Class types are based on branch location.</>}
                                                maxWidth="310px"
                                                disabled={branchID === undefined || branchID === null || branchID === ""}
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
                                                maxWidth="400px"
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
                                            />

                                            <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faCalendar} />&nbsp;Dates</p>
                                            <hr />

                                            <FormDateField
                                                label="Start At"
                                                name="startAt"
                                                placeholder="Text input"
                                                value={startAt}
                                                errorText={errors && errors.startAt}
                                                helpText="The date this class will begin at"
                                                onChange={(date)=>setStartAt(date)}
                                                isRequired={true}
                                                maxWidth="120px"
                                            />

                                            <FormCheckboxField
                                                label="Is open ended?"
                                                name="isOpenEnded"
                                                checked={isOpenEnded}
                                                errorText={errors && errors.isOpenEnded}
                                                onChange={(e)=>setIsOpenEnded(!isOpenEnded)}
                                                maxWidth="100px"
                                            />

                                            <FormDateField
                                                label="End At"
                                                name="endAt"
                                                placeholder="Text input"
                                                value={isOpenEnded ? null : endAt}
                                                errorText={errors && errors.endAt}
                                                helpText=""
                                                onChange={(date)=>setEndAt(date)}
                                                isRequired={true}
                                                maxWidth="120px"
                                                disabled={isOpenEnded}
                                            />

                                            <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Settings</p>
                                            <hr />

                                            <FormCheckboxField
                                                label="Is paid session?"
                                                name="isPaidSession"
                                                checked={isPaidSession}
                                                errorText={errors && errors.isPaidSession}
                                                onChange={(e)=>setIsPaidSession(!isPaidSession)}
                                                helpText="Indicates if sessions are free for attendance to the public or require payment for entry"
                                                maxWidth="100px"
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
                                            />

                                            <FormCheckboxField
                                                label="Has Self Booking?"
                                                name="hasSelfBooking"
                                                checked={hasSelfBooking}
                                                errorText={errors && errors.hasSelfBooking}
                                                onChange={(e)=>setHasSelfBooking(!hasSelfBooking)}
                                                helpText="Indicates if customers can join sessions freely or require invitation by trainer"
                                                maxWidth="100px"
                                            />

                                            <FormCheckboxField
                                                label="Has Self Cancellation?"
                                                name="hasSelfCancellation"
                                                checked={hasSelfCancellation}
                                                errorText={errors && errors.hasSelfCancellation}
                                                onChange={(e)=>setHasSelfCancellation(!hasSelfCancellation)}
                                                helpText="Indicates if customers can cancel sessions freely or require trainer handling of customer cancellations"
                                                maxWidth="100px"
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
                                            />
                                        </>}
                                    </>}

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <button class="button is-medium is-hidden-touch" onClick={(e)=>setShowCancelWarning(true)}><FontAwesomeIcon className="fas" icon={faTimesCircle} />&nbsp;Cancel</button>
                                            <button class="button is-medium is-fullwidth is-hidden-desktop" onClick={(e)=>setShowCancelWarning(true)}><FontAwesomeIcon className="fas" icon={faTimesCircle} />&nbsp;Cancel</button>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <button disabled={branchID === undefined || branchID === null || branchID === "" || trainerID === undefined || trainerID === null || trainerID === ""} class="button is-medium is-primary is-hidden-touch" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Create Class</button>
                                            <button disabled={branchID === undefined || branchID === null || branchID === "" || trainerID === undefined || trainerID === null || trainerID === ""} class="button is-medium is-primary is-fullwidth is-hidden-desktop" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Create Class</button>
                                        </div>
                                    </div>

                                </div>
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminWorkoutProgramAdd;
