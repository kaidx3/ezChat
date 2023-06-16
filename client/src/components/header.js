import { signOut } from "firebase/auth"
import { leaveChat } from "../api/chatApi";

const Header = ({auth}) => {
    let params = new URLSearchParams(window.location.search);
    let chatID = params.get("chatId");

    const deleteChat = async () => {
        let uid = auth.currentUser.uid
        await leaveChat(uid, chatID);
        window.location.href = "/home";
    }

    const toggleVisibility = () => {
        console.log(document.querySelector(".header .content"))
        document.querySelector(".header .content").classList.toggle("visible")
    }

    const logout = async () => {
        await signOut(auth)
    }

    return (
        <div id="header-container">
            <div className="header">
                <div className="container flex">
                    <a href="/home" className="unstyled-link"><p className="bold m-0">ezChat</p></a>
                    <button id="menu-toggle" className="align-right invisible-button" onClick={toggleVisibility}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2,4A1,1,0,0,1,3,3H21a1,1,0,0,1,0,2H3A1,1,0,0,1,2,4Zm1,9H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Zm0,8H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z"/></svg>
                    </button>
                    <div>
                        <div className="content">

                            {
                                chatID != "" && chatID != undefined && chatID != "undefined" && chatID != null ?
                                <button className="link red" onClick={deleteChat}>Delete Opened Chat</button>
                                :
                                <div/>
                                
                            }

                            <a className="link" href="/account">Account</a>
                            <a className="link" href="/home">Home</a>
                            <button className="link" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header