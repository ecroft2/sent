import { useState, useEffect } from "react";

import useValidateEmail from "../hooks/useClientValidateEmail";

const EmailInput = ({
    fieldValidationStatus,
    id,
    name,
    required,
    serverValidationStatus,
}) => {
    const [value, setValue] = useState("");
    const [hasInteracted, setHasInteracted] = useState(false);

    const { validationStatus: clientValidationStatus, validateInput } =
        useValidateEmail(required);

    useEffect(() => {
        if (hasInteracted) {
            if (
                serverValidationStatus?.error === true ||
                clientValidationStatus?.error === true
            ) {
                validateInput(value);
            }
        }
    }, [
        value,
        validateInput,
        hasInteracted,
        serverValidationStatus,
        clientValidationStatus,
    ]);

    useEffect(() => {
        if (fieldValidationStatus) {
            fieldValidationStatus({
                field: "email",
                error:
                    serverValidationStatus?.error === true ||
                    clientValidationStatus?.error === true,
            });
        }
    }, [fieldValidationStatus, serverValidationStatus, clientValidationStatus]);

    return (
        <div>
            <label htmlFor={id}>Email</label>
            <input
                id={id}
                name={name}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                onBlur={(event) => {
                    setHasInteracted(true);
                    validateInput(event.target.value);
                }}
                required={required}
                type="email"
                value={value}
            ></input>

            {clientValidationStatus?.errorCode === "required_field" ||
                (serverValidationStatus?.errorCode === "auth/missing-email" &&
                    "Email is required.")}

            {clientValidationStatus?.errorCode === "invalid_format" &&
                "This field is in the incorrect format."}

            {serverValidationStatus?.errorCode ===
                "auth/email-already-in-use" &&
                "This email is already registered. You can sign in."}

            {serverValidationStatus?.errorCode === "auth/invalid-email" &&
                "Check your email is formatted correctly and try again."}
        </div>
    );
};

export default EmailInput;
