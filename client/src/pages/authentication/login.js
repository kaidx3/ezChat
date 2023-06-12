import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({auth}) => {
    const [loginSuccess, setLoginSuccess] = useState(true);
    const [errors, setErrors] = useState("");

    const login = async () => {
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        if (email != "" && password != "") {
            try {
                const user = await signInWithEmailAndPassword(auth, email, password);
                window.location.href = "/home"
            }
            catch (err) {
                console.log(err);
                setLoginSuccess(false);
                if (err.message.includes("auth/wrong-password")) {
                    setErrors("Invalid password.");
                }
                else if (err.message.includes("auth/invalid-email")) {
                    setErrors("Invalid email.");
                }
                else if (err.message.includes("auth/user-not-found")) {
                    setErrors("Email not registered");
                }
                else if (err.message.includes("auth/too-many-requests")) {
                    setErrors("Too many failed attempts. Please wait or reset password.");
                }
            }
        }
        else {
            setLoginSuccess(false);
            setErrors("All fields are required.");
        }
    }

    return (
        <div class="centered-mw-40rem">
            <h1 class="text-center mt-10rem">Log In</h1>

            {
            loginSuccess ?
            <div></div>
            :
            <div>
                <p class="display-error">{errors}</p>
            </div>
            }   

            <div class="text-center mt-3rem">
            <label class="large-label" for="email">Email</label>
            <input class="large-input" type="text" id="email" name="email"></input>

            <label class="large-label" for="password">Password</label>
            <input class="large-input" type="password" id="password" name="password"></input>
            </div>
            <div class="text-center">
                <div class="w-100">
                    <button class="large-button primary-button" href="/create-account" onClick={login}>Continue</button>
                </div>
                <div class="w-100">
                    <a class="large-button" href="/create-account">Create Account</a>
                </div>
                <div class="w-100">
                <a class="bold-link" href="/reset-password">Reset Password</a>
            </div>
            </div>
        </div>
    );
}

export default Login;