const Auth = () => {

    return (
        <div className="centered-mw-40rem">
            <h1 className="text-center mt-10rem">ezChat</h1>
            <p className="display-info bold">A simple chat application.</p>

            <div className="text-center mt-3rem">
                <div className="w-100">
                    <a className="large-button primary-button" href="/create-account">Create Account</a>
                </div>
                <div className="w-100">
                    <a className="large-button secondary-button" href="/login">Log In</a>
                </div>
            </div>
        </div>
    );
}

export default Auth;