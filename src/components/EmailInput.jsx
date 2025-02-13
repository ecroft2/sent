import { useState, useEffect } from "react";

import useValidateEmail from "../hooks/useValidateEmail";

const EmailInput = (props) => {
    const [value, setValue] = useState("");
    const [hasInteracted, setHasInteracted] = useState(false);

    const { validationResponse, validateInput } = useValidateEmail(
        props.required
    );

    useEffect(() => {
        if (hasInteracted) {
            validateInput(value);
        }
    }, [value, validateInput, hasInteracted]);

    useEffect(() => {
        if (validationResponse) {
            props.isValid(validationResponse.isValid);
        }
    }, [props, validationResponse]);

    return (
        <div>
            <label htmlFor={props.id}>Email</label>

            <input
                id={props.id}
                name={props.name}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                onBlur={(event) => {
                    validateInput(event.target.value);
                    setHasInteracted(true);
                }}
                required={props.required}
                type="email"
                value={value}
            ></input>

            {validationResponse?.errorType === "required_field" &&
                "This field is required."}

            {validationResponse?.errorType === "invalid_format" &&
                "This field is in the incorrect format."}
        </div>
    );
};

export default EmailInput;
