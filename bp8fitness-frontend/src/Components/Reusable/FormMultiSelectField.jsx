import React from "react";
import Select from 'react-select'

import { getSelectedOptions } from "../../Helpers/selectHelper";


function FormMultiSelectField({
    label,
    name,
    placeholder,
    options,
    selectedValues,
    onChange,
    errorText,
    validationText,
    helpText,
    maxWidth,
    disabled=false })
{
    let style = {maxWidth:maxWidth};
    if (errorText) {
        style = {maxWidth:maxWidth, borderColor:"red", borderStyle: "solid", borderWidth: "1px"};
    }
    return (
        <div class="field pb-4">
            <label class="label">{label}</label>
            <div class="control" style={style}>
                <Select isMulti
                           name="name"
                        options={options}
                          value={getSelectedOptions(options, selectedValues)}
                    isClearable={false}
                       onChange={onChange}
                     isDisabled={disabled}

                />
            </div>
            {errorText &&
                <p class="help is-danger">{errorText}</p>
            }
            {helpText &&
                <p class="help">{helpText}</p>
            }
        </div>


    );
}

export default FormMultiSelectField;
