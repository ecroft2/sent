import "../firebase";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Fragment, useEffect, useState } from "react";
import PasswordInput from "./components/PasswordInput";
import EmailInput from "./components/EmailInput";

const Form = () => {
    const auth = getAuth();

    const onFieldValidation = (field, status) => {
        setFieldValidation((prevState) => {
            if (prevState[field] !== status) {
                return {
                    ...prevState,
                    [field]: status,
                };
            }

            return prevState;
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;

                if (errorCode === "auth/password-does-not-meet-requirements") {
                    setErrorMessage(
                        "Check the requirements for the password and try again."
                    );
                }
            });
    };

    const [errorMessage, setErrorMessage] = useState(false);
    const [enableFormSubmit, setEnableFormSubmit] = useState(false);

    const [fieldValidation, setFieldValidation] = useState({
        email: false,
        password: false,
    });

    useEffect(() => {
        setEnableFormSubmit(
            Object.values(fieldValidation).every((field) => field === true)
        );
    }, [fieldValidation]);

    return (
        <Fragment>
            <form onSubmit={onFormSubmit}>
                <EmailInput
                    name="email"
                    id="email"
                    onValidation={(status) =>
                        onFieldValidation("email", status)
                    }
                />

                <PasswordInput
                    name="password"
                    id="password"
                    onValidation={(status) =>
                        onFieldValidation("password", status)
                    }
                />

                {errorMessage ? <p>{errorMessage}</p> : ""}

                <button disabled={!enableFormSubmit} type="submit">
                    Submit
                </button>
            </form>
        </Fragment>
    );
};

export default Form;
