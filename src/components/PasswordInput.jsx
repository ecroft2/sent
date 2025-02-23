import { useState, Fragment, useEffect } from "react";

import useValidatePassword from "../hooks/useClientValidatePassword";
import "../../firebase";

const PasswordInput = ({
    fieldValidationStatus,
    id,
    name,
    serverValidationStatus,
}) => {
    const [value, setValue] = useState("");
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const { validationStatus: clientValidationStatus, validateInput } =
        useValidatePassword();

    useEffect(() => {
        validateInput(value);
    }, [value, validateInput]);

    useEffect(() => {
        if (fieldValidationStatus) {
            fieldValidationStatus({
                field: "password",
                error:
                    serverValidationStatus?.error === true ||
                    clientValidationStatus?.error === true,
            });
        }
    }, [fieldValidationStatus, serverValidationStatus, clientValidationStatus]);

    const isPasswordRequirementMet = (errorKey) => {
        return (
            clientValidationStatus?.error === false ||
            clientValidationStatus?.errorCode?.includes(errorKey) === false
        );
    };

    return (
        <Fragment>
            <div>
                <p>Password must contain</p>

                <ul>
                    <li
                        style={{
                            color: isPasswordRequirementMet(
                                "meetsMinPasswordLength"
                            )
                                ? "green"
                                : "inherit",
                        }}
                    >
                        At least 12 characters
                    </li>
                    <li
                        style={{
                            color:
                                isPasswordRequirementMet(
                                    "containsUppercaseLetter"
                                ) &&
                                isPasswordRequirementMet(
                                    "containsLowercaseLetter"
                                )
                                    ? "green"
                                    : "inherit",
                        }}
                    >
                        Uppercase and lowercase characters
                    </li>
                    <li
                        style={{
                            color: isPasswordRequirementMet(
                                "containsNumericCharacter"
                            )
                                ? "green"
                                : "inherit",
                        }}
                    >
                        At least one number
                    </li>
                    <li
                        style={{
                            color: isPasswordRequirementMet(
                                "containsNonAlphanumericCharacter"
                            )
                                ? "green"
                                : "inherit",
                        }}
                    >
                        At least one special character
                    </li>
                </ul>
            </div>

            <label htmlFor={id}>
                Password
                <button
                    type="button"
                    onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                >
                    Toggle password
                </button>
            </label>

            <input
                id={id}
                name={name}
                onChange={(event) => setValue(event.target.value)}
                onBlur={(event) => {
                    validateInput(event.target.value);
                }}
                required
                type={passwordIsVisible ? "text" : "password"}
                value={value}
            ></input>

            {serverValidationStatus?.errorCode ===
                "auth/password-does-not-meet-requirements" &&
                "Check the requirements for the password and try again."}

            {serverValidationStatus?.errorCode === "auth/missing-password" &&
                "Password is required."}
        </Fragment>
    );
};

export default PasswordInput;
