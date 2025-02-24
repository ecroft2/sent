import { useState, useEffect } from "react";

const Input = ({
    fieldValidationStatus,
    id,
    label,
    name,
    required,
    serverValidationStatus,
    type,
    validationMessages,
    validator,
}) => {
    const [value, setValue] = useState("");
    const [hasInteracted, setHasInteracted] = useState(false);

    const { validationStatus: clientValidationStatus, validateInput } =
        validator(required);

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
                field: id,
                validation:
                    serverValidationStatus?.errorCode ||
                    clientValidationStatus?.errorCode,
            });
        }
    }, [
        id,
        fieldValidationStatus,
        serverValidationStatus,
        clientValidationStatus,
    ]);

    const errorKey =
        serverValidationStatus?.errorCode || clientValidationStatus?.errorCode;
    const validationMessage = errorKey ? validationMessages?.[errorKey] : "";

    return (
        <div>
            <label htmlFor={id}>{label}</label>

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
                type={type}
                value={value}
            ></input>

            {validationMessage ? validationMessage : ""}
        </div>
    );
};

export default Input;
