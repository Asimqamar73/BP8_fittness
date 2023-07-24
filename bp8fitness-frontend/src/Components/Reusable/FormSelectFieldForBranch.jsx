import React, { useState, useEffect } from "react";
import { getOrganizationBranchSelectOptionListAPI } from "../../API/branch";

/**
EXAMPLE USAGE:

    <FormBranchField
      organizationID={organizationID}
      branchID={branchID}
      setBranchID={setBranchID}
      errorText={errors && errors.branchID}
      helpText="Please select the primary gym location this member will be using"
      maxWidth="310px"
      isHidden={true}
    />
*/
function FormSelectFieldForBranch({
    organizationID,
    branchID,
    setBranchID,
    errorText,
    validationText,
    helpText,
    disabled,
    isHidden
}) {
    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [branchSelectOptions, setBranchSelectOptions] = useState([]);

    ////
    //// Event handling.
    ////

    // Do nothing...

    ////
    //// API.
    ////

    function onBranchSelectOptionsSuccess(response){
        console.log("onBranchSelectOptionsSuccess: Starting...");
        let b = [
            {"value": "", "label": "Please select"},
            ...response
        ]
        setBranchSelectOptions(b);
    }

    function onBranchSelectOptionsError(apiErr) {
        console.log("onBranchSelectOptionsError: Starting...");
        setErrors(apiErr);
    }

    function onBranchSelectOptionsDone() {
        console.log("onBranchSelectOptionsDone: Starting...");
        setFetching(false);
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setFetching(true);
            getOrganizationBranchSelectOptionListAPI(
                organizationID,
                onBranchSelectOptionsSuccess,
                onBranchSelectOptionsError,
                onBranchSelectOptionsDone
            );
        }

        return () => { mounted = false; }
    }, []);

    ////
    //// Component rendering.
    ////

    // Render the JSX component.
    return (
        <div class={`field pb-4 ${isHidden && "is-hidden"}`} key={branchID}>
            <label class="label">{`Branch`}</label>
            <div class="control">
            {organizationID !== undefined && organizationID !== null && organizationID !== ""
                ?
                <span class="select">
                    <select class={`input ${errorText && 'is-danger'} ${validationText && 'is-success'} has-text-grey-light`}
                             name={`branchID`}
                      placeholder={`Pick branch location`}
                         onChange={(e)=>setBranchID(e.target.value)}
                         disabled={disabled}>
                        {branchSelectOptions && branchSelectOptions.length > 0 && branchSelectOptions.map(function(option, i){
                            return <option selected={branchID === option.value} value={option.value}>{option.label}</option>;
                        })}
                    </select>
                </span>
                :
                <span>
                    <p>---</p>
                </span>
            }
            </div>
            {helpText &&
                <p class="help">{helpText}</p>
            }
            {errorText &&
                <p class="help is-danger">{errorText}</p>
            }
        </div>
    );
}

export default FormSelectFieldForBranch;
