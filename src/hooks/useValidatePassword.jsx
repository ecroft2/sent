import { useState } from "react";

import { getAuth, validatePassword } from "firebase/auth";
import "../../firebase";

const useValidatePassword = () => {
    const [validationStatus, setValidationStatus] = useState();

    const validate = async (password) => {
        const {
            containsLowercaseLetter,
            containsUppercaseLetter,
            containsNonAlphanumericCharacter,
            containsNumericCharacter,
            meetsMinPasswordLength,
        } = await validatePassword(getAuth(), password);

        setValidationStatus({
            containsLowercaseLetter,
            containsUppercaseLetter,
            containsNonAlphanumericCharacter,
            containsNumericCharacter,
            meetsMinPasswordLength,
        });
    };

    return { validationStatus, validateField: validate };
};

export default useValidatePassword;
