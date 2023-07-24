import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faGauge, faArrowRight, faUsers, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { topAlertMessageState, topAlertStatusState, stripePromiseState } from "../../../AppState";


function PaymentProcessorSubscriptionCanceled() {
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
    const [stripePromise] = useRecoilState(stripePromiseState);

    ////
    //// Component states.
    ////

    const stripe = useStripe();
    const elements = useElements();
    // const cardElement = elements.getElement(CardElement);



    ////
    //// API.
    ////

    ////
    //// Event handling.
    ////

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

            // const confirm = stripe.confirmCardSetup(clientSecret, {
            //     payment_method:
            //     { card:
            //         cardElement
            //     },
            // });
            // cardElement.clear(); // check confirm.error before clearing
        }

        return () => { mounted = false; }
    }, []);


    ////
    //// Component rendering.
    ////

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
                                <h1 class="title is-4"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Subscription</h1>
                            </div>
                        </div>

                        <h1>CANCELLED!</h1>

                        <form action={`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}/api/v1/public/create-single-subscription-checkout-session`} method="POST">
                            <input type="hidden" id="priceId" name="priceId" value={process.env.REACT_APP_WWW_STRIPE_MONTHLY_MEMBERSHIP_PRICE_ID} />
                            <div class="name">Monthly</div>
                            <div class="price">5</div>
                            <div class="duration">per month</div>
                            <button id="pro-plan-btn" type="submit">Select</button>
                        </form>

                        <form action={`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}/api/v1/public/create-single-subscription-checkout-session`} method="POST">
                            <input type="hidden" id="priceId" name="priceId" value={process.env.REACT_APP_WWW_STRIPE_ANNUAL_MEMBERSHIP_PRICE_ID} />
                            <div class="name">Annual</div>
                            <div class="price">60</div>
                            <div class="duration">per year</div>
                            <button id="pro-plan-btn" type="submit">Select</button>
                        </form>

                        <br />
                        <br />


                    </nav>
                </section>
            </div>
        </>
    );
}

export default PaymentProcessorSubscriptionCanceled;
