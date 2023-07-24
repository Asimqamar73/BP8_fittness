import getCustomAxios from "../Helpers/customAxios";
import { camelizeKeys, decamelizeKeys, decamelize } from "humps";
import { DateTime } from "luxon";

import { BP8_FITNESS_SCHEDULE_PUBLIC } from "../Constants/API";

export function getScheduleAPI(
  filtersMap = new Map(),
  onSuccessCallback,
  onErrorCallback,
  onDoneCallback
) {
  const axios = getCustomAxios();

  // The following code will generate the query parameters for the url based on the map.
  let aURL = BP8_FITNESS_SCHEDULE_PUBLIC;
  filtersMap.forEach((value, key) => {
    let decamelizedkey = decamelize(key);
    if (aURL.indexOf("?") > -1) {
      aURL += "&" + decamelizedkey + "=" + value;
    } else {
      aURL += "?" + decamelizedkey + "=" + value;
    }
  });

  axios
    .get(aURL)
    .then((successResponse) => {
      const responseData = successResponse.data;

      // Snake-case from API to camel-case for React.
      const data = camelizeKeys(responseData);
      console.log("API HIT")
     
      if (
        data.results !== undefined &&
        data.results !== null &&
        data.results.length > 0
      ) {
        data.results.forEach((item, index) => {
          // DEVELOPERS NOTE:
          // DATETIME_MED => Ex: Oct 14, 1983, 9:30 AM
          // DATE_MED => Ex: Oct 14, 1983
          // See: https://moment.github.io/luxon/api-docs/index.html

          item.createdAt = DateTime.fromISO(item.createdAt).toLocaleString(
            DateTime.DATETIME_MED
          );
          item.startAt = DateTime.fromISO(item.startAt).toLocaleString(
            DateTime.DATE_MED
          );
          if (!item.isOpenEnded) {
            item.endAt = DateTime.fromISO(item.endAt).toLocaleString(
              DateTime.DATE_MED
            );
          }
          console.log(item, index);
        });
      }

      // Return the callback data.
      onSuccessCallback(data);
    })
    .catch((exception) => {
      let errors = camelizeKeys(exception);
      onErrorCallback(errors);
    })
    .then(onDoneCallback);
}
