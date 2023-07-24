import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faGauge, faArrowRight, faUsers, faBarcode, faArrowAltCircleRight, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';

import Card from "../Reusable/Card";
import fakeServer from "../../Helpers/fakeServer";
import { topAlertMessageState, topAlertStatusState } from "../../AppState";

function MemberClassesAndEvents() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [data, setData] = useState([]);
    const [filterValue, setFilterValue] = useState("all"); // Default filter value

    ////
    //// Component states.
    ////

    ////
    //// API.
    ////
    async function fetchData() {
        try {
          const response = await fakeServer.getRequest("/classes-and-events", "GET"); // Update the API URL
          setData(response);
        } catch (error) {
          console.error(error); // Handle errors
        }
    }

    ////
    //// Event handling.
    ////
    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
      };

    ////
    //// Misc.
    ////
    useEffect(() => {
        fetchData();

        return () => {
        // Cleanup code if needed
        };
    }, []);

    ////
    //// Misc.
    ////

    /// Perform filtering logic based on the selected filter value
    const filteredData =
        filterValue === "all"
        ? data // Show all data if the filter value is "all"
        : data.filter((data) => data.category === filterValue);


    ////
    //// Component rendering.
    ////

    return (
        <>
            <div className="container">
                <section className="section">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li className="is-active"><Link to="/classes-and-events" aria-current="page"><FontAwesomeIcon className="fas" icon={faCalendar} />&nbsp;Classes &amp; Events</Link></li>
                        </ul>
                    </nav>
                    <nav className="box">
                        <div className="columns">
                            <div className="column">
                                <h1 className="title is-4"><FontAwesomeIcon className="fas" icon={faCalendar} />&nbsp;Classes and Events</h1>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label is-size-7 mr-3">Please make your selection:</label>
                                    <div className="control">
                                        <div className="select">
                                            <select value={filterValue} onChange={handleFilterChange}>
                                            <option value="all">All</option>
                                            <option value="Functional Team Training">Functional Team Training</option>
                                            <option value="Other Team">Other Team</option>
                                            {/* Add more filter options as needed */}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {filteredData.map((content, index) => (
                                <Card
                                    key={index}
                                    title={content.title}
                                    content={<CardContent {...content} />}
                                />
                            ))}
                        </div>
                    </nav>
                </section>
            </div>
        </>
    );
}

const CardContent = ({ subTitle, expirationDate, price }) => {
    return (
        <div className="is-flex is-flex-wrap-wrap is-justify-content-space-between">
          <div>
            {subTitle && <span className="subtitle is-6 has-text-grey">{subTitle}</span>}<br />
            {expirationDate && <span className="subtitle is-6 has-text-grey">Expiration date: {expirationDate}</span>}
          </div>
          <div>
            {price && <span className="title is-4 has-text-primary">{price}</span>}<br />
            <h1 className="icon title is-4 ml-6">
              <FontAwesomeIcon className="fas" icon={faArrowAltCircleRight} />
            </h1>
          </div>
        </div>
    );
  };
  
  CardContent.propTypes = {
    subTitle: PropTypes.string,
    expirationDate: PropTypes.string,
    price: PropTypes.string,
  };
  
  export default MemberClassesAndEvents;