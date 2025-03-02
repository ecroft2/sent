import "../../../firebase";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Fragment, useState, useCallback, useEffect } from "react";
import PasswordInput from "../../components/PasswordInput";
import Input from "../../components/Input";

import useClientValidateEmail from "../../hooks/useClientValidateEmail";

const RegisterEmailPwd = (props) => {
    const auth = getAuth();

    const [serverValidationStatus, setServerValidationStatus] = useState({
        error: null,
        errorCode: null,
    });

    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        console.log(formValidation);
    }, [formValidation]);

    const onFormSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Signed up
                setServerValidationStatus({
                    error: false,
                    errorCode: null,
                });

                props.user(auth.currentUser);
                props.onNext();
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
                <Input
                    name="email"
                    id="email"
                    label="What is your email?"
                    validator={useClientValidateEmail}
                    required={true}
                    serverValidationStatus={serverValidationStatus}
                    fieldValidationStatus={onFieldValidation}
                    validationMessages={{
                        "auth/missing-email": "Email is required.",
                        invalid_format:
                            "This field is in the incorrect format.",
                        "auth/email-already-in-use":
                            "This email is already registered. You can sign in.",
                        "auth/invalid-email":
                            "Check your email is formatted correctly and try again.",
                        required_field: "Email is required.",
                    }}
                />

                <PasswordInput
                    name="password"
                    id="password"
                    serverValidationStatus={serverValidationStatus}
                    fieldValidationStatus={onFieldValidation}
                    required
                    label="What is your password?"
                />

                <button
                    disabled={
                        formValidation
                            ? Object.values(formValidation).some(
                                  (field) => field.error !== false
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

export default RegisterEmailPwd;
