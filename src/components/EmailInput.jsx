import { useState, useEffect } from "react";

import useValidateEmail from "../hooks/useValidateEmail";

const EmailInput = (props) => {
    const [fieldValue, setFieldValue] = useState("");
    const { validationStatus, validateField } = useValidateEmail();

    const onFieldValueChange = (event) => {
        const newValue = event.target.value;
        setFieldValue(newValue);
        validateField(newValue);
    };

    useEffect(() => {
        if (validationStatus) {
            props.onValidation(
                Object.values(validationStatus).every(
                    (requirement) => requirement === true
                )
            );
        }
    }, [props, validationStatus]);

    return (
        <div>
            <label htmlFor={props.id}>Email</label>

            <input
                id={props.id}
                name={props.name}
                onChange={onFieldValueChange}
                required={props.required}
                type="email"
                value={fieldValue}
            ></input>
        </div>
    );
};

export default EmailInput;
