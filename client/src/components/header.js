import { signOut } from "firebase/auth"

const Header = ({auth}) => {
    const toggleVisibility = () => {
        console.log(document.querySelector(".header .content"))
        document.querySelector(".header .content").classList.toggle("visible")
    }

    const logout = async () => {
        await signOut(auth)
    }

    return (
        <div class="header">
            <div class="container flex">
                <p class="bold m-0">ezChat</p>
                <button id="menu-toggle" class="align-right invisible-button" onClick={toggleVisibility}>
                    <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2,4A1,1,0,0,1,3,3H21a1,1,0,0,1,0,2H3A1,1,0,0,1,2,4Zm1,9H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Zm0,8H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z"/></svg>
                </button>
                <div>
                    <div class="content">
                        <a class="link">Account</a>
                        <a class="link" href="/home">Home</a>
                        <a class="link">Messages</a>
                        <button class="link" onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header