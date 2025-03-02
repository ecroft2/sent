import { useState, useCallback } from "react";

import { getAuth, validatePassword } from "firebase/auth";
import "../../firebase";

const useValidatePassword = () => {
    const [validationStatus, setValidationStatus] = useState({
        errorCode: null,
    });

    const validate = useCallback(async (password) => {
        const {
            containsLowercaseLetter,
            containsUppercaseLetter,
            containsNonAlphanumericCharacter,
            containsNumericCharacter,
            meetsMinPasswordLength,
        } = await validatePassword(getAuth(), password);

        const requirements = {
            containsLowercaseLetter,
            containsUppercaseLetter,
            containsNonAlphanumericCharacter,
            containsNumericCharacter,
            meetsMinPasswordLength,
        };

        const errors = Object.keys(requirements).filter(
            (req) => requirements[req] === false
        );

        const status = {
            errorCode: errors.length > 0 ? errors : false,
        };

        setValidationStatus((prevState) =>
            JSON.stringify(prevState) === JSON.stringify(status)
                ? prevState
                : status
        );
    }, []);

    return { validationStatus, validateInput: validate };
};

export default useValidatePassword;
