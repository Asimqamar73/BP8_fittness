import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faArrowLeft,
  faGauge,
  faClock,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";

import useLocalStorage from "../../../Hooks/useLocalStorage";
import { getWorkoutSessionBookingDetailAPI } from "../../../API/WorkoutSessionBooking";
import FormErrorBox from "../../Reusable/FormErrorBox";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";
import fakeServer from "../../../Helpers/fakeServer";
import { STATUS_OPTIONS } from "../../../Constants/FieldOptions";

const VisitHistoryDetail = () => {

  ////
  //// URL Parameters.
  ////
  const { id } = useParams();

  ////
  //// Global state.
  ////
  const [topAlertMessage, setTopAlertMessage] =
    useRecoilState(topAlertMessageState);
  const [topAlertStatus, setTopAlertStatus] =
    useRecoilState(topAlertStatusState);

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
  
  ////
  //// API.
  ////
  const onVisitHistoryDetailSuccess = (response) => {
    console.log("onVisitHistoryDetailSuccess: Starting...");
    setDatum(response);
  }

  const onVisitHistoryDetailError = (apiErr) => {
    console.log("onVisitHistoryDetailError: Starting...");
    setErrors(apiErr);

    // The following code will cause the screen to scroll to the top of
    // the page. Please see ``react-scroll`` for more information:
    // https://github.com/fisshy/react-scroll
    // ...
  }

  const onVisitHistoryDetailDone = () => {
    console.log("onVisitHistoryDetailDone: Starting...");
    setFetching(false);
  }

  ////
  //// Misc.
  ////
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getWorkoutSessionBookingDetailAPI(
        id,
        onVisitHistoryDetailSuccess,
        onVisitHistoryDetailError,
        onVisitHistoryDetailDone
    );
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  const renderStatus = (statusValue) => {
    
    const statusOption = STATUS_OPTIONS.find((option) => option.value === statusValue);
    return statusOption ? statusOption.label : "Unknown";
  };

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
              <li class="">
                <Link to="/dashboard" aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faGauge} />
                  &nbsp;Dashboard
                </Link>
              </li>
              <li class="">
                <Link to="/visit-history" aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faClock} />
                  &nbsp;Visit History
                </Link>
              </li>
              <li class="is-active">
                <Link aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faEye} />
                  &nbsp;Detail
                </Link>
              </li>
            </ul>
          </nav>
          <nav class="box">
            {datum && (
              <div class="columns">
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
              </div>
            )}
            <FormErrorBox errors={errors} />

            {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}
            {isFetching ? (
              <PageLoadingContent displayMessage={"Please wait..."} />
            ) : (
              <>
                {datum && (
                  <div className="container mt-4">
                  <div className="columns is-centered">
                    <div className="column is-8">
                      <div className="box">
                        <h1 className="title has-text-centered">Visit History Details</h1>
                        <hr className="has-background-primary" />
                        <div className="columns is-variable is-5 mt-6">
                          <div className="column is-half">
                            <div className="field">
                              <label className="label">Name</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.memberName}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Email</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.memberEmail}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Phone</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.memberPhone}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Address</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.memberAddressLine1}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">City</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.memberCity}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Region</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.memberRegion}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Country</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.memberCountry}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Postal Code</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.memberPostalCode}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Organization Name</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.organizationName}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          <div className="column is-half">
                            <div className="field">
                              <label className="label">Branch Name</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.branchName}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Duration</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={`${datum.durationInMinutes} minutes`}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Start At</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.startAt}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">End At</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.endAt}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Trainer Name</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.trainerName}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Class</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.workoutProgramName}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Class Type</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.workoutProgramTypeName}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Created At</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={datum.createdAt}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Status</label>
                              <div className="control">
                                <input
                                  className="input is-static"
                                  type="text"
                                  value={renderStatus(datum.status)}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="buttons is-centered mt-6">
                          <button
                            className="button is-link is-rounded"
                            onClick={() => window.history.back()}
                          >
                            <span className="icon">
                              <i className="fas fa-arrow-left"></i>
                            </span>
                            <span>Back to History</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </>
            )}
          </nav>
        </section>
      </div>
    </>
  );
}

export default VisitHistoryDetail;
