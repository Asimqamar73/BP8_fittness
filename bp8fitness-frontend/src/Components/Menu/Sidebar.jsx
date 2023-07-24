import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCalendar, faRightFromBracket, faTachometer, faDumbbell, faSignOut, faUserCircle, faUsers, faBuilding, faBarcode, faChalkboardTeacher, faMap, faCircleDollarToSlot, faClock, faCartShopping, faHandSparkles } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';


import { onHamburgerClickedState, currentUserState } from "../../AppState";


export default props => {
    ////
    //// Global State
    ////
    const [onHamburgerClicked, setOnHamburgerClicked] = useRecoilState(onHamburgerClickedState);
    const [currentUser] = useRecoilState(currentUserState);

    ////
    //// Local State
    ////

    const [showLogoutWarning, setShowLogoutWarning] = useState(false);

    ////
    //// Events
    ////

    // Do nothing.

    ////
    //// Rendering.
    ////

    //-------------//
    // CASE 1 OF 3 //
    //-------------//

    // Get the current location and if we are at specific URL paths then we
    // will not render this component.
    const ignorePathsArr = [
        "/",
        "/register",
        "/register-step-1",
        "/register-step-2",
        "/register-successful",
        "/index",
        "/login",
        "/logout",
        "/verify",
        "/forgot-password",
        "/password-reset",
    ];
    const location = useLocation();
    var arrayLength = ignorePathsArr.length;
    for (var i = 0; i < arrayLength; i++) {
        // console.log(location.pathname, "===", ignorePathsArr[i], " EQUALS ", location.pathname === ignorePathsArr[i]); // For debugging purposes only.
        if (location.pathname === ignorePathsArr[i]) {
            return (null);
        }
    }

    //-------------//
    // CASE 2 OF 3 //
    //-------------//

    if (currentUser === null) {
        console.log("No current user detected, hiding siedbard menu.");
        return (null);
    }


    //-------------//
    // CASE 2 OF 3 //
    //-------------//

    return (
        <>
            <div class={`modal ${showLogoutWarning ? 'is-active' : ''}`}>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Are you sure?</p>
                        <button class="delete" aria-label="close" onClick={(e)=>setShowLogoutWarning(false)}></button>
                    </header>
                    <section class="modal-card-body">
                        You are about to log out of the system and you'll need to log in again next time. Are you sure you want to continue?
                    </section>
                    <footer class="modal-card-foot">
                        <Link class="button is-success" to={`/logout`}>Yes</Link>
                        <button class="button" onClick={(e)=>setShowLogoutWarning(false)}>No</button>
                    </footer>
                </div>
            </div>
            {/*
                ---------------------
                ADMINISTRATOR (ROOT)
                ---------------------
            */}
            {currentUser.role === 1 &&
                <>
                    <p>Not implemeneted yet</p>
                </>
            }

            {/*
                ---------------------
                ADMINISTRATOR (STAFF)
                ---------------------
            */}
            {(currentUser.role === 2 || currentUser.role === 3) &&
                <div className={`column is-one-fifth has-background-black ${onHamburgerClicked ? '' : 'is-hidden'}`}>

                    <aside class="menu p-4">
                        <p class="menu-label has-text-grey-light">
                            Staff
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href="/admin/dashboard" class={`has-text-grey-light ${location.pathname.includes("dashboard") && !location.pathname.includes("trainer")&& "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="/admin/classes" class={`has-text-grey-light ${location.pathname.includes("classes") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faDumbbell} />&nbsp;Classes
                                </a>
                            </li>
                            <li>
                                <a href="/admin/all/calendar" class={`has-text-grey-light ${location.pathname.includes("all/calendar") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faCalendar} />&nbsp;Calendar
                                </a>
                            </li>
                            <li>
                                <a href="/admin/trainers" class={`has-text-grey-light ${location.pathname.includes("trainer") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faChalkboardTeacher} />&nbsp;Trainers
                                </a>
                            </li>
                            <li>
                                <a href="/admin/members" class={`has-text-grey-light ${location.pathname.includes("member") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Members
                                </a>
                            </li>

                        </ul>

                        <p class="menu-label has-text-grey-light">
                            System
                        </p>
                        <ul class="menu-list">
                            {currentUser.role === 2 &&
                                <li>
                                    <a href={`/admin/organization`} class={`has-text-grey-light ${location.pathname.includes("organization") && "is-active"}`}>
                                        <FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organization
                                    </a>
                                </li>
                            }
                            {currentUser.role === 2 &&
                                <li>
                                    <a href="/admin/branches" class={`has-text-grey-light ${location.pathname.includes("branch")
                                    && !location.pathname.includes("program")
                                    && !location.pathname.includes("trainer")
                                    && !location.pathname.includes("member")
                                    && "is-active"}`}>
                                        <FontAwesomeIcon className="fas" icon={faMap} />&nbsp;Branch
                                    </a>
                                </li>
                            }
                            <li>
                                <a href="/admin/wp-types" class={`has-text-grey-light ${location.pathname.includes("wp-type") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faHandSparkles} />&nbsp;Class Types
                                </a>
                            </li>
                            {currentUser.role === 2 &&
                                <li>
                                    <a href="/todo" class={`has-text-grey-light ${location.pathname.includes("registry") && "is-active"}`}>
                                        <FontAwesomeIcon className="fas" icon={faCircleDollarToSlot} />&nbsp;<s>Financials</s>
                                    </a>
                                </li>
                            }

                        </ul>

                        <p class="menu-label has-text-grey-light">
                            Account
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href={`/account`} class={`has-text-grey-light ${location.pathname.includes("account") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account
                                </a>
                            </li>

                            <li>
                                <a onClick={(e)=>setShowLogoutWarning(true)} class={`has-text-grey-light ${location.pathname.includes("logout") && "is-active"}`} >
                                    <FontAwesomeIcon className="fas" icon={faSignOut} />&nbsp;Sign Off
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
            }
            {/*
                ---------------------
                MEMBER (REGULAR USERS)
                ---------------------
            */}
            {currentUser.role === 4 &&
                <div className={`column is-one-fifth has-background-black ${onHamburgerClicked ? '' : 'is-hidden'}`}>

                    <aside class="menu p-4">
                        <p class="menu-label has-text-grey-light">
                            Staff
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href="/dashboard" class={`has-text-grey-light ${location.pathname.includes("dashboard") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="/programs" class={`has-text-grey-light ${location.pathname.includes("program") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faDumbbell} />&nbsp;Classes
                                </a>
                            </li>
                            <li>
                                <a href="/purchase-history" class={`has-text-grey-light ${location.pathname.includes("purchase-history") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faCartShopping} />&nbsp;Purchase History
                                </a>
                            </li>
                            <li>
                                <a href="/visit-history" class={`has-text-grey-light ${location.pathname.includes("visit-history") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faClock} />&nbsp;Visit History
                                </a>
                            </li>
                            <li>
                                <a href="/classes-and-events" class={`has-text-grey-light ${location.pathname.includes("classes-and-events") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faCalendar} />&nbsp;Classes &amp; Events
                                </a>
                            </li>

                        </ul>
                        <p class="menu-label has-text-grey-light">
                            Account
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href={`/account`} class={`has-text-grey-light ${location.pathname.includes("account") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account
                                </a>
                            </li>

                            <li>
                                <a onClick={(e)=>setShowLogoutWarning(true)} class={`has-text-grey-light ${location.pathname.includes("logout") && "is-active"}`} >
                                    <FontAwesomeIcon className="fas" icon={faSignOut} />&nbsp;Sign Off
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
            }
        </>
    );
}
