import { useState, useRef, useEffect } from 'react';
import { createChat as createDbChat } from '../../api/chatApi';
import { searchUsername } from "../../api/userApi";

const CreateChat = ({auth}) => {
    const [errors, setErrors] = useState("");
    const [createErrors, setCreateErrors] = useState("")
    const [members, setMembers] = useState([]);
      
    const addMember = async () => {
        let currentUid = await auth.currentUser.uid;
        let username = document.querySelector("#username").value;
        let search = await searchUsername(username);
        if (search.length < 1) {
            setErrors("User not found.");
        } else if (members.some((member) => member.uid === search[0].AccountID)) {
            setErrors("Member already added.");
        } else if (search[0].AccountID === currentUid) {
            setErrors("That's you...");
        } else {
            setErrors("");
            const updatedMembers = [...members, { username: username, uid: search[0].AccountID }];
            setMembers(updatedMembers);
            document.querySelector("#username").value = ""
        }
    };
        
    const createChat = async () => {
        let currentUid = await auth.currentUser.uid;
        let name = document.querySelector("#name").value;
        if (name.length > 80) {
            setCreateErrors("Chat name must be 80 characters or less.");
        } else {
            const updatedMembers = [...members, { username: "username", uid: currentUid }];
            setMembers(updatedMembers);
            await createDbChat(updatedMembers, name);
            window.location.href = "/home"
        }
    };

    return (
    <div class="container">
        <div class="centered-mw-40rem">
            <h1 class="text-center">Create Chat</h1>

            <div class="text-center">
                <h2 class="label-header mx-0">Add Members</h2>
                
                {
                    errors == "" ?
                    <div></div>
                    :
                    <div>
                        <p class="display-error">{errors}</p>
                    </div>
                }

                <div class="member-list flex justify-center gap-1 centered-mw-40rem flex-wrap" id="member-list">

                {
                    members.map((member) => <p>{member.username}</p>)
                }

                </div>
            </div>

            <div class="centered flex">
                <label for="username" class="visually-hidden">Username</label>
                <input class="large-input" placeholder="Username" id="username" name="username"></input>
            </div>

            <div class="centered flex">
                <button class="large-button primary-button" onClick={addMember}>Add</button>
            </div>

            <h2 class="label-header text-center mx-0">Name Chat</h2>

            {
                createErrors == "" ?
                <div></div>
                :
                <div>
                    <p class="display-error">{createErrors}</p>
                </div>
            }

            <p class="text-center">Leave blank to display names.</p>
            <div class="centered flex">
                <label for="name" class="visually-hidden">Name</label>
                <input class="large-input" placeholder="Name" id="name" name="name"></input>
            </div>

            <div class="centered flex">
                <button class="large-button primary-button" id="create-chat-btn" onClick={createChat}>Create</button>
            </div>
            <div class="centered flex">
                <a class="large-button secondary-button" href="/home">Cancel</a>
            </div>
        </div>
    </div>
    );
}

export default CreateChat;