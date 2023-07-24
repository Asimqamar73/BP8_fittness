import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faGauge,
  faArrowRight,
  faUsers,
  faBarcode,
  faDumbbell,
  faCalendar,
  // faGauge,
  faSearch,
  faEye,
  faPencil,
  faTrashCan,
  faPlus,
  // faArrowRight,
  faTable,
  faArrowUpRightFromSquare,
  faFilter,
  faRefresh,
  faCalendarCheck,
  // faUsers
} from "@fortawesome/free-solid-svg-icons";
import footerLogo from "../../assets/img/foot-logo.jpg";
import logo from "../../assets/img/logo.jpeg";
import fbIcon from "../../assets/img/facebookloginbutton.png";
import fbLogo from "../../assets/img/facebooklogo.png";
// import { classesData } from "../../Constants/ClassesData";
import { getScheduleAPI } from "../../API/Schedule";
import { PAGE_SIZE_OPTIONS } from "../../Constants/FieldOptions";
import PageLoadingContent from "../Reusable/PageLoadingContent";
import FormErrorBox from "../Reusable/FormErrorBox";

import "./style/custom.css";

import { useRecoilState } from "recoil";

import { topAlertMessageState, topAlertStatusState } from "../../AppState";
import FormInputFieldWithButton from "../Reusable/FormInputFieldWithButton";
import FormSelectFieldForBranch from "../Reusable/FormSelectFieldForBranch";
import FormSelectFieldForWorkoutProgram from "../Reusable/FormSelectFieldForWorkoutProgram";
import FormSelectFieldForTrainer from "../Reusable/FormSelectFieldForTrainer";
import FormDateField from "../Reusable/FormDateField";

