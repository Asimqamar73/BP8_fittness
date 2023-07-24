import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faCalendar,
  faGauge,
  faSearch,
  faEye,
  faPencil,
  faTrashCan,
  faPlus,
  faArrowRight,
  faTable,
  faArrowUpRightFromSquare,
  faFilter,
  faRefresh,
  faCalendarCheck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";

import FormErrorBox from "../../Reusable/FormErrorBox";
import {
  getWorkoutSessionListAPI,
  deleteWorkoutSessionAPI,
} from "../../../API/WorkoutSession";
import {
  topAlertMessageState,
  topAlertStatusState,
  currentUserState,
} from "../../../AppState";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import FormInputFieldWithButton from "../../Reusable/FormInputFieldWithButton";
import FormSelectFieldForBranch from "../../Reusable/FormSelectFieldForBranch";
import FormSelectFieldForWorkoutProgram from "../../Reusable/FormSelectFieldForWorkoutProgram";
import FormSelectFieldForTrainer from "../../Reusable/FormSelectFieldForTrainer";
import FormDateField from "../../Reusable/FormDateField";
import { PAGE_SIZE_OPTIONS } from "../../../Constants/FieldOptions";

function AdminWorkoutSessionList() {
  ////
  //// Global state.
  ////

  const [topAlertMessage, setTopAlertMessage] =
    useRecoilState(topAlertMessageState);
  const [topAlertStatus, setTopAlertStatus] =
    useRecoilState(topAlertStatusState);
  const [currentUser] = useRecoilState(currentUserState);

  ////
  //// Component states.
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

  ////
  //// API.
  ////

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

  const onWorkoutSessionDeleteSuccess = (response) => {
    console.log("onWorkoutSessionDeleteSuccess: Starting..."); // For debugging purposes only.

    // Update notification.
    setTopAlertStatus("success");
    setTopAlertMessage("Session deleted");
    setTimeout(() => {
      console.log(
        "onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:",
        topAlertMessage,
        topAlertStatus
      );
      setTopAlertMessage("");
    }, 2000);

    // Fetch again an updated list.
    fetchList(
      currentCursor,
      pageSize,
      actualSearchText,
      branchID,
      workoutProgramID,
      trainerID,
      startAt
    );
  };

  const onWorkoutSessionDeleteError = (apiErr) => {
    console.log("onWorkoutSessionDeleteError: Starting..."); // For debugging purposes only.
    setErrors(apiErr);

    // Update notification.
    setTopAlertStatus("danger");
    setTopAlertMessage("Failed deleting");
    setTimeout(() => {
      console.log(
        "onWorkoutSessionDeleteError: topAlertMessage, topAlertStatus:",
        topAlertMessage,
        topAlertStatus
      );
      setTopAlertMessage("");
    }, 2000);

    // The following code will cause the screen to scroll to the top of
    // the page. Please see ``react-scroll`` for more information:
    // https://github.com/fisshy/react-scroll
    var scroll = Scroll.animateScroll;
    scroll.scrollToTop();
  };

  const onWorkoutSessionDeleteDone = () => {
    console.log("onWorkoutSessionDeleteDone: Starting...");
    setFetching(false);
  };

  ////
  //// Event handling.
  ////

  const fetchList = (cur, limit, keywords, b, wp, t, sdt) => {
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
    if (b !== undefined && b !== null && b !== "") {
      params.set("branch_id", b);
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

    getWorkoutSessionListAPI(
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
    // Searching
    console.log("Search button clicked...");
    setActualSearchText(temporarySearchText);
  };

  const onSelectWorkoutSessionForDeletion = (e, datum) => {
    console.log("onSelectWorkoutSessionForDeletion", datum);
    setSelectedWorkoutSessionForDeletion(datum);
  };

  const onDeselectWorkoutSessionForDeletion = (e) => {
    console.log("onDeselectWorkoutSessionForDeletion");
    setSelectedWorkoutSessionForDeletion("");
  };

  const onDeleteConfirmButtonClick = (e) => {
    console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

    deleteWorkoutSessionAPI(
      selectedWorkoutSessionForDeletion.id,
      onWorkoutSessionDeleteSuccess,
      onWorkoutSessionDeleteError,
      onWorkoutSessionDeleteDone
    );
    setSelectedWorkoutSessionForDeletion("");
  };

  ////
  //// Misc.
  ////

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      window.scrollTo(0, 0); // Start the page at the top of the page.
      fetchList(
        currentCursor,
        pageSize,
        actualSearchText,
        branchID,
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
    branchID,
    workoutProgramID,
    trainerID,
    startAt,
  ]);

  ////
  //// Component rendering.
  ////

  return (
    <>
      <div class="container">
        <section class="section">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li class="">
                <Link to="/admin/dashboard" aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faGauge} />
                  &nbsp;Dashboard
                </Link>
              </li>
              <li class="is-active">
                <Link aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faCalendar} />
                  &nbsp;Calendar
                </Link>
              </li>
            </ul>
          </nav>
          <nav class="box">
            <div
              class={`modal ${
                selectedWorkoutSessionForDeletion ? "is-active" : ""
              }`}
            >
              <div class="modal-background"></div>
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title">Are you sure?</p>
                  <button
                    class="delete"
                    aria-label="close"
                    onClick={onDeselectWorkoutSessionForDeletion}
                  ></button>
                </header>
                <section class="modal-card-body">
                  You are about to <b>archive</b> this schedule; it will no
                  longer appear on your dashboard. This action can be undone but
                  you'll need to contact the system administrator. Are you sure
                  you would like to continue?
                </section>
                <footer class="modal-card-foot">
                  <button
                    class="button is-success"
                    onClick={onDeleteConfirmButtonClick}
                  >
                    Confirm
                  </button>
                  <button
                    class="button"
                    onClick={onDeselectWorkoutSessionForDeletion}
                  >
                    Cancel
                  </button>
                </footer>
              </div>
            </div>

            <div class="columns is-mobile">
              <div class="column">
                <h1 class="title is-4">
                  <FontAwesomeIcon className="fas" icon={faCalendar} />
                  &nbsp;Calendar
                </h1>
              </div>
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
                    organizationID={currentUser.organizationID}
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
                (listData.results.length > 0 || previousCursors.length > 0) ? (
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
                                      <td data-label="Start At">
                                        {datum.startAt}
                                      </td>
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
                                          {/*
                                                                            <Link to={`/admin/sessions/add?datum=${datum.id}&datum=${datum.name}`} class="button is-small is-success" type="button">
                                                                                <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                                                            </Link>
                                                                        */}
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
                      <p class="subtitle">
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
                      </p>
                    </div>
                  </section>
                )}
              </>
            )}
          </nav>
        </section>
      </div>
    </>
  );
}

export default AdminWorkoutSessionList;
