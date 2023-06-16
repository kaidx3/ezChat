import { apiLink } from "./apiLink";

const searchUsername = async (username) => {
    let results = await fetch(`${apiLink}/user/searchUsername/?username=${username}`);
    let data = results.json();
    return data;
}

const createAccount = async (uid, username) => {
    console.log(3333333333333)
    let results = "unset yet"
    try {
        results = await fetch(`${apiLink}/user/createAccount`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uid: uid, username: username })
        })
    }
    catch (err) {
        console.log("ERRROCCURED")
        console.log(err)
    }
    console.log(results)
    let data = results.json();
    console.log(data)
    return data;
}

const searchUid = async (uid) => {
    let results = await fetch(`${apiLink}/user/searchUid/?uid=${uid}`);
    let data = results.json();
    return data;
}

export {searchUsername, createAccount, searchUid}