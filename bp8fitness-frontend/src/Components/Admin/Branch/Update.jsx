import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faGauge, faPencil, faMap, faEye, faIdCard, faAddressBook, faContactCard, faChartPie } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getBranchDetailAPI, putBranchUpdateAPI } from "../../../API/branch";
import FormErrorBox from "../../Reusable/FormErrorBox";
import FormInputField from "../../Reusable/FormInputField";
import FormTextareaField from "../../Reusable/FormTextareaField";
import FormRadioField from "../../Reusable/FormRadioField";
import FormMultiSelectField from "../../Reusable/FormMultiSelectField";
import FormSelectField from "../../Reusable/FormSelectField";
import FormCheckboxField from "../../Reusable/FormCheckboxField";
import FormCountryField from "../../Reusable/FormCountryField";
import FormRegionField from "../../Reusable/FormRegionField";
import FormListInputField from "../../Reusable/FormListInputField";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function AdminBranchUpdate() {
    ////
    //// URL Parameters.
    ////

    const { id } = useParams()

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [organizationID, setOrganizationID] = useState("");
    const [name, setName] = useState("");
    const [openingHours, setOpeningHours] = useState();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [country, setCountry] = useState("");

    ////
    //// Event handling.
    ////

    const onOpeningHoursChange = (e, i) => {
        // For debugging purposes.
        console.log(e, i);

        // Make a copy of the "array of strings" into a mutable array.
        const copyOfArr = [...openingHours];

        // Update record.
        copyOfArr[i] = e

        // Save to our react state.
        setOpeningHours(copyOfArr);
    }

    const onRemoveListInputFieldChange = (i) => {
        // For debugging purposes.
        console.log(i);

        // Make a copy of the "array of strings" into a mutable array.
        const copyOfArr = [...openingHours];

        // Delete record.
        const x = copyOfArr.splice(i, 1);

        // For debugging purposes.
        console.log(x);

        // Save to our react state.
        setOpeningHours(copyOfArr);
    }

    const onAddListInputFieldClick = () => {
        // For debugging purposes.
        console.log("add");

        // Make a copy of the "array of strings" into a mutable array.
        let copyOfArr = [];
        if (openingHours && openingHours.length > 0) { // Defensive code.
            copyOfArr = [...openingHours];
        }

        // Add empty record.
        copyOfArr.push("");

        // For debugging purposes.
        console.log(copyOfArr);

        // Save to our react state.
        setOpeningHours(copyOfArr);
    }

    ////
    //// API.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        setFetching(true);
        const datum = {
            organization_id: organizationID,
            id: id,
            name: name,
            opening_hours: openingHours,
            email: email,
            phone: phone,
            postal_code: postalCode,
            address_line_1: addressLine1,
            address_line_2: addressLine2,
            city: city,
            region: region,
            country: country,
        };
        console.log("onSubmitClick, datum:", datum);
        putBranchUpdateAPI(datum, onAdminBranchUpdateSuccess, onAdminBranchUpdateError, onAdminBranchUpdateDone);
    }

    function onBranchDetailSuccess(response){
        console.log("onBranchDetailSuccess: Starting...");
        setOrganizationID(response.organizationId);
        setName(response.name);
        setOpeningHours(response.openingHours);
        setEmail(response.email);
        setPhone(response.phone);
        setPostalCode(response.postalCode);
        setAddressLine1(response.addressLine1);
        setAddressLine2(response.addressLine2);
        setCity(response.city);
        setRegion(response.region);
        setCountry(response.country);
    }

    function onBranchDetailError(apiErr) {
        console.log("onBranchDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onBranchDetailDone() {
        console.log("onBranchDetailDone: Starting...");
        setFetching(false);
    }

    function onAdminBranchUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onAdminBranchUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Branch updated");
        setTopAlertStatus("Workout Branch");
        setTimeout(() => {
            console.log("onAdminBranchUpdateSuccess: Delayed for 2 seconds.");
            console.log("onAdminBranchUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/admin/branch/"+response.id);
    }

    function onAdminBranchUpdateError(apiErr) {
        console.log("onAdminBranchUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminBranchUpdateError: Delayed for 2 seconds.");
            console.log("onAdminBranchUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAdminBranchUpdateDone() {
        console.log("onAdminBranchUpdateDone: Starting...");
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
            getBranchDetailAPI(
                id,
                onBranchDetailSuccess,
                onBranchDetailError,
                onBranchDetailDone
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
                            <li class=""><Link to="/admin/branches" aria-current="page"><FontAwesomeIcon className="fas" icon={faMap} />&nbsp;Branches</Link></li>
                            <li class=""><Link to={`/admin/branch/${id}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Update</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faMap} />&nbsp;Branches</p>
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Please wait..."} />
                            : <>
                                <div class="container" key={id}>

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Office Information</p>
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

                                    <FormListInputField
                                        label="Opening Hours (Optional)"
                                        name="openingHours"
                                        type="text"
                                        placeholder="Text input"
                                        value={openingHours}
                                        errorText={errors && errors.openingHours}
                                        helpText=""
                                        onListInputFieldChange={onOpeningHoursChange}
                                        onRemoveListInputFieldChange={onRemoveListInputFieldChange}
                                        onAddListInputFieldClick={onAddListInputFieldClick}
                                        isRequired={true}
                                        maxWidth="320px"
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

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-hidden-touch" to={`/admin/branch/${id}`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link class="button is-fullwidth is-hidden-desktop" to={`/admin/branch/${id}`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
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

export default AdminBranchUpdate;
