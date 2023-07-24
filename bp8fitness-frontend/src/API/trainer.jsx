import getCustomAxios from "../Helpers/customAxios";
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { DateTime } from "luxon";

import {
    BP8_FITNESS_TRAINERS_API_ENDPOINT,
    BP8_FITNESS_TRAINER_API_ENDPOINT,
    BP8_FITNESS_TRAINER_CREATE_COMMENT_OPERATION_API_ENDPOINT,
    BP8_FITNESS_BRANCH_TRAINER_SELECT_OPTIONS_API_ENDPOINT
} from "../Constants/API";


export function getTrainerListAPI(filtersMap=new Map(), onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // The following code will generate the query parameters for the url based on the map.
    let aURL = BP8_FITNESS_TRAINERS_API_ENDPOINT;
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
        console.log("getTrainerListAPI | pre-fix | results:", data);
        if (data.results !== undefined && data.results !== null && data.results.length > 0) {
            data.results.forEach(
                (item, index) => {
                    item.createdAt = DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED);
                    console.log(item, index);
                }
            )
        }
        console.log("getTrainerListAPI | post-fix | results:", data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function postTrainerCreateAPI(decamelizedData, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();


    axios.post(BP8_FITNESS_TRAINERS_API_ENDPOINT, decamelizedData).then((successResponse) => {
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

export function getTrainerDetailAPI(memberID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.get(BP8_FITNESS_TRAINER_API_ENDPOINT.replace("{id}", memberID)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // For debugging purposeso pnly.
        console.log(data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function putTrainerUpdateAPI(decamelizedData, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    axios.put(BP8_FITNESS_TRAINER_API_ENDPOINT.replace("{id}", decamelizedData.id), decamelizedData).then((successResponse) => {
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

export function deleteTrainerAPI(id, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.delete(BP8_FITNESS_TRAINER_API_ENDPOINT.replace("{id}", id)).then((successResponse) => {
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

export function postTrainerCreateCommentOperationAPI(userID, content, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    const data = {
        user_id: userID,
        content: content,
    };
    axios.post(BP8_FITNESS_TRAINER_CREATE_COMMENT_OPERATION_API_ENDPOINT, data).then((successResponse) => {
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

export function getBranchTrainerSelectOptionListAPI(orgID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // The following code will generate the url argument for the url based on the map.
    let aURL = BP8_FITNESS_BRANCH_TRAINER_SELECT_OPTIONS_API_ENDPOINT.replace("{id}", orgID);

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
