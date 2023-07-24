import getCustomAxios from "../Helpers/customAxios";
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { DateTime } from "luxon";

import {
    BP8_FITNESS_CREATE_STRIPE_SUBSCRIPTION_CHECKOUT_SESSION_API_ENDPOINT,
    BP8_FITNESS_COMPLETE_STRIPE_SUBSCRIPTION_CHECKOUT_SESSION_API_ENDPOINT,
} from "../Constants/API";


export function postCreateStripeSubscriptionCheckoutSessionAPI(priceID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    const postData = {
        "price_id": priceID,
    };

    axios.post(BP8_FITNESS_CREATE_STRIPE_SUBSCRIPTION_CHECKOUT_SESSION_API_ENDPOINT, postData).then((successResponse) => {
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

export function getCompleteStripeSubscriptionCheckoutSessionAPI(sessionID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.get(BP8_FITNESS_COMPLETE_STRIPE_SUBSCRIPTION_CHECKOUT_SESSION_API_ENDPOINT.replace("{sessionID}", sessionID)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // For debugging purposeso pnly.
        console.log("completeStripeSubscriptionCheckoutSession: Response Data: ", data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}
