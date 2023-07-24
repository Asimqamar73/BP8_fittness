import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faGauge, faArrowRight, faUsers, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import Scroll from 'react-scroll';

import { postCreateStripeSubscriptionCheckoutSessionAPI } from "../../../API/PaymentProcessor";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";


function PaymentProcessorBeginSubscription() {
    ////
    ////  For debugging purposes only.
    ////

    console.log("REACT_APP_WWW_PROTOCOL:", process.env.REACT_APP_WWW_PROTOCOL);
    console.log("REACT_APP_WWW_DOMAIN:", process.env.REACT_APP_WWW_DOMAIN);
    console.log("REACT_APP_API_PROTOCOL:", process.env.REACT_APP_API_PROTOCOL);
    console.log("REACT_APP_API_DOMAIN:", process.env.REACT_APP_API_DOMAIN);

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
    //// API.
    ////

    function onSuccess(response){
        console.log("onSuccess: Starting...");
        console.log("onSuccess: Redirecting at", response.checkoutUrl);

        // Force the user's browser to a different domain address.
        window.location.href = response.checkoutUrl;
    }

    function onError(apiErr) {
        console.log("onError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onDone() {
        console.log("onDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const onClick = (priceID) => {
        // action={`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}/api/v1/stripe/create-subscription-checkout-session`}
        setFetching(true);
        postCreateStripeSubscriptionCheckoutSessionAPI(
            priceID,
            onSuccess,
            onError,
            onDone
        );
    }

    ////
    //// Misc.
    ////

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
      return <Navigate to={forceURL} />;
    }

    return (
        <>
            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class="is-active"><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-4"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Pick a Subscription</h1>
                            </div>
                        </div>

                        <form>
                            <input type="hidden" id="priceId" name="priceId" value={process.env.REACT_APP_WWW_STRIPE_MONTHLY_MEMBERSHIP_PRICE_ID} />
                            <div class="name">Monthly</div>
                            <div class="price">5</div>
                            <div class="duration">per month</div>
                            <button id="pro-plan-btn" type="button" onClick={(e)=>onClick(process.env.REACT_APP_WWW_STRIPE_MONTHLY_MEMBERSHIP_PRICE_ID)}>Select</button>
                        </form>

                        <br />
                        <br />


                        <form>
                            <input type="hidden" id="priceId" name="priceId" value={process.env.REACT_APP_WWW_STRIPE_ANNUAL_MEMBERSHIP_PRICE_ID} />
                            <div class="name">Annual</div>
                            <div class="price">60</div>
                            <div class="duration">per year</div>
                            <button id="pro-plan-btn" type="button" onClick={(e)=>onClick(process.env.REACT_APP_WWW_STRIPE_ANNUAL_MEMBERSHIP_PRICE_ID)}>>Select</button>
                        </form>

                        <br />
                        <br />


                    </nav>
                </section>
            </div>
        </>
    );
}

export default PaymentProcessorBeginSubscription;
