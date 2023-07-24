import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye, faGauge, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";

import fakeServer from "../../../Helpers/fakeServer";
import { TableBody, TableHeader } from "../../Reusable/DataTable";
import {
  topAlertMessageState,
  topAlertStatusState,
  currentUserState,
} from "../../../AppState";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import FormInputFieldWithButton from "../../Reusable/FormInputFieldWithButton";
import FormSelectFieldForBranch from "../../Reusable/FormSelectFieldForBranch";
import { getWorkoutSessionBookingListAPI } from "../../../API/WorkoutSessionBooking";
import { STATUS_OPTIONS } from "../../../Constants/FieldOptions";

const VisitHistory = () => {
  
  ////
  //// Global state.
  ////
  const [topAlertMessage, setTopAlertMessage] =
    useRecoilState(topAlertMessageState);
  const [topAlertStatus, setTopAlertStatus] =
    useRecoilState(topAlertStatusState);
  const [currentUser] = useRecoilState(currentUserState);

  const columns = [
    { key: "trainerName", title: "Trainer" },
    { key: "workoutProgramName", title: "Class" },
    { key: "workoutProgramTypeName", title: "Class Type" },
    { key: "durationInMinutes", title: "Duration" },
    { key: "branchName", title: "Branch" },
    { key: "createdAt", title: "Created At" },
    { key: "status", title: "Status" },
    {
      key: 'actions',
      renderCell: (item) => (
        <CustomComponent item={item} />
      ),
    },
  ];


  ////
  //// Component states.
  ////
  const [errors, setErrors] = useState({});
  const [listData, setListData] = useState("");
  const [isFetching, setFetching] = useState(false);
  const [pageSize, setPageSize] = useState(10); // Pagination
  const [previousCursors, setPreviousCursors] = useState([]); // Pagination
  const [nextCursor, setNextCursor] = useState(""); // Pagination
  const [currentCursor, setCurrentCursor] = useState(""); // Pagination
  const [showFilter, setShowFilter] = useState(false); // Filtering + Searching
  const [sortField, setSortField] = useState("created"); // Sorting
  const [temporarySearchText, setTemporarySearchText] = useState(""); // Searching - The search field value as your writes their query.
  const [actualSearchText, setActualSearchText] = useState(""); // Searching - The actual search query value to submit to the API.
  const [status, setStatus] = useState(""); // Filtering
  const [branchID, setBranchID] = useState(""); // Filtering

  ////
  //// API.
  ////
  const onVisitHistoryListSuccess = useCallback((response) => {
    if (response.results !== null) {
      setListData(response);
      if (response.hasNextPage) {
        setNextCursor(response.nextCursor);
      }
    }
  }, []);

  const onVisitHistoryListError = useCallback((apiErr) => {
    setErrors(apiErr);
    const scroll = Scroll.animateScroll;
    scroll.scrollToTop();
  }, []);

  const onVisitHistoryListDone = useCallback(() => {
    setFetching(false);
  }, []);

  ////
  //// Event handling.
  ////
  const fetchList = (cur, limit, status, b) => {
    setFetching(true);
    setErrors({});

    let params = new Map();
    params.set("page_size", limit); // Pagination
    params.set("sort_field", sortField); // Sorting

    if (cur !== "") {
      params.set("cursor", cur);
    }

    // if (keywords !== undefined && keywords !== null && keywords !== "") {
    //   params.set("trainer_name", keywords);
    // }
    if (status !== undefined && status !== null && status !== "") {
      params.set("status", status);
    }
    if (b !== undefined && b !== null && b !== "") {
      params.set("branch_id", b);
    }

    setFetching(true);

    // fetchData(params);

    getWorkoutSessionBookingListAPI(
      params,
      onVisitHistoryListSuccess,
      onVisitHistoryListError,
      onVisitHistoryListDone
    )
  };

  const onSearchButtonClick = useCallback(() => {
    setActualSearchText(temporarySearchText);
  }, [temporarySearchText]);

  const onNextClicked = useCallback(() => {
    if (nextCursor !== "") {
      setPreviousCursors((prevCursors) => [...prevCursors, currentCursor]);
      setCurrentCursor(nextCursor);
    }
  }, [currentCursor, nextCursor]);

  const onPreviousClicked = useCallback(() => {
    if (previousCursors.length > 0) {
      const prevCursorsCopy = [...previousCursors];
      const previousCursor = prevCursorsCopy.pop();
      setPreviousCursors(prevCursorsCopy);
      setCurrentCursor(previousCursor);
    }
  }, [previousCursors]);

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
        status,
        branchID
      );
    }

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCursor, pageSize, status, branchID]);

  const statusDropdown = useMemo(
    () => (
      <div className="column">
        <label className="label">Status</label>
        <span className="select">
          <select
            className={`input has-text-grey-light`}
            name="status"
            onChange={(e) => fetchList("", pageSize, e.target.value, "")}
          >
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((option) => (
              <option
                key={option.value}
                selected={actualSearchText === option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </span>
      </div>
    ),
    [actualSearchText, pageSize]
  );

  ////
  //// Custom Component
  ////
  const CustomComponent = ({item}) => {
    return(
      <div className="buttons">
        <Link
          to={`/visit-history/${item.id}`}
          className="button is-small is-primary"
          type="button"
        >
          <FontAwesomeIcon
            className="mdi"
            icon={faEye}
          />
          &nbsp;View
        </Link>
      </div>
    );
  }

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
                <Link to="/dashboard" aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faGauge} />
                  &nbsp;Dashboard
                </Link>
              </li>
              <li className="is-active">
                <Link to="/visit-history" aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faClock} />
                  &nbsp;Visit History
                </Link>
              </li>
            </ul>
          </nav>
          <nav className="box">
            <div className="columns">
              <div className="column">
                <TableHeader
                  headerTitle="Visit History"
                  headerIcon={faClock}
                  fetchList={fetchList}
                  currentCursor={currentCursor}
                  pageSize={pageSize}
                  actualSearchText={actualSearchText}
                  showFilter={showFilter}
                  setShowFilter={setShowFilter}
                  refresh={true}
                  filter={true}
                />
              </div>
            </div>

            {showFilter && (
              <div
                className="columns has-background-white-bis"
                style={{ borderRadius: "15px", padding: "20px" }}
              >
                
                <div class="column">
                  <FormSelectFieldForBranch
                    organizationID={currentUser.organizationID}
                    branchID={currentUser.branchID}
                    setBranchID={setBranchID}
                    errorText={errors && errors.branchId}
                    helpText=""
                  />
                </div>
                {statusDropdown}
              </div>
            )}

            {isFetching ? (
              <PageLoadingContent displayMessage={"Please wait..."} />
            ) : (
              <div>
                <TableBody
                  listData={listData}
                  columns={columns}
                  emptyMessage="No visit information on file"
                  enablePagination={true}
                  previousCursors={previousCursors}
                  currentCursor={currentCursor}
                  setPreviousCursors={setPreviousCursors}
                  setCurrentCursor={setCurrentCursor}
                  nextCursor={nextCursor}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  onPreviousClicked={onPreviousClicked}
                  onNextClicked={onNextClicked}
                />
              </div>
            )}
          </nav>
        </section>
      </div>
    </>
  );
};

export default VisitHistory;
