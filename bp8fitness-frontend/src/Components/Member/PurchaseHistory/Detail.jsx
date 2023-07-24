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
import { getMemberDetailAPI } from "../../../API/member";
import FormErrorBox from "../../Reusable/FormErrorBox";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";
import fakeServer from "../../../Helpers/fakeServer";

const PurchaseHistoryDetail = () => {
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
  const onPurchaseHistoryDetailSuccess = (response) => {
    console.log("onPurchaseHistoryDetailSuccess: Starting...");
    setDatum(response);
  }

  const onPurchaseHistoryDetailError = (apiErr) => {
    console.log("onPurchaseHistoryDetailError: Starting...");
    setErrors(apiErr);

    // The following code will cause the screen to scroll to the top of
    // the page. Please see ``react-scroll`` for more information:
    // https://github.com/fisshy/react-scroll
    // ...
  }

  const onPurchaseHistoryDetailDone = () => {
    console.log("onPurchaseHistoryDetailDone: Starting...");
    setFetching(false);
  }

  ////
  //// API.
  ////
  const fetchPurchaseHistoryData = async () => {
    // Build the API URL with the query parameters
    let apiUrl = `/purchase-history/${id}`;
    try {
      const response = await fakeServer.getRequest(apiUrl, "GET"); // Replace fakeServer with your actual API module or API call function
      onPurchaseHistoryDetailSuccess(response);
    } catch (error) {
      console.error(error);
      onPurchaseHistoryDetailError(error);
    } finally {
      onPurchaseHistoryDetailDone();
    }
  };

  ////
  //// Misc.
  ////
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchPurchaseHistoryData();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

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
                <Link to="/purchase-history" aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faClock} />
                  &nbsp;Purchase History
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
                  <div class="container has-background-light" key={datum.id}>
                    <div className="columns is-centered">
                      <div className="column is-8">
                        <div className="box has-background-white-bis p-6">
                          <h1 className="title has-text-centered mb-4">
                            Invoice Number: {datum.invoiceNumber}
                          </h1>
                          <hr className="has-background-primary" />
                          <div className="columns is-variable is-5 mt-6">
                            <div className="column is-half">
                              <div className="field">
                                <label className="label has-text-weight-semibold">
                                  Amount Paid:
                                </label>
                                <div className="control">
                                  <input
                                    className="input is-static"
                                    type="text"
                                    value={`${datum.amountPaid}`}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="field">
                                <label className="label has-text-weight-semibold">
                                  Payment Date:
                                </label>
                                <div className="control">
                                  <input
                                    className="input is-static"
                                    type="text"
                                    value={datum.paymentDate}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="field">
                                <label className="label has-text-weight-semibold">
                                  Color:
                                </label>
                                <div className="control">
                                  <input
                                    className="input is-static"
                                    type="text"
                                    value={`${datum.color}`}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="field">
                                <label className="label has-text-weight-semibold">
                                  Size:
                                </label>
                                <div className="control">
                                  <input
                                    className="input is-static"
                                    type="text"
                                    value={`${datum.size}`}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="field">
                                <label className="label has-text-weight-semibold">
                                  Payment Method:
                                </label>
                                <div className="control">
                                  <input
                                    className="input is-static"
                                    type="text"
                                    value={datum.paymentMethod}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="column is-half">
                              <div className="field">
                                <label className="label has-text-weight-semibold">
                                  Actual Price:
                                </label>
                                <div className="control">
                                  <input
                                    className="input is-static"
                                    type="text"
                                    value={`${datum.price}`}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="field">
                                <label className="label has-text-weight-semibold">
                                  Quantity:
                                </label>
                                <div className="control">
                                  <input
                                    className="input is-static"
                                    type="text"
                                    value={datum.quantity}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="field">
                                <label className="label has-text-weight-semibold">
                                  Tax Amount:
                                </label>
                                <div className="control">
                                  <input
                                    className="input is-static"
                                    type="text"
                                    value={`${datum.tax}`}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="field">
                                <label className="label has-text-weight-semibold">
                                  Status:
                                </label>
                                <div className="control">
                                  <span className="tag is-success is-rounded">
                                    {datum.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="field mt-5">
                            <label className="label has-text-weight-semibold">
                              Description:
                            </label>
                            <div className="control">
                              <textarea
                                className="textarea is-static"
                                value={datum.description}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="buttons is-centered mt-6">
                          <Link
                              to={`/purchase-history`}
                              className="card-footer-item button is-link"
                              type="button"
                            >
                              <span className="icon">
                                <FontAwesomeIcon icon={faArrowLeft} />
                              </span>
                              <span>Back to History</span>
                            </Link>
                            <Link
                              onClick={() =>
                                alert(
                                  "Apologies for the inconvenience. This feature has not been implemented at the moment. Please check back later!"
                                )
                              }
                              className="card-footer-item button is-primary"
                              type="button"
                            >
                              <span className="icon">
                                <FontAwesomeIcon icon={faPrint} />
                              </span>
                              <span>Print Receipt</span>
                            </Link>
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

export default PurchaseHistoryDetail;
