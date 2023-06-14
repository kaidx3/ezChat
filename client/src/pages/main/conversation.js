const Conversation = () => {

    return (
        <div class="centered-mw-40rem">
            <h1 class="text-center">Other User</h1>

            <div id="messages">

            </div>

            <div id="messageInput" class="flex centered">
                <textarea type="text" class="large-input" placeholder="Message"></textarea>
                <button class="small-button primary-button ms-1rem">Send</button>
            </div>
        </div>
    );
}

export default Conversation;