import { apiLink } from "./apiLink"

const searchUsername = async (username) => {
    let results = await fetch(`${apiLink}/user/searchUsername/?username=${username}`)
    let data = results.json()
    return data
}

const createAccount = async (uid, username) => {
    let results = await fetch(`${apiLink}/user/createUser`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid: uid, username: username })
    })
    let data = results.json()
    return data
}

export {searchUsername}