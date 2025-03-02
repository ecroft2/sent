import { Fragment, useState } from "react";
import RegisterEmailPwd from "./RegisterEmailPassword";
import RegisterName from "./RegisterName";

const Register = (props) => {
    const [stepIndex, setStepIndex] = useState(0);

    return (
        <Fragment>
            <h1>Create an account</h1>

            <h2>{stepIndex > 0 && "Customise your profile"}</h2>

            {stepIndex === 0 && (
                <RegisterEmailPwd
                    user={props.user}
                    onNext={() => setStepIndex(1)}
                />
            )}
            {stepIndex === 1 && (
                <RegisterName
                    onPrevious={() => setStepIndex(0)}
                    onNext={() => setStepIndex(2)}
                />
            )}
        </Fragment>
    );
};

export default Register;
