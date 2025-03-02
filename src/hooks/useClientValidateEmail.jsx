import { useCallback, useState } from "react";

const useClientValidateEmail = (isRequired) => {
    const [validationStatus, setValidationStatus] = useState({
        errorCode: null,
    });

    const validate = useCallback(
        (input) => {
            const formattingRegex =
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\;[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

            let status = { errorCode: false };

            if (input.length === 0 && isRequired) {
                status = {
                    errorCode: "required_field",
                };

                setValidationStatus((prevState) =>
                    prevState?.errorCode === status.errorCode
                        ? prevState
                        : status
                );
                return;
            }

            if (formattingRegex.test(input) === false) {
                status = {
                    errorCode: "invalid_format",
                };

                setValidationStatus((prevState) =>
                    prevState?.errorCode === status.errorCode
                        ? prevState
                        : status
                );
                return;
            }

            setValidationStatus((prevState) => {
                if (prevState) {
                    if (prevState.errorCode === status.errorCode) {
                        return prevState;
                    }
                } else {
                    return status;
                }
            });
        },
        [isRequired]
    );

    return { validationStatus, validateInput: validate };
};

export default useClientValidateEmail;
