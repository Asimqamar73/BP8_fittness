import getCustomAxios from "../Helpers/customAxios";
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { DateTime } from "luxon";

import {
    BP8_FITNESS_WORKOUT_PROGRAMS_API_ENDPOINT,
    BP8_FITNESS_WORKOUT_PROGRAM_API_ENDPOINT,
    BP8_FITNESS_BRANCH_WORKOUT_PROGRAM_SELECT_OPTIONS_API_ENDPOINT,
} from "../Constants/API";


export function getWorkoutProgramListAPI(filtersMap=new Map(), onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // The following code will generate the query parameters for the url based on the map.
    let aURL = BP8_FITNESS_WORKOUT_PROGRAMS_API_ENDPOINT;
    filtersMap.forEach(
        (value, key) => {
            let decamelizedkey = decamelize(key)
            if (aURL.indexOf('?') > -1) {
                aURL += "&"+decamelizedkey+"="+value;
            } else {
                aURL += "?"+decamelizedkey+"="+value;
            }
        }
    )

    axios.get(aURL).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Bugfixes.
        console.log("getWorkoutProgramListAPI | pre-fix | results:", data);
        if (data.results !== undefined && data.results !== null && data.results.length > 0) {
            data.results.forEach(
                (item, index) => {
                    // DEVELOPERS NOTE:
                    // DATETIME_MED => Ex: Oct 14, 1983, 9:30 AM
                    // DATE_MED => Ex: Oct 14, 1983
                    // See: https://moment.github.io/luxon/api-docs/index.html

                    item.createdAt = DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED);
                    item.startAt = DateTime.fromISO(item.startAt).toLocaleString(DateTime.DATE_MED);
                    if (!item.isOpenEnded) {
                        item.endAt = DateTime.fromISO(item.endAt).toLocaleString(DateTime.DATE_MED);
                    }
                    console.log(item, index);
                }
            )
        }
        console.log("getWorkoutProgramListAPI | post-fix | results:", data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function postWorkoutProgramCreateAPI(decamelizedData, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    if (decamelizedData.is_open_ended === true) {
        decamelizedData.end_at = null;
    }
    axios.post(BP8_FITNESS_WORKOUT_PROGRAMS_API_ENDPOINT, decamelizedData).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function getWorkoutProgramDetailAPI(memberID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.get(BP8_FITNESS_WORKOUT_PROGRAM_API_ENDPOINT.replace("{id}", memberID)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        if (data.isOpenEnded === true) {
            data.endAt = null;
        }

        // For debugging purposeso pnly.
        console.log("getWorkoutProgramDetailAPI: Response Data: ", data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function putWorkoutProgramUpdateAPI(data, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // To Snake-case for API from camel-case in React.
    let decamelizedData = decamelizeKeys(data);

    // Minor fix.
    decamelizedData.address_line_1 = decamelizedData.address_line1;
    decamelizedData.address_line_2 = decamelizedData.address_line2;
    delete decamelizedData.address_line1;
    delete decamelizedData.address_line2;

    axios.put(BP8_FITNESS_WORKOUT_PROGRAM_API_ENDPOINT.replace("{id}", decamelizedData.id), decamelizedData).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function deleteWorkoutProgramAPI(id, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.delete(BP8_FITNESS_WORKOUT_PROGRAM_API_ENDPOINT.replace("{id}", id)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function getBranchWorkoutProgramSelectOptionListAPI(branchID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    if (branchID === undefined || branchID === null || branchID === "") { // Defensive code.
        return;
    }

    const axios = getCustomAxios();

    // The following code will generate the url argument for the url based on the map.
    let aURL = BP8_FITNESS_BRANCH_WORKOUT_PROGRAM_SELECT_OPTIONS_API_ENDPOINT.replace("{id}", branchID);

    axios.get(aURL).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}
