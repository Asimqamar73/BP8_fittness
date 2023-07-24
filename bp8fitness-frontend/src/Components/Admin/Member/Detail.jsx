import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getMemberDetailAPI } from "../../../API/member";
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
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";
import { HOW_DID_YOU_HEAR_ABOUT_US_WITH_EMPTY_OPTIONS, MEMBER_STATUS_WITH_EMPTY_OPTIONS } from "../../../Constants/FieldOptions";


function AdminMemberDetail() {
    ////
    //// URL Parameters.
    ////

    const { bid, id } = useParams()

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
    const [datum, setDatum] = useState({});
    const [tabIndex, setTabIndex] = useState(1);

    ////
    //// Event handling.
    ////

    //

    ////
    //// API.
    ////

    function onMemberDetailSuccess(response){
        console.log("onMemberDetailSuccess: Starting...");
        setDatum(response);
    }

    function onMemberDetailError(apiErr) {
        console.log("onMemberDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onMemberDetailDone() {
        console.log("onMemberDetailDone: Starting...");
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
            getMemberDetailAPI(
                id,
                onMemberDetailSuccess,
                onMemberDetailError,
                onMemberDetailDone
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
                            <li class=""><Link to="/admin/members" aria-current="page"><FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Members</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        {datum && <div class="columns">
                            <div class="column">
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Member</p>
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
                                {datum && <div class="container" key={datum.id}>
                                    <div class="tabs is-medium">
                                      <ul>
                                        <li class="is-active">
                                            <Link><strong>Detail</strong></Link>
                                        </li>
                                        <li>
                                            <Link to={`/admin/branch/${datum.branchId}/member/${datum.id}/bookings`}>Bookings</Link>
                                        </li>
                                        <li>
                                            <Link to={`/admin/branch/${datum.branchId}/member/${datum.id}/waitlist`}>Waitlist</Link>
                                        </li>
                                      </ul>
                                    </div>

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Full-Name</p>
                                    <hr />

                                    <FormInputField
                                        label="Name"
                                        name="name"
                                        placeholder="Text input"
                                        value={datum.name}
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
                                        value={datum.email}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="Phone"
                                        name="phone"
                                        placeholder="Text input"
                                        value={datum.phone}
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
                                        selectedCountry={datum.country}
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
                                        selectedCountry={datum.country}
                                        selectedRegion={datum.region}
                                        errorText={errors && errors.region}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="280px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="City"
                                        name="city"
                                        placeholder="Text input"
                                        value={datum.city}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="Address Line 1"
                                        name="addressLine1"
                                        placeholder="Text input"
                                        value={datum.addressLine1}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="Address Line 2"
                                        name="addressLine2"
                                        placeholder="Text input"
                                        value={datum.addressLine2}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="380px"
                                        disabled={true}
                                    />

                                    <FormInputField
                                        label="Postal Code"
                                        name="postalCode"
                                        placeholder="Text input"
                                        value={datum.postalCode}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="80px"
                                        disabled={true}
                                    />

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics</p>
                                    <hr />

                                    <FormSelectField
                                        label="How did you hear about us?"
                                        name="howDidYouHearAboutUs"
                                        placeholder="Pick"
                                        selectedValue={datum.howDidYouHearAboutUs}
                                        helpText=""
                                        disabled={true}
                                        options={HOW_DID_YOU_HEAR_ABOUT_US_WITH_EMPTY_OPTIONS}
                                    />

                                    {datum.howDidYouHearAboutUs === 1 && <FormInputField
                                        label="Other (Please specify):"
                                        name="howDidYouHearAboutUsOther"
                                        placeholder="Text input"
                                        value={datum.howDidYouHearAboutUsOther}
                                        helpText=""
                                        disabled={true}
                                        maxWidth="380px"
                                    />}

                                    <FormCheckboxField
                                        label="I agree to receive electronic updates from my local gym"
                                        name="agreePromotionsEmail"
                                        checked={datum.agreePromotionsEmail}
                                        disabled={true}
                                        maxWidth="180px"
                                    />

                                    <p class="subtitle is-6"><FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Settings</p>
                                    <hr />

                                    <FormInputField
                                        label="Branch"
                                        name="branchID"
                                        placeholder="Pick branch location"
                                        value={datum.branchName}
                                        helpText="Please select the primary gym location this member will be using"
                                        disabled={true}
                                        maxWidth="310px"
                                    />

                                    <FormRadioField
                                        label="Status"
                                        name="status"
                                        placeholder="Pick"
                                        value={datum.status}
                                        opt2Value={1}
                                        opt2Label="Active"
                                        opt4Value={100}
                                        opt4Label="Archived"
                                        errorText={errors && errors.status}
                                        onChange={null}
                                        maxWidth="180px"
                                        disabled={true}
                                    />

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-hidden-touch" to={`/admin/members`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link class="button is-fullwidth is-hidden-desktop" to={`/admin/members`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <Link to={`/admin/branch/${bid}/member/${id}/update`} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                            <Link to={`/admin/branch/${bid}/member/${id}/update`} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
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

export default AdminMemberDetail;
