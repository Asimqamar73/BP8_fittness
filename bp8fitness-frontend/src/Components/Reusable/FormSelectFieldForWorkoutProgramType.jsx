import React, { useState, useEffect } from "react";
import { getBranchWorkoutProgramTypeSelectOptionListAPI } from "../../API/workout_program_type";

/**
EXAMPLE USAGE:

    <FormWorkoutProgramTypeField
      branchID={branchID}
      workoutProgramTypeID={workoutProgramTypeID}
      setWorkoutProgramTypeID={setWorkoutProgramTypeID}
      errorText={errors && errors.workoutProgramTypeID}
      helpText="Please select the primary gym location this member will be using"
      maxWidth="310px"
    />
*/
function FormSelectFieldForWorkoutProgramType({
    branchID,
    workoutProgramTypeID,
    setWorkoutProgramTypeID,
    errorText,
    validationText,
    helpText,
    disabled
}) {
    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [workoutProgramTypeSelectOptions, setWorkoutProgramTypeSelectOptions] = useState([]);

    ////
    //// Event handling.
    ////

    // Do nothing...

    ////
    //// API.
    ////

    function onWorkoutProgramTypeSelectOptionsSuccess(response){
        console.log("onWorkoutProgramTypeSelectOptionsSuccess: Starting...");
        let b = [
            {"value": "", "label": "Please select"},
            ...response
        ]
        setWorkoutProgramTypeSelectOptions(b);
    }

    function onWorkoutProgramTypeSelectOptionsError(apiErr) {
        console.log("onWorkoutProgramTypeSelectOptionsError: Starting...");
        setErrors(apiErr);
    }

    function onWorkoutProgramTypeSelectOptionsDone() {
        console.log("onWorkoutProgramTypeSelectOptionsDone: Starting...");
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
                getBranchWorkoutProgramTypeSelectOptionListAPI(
                    branchID,
                    onWorkoutProgramTypeSelectOptionsSuccess,
                    onWorkoutProgramTypeSelectOptionsError,
                    onWorkoutProgramTypeSelectOptionsDone
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
        <div class="field pb-4" key={branchID}>
            <label class="label">{`Class Type`}</label>
            <div class="control">
            {branchID !== undefined && branchID !== null && branchID !== ""
                 ?
                    <span class="select">
                        <select class={`input ${errorText && 'is-danger'} ${validationText && 'is-success'} has-text-grey-light`}
                                 name={`workoutProgramTypeID`}
                          placeholder={`Pick the workout program type`}
                             onChange={(e)=>setWorkoutProgramTypeID(e.target.value)}
                             disabled={disabled}>
                            {workoutProgramTypeSelectOptions && workoutProgramTypeSelectOptions.length > 0 && workoutProgramTypeSelectOptions.map(function(option, i){
                                // console.log("workoutProgramTypeID", workoutProgramTypeID);
                                // console.log("option.value", option.value);
                                // console.log(workoutProgramTypeID, "===", option.value, "->>>", workoutProgramTypeID === option.value);
                                // console.log("");
                                return <option selected={workoutProgramTypeID === option.value} value={option.value}>{option.label}</option>;
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

export default FormSelectFieldForWorkoutProgramType;
