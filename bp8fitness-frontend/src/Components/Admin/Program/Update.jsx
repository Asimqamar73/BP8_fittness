import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faGauge, faPencil, faDumbbell, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faMap, faCalendar, faCogs, faArrowRight  } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { putWorkoutProgramUpdateAPI } from "../../../API/workout_program";
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
import { topAlertMessageState, topAlertStatusState, currentUserState, workoutProgramDetailState } from "../../../AppState";


function AdminWorkoutProgramUpdate() {
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
    const [workoutProgramDetail, setWorkoutProgramDetail] = useRecoilState(workoutProgramDetailState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [name, setName] = useState(workoutProgramDetail.name);
    const [description, setDescription] = useState(workoutProgramDetail.description);
    const [branchID, setBranchID] = useState(bid);
    const [workoutProgramTypeID, setWorkoutProgramTypeID] = useState(workoutProgramDetail.workoutProgramTypeId);
    const [trainerID, setTrainerID] = useState(workoutProgramDetail.trainerId);
    const [startAt, setStartAt] = useState(workoutProgramDetail.startAt);
    const [isOpenEnded, setIsOpenEnded] = useState(workoutProgramDetail.isOpenEnded);
    const [endAt, setEndAt] = useState(workoutProgramDetail.endAt);
    const [durationInMinutes, setDurationInMinutes] = useState(workoutProgramDetail.durationInMinutes);
    const [attendeesLimit, setAttendeesLimit] = useState(workoutProgramDetail.attendeesLimit);
    const [isVirtual, setIsVirtual] = useState(workoutProgramDetail.isVirtual);
    const [isPaidSession, setIsPaidSession] = useState(workoutProgramDetail.isPaidSession);
    const [hasSelfBooking, setHasSelfBooking] = useState(workoutProgramDetail.hasSelfBooking);
    const [hasSelfCancellation, setHasSelfCancellation] = useState(workoutProgramDetail.hasSelfCancellation);
    const [selfCancelMinimumHour, setSelfCancelMinimumHour] = useState(workoutProgramDetail.selfCancelMinimumHour);

    ////
    //// Event handling.
    ////

    // Do nothing...

    ////
    //// API.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        setFetching(true);
        setErrors({});
        const datum = {
            id: pid,
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
        console.log("onSubmitClick, datum:", datum);
        putWorkoutProgramUpdateAPI(datum, onAdminWorkoutProgramUpdateSuccess, onAdminWorkoutProgramUpdateError, onAdminWorkoutProgramUpdateDone);
    }

    function onAdminWorkoutProgramUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onAdminWorkoutProgramUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Program updated");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onAdminWorkoutProgramUpdateSuccess: Delayed for 2 seconds.");
            console.log("onAdminWorkoutProgramUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        setWorkoutProgramDetail(response);

        // Redirect the user to a new page.
        setForceURL("/admin/branch/" + response.branchId + "/class/"+response.id);
    }

    function onAdminWorkoutProgramUpdateError(apiErr) {
        console.log("onAdminWorkoutProgramUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminWorkoutProgramUpdateError: Delayed for 2 seconds.");
            console.log("onAdminWorkoutProgramUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAdminWorkoutProgramUpdateDone() {
        console.log("onAdminWorkoutProgramUpdateDone: Starting...");
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
                        <ul>
                            <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class=""><Link to="/admin/classes" aria-current="page"><FontAwesomeIcon className="fas" icon={faDumbbell} />&nbsp;Classes</Link></li>
                            <li class=""><Link to={`/admin/branch/${bid}/class/${pid}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Update</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faDumbbell} />&nbsp;Class</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Please wait..."} />
                            : <>
                                <div class="container">

                                    {/*<p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Full Name</p>
                                    <hr />*/}

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faMap} />&nbsp;Location & Staffing</p>
                                    <hr />

                                    <FormSelectFieldForBranch
                                        organizationID={currentUser.organizationID}
                                        branchID={branchID}
                                        setBranchID={setBranchID}
                                        errorText={errors && errors.branchID}
                                        helpText="Please select the primary gym location this class will be held at"
                                        maxWidth="310px"
                                    />

                                    {branchID !== undefined && branchID !== null && branchID !== "" && <>

                                    <FormSelectFieldForTrainer
                                        branchID={branchID}
                                        trainerID={trainerID}
                                        setTrainerID={setTrainerID}
                                        errorText={errors && errors.trainerId}
                                        helpText={<>Please select a trainer to run this class. If you don't see any trainers then please <Link to="/admin/trainers/add">click here&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link> to add a trainer. Trainers are based on location this class is located at.</>}
                                        maxWidth="310px"
                                        disabled={branchID === undefined || branchID === null || branchID === ""}
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

                                            <FormSelectFieldForWorkoutProgramType
                                                branchID={branchID}
                                                workoutProgramTypeID={workoutProgramTypeID}
                                                setWorkoutProgramTypeID={setWorkoutProgramTypeID}
                                                errorText={errors && errors.workoutProgramTypeId}
                                                helpText={<>Please select the type of class.  If you don't see a type you want then please <Link to="/admin/wp-types/add">click here&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link> to add a new class type. Class types are based on branch location.</>}
                                                maxWidth="310px"
                                                disabled={branchID === undefined || branchID === null || branchID === ""}
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
                                                helpText="Pick the duration of each session for this class"
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
                                            <Link class="button is-hidden-touch" to={`/admin/branch/${bid}/class/${pid}`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link class="button is-fullwidth is-hidden-desktop" to={`/admin/branch/${bid}/class/${pid}`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <button disabled={branchID === undefined || branchID === null || branchID === "" || trainerID === undefined || trainerID === null || trainerID === ""} class="button is-primary is-hidden-touch" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                            <button disabled={branchID === undefined || branchID === null || branchID === "" || trainerID === undefined || trainerID === null || trainerID === ""} class="button is-primary is-fullwidth is-hidden-desktop" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
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

export default AdminWorkoutProgramUpdate;
