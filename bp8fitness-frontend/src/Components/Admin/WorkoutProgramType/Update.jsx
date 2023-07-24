import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faGauge, faPencil, faHandSparkles, faEye, faIdCard, faAddressBook, faContactCard, faChartPie } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getWorkoutProgramTypeDetailAPI, putWorkoutProgramTypeUpdateAPI } from "../../../API/workout_program_type";
import FormErrorBox from "../../Reusable/FormErrorBox";
import FormInputField from "../../Reusable/FormInputField";
import FormTextareaField from "../../Reusable/FormTextareaField";
import FormRadioField from "../../Reusable/FormRadioField";
import FormMultiSelectField from "../../Reusable/FormMultiSelectField";
import FormSelectField from "../../Reusable/FormSelectField";
import FormCheckboxField from "../../Reusable/FormCheckboxField";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import FormSelectFieldForBranch from "../../Reusable/FormSelectFieldForBranch";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../AppState";


function AdminWorkoutProgramTypeUpdate() {
    ////
    //// URL Parameters.
    ////

    const { id } = useParams()

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
    const [branchID, setBranchID] = useState("");

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
        const datum = {
            id: id,
            name: name,
            branch_id: branchID,
        };
        console.log("onSubmitClick, datum:", datum);
        putWorkoutProgramTypeUpdateAPI(datum, onAdminWorkoutProgramTypeUpdateSuccess, onAdminWorkoutProgramTypeUpdateError, onAdminWorkoutProgramTypeUpdateDone);
    }

    function onProfileDetailSuccess(response){
        console.log("onProfileDetailSuccess: Starting...");
            console.log("onProfileDetailSuccess: data:", response);
        setName(response.name);
        setBranchID(response.branchId);
    }

    function onProfileDetailError(apiErr) {
        console.log("onProfileDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onProfileDetailDone() {
        console.log("onProfileDetailDone: Starting...");
        setFetching(false);
    }

    function onAdminWorkoutProgramTypeUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onAdminWorkoutProgramTypeUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Program Type updated");
        setTopAlertStatus("Workout Program Type");
        setTimeout(() => {
            console.log("onAdminWorkoutProgramTypeUpdateSuccess: Delayed for 2 seconds.");
            console.log("onAdminWorkoutProgramTypeUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/admin/wp-type/"+response.id);
    }

    function onAdminWorkoutProgramTypeUpdateError(apiErr) {
        console.log("onAdminWorkoutProgramTypeUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminWorkoutProgramTypeUpdateError: Delayed for 2 seconds.");
            console.log("onAdminWorkoutProgramTypeUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAdminWorkoutProgramTypeUpdateDone() {
        console.log("onAdminWorkoutProgramTypeUpdateDone: Starting...");
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
            getWorkoutProgramTypeDetailAPI(
                id,
                onProfileDetailSuccess,
                onProfileDetailError,
                onProfileDetailDone
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
                            <li class=""><Link to="/admin/wp-types" aria-current="page"><FontAwesomeIcon className="fas" icon={faHandSparkles} />&nbsp;Class Types</Link></li>
                            <li class=""><Link to={`/admin/wp-type/${id}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Update</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faHandSparkles} />&nbsp;Class Types</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Please wait..."} />
                            :
                            <>
                                <div class="container">
                                    {/*<p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Full Name</p>
                                    <hr />*/}
                                    <FormSelectFieldForBranch
                                        organizationID={currentUser.organizationID}
                                        branchID={branchID}
                                        setBranchID={setBranchID}
                                        errorText={errors && errors.branchID}
                                        helpText="Please select the primary gym location to associate with this type"
                                        maxWidth="310px"
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
                                    />
                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-hidden-touch" to={`/admin/wp-type/${id}`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link class="button is-fullwidth is-hidden-desktop" to={`/admin/wp-type/${id}`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <button class="button is-primary is-hidden-touch" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
                                            <button class="button is-primary is-fullwidth is-hidden-desktop" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
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

export default AdminWorkoutProgramTypeUpdate;