function MemberDashboard() {
  ////
  //// Global state.
  ////

  const [errors, setErrors] = useState({});
  const [listData, setListData] = useState("");
  const [
    selectedWorkoutSessionForDeletion,
    setSelectedWorkoutSessionForDeletion,
  ] = useState("");
  const [isFetching, setFetching] = useState(false);
  const [pageSize, setPageSize] = useState(10); // Pagination
  const [previousCursors, setPreviousCursors] = useState([]); // Pagination
  const [nextCursor, setNextCursor] = useState(""); // Pagination
  const [currentCursor, setCurrentCursor] = useState(""); // Pagination
  const [showFilter, setShowFilter] = useState(false); // Filtering + Searching
  const [sortField, setSortField] = useState("created"); // Sorting
  const [temporarySearchText, setTemporarySearchText] = useState(""); // Searching - The search field value as your writes their query.
  const [actualSearchText, setActualSearchText] = useState(""); // Searching - The actual search query value to submit to the API.
  const [branchID, setBranchID] = useState(""); // Filtering
  const [workoutProgramID, setWorkoutProgramID] = useState(""); // Filtering
  const [trainerID, setTrainerID] = useState(""); // Filtering
  const [startAt, setStartAt] = useState(null); // Filtering

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      window.scrollTo(0, 0); // Start the page at the top of the page.
    }

    return () => {
      mounted = false;
    };
  }, []);

  const [content, setContent] = useState("classes");

  const fetchList = (cur, limit, keywords, org_id, wp, t, sdt) => {
    console.log("Fetch list");
    setFetching(true);
    setErrors({});

    let params = new Map();
    params.set("page_size", limit);
    params.set("sort_field", "created"); // Sort

    if (cur !== "") {
      params.set("cursor", cur);
    }

    if (keywords !== undefined && keywords !== null && keywords !== "") {
      params.set("search", keywords);
    }
    if (org_id !== undefined && org_id !== null && org_id !== "") {
      params.set("organization_id", org_id);
    }
    if (wp !== undefined && wp !== null && wp !== "") {
      params.set("workout_program_id", wp);
    }
    if (t !== undefined && t !== null && t !== "") {
      params.set("trainer_id", t);
    }
    if (sdt !== undefined && sdt !== null && sdt !== "") {
      const startAtStr = sdt.getTime();
      params.set("start_at", startAtStr);
    }

    getScheduleAPI(
      params,
      onWorkoutSessionListSuccess,
      onWorkoutSessionListError,
      onWorkoutSessionListDone
    );
  };

  const onNextClicked = (e) => {
    console.log("onNextClicked");
    let arr = [...previousCursors];
    arr.push(currentCursor);
    setPreviousCursors(arr);
    setCurrentCursor(nextCursor);
  };

  const onPreviousClicked = (e) => {
    console.log("onPreviousClicked");
    let arr = [...previousCursors];
    const previousCursor = arr.pop();
    setPreviousCursors(arr);
    setCurrentCursor(previousCursor);
  };
  const onSearchButtonClick = (e) => {
    console.log("Search button clicked...");
    setActualSearchText(temporarySearchText);
  };
  const onWorkoutSessionListSuccess = (response) => {
    console.log("onWorkoutSessionListSuccess: Starting...");
    if (response.results !== null) {
      setListData(response);
      if (response.hasNextPage) {
        setNextCursor(response.nextCursor); // For pagination purposes.
      }
    }
  };
  const onWorkoutSessionListError = (apiErr) => {
    console.log("onWorkoutSessionListError: Starting...");
    setErrors(apiErr);

    // The following code will cause the screen to scroll to the top of
    // the page. Please see ``react-scroll`` for more information:
    // https://github.com/fisshy/react-scroll
    var scroll = Scroll.animateScroll;
    scroll.scrollToTop();
  };

  const onWorkoutSessionListDone = () => {
    console.log("onWorkoutSessionListDone: Starting...");
    setFetching(false);
  };
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      window.scrollTo(0, 0); // Start the page at the top of the page.
      fetchList(
        currentCursor,
        pageSize,
        actualSearchText,
        "648763d3f6fbead15f5bd4d2",
        workoutProgramID,
        trainerID,
        startAt
      );
    }

    return () => {
      mounted = false;
    };
  }, [
    currentCursor,
    pageSize,
    actualSearchText,
    "648763d3f6fbead15f5bd4d2",
    workoutProgramID,
    trainerID,
    startAt,
  ]);

  return (
    <div class="container">
      <section class="section">
        {/* <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li class="is-active">
                <Link to="/dashboard" aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faGauge} />
                  &nbsp;Dashboard
                </Link>
              </li>
            </ul>
          </nav> */}
        {/* <nav class="box">
            <div class="columns">
              <div class="column">
                <h1 class="title is-4">
                  <FontAwesomeIcon className="fas" icon={faGauge} />
                  &nbsp;Dashboard
                </h1>
              </div>
            </div>
          </nav> */}
        <section class="secction-head-fix ">
          <div class="container">
            <div class="is-flex-tablet">
              <div class="column">
                <Link
                  class="navbar-item has-text-centered-mobile p-0"
                  href="index.html"
                >
                  <img
                    style={{ width: "120px", maxHeight: "120px" }}
                    src={logo}
                    alt="Logo"
                  />
                </Link>
              </div>
              <div class="column is-flex-tablet is-align-items-center is-justify-content-end">
                <ul class="is-flex is-align-items-center is-justify-content-flex-end">
                  <li>
                    <Link class="is-size-6 ml-2" to="/login">
                      Sign-in
                    </Link>{" "}
                    |
                  </li>
                  <li>
                    <Link class="is-size-6 ml-2" to="/register">
                      Create account
                    </Link>
                  </li>
                  {/* <li>
                    <button class="button is-small mx-2">Sign In</button>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          {/* <div class="mt-4">
            <div class="container">
              <div class="tabs is-right is-boxed tabs__nav">
                <ul id="tabs-nav">
                  <li
                    class={content === "classes" && "is-active"}
                    data-target="classes_tab_content"
                    onClick={() => setContent("classes")}
                  >
                    <a>
                      <span class="is-size-7-mobile">CLASSES</span>
                    </a>
                  </li>
                  <li
                    class={content === "info" && "is-active"}
                    data-target="my_info_tab_content"
                    onClick={() => setContent("info")}
                  >
                    <a>
                      <span class="is-size-7-mobile">MY INFO</span>
                    </a>
                  </li>
                  <li
                    class={content === "store" && "is-active"}
                    data-target="online_store_tab_content"
                    onClick={() => setContent("store")}
                  >
                    <a>
                      <span class="is-size-7-mobile">ONLINE STORE</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
          <div class="has-background-light pt-1-mobile pt-6-desktop pb-6 box is-hidden-mobile"></div>
        </section>
        <section class="sections-tabs-content">
          <div class="container">
            <div class="has-background-white box pb-6" id="tab-content">
              {/* {renderContent(content)} */}
              <div id="classes_tab_content" class="is-active">
                <div class="fix-head">
                  <div class="columns is-flex-desktop is-justify-content-end">
                  </div>
                  <div class="columns">
                    <div class="column">
                      <h3 class="is-size-5 has-text-weight-semibold">
                        Schedule
                      </h3>
                    </div>
               
                    <div class="columns is-mobile">
                      <div class="column has-text-right">
                        <button
                          onClick={() =>
                            fetchList(
                              currentCursor,
                              pageSize,
                              actualSearchText,
                              branchID,
                              workoutProgramID,
                              trainerID,
                              startAt
                            )
                          }
                          class="button is-small is-info"
                          type="button"
                        >
                          <FontAwesomeIcon className="mdi" icon={faRefresh} />
                        </button>
                        &nbsp;
                        <button
                          onClick={(e) => setShowFilter(!showFilter)}
                          class="button is-small is-success"
                          type="button"
                        >
                          <FontAwesomeIcon className="mdi" icon={faFilter} />
                          &nbsp;Filter
                        </button>
                        {/*
                                &nbsp;
                                <Link to={`/admin/workouts/sessions/add`} class="button is-small is-primary" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New Schedule
                                </Link>
                                */}
                      </div>
                    </div>
                  </div>
                </div>

                {showFilter && (
                  <div
                    class="columns has-background-white-bis"
                    style={{ borderRadius: "15px", padding: "20px" }}
                  >
                    <div class="column">
                      <FormInputFieldWithButton
                        label={"Search"}
                        name="temporarySearchText"
                        type="text"
                        placeholder="Search by name"
                        value={temporarySearchText}
                        helpText=""
                        onChange={(e) => setTemporarySearchText(e.target.value)}
                        isRequired={true}
                        maxWidth="100%"
                        buttonLabel={
                          <>
                            <FontAwesomeIcon className="fas" icon={faSearch} />
                          </>
                        }
                        onButtonClick={onSearchButtonClick}
                      />
                    </div>
                    <div class="column">
                      <FormSelectFieldForBranch
                        // organizationID={currentUser.organizationID}
                        branchID={branchID}
                        setBranchID={setBranchID}
                        errorText={errors && errors.branchId}
                        helpText=""
                      />
                    </div>
                    <div class="column">
                      <FormSelectFieldForWorkoutProgram
                        branchID={branchID}
                        workoutProgramID={workoutProgramID}
                        setWorkoutProgramID={setWorkoutProgramID}
                        errorText={errors && errors.workoutProgramId}
                        disabled={branchID === ""}
                      />
                    </div>
                    <div class="column">
                      <FormSelectFieldForTrainer
                        branchID={branchID}
                        trainerID={trainerID}
                        setTrainerID={setTrainerID}
                        errorText={errors && errors.trainerId}
                        disabled={branchID === ""}
                      />
                    </div>
                    <div class="column">
                      <FormDateField
                        label="Start At"
                        name="startAt"
                        placeholder="Text input"
                        value={startAt}
                        errorText={errors && errors.startAt}
                        helpText=""
                        onChange={(date) => setStartAt(date)}
                        isRequired={true}
                        maxWidth="120px"
                      />
                    </div>
                  </div>
                )}
                {isFetching ? (
                  <>
                    <PageLoadingContent displayMessage={"Please wait..."} />
                  </>
                ) : (
                  <>
                    <FormErrorBox errors={errors} />
                    {listData &&
                    listData.results &&
                    (listData.results.length > 0 ||
                      previousCursors.length > 0) ? (
                      <>
                        <div class="container">
                          <div class="b-table">
                            <div class="table-wrapper has-mobile-cards">
                              <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Branch</th>
                                    <th>Class</th>
                                    <th>Trainer</th>
                                    <th>Start At</th>
                                    <th>Duration</th>
                                    <th>Bookings</th>
                                    <th>Waitlist</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {listData &&
                                    listData.results &&
                                    listData.results.map(function (datum, i) {
                                      return (
                                        <tr>
                                          <td data-label="Name">
                                            {datum.name}
                                          </td>
                                          <td data-label="Branch">
                                            <Link
                                              to={`/admin/branch/${datum.branchId}`}
                                              target="_blank"
                                              rel="noreferrer"
                                              class=""
                                            >
                                              {datum.branchName}&nbsp;
                                              {/* <FontAwesomeIcon
                                            className="fas"
                                            icon={faArrowUpRightFromSquare}
                                          /> */}
                                            </Link>
                                          </td>
                                          <td data-label="Class">
                                            <Link
                                              to={`/admin/class/${datum.workoutProgramId}`}
                                              target="_blank"
                                              rel="noreferrer"
                                              class=""
                                            >
                                              {datum.workoutProgramName}&nbsp;
                                              {/* <FontAwesomeIcon
                                            className="fas"
                                            icon={faArrowUpRightFromSquare}
                                          /> */}
                                            </Link>
                                          </td>
                                          <td data-label="Trainer">
                                            <Link
                                              to={`/admin/workouts/trainer/${datum.trainerId}`}
                                              target="_blank"
                                              rel="noreferrer"
                                              class=""
                                            >
                                              {datum.trainerName}&nbsp;
                                              {/* <FontAwesomeIcon
                                            className="fas"
                                            icon={faArrowUpRightFromSquare}
                                          /> */}
                                            </Link>
                                          </td>
                                          <td data-label="Start At">
                                            {datum.startAt}
                                          </td>
                                          <td data-label="Duration">
                                            {datum.isOpenEnded ? (
                                              "-"
                                            ) : (
                                              <>
                                                {datum.durationInMinutes} mins
                                              </>
                                            )}
                                          </td>
                                          <td data-label="Bookings">
                                            <Link
                                              to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}/bookings`}
                                              class="is-small is-warning"
                                            >
                                              <FontAwesomeIcon
                                                className="mdi"
                                                icon={faCalendarCheck}
                                              />
                                              &nbsp;{datum.attendeesCount} /{" "}
                                              {datum.attendeesLimit}
                                            </Link>
                                          </td>
                                          <td data-label="Waitlist">
                                            <Link
                                              to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}/waitlisters`}
                                              class="is-small is-warning"
                                            >
                                              <FontAwesomeIcon
                                                className="mdi"
                                                icon={faUsers}
                                              />
                                              &nbsp;{datum.waitlistersCount}
                                            </Link>
                                          </td>
                                          {/* <td class="is-actions-cell">
                                        <div class="buttons is-right">
                                   
                                          <Link
                                            to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}`}
                                            class="button is-small is-primary"
                                            type="button"
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            <FontAwesomeIcon
                                              className="mdi"
                                              icon={faEye}
                                            />
                                            &nbsp;View&nbsp;
                                            <FontAwesomeIcon
                                              className="fas"
                                              icon={faArrowUpRightFromSquare}
                                            />
                                          </Link>
                                          <Link
                                            to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}/update`}
                                            class="button is-small is-warning"
                                            type="button"
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            <FontAwesomeIcon
                                              className="mdi"
                                              icon={faPencil}
                                            />
                                            &nbsp;Edit&nbsp;
                                            <FontAwesomeIcon
                                              className="fas"
                                              icon={faArrowUpRightFromSquare}
                                            />
                                          </Link>
                                          <button
                                            onClick={(e, ses) =>
                                              onSelectWorkoutSessionForDeletion(
                                                e,
                                                datum
                                              )
                                            }
                                            class="button is-small is-danger"
                                            type="button"
                                          >
                                            <FontAwesomeIcon
                                              className="mdi"
                                              icon={faTrashCan}
                                            />
                                            &nbsp;Delete
                                          </button>
                                        </div>
                                      </td> */}
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </table>

                              <div class="columns">
                                <div class="column is-half">
                                  <span class="select">
                                    <select
                                      class={`input has-text-grey-light`}
                                      name="pageSize"
                                      onChange={(e) =>
                                        setPageSize(parseInt(e.target.value))
                                      }
                                    >
                                      {PAGE_SIZE_OPTIONS.map(function (
                                        option,
                                        i
                                      ) {
                                        return (
                                          <option
                                            selected={pageSize === option.value}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </span>
                                </div>
                                <div class="column is-half has-text-right">
                                  {previousCursors.length > 0 && (
                                    <button
                                      class="button"
                                      onClick={onPreviousClicked}
                                    >
                                      Previous
                                    </button>
                                  )}
                                  {listData.hasNextPage && (
                                    <>
                                      <button
                                        class="button"
                                        onClick={onNextClicked}
                                      >
                                        Next
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <section class="hero is-medium has-background-white-ter">
                        <div class="hero-body">
                          <p class="title">
                            <FontAwesomeIcon className="fas" icon={faTable} />
                            &nbsp;No Schedules
                          </p>
                          {/* <p class="subtitle">
                            No class types.{" "}
                            <b>
                              <Link to="/admin/classes/add">
                                Click here&nbsp;
                                <FontAwesomeIcon
                                  className="mdi"
                                  icon={faArrowRight}
                                />
                              </Link>
                            </b>{" "}
                            to get started creating your first class.
                          </p> */}
                        </div>
                      </section>
                    )}
                  </>
                )}
                {/* <div class="container">
                  <div class="b-table">
                    <div class="table-wrapper has-mobile-cards">
                      <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Branch</th>
                            <th>Class</th>
                            <th>Trainer</th>
                            <th>Start At</th>
                            <th>Duration</th>
                            <th>Bookings</th>
                            <th>Waitlist</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {listData &&
                            listData.results &&
                            listData.results.map(function (datum, i) {
                              return (
                                <tr>
                                  <td data-label="Name">{datum.name}</td>
                                  <td data-label="Branch">
                                    <Link
                                      to={`/admin/branch/${datum.branchId}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      class=""
                                    >
                                      {datum.branchName}&nbsp;
                                      <FontAwesomeIcon
                                        className="fas"
                                        icon={faArrowUpRightFromSquare}
                                      />
                                    </Link>
                                  </td>
                                  <td data-label="Class">
                                    <Link
                                      to={`/admin/class/${datum.workoutProgramId}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      class=""
                                    >
                                      {datum.workoutProgramName}&nbsp;
                                      <FontAwesomeIcon
                                        className="fas"
                                        icon={faArrowUpRightFromSquare}
                                      />
                                    </Link>
                                  </td>
                                  <td data-label="Trainer">
                                    <Link
                                      to={`/admin/workouts/trainer/${datum.trainerId}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      class=""
                                    >
                                      {datum.trainerName}&nbsp;
                                      <FontAwesomeIcon
                                        className="fas"
                                        icon={faArrowUpRightFromSquare}
                                      />
                                    </Link>
                                  </td>
                                  <td data-label="Start At">{datum.startAt}</td>
                                  <td data-label="Duration">
                                    {datum.isOpenEnded ? (
                                      "-"
                                    ) : (
                                      <>{datum.durationInMinutes} mins</>
                                    )}
                                  </td>
                                  <td data-label="Bookings">
                                    <Link
                                      to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}/bookings`}
                                      class="is-small is-warning"
                                    >
                                      <FontAwesomeIcon
                                        className="mdi"
                                        icon={faCalendarCheck}
                                      />
                                      &nbsp;{datum.attendeesCount} /{" "}
                                      {datum.attendeesLimit}
                                    </Link>
                                  </td>
                                  <td data-label="Waitlist">
                                    <Link
                                      to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}/waitlisters`}
                                      class="is-small is-warning"
                                    >
                                      <FontAwesomeIcon
                                        className="mdi"
                                        icon={faUsers}
                                      />
                                      &nbsp;{datum.waitlistersCount}
                                    </Link>
                                  </td>
                                  <td class="is-actions-cell">
                                    <div class="buttons is-right">
                            
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>

                      <div class="columns">
                        <div class="column is-half">
                          <span class="select">
                            <select
                              class={`input has-text-grey-light`}
                              name="pageSize"
                              onChange={(e) =>
                                setPageSize(parseInt(e.target.value))
                              }
                            >
                              {PAGE_SIZE_OPTIONS.map(function (option, i) {
                                return (
                                  <option
                                    selected={pageSize === option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                );
                              })}
                            </select>
                          </span>
                        </div>
                        <div class="column is-half has-text-right">
                          {previousCursors.length > 0 && (
                            <button class="button" onClick={onPreviousClicked}>
                              Previous
                            </button>
                          )}
                          {listData.hasNextPage && (
                            <>
                              <button class="button" onClick={onNextClicked}>
                                Next
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        <footer class="footer-main px-5 py-4">
          {/* <!--is-flex is-justify-content-space-between--> */}
          <div class="footer-main">
            <div class="container">
              <div class="columns is-flex-wrap-wrap">
                <div class="column is-half-desktop">
                  <div class="copy-right">
                    <p class="is-size-7">
                      2023-07-05 7:45:27 PM in Ontario <br />
                      <a href="#"> Privacy Policy</a> ©2023 MINDBODY Inc.
                    </p>
                  </div>
                </div>
                <div class="column is-half-desktop">
                  <div class="is-flex-desktop is-justify-content-end">
                    <div class="">
                      <p class="is-size-7 mr-5">
                        F45 Training Riverbend-Byron - Site ID: 949067 <br />
                        1886 Oxford Street West Unit 103, London ON N6K 0J8
                      </p>
                    </div>
                    <div style={{ maxWidth: "210px" }} class="mt-4">
                      <a href="">
                        {" "}
                        <img src={footerLogo} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

const renderContent = (content) => {
  if (content === "classes") {
    return (
      <div id="classes_tab_content" class="is-active">
        <div class="fix-head">
          <div class="columns is-flex-desktop is-justify-content-end">
            {/* <div class="column is-one-quarter">
              <div class="select is-fullwidth is-flex-desktop">
                <select class="is-size-6 is-fullwidth">
                  <option class="is-size-6">All service categories</option>
                  <option class="is-size-6">All service categories</option>
                  <option class="is-size-6">F45 Track</option>
                  <option class="is-size-6">Functional Team Tr...</option>
                </select>
              </div>
            </div> */}
            {/* <div class="column is-one-quarter">
              <div class="select is-fullwidth">
                <select class="is-size-6 is-fullwidth">
                  <option class="is-size-6">All class types</option>
                  <option class="is-size-6">All class types</option>
                  <option class="is-size-6">Cardio</option>
                  <option class="is-size-6">F45 Track</option>
                  <option class="is-size-6">Hybrid</option>
                  <option class="is-size-6">Resistance</option>
                </select>
              </div>
            </div> */}
            {/* <div class="column is-one-quarter">
              <div class="select is-fullwidth">
                <!--py-0 pr-5 pl-2 ml-3-->
                <select class="is-size-6 is-fullwidth">
                  <option class="is-size-6">All teachers</option>
                  <option class="is-size-6">All teachers</option>
                  <option class="is-size-6">Riverbend-Byron Team F45</option>
                  <option class="is-size-6">Shkolnikov NIkol</option>
                  <option class="is-size-6">Stinson Robert</option>
                  <option class="is-size-6">Taylor Amanda</option>
                </select>
              </div>
            </div> */}
          </div>
          <div class="columns">
            <div class="column">
              <h3 class="is-size-5 has-text-weight-semibold">Schedule</h3>
            </div>
            {/* <div class="column is-flex-desktop is-justify-content-end is-align-items-center">
              <div class="buttons are-small is-flex is-align-items-center has-text-centered">
                <button class="button is-link is-rounded mb-0 is-size-7-mobile">
                  Today
                </button>
                <button class="button is-rounded mb-0 is-size-7-mobile">
                  <a class="mr-2" href="#">
                    <i class="fas fa-caret-left"></i>
                  </a>{" "}
                  Day{" "}
                  <a class="ml-2" href="">
                    <i class="fas fa-caret-right"></i>
                  </a>
                </button>
                <button class="button is-rounded mb-0 is-size-7-mobile">
                  <a class="mr-2" href="#">
                    <i class="fas fa-caret-left"></i>
                  </a>{" "}
                  Week{" "}
                  <a class="ml-2" href="">
                    <i class="fas fa-caret-right"></i>
                  </a>
                </button>
              </div>
              <div class="is-flex is-align-items-center is-size-7 mb-3 is-fullwidth ml-2">
                <form action="" class="is-fullwidth">
                  <input
                    className="py-1 px-5 is-block is-fullwidth"
                    data-requared="N"
                    // className="form-control"
                    type="date"
                    id="PROP-DBIRTH"
                    name="DBIRTH"
                    value="2023-07-07"
                    placeholder="2023-07-07"
                  />
                </form>
              </div>
            </div> */}
            <div class="columns is-mobile">
              {/* <div class="column">
                <h1 class="title is-4">
                  <FontAwesomeIcon className="fas" icon={faCalendar} />
                  &nbsp;Calendar
                </h1>
              </div> */}
              <div class="column has-text-right">
                <button
                  // onClick={() =>
                  //   fetchList(
                  //     currentCursor,
                  //     pageSize,
                  //     actualSearchText,
                  //     branchID,
                  //     workoutProgramID,
                  //     trainerID,
                  //     startAt
                  //   )
                  // }
                  class="button is-small is-info"
                  type="button"
                >
                  <FontAwesomeIcon className="mdi" icon={faRefresh} />
                </button>
                &nbsp;
                <button
                  // onClick={(e) => setShowFilter(!showFilter)}
                  class="button is-small is-success"
                  type="button"
                >
                  <FontAwesomeIcon className="mdi" icon={faFilter} />
                  &nbsp;Filter
                </button>
                {/*
                                &nbsp;
                                <Link to={`/admin/workouts/sessions/add`} class="button is-small is-primary" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New Schedule
                                </Link>
                                */}
              </div>
            </div>
          </div>
        </div>
        {/* <div class="table table-container table is-narrow is-fullwidth is-striped">
          <table class="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th class="is-size-7 has-background-light py-3">Start time</th>
                <th class="has-background-light py-4"></th>
                <th class="is-size-7 has-background-light py-3">Classes</th>
                <th class="is-size-7 has-background-light py-3">Teacher</th>
                <th class="is-size-7 has-background-light py-3 has-text-centered">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {classesData.map((outsideData, idx) => {
                return (
                  <>
                    <tr class="is-bg-light">
                      <td class="is-size-7 py-3" colSpan={5}>
                        {Object.keys(outsideData)}{" "}
                      </td>
                    </tr>
                    {outsideData[Object.keys(outsideData)].map((data) => (
                      <tr class="is-bg-light">
                        <td class="is-size-7 py-3">{data.startTime} </td>
                        <td class="is-size-7 py-3">
                          {data.reserved && (
                            <>
                              <button class="button is-small mx-2">
                                Sign In
                              </button>
                              <p class="is-size-7">{data.reserved}</p>
                            </>
                          )}
                        </td>
                        <td class="is-size-7 py-3">{data.className}</td>
                        <td class="is-size-7 py-3">{data.teacherName}</td>
                        <td class="is-size-7 py-3 has-text-centered">
                          45 minutes
                        </td>
                      </tr>
                    ))}
                  </>
                );
              })}
            </tbody>
          </table>
        </div> */}
        <div class="container">
          <div class="b-table">
            <div class="table-wrapper has-mobile-cards">
              <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Branch</th>
                    <th>Class</th>
                    <th>Trainer</th>
                    <th>Start At</th>
                    <th>Duration</th>
                    <th>Bookings</th>
                    <th>Waitlist</th>
                    <th></th>
                  </tr>
                </thead>
                {/* <tbody>
                  {listData &&
                    listData.results &&
                    listData.results.map(function (datum, i) {
                      return (
                        <tr>
                          <td data-label="Name">{datum.name}</td>
                          <td data-label="Branch">
                            <Link
                              to={`/admin/branch/${datum.branchId}`}
                              target="_blank"
                              rel="noreferrer"
                              class=""
                            >
                              {datum.branchName}&nbsp;
                              <FontAwesomeIcon
                                className="fas"
                                icon={faArrowUpRightFromSquare}
                              />
                            </Link>
                          </td>
                          <td data-label="Class">
                            <Link
                              to={`/admin/class/${datum.workoutProgramId}`}
                              target="_blank"
                              rel="noreferrer"
                              class=""
                            >
                              {datum.workoutProgramName}&nbsp;
                              <FontAwesomeIcon
                                className="fas"
                                icon={faArrowUpRightFromSquare}
                              />
                            </Link>
                          </td>
                          <td data-label="Trainer">
                            <Link
                              to={`/admin/workouts/trainer/${datum.trainerId}`}
                              target="_blank"
                              rel="noreferrer"
                              class=""
                            >
                              {datum.trainerName}&nbsp;
                              <FontAwesomeIcon
                                className="fas"
                                icon={faArrowUpRightFromSquare}
                              />
                            </Link>
                          </td>
                          <td data-label="Start At">{datum.startAt}</td>
                          <td data-label="Duration">
                            {datum.isOpenEnded ? (
                              "-"
                            ) : (
                              <>{datum.durationInMinutes} mins</>
                            )}
                          </td>
                          <td data-label="Bookings">
                            <Link
                              to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}/bookings`}
                              class="is-small is-warning"
                            >
                              <FontAwesomeIcon
                                className="mdi"
                                icon={faCalendarCheck}
                              />
                              &nbsp;{datum.attendeesCount} /{" "}
                              {datum.attendeesLimit}
                            </Link>
                          </td>
                          <td data-label="Waitlist">
                            <Link
                              to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}/waitlisters`}
                              class="is-small is-warning"
                            >
                              <FontAwesomeIcon className="mdi" icon={faUsers} />
                              &nbsp;{datum.waitlistersCount}
                            </Link>
                          </td>
                          <td class="is-actions-cell">
                            <div class="buttons is-right">
                              <Link
                                to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}`}
                                class="button is-small is-primary"
                                type="button"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <FontAwesomeIcon className="mdi" icon={faEye} />
                                &nbsp;View&nbsp;
                                <FontAwesomeIcon
                                  className="fas"
                                  icon={faArrowUpRightFromSquare}
                                />
                              </Link>
                              <Link
                                to={`/admin/branch/${datum.branchId}/class/${datum.workoutProgramId}/session/${datum.id}/update`}
                                class="button is-small is-warning"
                                type="button"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <FontAwesomeIcon
                                  className="mdi"
                                  icon={faPencil}
                                />
                                &nbsp;Edit&nbsp;
                                <FontAwesomeIcon
                                  className="fas"
                                  icon={faArrowUpRightFromSquare}
                                />
                              </Link>
                              <button
                                onClick={(e, ses) =>
                                  onSelectWorkoutSessionForDeletion(e, datum)
                                }
                                class="button is-small is-danger"
                                type="button"
                              >
                                <FontAwesomeIcon
                                  className="mdi"
                                  icon={faTrashCan}
                                />
                                &nbsp;Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody> */}
              </table>

              {/* <div class="columns">
                <div class="column is-half">
                  <span class="select">
                    <select
                      class={`input has-text-grey-light`}
                      name="pageSize"
                      onChange={(e) => setPageSize(parseInt(e.target.value))}
                    >
                      {PAGE_SIZE_OPTIONS.map(function (option, i) {
                        return (
                          <option
                            selected={pageSize === option.value}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        );
                      })}
                    </select>
                  </span>
                </div>
                <div class="column is-half has-text-right">
                  {previousCursors.length > 0 && (
                    <button class="button" onClick={onPreviousClicked}>
                      Previous
                    </button>
                  )}
                  {listData.hasNextPage && (
                    <>
                      <button class="button" onClick={onNextClicked}>
                        Next
                      </button>
                    </>
                  )}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (content === "info") {
    return (
      <div id="my_info_tab_content">
        <div class="fix-head">
          <div class="is-flex is-justify-content-center">
            <h3 class="is-size-4">
              F45 Training Riverbend-Byron - Online Store & Scheduler
            </h3>
          </div>
        </div>
        <div class="pt-6">
          <div class="container is-max-desktop">
            <div class="notification has-background-primary-light">
              <div class="is-flex is-justify-content-space-between is-align-items-center">
                <div class="is-flex is-align-items-center">
                  <img src={fbLogo} alt="FB logo" />
                  <span class="ml-4">Log in with Facebook</span>
                </div>
                <div class="log-in-link">
                  <a href="#">
                    <img class="mt-2" src={fbIcon} alt="FB icon" />
                  </a>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-5">
                <div class="box">
                  <h3 class="is-size-5 mb-3">
                    <b>Sign In</b>
                  </h3>
                  <p class="is-size-7 mb-3">
                    Welcome back. Use your email and password to log in.
                  </p>
                  <form action="">
                    <input
                      class="input is-normal mb-3"
                      type="text"
                      placeholder="Email"
                    />
                    <input
                      class="input is-normal mb-3"
                      type="password"
                      placeholder="Password"
                    />
                    <div class="submit is-flex is-justify-content-space-between is-align-items-end">
                      <a class="is-size-7 has-text-link" href="">
                        Need new <br /> password?
                      </a>
                      <input
                        type="submit"
                        class="button is-link is-active"
                        value="Sign In"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <b class="column is-2 is-flex is-align-items-center is-justify-content-center">
                OR
              </b>
              <div class="column is-5">
                <div class="box has-background-primary-light">
                  <h3 class="is-size-5 mb-3 has-text-success-dark">
                    <b>Create an Account</b>
                  </h3>
                  <p class="is-size-7 mb-3">
                    Welcome back. Use your email and password to log in.
                  </p>
                  <form action="">
                    <input
                      class="input is-normal mb-3"
                      type="text"
                      placeholder="Email"
                    />
                    <div class="submit is-flex is-justify-content-end is-align-items-end">
                      <input
                        type="submit"
                        class="button is-link is-active"
                        value="Sign In"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="online_store_tab_content">
        <div class="fix-head">
          <ul class="is-flex-desktop is-flex-wrap-wrap is-justify-content-end">
            <li class="is-size-6-mobile mr-6">
              <a href="">Products</a>
            </li>
            <li class="is-size-6-mobile mr-6">
              <a href="">Classes & Events</a>
            </li>
            <li class="is-size-6-mobile mr-6">
              <a href="">Gift Cards</a>
            </li>
            <li class="is-size-6-mobile mr-1">
              <a href="">Shopping Cart (1 item)</a>
            </li>
          </ul>
          <div class="title">
            <h3 class="pt-5 is-size-5 has-text-weight-semibold">
              Classes & Events
            </h3>
          </div>
        </div>
        <div class="mt-3 p-5 box has-background-primary-light">
          <div class="is-flex-desktop is-align-items-center mb-5">
            <div class="is-flex is-align-items-center">
              <p class="is-size-7 mr-6">Please make your selection</p>
            </div>
            <div class="select mt-3 is-fullwidth">
              {/* <!--py-0 pr-5 pl-2 ml-3--> */}
              <select class="is-size-6 is-fullwidth">
                <option class="is-size-6" disabled>
                  Select Item
                </option>
                <option class="is-size-6">Functional Team Traning</option>
                <option class="is-size-6">Functional Team Traning</option>
              </select>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <h3 class="is-size-4-desktop is-size-5-mobile">
                <b>Which option would you like?</b>
              </h3>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-full">
              <a class="has-background-white-bis p-5-desktop p-2-mobile box">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <span>
                    <h3 class="is-size-5-desktop is-size-7-mobile has-text-link-dark mb-3 has-text-weight-semibold">
                      7 Day Trial (Local Residents Only)
                    </h3>
                  </span>
                  <span class="is-size-5-desktop is-size-7-mobile mb-3 pr-6-desktop pr-0-mobile has-text-weight-semibold">
                    $35.00
                  </span>
                </div>
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <div class="">
                    <p class="is-size-7 mb-1">
                      Join us for 7-days of sweat-dripping, heart-pumping fun!
                    </p>
                    <p class="is-size-7">
                      Expiration Date: 7 days from first use
                    </p>
                  </div>
                  <div class="has-text-right-mobile">
                    <img
                      class=""
                      src="./assets/images/gray-circle-arrow.png"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            </div>
            <div class="column is-full">
              <a class="has-background-white-bis p-5-desktop p-2-mobile box">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <span>
                    <h3 class="is-size-5-desktop is-size-7-mobile has-text-link-dark mb-3 has-text-weight-semibold">
                      7 Day Trial (Local Residents Only)
                    </h3>
                  </span>
                  <span class="is-size-5-desktop is-size-7-mobile mb-3 pr-6-desktop pr-0-mobile has-text-weight-semibold">
                    $35.00
                  </span>
                </div>
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <div class="">
                    <p class="is-size-7 mb-1">
                      Join us for 7-days of sweat-dripping, heart-pumping fun!
                    </p>
                    <p class="is-size-7">
                      Expiration Date: 7 days from first use
                    </p>
                  </div>
                  <div class="has-text-right-mobile">
                    <img
                      class=""
                      src="./assets/images/gray-circle-arrow.png"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            </div>
            <div class="column is-full">
              <a class="has-background-white-bis p-5-desktop p-2-mobile box">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <span>
                    <h3 class="is-size-5-desktop is-size-7-mobile has-text-link-dark mb-3 has-text-weight-semibold">
                      7 Day Trial (Local Residents Only)
                    </h3>
                  </span>
                  <span class="is-size-5-desktop is-size-7-mobile mb-3 pr-6-desktop pr-0-mobile has-text-weight-semibold">
                    $35.00
                  </span>
                </div>
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <div class="">
                    <p class="is-size-7 mb-1">
                      Join us for 7-days of sweat-dripping, heart-pumping fun!
                    </p>
                    <p class="is-size-7">
                      Expiration Date: 7 days from first use
                    </p>
                  </div>
                  <div class="has-text-right-mobile">
                    <img
                      class=""
                      src="./assets/images/gray-circle-arrow.png"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            </div>
            <div class="column is-full">
              <a class="has-background-white-bis p-5-desktop p-2-mobile box">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <span>
                    <h3 class="is-size-5-desktop is-size-7-mobile has-text-link-dark mb-3 has-text-weight-semibold">
                      7 Day Trial (Local Residents Only)
                    </h3>
                  </span>
                  <span class="is-size-5-desktop is-size-7-mobile mb-3 pr-6-desktop pr-0-mobile has-text-weight-semibold">
                    $35.00
                  </span>
                </div>
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <div class="">
                    <p class="is-size-7 mb-1">
                      Join us for 7-days of sweat-dripping, heart-pumping fun!
                    </p>
                    <p class="is-size-7">
                      Expiration Date: 7 days from first use
                    </p>
                  </div>
                  <div class="has-text-right-mobile">
                    <img
                      class=""
                      src="./assets/images/gray-circle-arrow.png"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            </div>
            <div class="column is-full">
              <a class="has-background-white-bis p-5-desktop p-2-mobile box">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <span>
                    <h3 class="is-size-5-desktop is-size-7-mobile has-text-link-dark mb-3 has-text-weight-semibold">
                      7 Day Trial (Local Residents Only)
                    </h3>
                  </span>
                  <span class="is-size-5-desktop is-size-7-mobile mb-3 pr-6-desktop pr-0-mobile has-text-weight-semibold">
                    $35.00
                  </span>
                </div>
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <div class="">
                    <p class="is-size-7 mb-1">
                      Join us for 7-days of sweat-dripping, heart-pumping fun!
                    </p>
                    <p class="is-size-7">
                      Expiration Date: 7 days from first use
                    </p>
                  </div>
                  <div class="has-text-right-mobile">
                    <img
                      class=""
                      src="./assets/images/gray-circle-arrow.png"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            </div>
            <div class="column is-full">
              <a class="has-background-white-bis p-5-desktop p-2-mobile box">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <span>
                    <h3 class="is-size-5-desktop is-size-7-mobile has-text-link-dark mb-3 has-text-weight-semibold">
                      7 Day Trial (Local Residents Only)
                    </h3>
                  </span>
                  <span class="is-size-5-desktop is-size-7-mobile mb-3 pr-6-desktop pr-0-mobile has-text-weight-semibold">
                    $35.00
                  </span>
                </div>
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <div class="">
                    <p class="is-size-7 mb-1">
                      Join us for 7-days of sweat-dripping, heart-pumping fun!
                    </p>
                    <p class="is-size-7">
                      Expiration Date: 7 days from first use
                    </p>
                  </div>
                  <div class="has-text-right-mobile">
                    <img
                      class=""
                      src="./assets/images/gray-circle-arrow.png"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            </div>
            <div class="column is-full">
              <a class="has-background-white-bis p-5-desktop p-2-mobile box">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <span>
                    <h3 class="is-size-5-desktop is-size-7-mobile has-text-link-dark mb-3 has-text-weight-semibold">
                      7 Day Trial (Local Residents Only)
                    </h3>
                  </span>
                  <span class="is-size-5-desktop is-size-7-mobile mb-3 pr-6-desktop pr-0-mobile has-text-weight-semibold">
                    $35.00
                  </span>
                </div>
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                  <div class="">
                    <p class="is-size-7 mb-1">
                      Join us for 7-days of sweat-dripping, heart-pumping fun!
                    </p>
                    <p class="is-size-7">
                      Expiration Date: 7 days from first use
                    </p>
                  </div>
                  <div class="has-text-right-mobile">
                    <img
                      class=""
                      src="./assets/images/gray-circle-arrow.png"
                      alt=""
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MemberDashboard;
