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
    <div class="centered-mw-40rem">
        <h1 class="text-center mt-10rem">Reset Password</h1>

        {
            resetClicked ?
                resetSuccess ?
                    <div>
                        <p class="display-info">{info}</p>
                    </div>
                :
                    <div>
                        <p class="display-error">{errors}</p>
                    </div>
            :
            <div>
            </div>
        }

        <div class="text-center mt-3rem">
            <label class="large-label" for="email">Email</label>
            <input class="large-input" type="text" id="email" name="email"></input>
        </div>

        <div class="text-center">
            <div class="w-100">
                <button class="large-button primary-button" href="/create-account" onClick={resetPassword}>Continue</button>
            </div>
            <div class="w-100">
                <a class="large-button" href="/login">Log In</a>
            </div>
        </div>
    </div>
    );
}

export default ResetPassword;