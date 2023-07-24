import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faIdCard, faAddressBook, faContactCard, faChartPie, faKey } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import useLocalStorage from "../../Hooks/useLocalStorage";
import { getAccountDetailAPI } from "../../API/Account";
import FormErrorBox from "../Reusable/FormErrorBox";
import FormInputField from "../Reusable/FormInputField";
import FormTextareaField from "../Reusable/FormTextareaField";
import FormRadioField from "../Reusable/FormRadioField";
import FormMultiSelectField from "../Reusable/FormMultiSelectField";
import FormSelectField from "../Reusable/FormSelectField";
import FormCheckboxField from "../Reusable/FormCheckboxField";
import FormCountryField from "../Reusable/FormCountryField";
import FormRegionField from "../Reusable/FormRegionField";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../AppState";
import PageLoadingContent from "../Reusable/PageLoadingContent";


function AccountDetail() {
    ////
    ////
    ////

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
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

    ////
    //// Event handling.
    ////

    //

    ////
    //// API.
    ////

    function onAccountDetailSuccess(response){
        console.log("onAccountDetailSuccess: Starting...");
        setCurrentUser(response);
    }

    function onAccountDetailError(apiErr) {
        console.log("onAccountDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAccountDetailDone() {
        console.log("onAccountDetailDone: Starting...");
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
            setErrors({});
            getAccountDetailAPI(
                onAccountDetailSuccess,
                onAccountDetailError,
                onAccountDetailDone
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
                            {(() => {
                                switch (currentUser.role) {
                                    case 1:  return (
                                        <li class=""><Link to="/root/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                                    );
                                    case 2: return (
                                        <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                                    );
                                    case 3: return (
                                        <li class=""><Link to="/trainer/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                                    );
                                    case 4: return (
                                        <li class=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                                    );
                                    default: return null;
                                }
                            })()}
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        {currentUser && <div class="columns">
                            <div class="column">
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account</p>
                            </div>
                            <div class="column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/account/change-password`} class="button is-medium is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faKey} />&nbsp;Change Password
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/account/change-password`} class="button is-medium is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faKey} />&nbsp;Change Password
                                </Link>
                            </div>
                        </div>}
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Please wait..."} />
                            : <>
                                {currentUser && <div class="container">

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Full Name</p>
                                    <hr />

                                    <FormInputField
                                        label="First Name"
                                        name="firstName"
                                        placeholder="Text input"
                                        value={currentUser.firstName}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />
                                    <FormInputField
                                        label="Last Name"
                                        name="lastName"
                                        placeholder="Text input"
                                        value={currentUser.lastName}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faContactCard} />&nbsp;Contact Information</p>
                                    <hr />

                                    <FormInputField
                                        label="Email"
                                        name="email"
                                        placeholder="Text input"
                                        value={currentUser.email}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="Phone"
                                        name="phone"
                                        placeholder="Text input"
                                        value={currentUser.phone}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="150px"
                                        disabled={true}
                                    />

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faAddressBook} />&nbsp;Address</p>
                                    <hr />

                                    <FormCountryField
                                        priorityOptions={["CA","US","MX"]}
                                        label="Country"
                                        name="country"
                                        placeholder="Text input"
                                        selectedCountry={currentUser.country}
                                        errorText={errors && errors.country}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="160px"
                                        disabled={true}
                                    />

                                    <FormRegionField
                                        label="Province/Territory"
                                        name="region"
                                        placeholder="Text input"
                                        selectedCountry={currentUser.country}
                                        selectedRegion={currentUser.region}
                                        errorText={errors && errors.region}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="280px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="Address Line 1"
                                        name="addressLine1"
                                        placeholder="Text input"
                                        value={currentUser.addressLine1}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="Address Line 2"
                                        name="addressLine2"
                                        placeholder="Text input"
                                        value={currentUser.addressLine2}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="Postal Code"
                                        name="postalCode"
                                        placeholder="Text input"
                                        value={currentUser.postalCode}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="80px"
                                        disabled={true}
                                    />

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics</p>
                                    <hr />

                                    <FormCheckboxField
                                        label="I agree to receive electronic updates from my local branch and/or BP8 Fitness."
                                        name="agreePromotionsEmail"
                                        checked={currentUser.agreePromotionsEmail}
                                        maxWidth="180px"
                                        disabled={true}
                                    />


                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-medium is-hidden-touch" to={"/dashboard"}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link class="button is-medium is-fullwidth is-hidden-desktop" to={"/dashboard"}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <Link to={"/account/update"} class="button is-medium is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                            <Link to={"/account/update"} class="button is-medium is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
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

export default AccountDetail;
