import { useState, Fragment } from "react";
import Register from "./forms/Register/Register";

function App() {
    const [user, setUser] = useState(false);

    return (
        <Fragment>
            <p>{user ? user.email : "No user"}</p>
            <Register user={(user) => setUser(user)} />
        </Fragment>
    );
}

export default App;
