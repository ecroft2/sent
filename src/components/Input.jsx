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
    const [enableValidation, setEnableValidation] = useState(false);

    const { validationStatus: clientValidationStatus, validateInput } =
        validator(required);

    useEffect(() => {
        if (enableValidation) {
            validateInput(value);
        }
    }, [value, validateInput, enableValidation]);

    useEffect(() => {
        fieldValidationStatus({
            field: id,
            error:
                serverValidationStatus?.errorCode ||
                clientValidationStatus?.errorCode,
        });
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
                    setEnableValidation(true);
                    setValue(event.target.value);
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
