import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faBarcode, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import FormErrorBox from "../Reusable/FormErrorBox";
import { getVersionAPI } from "../../API/gateway";


function Index() {
    // For debugging purposes only.
    console.log("REACT_APP_WWW_PROTOCOL:", process.env.REACT_APP_WWW_PROTOCOL);
    console.log("REACT_APP_WWW_DOMAIN:", process.env.REACT_APP_WWW_DOMAIN);
    console.log("REACT_APP_API_PROTOCOL:", process.env.REACT_APP_API_PROTOCOL);
    console.log("REACT_APP_API_DOMAIN:", process.env.REACT_APP_API_DOMAIN);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [validation, setValidation] = useState({
        "cpsn": false,
    });
    const [version, setVersion] = useState("");
    const [cpsn, setCpsn] = useState("");
    const [forceURL, setForceURL] = useState("");

    ////
    //// API.
    ////

    function onVersionSuccess(response){
        console.log("onVersionSuccess: Starting...");
        setVersion(response);
    }

    function onVersionError(apiErr) {
        console.log("onVersionError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onVersionDone() {
        console.log("onVersionDone: Starting...");
    }

    ////
    //// Event handling.
    ////

    function onButtonClick(e) {
        var newErrors = {};
        var newValidation = {};
        if (cpsn === undefined || cpsn === null || cpsn === "") {
            newErrors["cpsn"] = "value is missing";
        } else {
            newValidation["cpsn"] = true
        }

        /// Save to state.
        setErrors(newErrors);
        setValidation(newValidation);

        if (Object.keys(newErrors).length > 0) {
            //
            // Handle errors.
            //

            console.log("failed validation");

            // window.scrollTo(0, 0);  // Start the page at the top of the page.

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop()
        } else {
            //
            // Submit to server.
            //

            console.log("successful validation, submitting to API server.");
            setForceURL("cpsn?v="+cpsn)

        }
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            getVersionAPI(
                onVersionSuccess,
                onVersionError,
                onVersionDone
            );
        }

        return () => mounted = false;
    }, []);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    return (
        <>
            <div class="container column is-12">
                <div class="section">

                    <section class="hero is-fullheight">
                        <div class="hero-body">
                            <div class="container">
                                <div class="columns is-centered">
                                    <div class="column is-half-tablet">
                                        <div class="box is-rounded">
                                            {/* Start Logo */}
                                            <nav class="level">
                                                <div class="level-item has-text-centered">
                                                    <figure class='image'>
                                                        <img src='/static/logo.jpeg' style={{width:"256px"}} />
                                                    </figure>
                                                </div>
                                            </nav>
                                            {/* End Logo */}
                                            <form>
                                                <h1 className="title is-4 has-text-centered">Welcome</h1>


                                                <Link class="button is-medium is-block is-fullwidth is-primary" type="button" to="/login">
                                                    Login <FontAwesomeIcon icon={faArrowRight} />
                                                </Link>
                                                <br />
                                                <Link class="button is-medium is-block is-fullwidth is-info" type="button" to="/register-step-1">
                                                    Register <FontAwesomeIcon icon={faArrowRight} />
                                                </Link>


                                            </form>

                                        </div>
                                        {/* End box */}

                                        <div className="has-text-centered">
                                            <p>Need help?</p>
                                            <p><Link to="xxx@yyyy.com">xxx@yyyy.com</Link></p>
                                            <p><a href="tel:+15199142685">(xxx) yyy-zzzz</a></p>
                                            <p>(App version: {version})</p>
                                        </div>
                                        {/* End suppoert text. */}

                                    </div>
                                    {/* End Column */}
                                </div>
                            </div>
                            {/* End container */}
                        </div>
                        {/* End hero-body */}
                    </section>

                </div>
            </div>
        </>
      );
}

export default Index;
