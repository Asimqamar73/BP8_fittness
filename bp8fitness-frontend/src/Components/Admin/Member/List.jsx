import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faEye,
  faPencil,
  faTrashCan,
  faPlus,
  faGauge,
  faArrowRight,
  faTable,
  faArrowUpRightFromSquare,
  faRefresh,
  faFilter,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";

import FormErrorBox from "../../Reusable/FormErrorBox";
import { getMemberListAPI, deleteMemberAPI } from "../../../API/member";
import {
  topAlertMessageState,
  topAlertStatusState,
  currentUserState,
} from "../../../AppState";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import FormInputFieldWithButton from "../../Reusable/FormInputFieldWithButton";
import FormSelectFieldForBranch from "../../Reusable/FormSelectFieldForBranch";
import { PAGE_SIZE_OPTIONS } from "../../../Constants/FieldOptions";

function AdminMemberList() {
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
  const [selectedMemberForDeletion, setSelectedMemberForDeletion] =
    useState("");
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

  ////
  //// API.
  ////

  function onMemberListSuccess(response) {
    console.log("onMemberListSuccess: Starting...");
    if (response.results !== null) {
      setListData(response);
      if (response.hasNextPage) {
        setNextCursor(response.nextCursor); // For pagination purposes.
      }
    }
  }

  function onMemberListError(apiErr) {
    console.log("onMemberListError: Starting...");
    setErrors(apiErr);

    // The following code will cause the screen to scroll to the top of
    // the page. Please see ``react-scroll`` for more information:
    // https://github.com/fisshy/react-scroll
    var scroll = Scroll.animateScroll;
    scroll.scrollToTop();
  }

  function onMemberListDone() {
    console.log("onMemberListDone: Starting...");
    setFetching(false);
  }

  function onMemberDeleteSuccess(response) {
    console.log("onMemberDeleteSuccess: Starting..."); // For debugging purposes only.

    // Update notification.
    setTopAlertStatus("success");
    setTopAlertMessage("Member deleted");
    setTimeout(() => {
      console.log(
        "onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:",
        topAlertMessage,
        topAlertStatus
      );
      setTopAlertMessage("");
    }, 2000);

    // Fetch again an updated list.
    fetchList(currentCursor, pageSize, actualSearchText, branchID);
  }

  function onMemberDeleteError(apiErr) {
    console.log("onMemberDeleteError: Starting..."); // For debugging purposes only.
    setErrors(apiErr);

    // Update notification.
    setTopAlertStatus("danger");
    setTopAlertMessage("Failed deleting");
    setTimeout(() => {
      console.log(
        "onMemberDeleteError: topAlertMessage, topAlertStatus:",
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
  }

  function onMemberDeleteDone() {
    console.log("onMemberDeleteDone: Starting...");
    setFetching(false);
  }

  ////
  //// Event handling.
  ////

  const fetchList = (cur, limit, keywords, b) => {
    setFetching(true);
    setErrors({});

    let params = new Map();
    params.set("page_size", limit); // Pagination
    params.set("sort_field", "created"); // Sorting

    if (cur !== "") {
      // Pagination
      params.set("cursor", cur);
    }

    // Filtering
    if (keywords !== undefined && keywords !== null && keywords !== "") {
      // Searhcing
      params.set("search", keywords);
    }
    if (b !== undefined && b !== null && b !== "") {
      params.set("branch_id", b);
    }

    getMemberListAPI(
      params,
      onMemberListSuccess,
      onMemberListError,
      onMemberListDone
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

  const onSelectMemberForDeletion = (e, datum) => {
    console.log("onSelectMemberForDeletion", datum);
    setSelectedMemberForDeletion(datum);
  };

  const onDeselectMemberForDeletion = (e) => {
    console.log("onDeselectMemberForDeletion");
    setSelectedMemberForDeletion("");
  };

  const onDeleteConfirmButtonClick = (e) => {
    console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

    deleteMemberAPI(
      selectedMemberForDeletion.id,
      onMemberDeleteSuccess,
      onMemberDeleteError,
      onMemberDeleteDone
    );
    setSelectedMemberForDeletion("");
  };

  ////
  //// Misc.
  ////

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      window.scrollTo(0, 0); // Start the page at the top of the page.
      fetchList(currentCursor, pageSize, actualSearchText, branchID);
    }

    return () => {
      mounted = false;
    };
  }, [currentCursor, pageSize, actualSearchText, branchID]);

  ////
  //// Component rendering.
  ////

  return (
    <>
      <div className="container">
        <section className="section">
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li className="">
                <Link to="/admin/dashboard" aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faGauge} />
                  &nbsp;Dashboard
                </Link>
              </li>
              <li className="is-active">
                <Link aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faUsers} />
                  &nbsp;Members
                </Link>
              </li>
            </ul>
          </nav>
          <nav className="box">
            <div
              className={`modal ${
                selectedMemberForDeletion ? "is-active" : ""
              }`}
            >
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Are you sure?</p>
                  <button
                    className="delete"
                    aria-label="close"
                    onClick={onDeselectMemberForDeletion}
                  ></button>
                </header>
                <section className="modal-card-body">
                  You are about to <b>archive</b> this member; it will no longer
                  appear on your dashboard nor will the member be able to log
                  into their account. This action can be undone but you'll need
                  to contact the system administrator. Are you sure you would
                  like to continue?
                </section>
                <footer className="modal-card-foot">
                  <button
                    className="button is-success"
                    onClick={onDeleteConfirmButtonClick}
                  >
                    Confirm
                  </button>
                  <button
                    className="button"
                    onClick={onDeselectMemberForDeletion}
                  >
                    Cancel
                  </button>
                </footer>
              </div>
            </div>

            <div className="columns is-mobile">
              <div className="column">
                <h1 className="title is-4">
                  <FontAwesomeIcon className="fas" icon={faUsers} />
                  &nbsp;Members
                </h1>
              </div>
              <div className="column has-text-right">
                <button
                  onClick={() =>
                    fetchList(
                      currentCursor,
                      pageSize,
                      actualSearchText,
                      branchID
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
                &nbsp;
                <Link
                  to={`/admin/members/add`}
                  className="button is-small is-primary"
                  type="button"
                >
                  <FontAwesomeIcon className="mdi" icon={faPlus} />
                  &nbsp;New Member
                </Link>
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
              </div>
            )}

            {isFetching ? (
              <PageLoadingContent displayMessage={"Please wait..."} />
            ) : (
              <>
                <FormErrorBox errors={errors} />
                {listData &&
                listData.results &&
                (listData.results.length > 0 || previousCursors.length > 0) ? (
                  <div className="container">
                    <div className="b-table">
                      <div className="table-wrapper has-mobile-cards">
                        <table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Country</th>
                              <th>Region</th>
                              <th>City</th>
                              <th>Branch</th>
                              <th>Created</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {listData &&
                              listData.results &&
                              listData.results.map(function (datum, i) {
                                return (
                                  <tr key={datum.id}>
                                    <td data-label="Name">{datum.name}</td>
                                    <td data-label="Country">
                                      {datum.country}
                                    </td>
                                    <td data-label="Region">{datum.region}</td>
                                    <td data-label="City">{datum.city}</td>
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
                                    <td data-label="Created">
                                      {datum.createdAt}
                                    </td>
                                    <td className="is-actions-cell">
                                      <div className="buttons is-right">
                                        {/*
                                                                        <Link to={`/admin/members/add?datum_id=${datum.id}&datum_name=${datum.name}`} className="button is-small is-success" type="button">
                                                                            <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                                                        </Link>
                                                                    */}
                                        <Link
                                          to={`/admin/branch/${datum.branchId}/member/${datum.id}`}
                                          className="button is-small is-primary"
                                          type="button"
                                        >
                                          <FontAwesomeIcon
                                            className="mdi"
                                            icon={faEye}
                                          />
                                          &nbsp;View
                                        </Link>
                                        <Link
                                          to={`/admin/branch/${datum.branchId}/member/${datum.id}/update`}
                                          className="button is-small is-warning"
                                          type="button"
                                        >
                                          <FontAwesomeIcon
                                            className="mdi"
                                            icon={faPencil}
                                          />
                                          &nbsp;Edit
                                        </Link>
                                        <button
                                          onClick={(e, ses) =>
                                            onSelectMemberForDeletion(e, datum)
                                          }
                                          className="button is-small is-danger"
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
                                <button class="button" onClick={onNextClicked}>
                                  Next
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <section className="hero is-medium has-background-white-ter">
                    <div className="hero-body">
                      <p className="title">
                        <FontAwesomeIcon className="fas" icon={faTable} />
                        &nbsp;No Members
                      </p>
                      <p className="subtitle">
                        No class types.{" "}
                        <b>
                          <Link to="/admin/members/add">
                            Click here&nbsp;
                            <FontAwesomeIcon
                              className="mdi"
                              icon={faArrowRight}
                            />
                          </Link>
                        </b>{" "}
                        to get started creating your first member location type.
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

export default AdminMemberList;
