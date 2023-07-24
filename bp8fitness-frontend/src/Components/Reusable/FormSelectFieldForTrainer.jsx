import React, { useState, useEffect } from "react";
import { getBranchTrainerSelectOptionListAPI } from "../../API/trainer";

/**
EXAMPLE USAGE:

    <FormTrainerField
      branchID={branchID}
      trainerID={trainerID}
      setTrainerID={setTrainerID}
      errorText={errors && errors.trainerID}
      helpText="Please select the primary gym location this member will be using"
      maxWidth="310px"
    />
*/
function FormSelectFieldForTrainer({
    branchID,
    trainerID,
    setTrainerID,
    errorText,
    validationText,
    helpText,
    disabled
}) {
    console.log(
        "branchID --->", branchID,
        "trainerID --->", trainerID,
    );

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [workoutProgramTypeSelectOptions, setTrainerSelectOptions] = useState([]);

    ////
    //// Event handling.
    ////

    // Do nothing...

    ////
    //// API.
    ////

    function onTrainerSelectOptionsSuccess(response){
        console.log("onTrainerSelectOptionsSuccess: Starting...");
        let b = [
            {"value": "", "label": "Please select"},
            ...response
        ]
        setTrainerSelectOptions(b);
    }

    function onTrainerSelectOptionsError(apiErr) {
        console.log("onTrainerSelectOptionsError: Starting...");
        setErrors(apiErr);
    }

    function onTrainerSelectOptionsDone() {
        console.log("onTrainerSelectOptionsDone: Starting...");
        setFetching(false);
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            if (branchID !== undefined && branchID !== null && branchID !== "") { // Defensive code.
                setFetching(true);
                getBranchTrainerSelectOptionListAPI(
                    branchID,
                    onTrainerSelectOptionsSuccess,
                    onTrainerSelectOptionsError,
                    onTrainerSelectOptionsDone
                );
            }

        }

        return () => { mounted = false; }
    }, [branchID]);

    ////
    //// Component rendering.
    ////

    // Render the JSX component.
    return (
        <div class="field pb-4" id={branchID}>
            <label class="label">{`Trainer`}</label>
            <div class="control">
            {branchID !== undefined && branchID !== null && branchID !== ""
                 ?
                 <span class="select">
                    <select class={`input ${errorText && 'is-danger'} ${validationText && 'is-success'} has-text-grey-light`}
                             name={`trainerID`}
                      placeholder={`Pick the workout program type`}
                         onChange={(e)=>setTrainerID(e.target.value)}
                         disabled={disabled}>
                        {workoutProgramTypeSelectOptions && workoutProgramTypeSelectOptions.length > 0 && workoutProgramTypeSelectOptions.map(function(option, i){
                            // console.log("trainerID", trainerID);
                            // console.log("option.value", option.value);
                            // console.log(trainerID, "===", option.value, "->>>", trainerID === option.value);
                            // console.log("");
                            return <option selected={trainerID === option.value} value={option.value}>{option.label}</option>;
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

export default FormSelectFieldForTrainer;
