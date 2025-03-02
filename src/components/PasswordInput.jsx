import { useState, Fragment } from "react";
import useValidatePassword from "../hooks/useClientValidatePassword";
import Input from "./Input"; // Reuse Input for the actual input field
import "../../firebase";

const PasswordInput = ({
    serverValidationStatus,
    fieldValidationStatus,
    label,
    id,
    name,
    required,
    value,
}) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const [passwordValidationStatus, setPasswordValidationStatus] =
        useState(false);

    const onFieldValidationStatus = (status) => {
        setPasswordValidationStatus((prevState) =>
            JSON.stringify(prevState) === JSON.stringify(status)
                ? prevState
                : status
        );

        fieldValidationStatus(status);
    };

    const isPasswordRequirementMet = (errorKey) => {
        if (passwordValidationStatus.error !== null) {
            if (passwordValidationStatus.error) {
                return (
                    passwordValidationStatus.error.includes(errorKey) === false
                );
            } else {
                return true;
            }
        }
    };

    return (
        <Fragment>
            <div>
                <p>Password must contain:</p>

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

            <label htmlFor={id}>{label}</label>

            <Input
                id={id}
                name={name}
                required={required}
                type={passwordIsVisible ? "text" : "password"}
                serverValidationStatus={serverValidationStatus}
                value={value}
                validator={useValidatePassword}
                fieldValidationStatus={onFieldValidationStatus}
                validationMessages={{
                    "auth/password-does-not-meet-requirements":
                        "Check the requirements for the password and try again.",
                    "auth/missing-password": "Password is required.",
                }}
            />

            <button
                type="button"
                onClick={() => setPasswordIsVisible(!passwordIsVisible)}
            >
                {passwordIsVisible ? "Hide password" : "Show password"}
            </button>
        </Fragment>
    );
};

export default PasswordInput;
