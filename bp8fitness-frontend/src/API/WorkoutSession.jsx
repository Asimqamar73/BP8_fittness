import getCustomAxios from "../Helpers/customAxios";
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { DateTime } from "luxon";

import {
    BP8_FITNESS_WORKOUT_SESSIONS_API_ENDPOINT,
    BP8_FITNESS_WORKOUT_SESSION_API_ENDPOINT,
} from "../Constants/API";


export function getWorkoutSessionListAPI(filtersMap=new Map(), onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // The following code will generate the query parameters for the url based on the map.
    let aURL = BP8_FITNESS_WORKOUT_SESSIONS_API_ENDPOINT;
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
        console.log("getWorkoutSessionListAPI | pre-fix | results:", data);
        if (data.results !== undefined && data.results !== null && data.results.length > 0) {
            data.results.forEach(
                (item, index) => {
                    item.createdAt = DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED);
                    item.startAt = DateTime.fromISO(item.startAt).toLocaleString(DateTime.DATETIME_MED);
                    if (!item.isOpenEnded) {
                        item.endAt = DateTime.fromISO(item.endAt).toLocaleString(DateTime.DATETIME_MED);
                    }
                    console.log(item, index);
                }
            )
        }
        console.log("getWorkoutSessionListAPI | post-fix | results:", data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function postWorkoutSessionCreateAPI(decamelizedData, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    if (decamelizedData.is_open_ended === true) {
        decamelizedData.end_at = null;
    }
    axios.post(BP8_FITNESS_WORKOUT_SESSIONS_API_ENDPOINT, decamelizedData).then((successResponse) => {
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

export function getWorkoutSessionDetailAPI(memberID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.get(BP8_FITNESS_WORKOUT_SESSION_API_ENDPOINT.replace("{id}", memberID)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        if (data.isOpenEnded === true) {
            data.endAt = null;
        }

        // For debugging purposeso pnly.
        console.log("getWorkoutSessionDetailAPI: Response Data: ", data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function putWorkoutSessionUpdateAPI(data, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // To Snake-case for API from camel-case in React.
    let decamelizedData = decamelizeKeys(data);

    // Minor fix.
    decamelizedData.address_line_1 = decamelizedData.address_line1;
    decamelizedData.address_line_2 = decamelizedData.address_line2;
    delete decamelizedData.address_line1;
    delete decamelizedData.address_line2;

    axios.put(BP8_FITNESS_WORKOUT_SESSION_API_ENDPOINT.replace("{id}", decamelizedData.id), decamelizedData).then((successResponse) => {
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

export function deleteWorkoutSessionAPI(id, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.delete(BP8_FITNESS_WORKOUT_SESSION_API_ENDPOINT.replace("{id}", id)).then((successResponse) => {
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
