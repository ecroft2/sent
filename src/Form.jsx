import "../firebase";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Fragment, useState, useCallback } from "react";
import PasswordInput from "./components/PasswordInput";
import EmailInput from "./components/EmailInput";

const Form = () => {
    const auth = getAuth();

    const [serverValidationStatus, setServerValidationStatus] = useState({
        error: false,
        errorCode: null,
    });

    const [formValidation, setFormValidation] = useState({});

    const onFormSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                setServerValidationStatus({
                    error: false,
                    errorCode: null,
                });

                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                setServerValidationStatus({
                    error: true,
                    errorCode: error.code,
                });
            });
    };

    const onFieldValidation = useCallback(({ field, error }) => {
        setFormValidation((prevState) => {
            if (prevState[field]?.error === error) {
                return prevState;
            }

            return {
                ...prevState,
                [field]: {
                    error,
                },
            };
        });
    }, []);

    return (
        <Fragment>
            <form onSubmit={onFormSubmit}>
                <EmailInput
                    name="email"
                    id="email"
                    serverValidationStatus={serverValidationStatus}
                    fieldValidationStatus={onFieldValidation}
                    required
                />

                <PasswordInput
                    name="password"
                    id="password"
                    serverValidationStatus={serverValidationStatus}
                    fieldValidationStatus={onFieldValidation}
                    required
                />

                <button
                    disabled={
                        formValidation
                            ? Object.values(formValidation).some(
                                  (field) => field.error === true
                              )
                            : false
                    }
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </Fragment>
    );
};

export default Form;
