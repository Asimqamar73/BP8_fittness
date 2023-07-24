import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faGauge, faPencil, faChalkboardTeacher, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getTrainerDetailAPI, putTrainerUpdateAPI } from "../../../API/trainer";
import FormErrorBox from "../../Reusable/FormErrorBox";
import FormInputField from "../../Reusable/FormInputField";
import FormTextareaField from "../../Reusable/FormTextareaField";
import FormRadioField from "../../Reusable/FormRadioField";
import FormMultiSelectField from "../../Reusable/FormMultiSelectField";
import FormSelectField from "../../Reusable/FormSelectField";
import FormCheckboxField from "../../Reusable/FormCheckboxField";
import FormCountryField from "../../Reusable/FormCountryField";
import FormRegionField from "../../Reusable/FormRegionField";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import FormSelectFieldForBranch from "../../Reusable/FormSelectFieldForBranch";
import { TRAINER_STATUS_WITH_EMPTY_OPTIONS } from "../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../AppState";


function AdminTrainerUpdate() {
    ////
    //// URL Parameters.
    ////

    const { bid, tid } = useParams()

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
    const [organizationID, setOrganizationID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [country, setCountry] = useState("");
    const [branchID, setBranchID] = useState(bid);
    const [status, setStatus] = useState(0);
    const [agreePromotionsEmail, setHasPromotionalEmail] = useState(true);
    const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = useState(2); // 2 = Did not say / Prefer not to answer
    const [password, setPassword] = useState("");
    const [passwordRepeated, setPasswordRepeated] = useState("");

    ////
    //// Event handling.
    ////

    function onAgreePromotionsEmailChange(e) {
        setHasPromotionalEmail(!agreePromotionsEmail);
    }

    ////
    //// API.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        setFetching(true);
        setErrors({});
        const decamelizedData = {
            id: tid,
            branch_id: branchID,
            organization_id: currentUser.organizationID,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            postal_code: postalCode,
            address_line_1: addressLine1,
            address_line_2: addressLine2,
            city: city,
            region: region,
            country: country,
            status: status,
            password: password,
            password_repeated: passwordRepeated,
            how_did_you_hear_about_us: howDidYouHearAboutUs,
            agree_promotions_email: agreePromotionsEmail,
        };
        console.log("onSubmitClick, decamelizedData:", decamelizedData);
        putTrainerUpdateAPI(decamelizedData, onAdminTrainerUpdateSuccess, onAdminTrainerUpdateError, onAdminTrainerUpdateDone);
    }

    function onTrainerDetailSuccess(response){
        console.log("onTrainerDetailSuccess: Starting...");
        setBranchID(response.branchId);
        setOrganizationID(response.organizationId);
        setFirstName(response.firstName);
        setLastName(response.lastName);
        setEmail(response.email);
        setPhone(response.phone);
        setPostalCode(response.postalCode);
        setAddressLine1(response.addressLine1);
        setAddressLine2(response.addressLine2);
        setCity(response.city);
        setRegion(response.region);
        setCountry(response.country);
        setStatus(response.status);
        setHowDidYouHearAboutUs(response.howDidYouHearAboutUs);
        setHasPromotionalEmail(response.agreePromotionsEmail);
    }

    function onTrainerDetailError(apiErr) {
        console.log("onTrainerDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onTrainerDetailDone() {
        console.log("onTrainerDetailDone: Starting...");
        setFetching(false);
    }

    function onAdminTrainerUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onAdminTrainerUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Trainer updated");
        setTopAlertStatus("Workout Trainer");
        setTimeout(() => {
            console.log("onAdminTrainerUpdateSuccess: Delayed for 2 seconds.");
            console.log("onAdminTrainerUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/admin/branch/" + response.branchId + "/trainer/"+response.id);
    }

    function onAdminTrainerUpdateError(apiErr) {
        console.log("onAdminTrainerUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminTrainerUpdateError: Delayed for 2 seconds.");
            console.log("onAdminTrainerUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAdminTrainerUpdateDone() {
        console.log("onAdminTrainerUpdateDone: Starting...");
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
            getTrainerDetailAPI(
                tid,
                onTrainerDetailSuccess,
                onTrainerDetailError,
                onTrainerDetailDone
            );
        }

        return () => { mounted = false; }
    }, [tid]);
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
                            <li class=""><Link to="/admin/trainers" aria-current="page"><FontAwesomeIcon className="fas" icon={faChalkboardTeacher} />&nbsp;Trainers</Link></li>
                            <li class=""><Link to={`/admin/branch/${bid}/trainer/${tid}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Update</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faChalkboardTeacher} />&nbsp;Trainer</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Please wait..."} />
                            :
                            <>
                                <div class="container" key={tid}>

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Office Information</p>
                                    <hr />

                                    <FormInputField
                                        label="First Name"
                                        name="firstName"
                                        placeholder="Text input"
                                        value={firstName}
                                        errorText={errors && errors.firstName}
                                        helpText=""
                                        onChange={(e)=>setFirstName(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormInputField
                                        label="Last Name"
                                        name="lastName"
                                        placeholder="Text input"
                                        value={lastName}
                                        errorText={errors && errors.lastName}
                                        helpText=""
                                        onChange={(e)=>setLastName(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faContactCard} />&nbsp;Contact Information</p>
                                    <hr />

                                    <FormInputField
                                        label="Email"
                                        name="email"
                                        placeholder="Text input"
                                        value={email}
                                        errorText={errors && errors.email}
                                        helpText=""
                                        onChange={(e)=>setEmail(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormInputField
                                        label="Phone"
                                        name="phone"
                                        placeholder="Text input"
                                        value={phone}
                                        errorText={errors && errors.phone}
                                        helpText=""
                                        onChange={(e)=>setPhone(e.target.value)}
                                        isRequired={true}
                                        maxWidth="150px"
                                    />

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faAddressBook} />&nbsp;Address</p>
                                    <hr />

                                    <FormCountryField
                                        priorityOptions={["CA","US","MX"]}
                                        label="Country"
                                        name="country"
                                        placeholder="Text input"
                                        selectedCountry={country}
                                        errorText={errors && errors.country}
                                        helpText=""
                                        onChange={(value)=>setCountry(value)}
                                        isRequired={true}
                                        maxWidth="160px"
                                    />

                                    <FormRegionField
                                        label="Province/Territory"
                                        name="region"
                                        placeholder="Text input"
                                        selectedCountry={country}
                                        selectedRegion={region}
                                        errorText={errors && errors.region}
                                        helpText=""
                                        onChange={(value)=>setRegion(value)}
                                        isRequired={true}
                                        maxWidth="280px"
                                    />

                                    <FormInputField
                                        label="City"
                                        name="city"
                                        placeholder="Text input"
                                        value={city}
                                        errorText={errors && errors.city}
                                        helpText=""
                                        onChange={(e)=>setCity(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormInputField
                                        label="Address Line 1"
                                        name="addressLine1"
                                        placeholder="Text input"
                                        value={addressLine1}
                                        errorText={errors && errors.addressLine1}
                                        helpText=""
                                        onChange={(e)=>setAddressLine1(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormInputField
                                        label="Address Line 2"
                                        name="addressLine2"
                                        placeholder="Text input"
                                        value={addressLine2}
                                        errorText={errors && errors.addressLine2}
                                        helpText=""
                                        onChange={(e)=>setAddressLine2(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormInputField
                                        label="Postal Code"
                                        name="postalCode"
                                        placeholder="Text input"
                                        value={postalCode}
                                        errorText={errors && errors.postalCode}
                                        helpText=""
                                        onChange={(e)=>setPostalCode(e.target.value)}
                                        isRequired={true}
                                        maxWidth="80px"
                                    />

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics</p>
                                    <hr />

                                    <FormCheckboxField
                                        label="I agree to receive electronic updates from my local gym"
                                        name="agreePromotionsEmail"
                                        checked={agreePromotionsEmail}
                                        errorText={errors && errors.agreePromotionsEmail}
                                        onChange={onAgreePromotionsEmailChange}
                                        maxWidth="180px"
                                    />

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Settings</p>
                                    <hr />

                                    <FormSelectFieldForBranch
                                        organizationID={currentUser.organizationID}
                                        branchID={branchID}
                                        setBranchID={setBranchID}
                                        errorText={errors && errors.branchID}
                                        helpText="Please select the primary gym location this trainer will be using"
                                        maxWidth="310px"
                                    />

                                    <FormRadioField
                                        label="Status"
                                        name="status"
                                        placeholder="Pick"
                                        value={status}
                                        opt2Value={1}
                                        opt2Label="Active"
                                        opt4Value={100}
                                        opt4Label="Archived"
                                        errorText={errors && errors.status}
                                        onChange={(e)=>setStatus(parseInt(e.target.value))}
                                        maxWidth="180px"
                                        disabled={false}
                                    />

                                    <FormInputField
                                        label="Password (Optional)"
                                        name="password"
                                        type="password"
                                        placeholder="Text input"
                                        value={password}
                                        errorText={errors && errors.password}
                                        helpText=""
                                        onChange={(e)=>setPassword(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormInputField
                                        label="Password Repeated (Optional)"
                                        name="passwordRepeated"
                                        type="password"
                                        placeholder="Text input"
                                        value={passwordRepeated}
                                        errorText={errors && errors.passwordRepeated}
                                        helpText=""
                                        onChange={(e)=>setPasswordRepeated(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-hidden-touch" to={`/admin/branch/${bid}/trainer/${tid}`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link class="button is-fullwidth is-hidden-desktop" to={`/admin/branch/${bid}/trainer/${tid}`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
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

export default AdminTrainerUpdate;
