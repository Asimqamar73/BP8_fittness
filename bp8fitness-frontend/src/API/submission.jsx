import getCustomAxios from "../Helpers/customAxios";
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { DateTime } from "luxon";

import {
    BP8_FITNESS_SUBMISSIONS_API_ENDPOINT,
    BP8_FITNESS_SUBMISSION_API_ENDPOINT,
    BP8_FITNESS_SUBMISSION_MEMBER_SWAP_OPERATION_API_ENDPOINT,
    BP8_FITNESS_SUBMISSION_CREATE_COMMENT_OPERATION_API_ENDPOINT
} from "../Constants/API";


export function getSubmissionListAPI(filtersMap=new Map(), onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // The following code will generate the query parameters for the url based on the map.
    let aURL = BP8_FITNESS_SUBMISSIONS_API_ENDPOINT;
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
        console.log("getSubmissionListAPI | pre-fix | results:", data);
        if (data.results !== undefined && data.results !== null && data.results.length > 0) {
            data.results.forEach(
                (item, index) => {
                    item.issueCoverDate = DateTime.fromISO(item.issueCoverDate).toLocaleString(DateTime.DATETIME_MED);
                    item.createdAt = DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED);
                    console.log(item, index);
                }
            )
        }
        console.log("getSubmissionListAPI | post-fix | results:", data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function postSubmissionCreateAPI(data, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    console.log("postSubmissionCreateAPI | pre-modified | data:", data);

    // To Snake-case for API from camel-case in React.
    let decamelizedData = decamelizeKeys(data);

    // Minor bugfixes.
    decamelizedData.user_id = decamelizedData.user_i_d;
    delete decamelizedData.user_i_d;

    // if (data.issueCoverDate !==undefined && data.issueCoverDate !==null && data.issueCoverDate !=="") {
    //     decamelizedData.issue_cover_date = new Date(data.issueCoverDate).toISOString();
    // }

    console.log("postSubmissionCreateAPI | post-modified | data:", decamelizedData);

    axios.post(BP8_FITNESS_SUBMISSIONS_API_ENDPOINT, decamelizedData).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Minor bugfix.
        data.showsSignsOfTamperingOrRestoration = parseInt(data.showsSignsOfTamperingOrRestoration);
        // data.issueCoverDate = DateTime.fromISO(data.issueCoverDate).toJSDate();

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function getSubmissionDetailAPI(submissionID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.get(BP8_FITNESS_SUBMISSION_API_ENDPOINT.replace("{id}", submissionID)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Minor bugfix.
        data.showsSignsOfTamperingOrRestoration = parseInt(data.showsSignsOfTamperingOrRestoration);
        // data.issueCoverDate = DateTime.fromISO(data.issueCoverDate).toJSDate();

        // For debugging purposeso pnly.
        console.log(data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function putSubmissionUpdateAPI(data, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // To Snake-case for API from camel-case in React.
    let decamelizedData = decamelizeKeys(data);

    console.log("putSubmissionUpdateAPI | pre-edited | decamelizedData:", decamelizedData); // For debugging purposes only.

    // Minor bugfixes.
    // if (data.issueCoverDate !==undefined && data.issueCoverDate !==null && data.issueCoverDate !=="") {
    //     decamelizedData.issue_cover_date = new Date(data.issueCoverDate).toISOString();
    // }

    console.log("putSubmissionUpdateAPI | post-edited | decamelizedData:", decamelizedData);

    axios.put(BP8_FITNESS_SUBMISSION_API_ENDPOINT.replace("{id}", decamelizedData.id), decamelizedData).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Minor bugfix.
        data.showsSignsOfTamperingOrRestoration = parseInt(data.showsSignsOfTamperingOrRestoration);
        // data.issueCoverDate = DateTime.fromISO(data.issueCoverDate).toJSDate();

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function deleteSubmissionAPI(id, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.delete(BP8_FITNESS_SUBMISSION_API_ENDPOINT.replace("{id}", id)).then((successResponse) => {
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

export function postSubmissionMemberSwapOperationAPI(submissionID, memberID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    const data = {
        submission_id: submissionID,
        member_id: memberID
    };
    axios.post(BP8_FITNESS_SUBMISSION_MEMBER_SWAP_OPERATION_API_ENDPOINT, data).then((successResponse) => {
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

export function postSubmissionCreateCommentOperationAPI(submissionID, content, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    const data = {
        submission_id: submissionID,
        content: content,
    };
    axios.post(BP8_FITNESS_SUBMISSION_CREATE_COMMENT_OPERATION_API_ENDPOINT, data).then((successResponse) => {
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
