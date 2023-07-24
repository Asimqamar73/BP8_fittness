import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faGauge,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
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
import { PAYMENT_OPTIONS } from "../../../Constants/FieldOptions";

const PurchaseHistory = () => {

  ////
  //// Global state.
  ////
  const [topAlertMessage, setTopAlertMessage] =
    useRecoilState(topAlertMessageState);
  const [topAlertStatus, setTopAlertStatus] =
    useRecoilState(topAlertStatusState);
  const [currentUser] = useRecoilState(currentUserState);

  const columns = [
    { key: "invoiceNumber", title: "Invoice" },
    { key: "quantity", title: "Quantity" },
    { key: "amountPaid", title: "Amount Paid" },
    { key: "paymentMethod", title: "Payment method" },
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
  const [sortField, setSortField] = useState("id"); // Sorting
  const [temporarySearchText, setTemporarySearchText] = useState(""); // Searching - The search field value as your writes their query.
  const [actualSearchText, setActualSearchText] = useState(""); // Searching - The actual search query value to submit to the API.
  const [paymentMethod, setPaymentMethod] = useState(""); // Filtering

  ////
  //// API.
  ////
  const fetchData = async (params) => {
    try {
      // Build the API URL with the query parameters
      let apiUrl = "/purchase-history";
      if (params.size > 0) {
        apiUrl += "?";
        for (const [key, value] of params) {
          apiUrl += `${key}=${encodeURIComponent(value)}&`;
        }
        apiUrl = apiUrl.slice(0, -1); // Remove the trailing "&"
      }

      const response = await fakeServer.getRequest(apiUrl, "GET");
      onPurchaseHistoryListSuccess(response);
    } catch (error) {
      console.error(error);
      onPurchaseHistoryListError(error);
    } finally {
      onPurchaseHistoryListDone();
    }
  };

  ////
  //// Event handling.
  ////
  const onPurchaseHistoryListSuccess = (response) => {
    console.log("onPurchaseHistoryListSuccess: Starting...");
    if (response.results !== null) {
      setListData(response);
      if (response.hasNextPage) {
        setNextCursor(response.nextCursor); // For pagination purposes.
      }
    }
  };

  const onPurchaseHistoryListError = (apiErr) => {
    console.log("onPurchaseHistoryListError: Starting...");
    setErrors(apiErr);

    const scroll = Scroll.animateScroll;
    scroll.scrollToTop();
  };

  const onPurchaseHistoryListDone = () => {
    console.log("onPurchaseHistoryListDone: Starting...");
    setFetching(false);
  };

  const onNextClicked = () => {
    console.log("onNextClicked");
    if (nextCursor !== "") {
      let arr = [...previousCursors];
      arr.push(currentCursor);
      setPreviousCursors(arr);
      setCurrentCursor(nextCursor);
    }
  };

  const onPreviousClicked = () => {
    console.log("onPreviousClicked");
    if (previousCursors.length > 0) {
      let arr = [...previousCursors];
      const previousCursor = arr.pop();
      setPreviousCursors(arr);
      setCurrentCursor(previousCursor);
    }
  };

  ////
  //// Misc.
  ////
  const fetchList = (cur, limit, keywords, paymentMethod) => {
    setFetching(true);
    setErrors({});

    let params = new Map();
    params.set("_limit", limit);
    params.set("_sort", sortField);
    params.set("_order", "desc"); //Order by asc/desc

    if (cur !== "") {
      params.set("cursor", cur);
    }

    if (keywords !== undefined && keywords !== null && keywords !== "") {
      params.set("status", keywords);
    }
    if (
      paymentMethod !== undefined &&
      paymentMethod !== null &&
      paymentMethod !== ""
    ) {
      params.set("paymentMethod", paymentMethod);
    }

    fetchData(params);
  };

  const onSearchButtonClick = (e) => {
    setActualSearchText(temporarySearchText);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      window.scrollTo(0, 0); // Start the page at the top of the page.
      fetchList(
        currentCursor,
        pageSize,
        actualSearchText,
        paymentMethod,
        nextCursor,
        previousCursors
      );
    }

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCursor, pageSize, actualSearchText, paymentMethod]);

  const paymentDropdown = useMemo(
    () => (
      <div className="column">
        <label className="label">Payment Methods</label>
        <span className="select">
          <select
            className={`input has-text-grey-light`}
            name="payment"
            onChange={(e) => fetchList("", pageSize, "", e.target.value)}
          >
            <option value="">All Payments</option>
            {PAYMENT_OPTIONS.map((option) => (
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
          to={`/purchase-history/${item.id}`}
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
                <Link to="/purchase-history" aria-current="page">
                  <FontAwesomeIcon className="fas" icon={faShoppingCart} />
                  &nbsp;Purchase History
                </Link>
              </li>
            </ul>
          </nav>
          <nav className="box">
            <div className="columns">
              <div className="column">
                <TableHeader
                  headerTitle="Purchase History"
                  headerIcon={faShoppingCart}
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
                <div className="column">
                  <FormInputFieldWithButton
                    label={"Search"}
                    name="temporarySearchText"
                    type="text"
                    placeholder="Search by Status"
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
                {paymentDropdown}
              </div>
            )}

            {isFetching ? (
              <PageLoadingContent displayMessage={"Please wait..."} />
            ) : (
              <div>
                <TableBody
                  listData={listData}
                  columns={columns}
                  emptyMessage="No purchase information on file"
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

export default PurchaseHistory;
