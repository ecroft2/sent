import { useState, Fragment, useEffect } from "react";

import useValidatePassword from "../hooks/useValidatePassword";
import "../../firebase";

const PasswordInput = (props) => {
    const [fieldValue, setFieldValue] = useState("");
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const { validationStatus, validateField } = useValidatePassword();

    const onPasswordChange = (event) => {
        const newPassword = event.target.value;
        setFieldValue(newPassword);
        validateField(newPassword);
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
        <Fragment>
            <div>
                <p>Password must contain</p>

                <ul>
                    <li
                        style={{
                            color:
                                validationStatus?.meetsMinPasswordLength &&
                                "green",
                        }}
                    >
                        At least 12 characters
                    </li>
                    <li
                        style={{
                            color:
                                validationStatus?.containsUppercaseLetter &&
                                validationStatus?.containsLowercaseLetter &&
                                "green",
                        }}
                    >
                        Uppercase and lowercase characters
                    </li>
                    <li
                        style={{
                            color:
                                validationStatus?.containsNumericCharacter &&
                                "green",
                        }}
                    >
                        At least one number
                    </li>
                    <li
                        style={{
                            color:
                                validationStatus?.containsNonAlphanumericCharacter &&
                                "green",
                        }}
                    >
                        At least one special character
                    </li>
                </ul>
            </div>

            <label htmlFor={props.id}>
                Password
                <button
                    type="button"
                    onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                >
                    Toggle password
                </button>
            </label>

            <input
                id={props.id}
                name={props.name}
                onChange={onPasswordChange}
                required
                type={passwordIsVisible ? "text" : "password"}
                value={fieldValue}
            ></input>
        </Fragment>
    );
};

export default PasswordInput;
