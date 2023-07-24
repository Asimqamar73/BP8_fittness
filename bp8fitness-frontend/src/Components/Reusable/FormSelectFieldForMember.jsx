import React, { useState, useEffect } from "react";
import { getBranchMemberSelectOptionListAPI } from "../../API/member";

/**
EXAMPLE USAGE:

    <FormMemberField
      branchID={branchID}
      memberID={memberID}
      setMemberID={setMemberID}
      errorText={errors && errors.memberID}
      helpText="Please select the primary gym location this member will be using"
      maxWidth="310px"
    />
*/
function FormSelectFieldForMember({
    branchID,
    memberID,
    setMemberID,
    errorText,
    validationText,
    helpText,
    disabled
}) {
    console.log(
        "branchID --->", branchID,
        "memberID --->", memberID,
    );

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [workoutProgramTypeSelectOptions, setMemberSelectOptions] = useState([]);

    ////
    //// Event handling.
    ////

    // Do nothing...

    ////
    //// API.
    ////

    function onMemberSelectOptionsSuccess(response){
        console.log("onMemberSelectOptionsSuccess: Starting...");
        let b = [
            {"value": "", "label": "Please select"},
            ...response
        ]
        setMemberSelectOptions(b);
    }

    function onMemberSelectOptionsError(apiErr) {
        console.log("onMemberSelectOptionsError: Starting...");
        setErrors(apiErr);
    }

    function onMemberSelectOptionsDone() {
        console.log("onMemberSelectOptionsDone: Starting...");
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
                getBranchMemberSelectOptionListAPI(
                    branchID,
                    onMemberSelectOptionsSuccess,
                    onMemberSelectOptionsError,
                    onMemberSelectOptionsDone
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
            <label class="label">{`Member`}</label>
            <div class="control">
            {branchID !== undefined && branchID !== null && branchID !== ""
                 ?
                 <span class="select">
                    <select class={`input ${errorText && 'is-danger'} ${validationText && 'is-success'} has-text-grey-light`}
                             name={`memberID`}
                      placeholder={`Pick the workout program type`}
                         onChange={(e)=>setMemberID(e.target.value)}
                         disabled={disabled}>
                        {workoutProgramTypeSelectOptions && workoutProgramTypeSelectOptions.length > 0 && workoutProgramTypeSelectOptions.map(function(option, i){
                            // console.log("memberID", memberID);
                            // console.log("option.value", option.value);
                            // console.log(memberID, "===", option.value, "->>>", memberID === option.value);
                            // console.log("");
                            return <option selected={memberID === option.value} value={option.value}>{option.label}</option>;
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

export default FormSelectFieldForMember;
