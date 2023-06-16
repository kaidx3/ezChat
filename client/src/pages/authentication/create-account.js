import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { searchUsername, createAccount as createAcountDB } from "../../api/userApi";

const CreateAccount = ({auth}) => {
    const [createSuccess, setCreateSuccess] = useState(true);
    const [errors, setErrors] = useState("");

    const createAccount = async () => {
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let username = document.querySelector("#username").value;

        if (email != "" && password != "" && username != "" && username.length >= 2) {
            let usernameSearch = await searchUsername(username);
            if (usernameSearch.length > 0) {
                setErrors("Username already taken.");
                return;
            }
            try {
                const user = await createUserWithEmailAndPassword(auth, email, password);
                try {
                    console.log(22222)
                    console.log(user.user.uid)
                    console.log(username)
                    await createAcountDB(user.user.uid, username);
                    user.user.displayName = username;
                    window.location.href = "/home";
                }
                catch (err) {
                    console.log(err)
                }

            }
            catch (err) {
                setCreateSuccess(false);
                if (err.message.includes("auth/email-already-in-use")) {
                    setErrors("Email already registered.");
                }
                else if (err.message.includes("auth/invalid-email")) {
                    setErrors("Invalid email.");
                }
                else if (err.message.includes("auth/weak-password")) {
                    setErrors("Password must be at least 6 characters.");
                }
            }
        }
        else if (username.length < 2 && email != "" && password != "" && username != "") {
            setCreateSuccess(false);
            setErrors("Username must be at least 2 chars long.");
        }
        else {
            setCreateSuccess(false);
            setErrors("All fields are required.");
        }
    }

    return (
    <div className="centered-mw-40rem">
        <h1 className="text-center mt-10rem">Create Account</h1>
        {
            createSuccess ?
            <div></div>
            :
            <div>
                <p className="display-error">{errors}</p>
            </div>
        }

        <div className="text-center mt-3rem">
            <label className="large-label" htmlFor="email">Email</label>
            <input className="large-input" type="text" id="email" name="email"></input>

            <label className="large-label" htmlFor="username">Username</label>
            <input className="large-input" type="text" id="username" name="username"></input>

            <label className="large-label" htmlFor="password">Password</label>
            <input className="large-input" type="password" id="password" name="password"></input>
        </div>

        <div className="text-center">
            <div className="w-100">
                <button className="large-button primary-button" href="/create-account" onClick={createAccount}>Continue</button>
            </div>
            <div className="w-100">
                <a className="large-button" href="/login">Log In</a>
            </div>
        </div>
    </div>
    );
}

export default CreateAccount;