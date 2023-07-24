import React, { useState, useEffect } from "react";
import { getBranchWorkoutProgramSelectOptionListAPI } from "../../API/workout_program";

/**
EXAMPLE USAGE:

    <FormWorkoutProgramField
      branchID={branchID}
      workoutProgramID={workoutProgramID}
      setWorkoutProgramID={setWorkoutProgramID}
      errorText={errors && errors.workoutProgramID}
      helpText="Please select the primary gym location this member will be using"
      maxWidth="310px"
      isHidden={false}
    />
*/
function FormSelectFieldForWorkoutProgram({
    branchID,
    workoutProgramID,
    setWorkoutProgramID,
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
    const [workoutProgramSelectOptions, setWorkoutProgramSelectOptions] = useState([]);

    ////
    //// Event handling.
    ////

    // Do nothing...

    ////
    //// API.
    ////

    function onWorkoutProgramSelectOptionsSuccess(response){
        console.log("onWorkoutProgramSelectOptionsSuccess: Starting...");
        let b = [
            {"value": "", "label": "Please select"},
            ...response
        ]
        setWorkoutProgramSelectOptions(b);
    }

    function onWorkoutProgramSelectOptionsError(apiErr) {
        console.log("onWorkoutProgramSelectOptionsError: Starting...");
        setErrors(apiErr);
    }

    function onWorkoutProgramSelectOptionsDone() {
        console.log("onWorkoutProgramSelectOptionsDone: Starting...");
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
                getBranchWorkoutProgramSelectOptionListAPI(
                    branchID,
                    onWorkoutProgramSelectOptionsSuccess,
                    onWorkoutProgramSelectOptionsError,
                    onWorkoutProgramSelectOptionsDone
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
        <div class={`field pb-4 ${isHidden && "is-hidden"}`} key={branchID}>
            <label class="label">{`Class`}</label>
            <div class="control">
            {branchID !== undefined && branchID !== null && branchID !== ""
                 ?
                    <span class="select">
                        <select class={`input ${errorText && 'is-danger'} ${validationText && 'is-success'} has-text-grey-light`}
                                 name={`workoutProgramID`}
                          placeholder={`Pick the workout program type`}
                             onChange={(e)=>setWorkoutProgramID(e.target.value)}
                             disabled={disabled}>
                            {workoutProgramSelectOptions && workoutProgramSelectOptions.length > 0 && workoutProgramSelectOptions.map(function(option, i){
                                // console.log("workoutProgramID", workoutProgramID);
                                // console.log("option.value", option.value);
                                // console.log(workoutProgramID, "===", option.value, "->>>", workoutProgramID === option.value);
                                // console.log("");
                                return <option selected={workoutProgramID === option.value} value={option.value}>{option.label}</option>;
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

export default FormSelectFieldForWorkoutProgram;
