const CreateChat = () => {
    return (
    <div class="container">
        <div class="centered-mw-40rem">
            <h1 class="text-center">Create Chat</h1>

            <h2 class="label-header">Add Members</h2>
            <div class="member-list flex">
                <p>Kaiden</p>
                <p>Lukas</p>
                <p>Malaki</p>
            </div>

            <div class="centered flex">
                <label for="username" class="visually-hidden">Username</label>
                <input class="large-input" placeholder="Username" id="username" name="username"></input>
            </div>

            <div class="centered flex">
                <button class="large-button primary-button">Add</button>
            </div>

            <h2 class="label-header">Name Chat</h2>
            <div class="centered flex">
                <label for="name" class="visually-hidden">Name</label>
                <input class="large-input" placeholder="Name" id="name" name="name"></input>
            </div>

            <div class="centered flex">
                <button class="large-button primary-button" id="create-chat-btn">Create</button>
            </div>
            <div class="centered flex">
                <a class="large-button secondary-button" href="/home">Cancel</a>
            </div>
        </div>
    </div>
    );
}

export default CreateChat;