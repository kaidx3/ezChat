const Home = () => {
    return (
    <div class="container">
        <div class="centered-mw-40rem">
            <h1 class="text-center">Conversations</h1>

            <div class="centered-mw-40rem text-center">
                <label for="search-conversations" class="visually-hidden"></label>
                <input type="text" class="large-input" placeholder="Search Conversations" id="search-conversations" name="search-conversations"></input>
            </div>

            <div class="chat-display-card">
                <h2>KaidenX04</h2>
                <p>Latest message. Latest message. Latest message. Latest message.</p>
            </div>
            <div class="chat-display-card">
                <h2>Lukas</h2>
                <p>Latest message. Latest message. Latest message. Latest message.</p>
            </div>
            <div class="chat-display-card">
                <h2>Malaki</h2>
                <p>Latest message. Latest message. Latest message. Latest message.</p>
            </div>
            <div class="chat-display-card">
                <h2>Dad</h2>
                <p>Latest message. Latest message. Latest message. Latest message.</p>
            </div>
            <div class="chat-display-card">
                <h2>Dad</h2>
                <p>Latest message. Latest message. Latest message. Latest message.</p>
            </div>
            <div class="chat-display-card">
                <h2>Dad</h2>
                <p>Latest message. Latest message. Latest message. Latest message.</p>
            </div>
        </div>
        <div id="new-chat-container" class="container">
            <a class="small-button primary-button-noshadow" id="new-chat-btn" href="/create-chat">New</a>
        </div>
    </div>
    );
}

export default Home;