import { useCallback, useState } from "react";

const useValidateEmail = (isRequired) => {
    const [validationResponse, setValidationResponse] = useState();

    const validateInput = useCallback(
        (input) => {
            const formattingRegex =
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\;[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

            if (input.length === 0 && isRequired) {
                setValidationResponse({
                    isValid: false,
                    errorType: "required_field",
                });
                return;
            }

            if (formattingRegex.test(input) === true) {
                setValidationResponse({
                    isValid: true,
                });
            } else {
                setValidationResponse({
                    isValid: false,
                    errorType: "invalid_format",
                });
            }
        },
        [isRequired]
    );

    return { validationResponse, validateInput };
};

export default useValidateEmail;
