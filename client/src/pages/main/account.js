import { useState, useEffect } from "react";
import { searchUid } from "../../api/userApi";

const Account = ({auth}) => {
    const [authLoaded, setAuthLoaded] = useState(false);
    const [username, setUsername] = useState("")

    const getAccountData = async () => {
        let uid = await auth.currentUser.uid
        let username = await searchUid(uid)
        username = username[0].Username
        setUsername(username)
    }

    useEffect(() => {
        const checkAuthState = async () => {
            await auth.onAuthStateChanged((user) => {
                if (user) {
                    setAuthLoaded(true);
                }
            });
        };

        checkAuthState();
    }, []);

    useEffect(() => {
        if (authLoaded) {
            getAccountData();
        }
    }, [authLoaded]);

    return (
        <div className="centered-mw-40rem">
            <h1 className="text-center">{username}</h1>
            <div className="text-center">
                <a className="large-button primary-button" href="/reset-password">Reset Password</a>
            </div>
        </div>
    );
}

export default Account;