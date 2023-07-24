import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faArrowRight, faIdCard, faContactCard, faAddressBook, faChartPie } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useRecoilState } from 'recoil';

import { getPublicBranchListAPI } from "../../API/branch";
import FormErrorBox from "../Reusable/FormErrorBox";
import FormInputField from "../Reusable/FormInputField";
import FormTextareaField from "../Reusable/FormTextareaField";
import FormRadioField from "../Reusable/FormRadioField";
import FormMultiSelectField from "../Reusable/FormMultiSelectField";
import FormSelectField from "../Reusable/FormSelectField";
import FormCheckboxField from "../Reusable/FormCheckboxField";
import FormCountryField from "../Reusable/FormCountryField";
import FormRegionField from "../Reusable/FormRegionField";
import PrettyOpeningHour from "../Reusable/PrettyOpeningHour";
import { HOW_DID_YOU_HEAR_ABOUT_US_WITH_EMPTY_OPTIONS } from "../../Constants/FieldOptions";
import PageLoadingContent from "../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../AppState";


function RegisterStep1() {
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
    const [branches, setBranches] = useState({});

    ////
    //// Event handling.
    ////

    const onSubmitClick = (bid) => {
        console.log("onSubmitClick: Beginning...");
        setForceURL("/register-step-2?bid="+bid);
    }

    function onBranchListSuccess(response){
        console.log("onBranchListSuccess: Starting...");
        if (response !== undefined && response !== null && response !== "") {
            setBranches(response.results);
        }
    }

    function onBranchListError(apiErr) {
        console.log("onBranchListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onBranchListDone() {
        console.log("onBranchListDone: Starting...");
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

            let params = new Map();
            params.set("page_size", 1_000_000);     // Pagination
            params.set("sort_field", "created")     // Sorting
            params.set("organization_id", "648763d3f6fbead15f5bd4d2")     // Sorting

            getPublicBranchListAPI(
                params,
                onBranchListSuccess,
                onBranchListError,
                onBranchListDone
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

                    <nav class="box">
                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Register - Step 1 of 2</p>

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Please wait..."} />
                            :
                            <div class="container">
                                <p>Welcome to BP8 fitness! To begin your registration, please click the location closest to you:</p>
                                <br />
                                <FormErrorBox errors={errors} />

                                {branches && branches.length > 0 && <>
                                    {branches.map(function(datum, i){
                                    return <>
                                        <div class="card mb-5 has-background-white-bis" key={datum.id}>
                                          <div class="card-content">
                                            <div class="media">
                                                <div class="media-left">
                                                    <figure class="image is-48x48">
                                                        <img src="/static/logo.jpeg" alt="Branch Logo" />
                                                    </figure>
                                                </div>
                                                <div class="media-content">
                                                    <p class="title is-4">{datum.name}</p>
                                                    <p class="subtitle is-6">{datum.country}, {datum.region}, {datum.city} - {datum.addressLine1}</p>
                                                </div>
                                            </div>

                                            <div class="content">
                                                {datum.description}
                                                <br />
                                                <br />
                                                <strong>Phone:</strong>
                                                <br />
                                                <a href={`tel:${datum.phone}`}>{datum.phone}</a>
                                                <br />
                                                <br />
                                                <strong>Email:</strong>
                                                <br />
                                                <a href={`mailto:${datum.email}`}>{datum.email}</a>
                                                <br />
                                                <br />
                                                <strong>Hours of Operation:</strong>
                                                <br />
                                                {datum.openingHours && datum.openingHours.length > 0
                                                    ?
                                                    <>
                                                    {datum.openingHours.map(function(openingHour, i){
                                                        return <>
                                                            <span itemprop="openingHours" content={openingHour}><PrettyOpeningHour item={openingHour} /></span><br />
                                                        </>
                                                    })}
                                                    </>
                                                    :
                                                    <>
                                                        <span>Currently not open</span><br />
                                                    </>
                                                }
                                                 {/* <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}

                                                  <div class="columns">
                                                      <div class="column is-half">

                                                      </div>
                                                      <div class="column is-half has-text-right">
                                                          <button class="button is-medium is-primary is-hidden-touch" onClick={(id) => onSubmitClick(datum.id)}>
                                                              Select & Continue&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></button>
                                                          <button class="button is-medium is-primary is-fullwidth is-hidden-desktop" onClick={(id) => onSubmitClick(datum.id)}>
                                                              Select &  Continue&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></button>
                                                      </div>
                                                  </div>

                                            </div>
                                          </div>
                                        </div>
                                    </>
                                })}
                                </>}



                            </div>
                        }
                    </nav>
                    <span className="is-pulled-right has-text-grey">
                        Already have an account? <Link to="/login">Click here&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link> to sign in.
                    </span>
                </section>
                <div className="has-text-centered">
                    <br />
                    <p>Need help?</p>
                    <p><Link to="xxx@yyyy.com">xxx@yyyy.com</Link></p>
                    <p><a href="tel:+15199142685">(xxx) yyy-zzzz</a></p>
                </div>
            </div>
        </>
    );
}

export default RegisterStep1;
