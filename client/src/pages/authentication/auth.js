const Auth = () => {

    return (
        <div class="centered-mw-40rem">
            <h1 class="text-center mt-10rem">ezChat</h1>
            <p class="display-info bold">A simple chat application.</p>

            <div class="text-center mt-3rem">
                <div class="w-100">
                    <a class="large-button primary-button" href="/create-account">Create Account</a>
                </div>
                <div class="w-100">
                    <a class="large-button secondary-button" href="/login">Log In</a>
                </div>
            </div>
        </div>
    );
}

export default Auth;