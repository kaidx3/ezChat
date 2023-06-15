import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = ({auth}) => {
    const [resetClicked, setResetClicked] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [errors, setErrors] = useState("");
    const [info, setInfo] = useState("");

    const resetPassword = () => {
        setResetClicked(true);
        let email = document.querySelector("#email").value;
        if (email != "") {
            sendPasswordResetEmail(auth, email);
            setResetSuccess(true);
            setInfo("Reset email sent.");
        }
        else {
            setResetSuccess(false);
            setErrors("Please enter an email.");
        }
    }

    return (
    <div className="centered-mw-40rem">
        <h1 className="text-center mt-10rem">Reset Password</h1>

        {
            resetClicked ?
                resetSuccess ?
                    <div>
                        <p className="display-info">{info}</p>
                    </div>
                :
                    <div>
                        <p className="display-error">{errors}</p>
                    </div>
            :
            <div>
            </div>
        }

        <div className="text-center mt-3rem">
            <label className="large-label" htmlFor="email">Email</label>
            <input className="large-input" type="text" id="email" name="email"></input>
        </div>

        <div className="text-center">
            <div className="w-100">
                <button className="large-button primary-button" href="/create-account" onClick={resetPassword}>Continue</button>
            </div>
            <div className="w-100">
                <a className="large-button" href="/login">Log In</a>
            </div>
        </div>
    </div>
    );
}

export default ResetPassword;