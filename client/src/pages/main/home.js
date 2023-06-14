import { useEffect, useState } from 'react'
import { getChatsUid } from '../../api/chatApi'
import { searchUid } from '../../api/userApi'

const Home = ({auth}) => {
    const [chats, setChats] = useState([])
    const [authLoaded, setAuthLoaded] = useState(false);
    const [chatsHtml, setChatsHtml] = useState("")

    const getChatsData = async () => {
        if (auth.currentUser) {
          const currentUid = auth.currentUser.uid;
          const chats = await getChatsUid(currentUid);
          console.log(chats)
          setChats(chats);
      
          const htmlPromises = chats.map(async (chat) => {
            const memberPromises = chat.members.map(async (member) => {
              const user = await searchUid(member);
              return user[0].Username;
            });
            const memberNames = await Promise.all(memberPromises);
            const memberNamesHTML = memberNames.map((name) => `<span>${name}</span>`).join(", ");
            
            return `
              <div class="chat-display-card">
                <h2>${chat.extraChatInfo[0].ChatName == "" ? memberNamesHTML : chat.extraChatInfo[0].ChatName}</h2>
                <p>Latest message. Latest message. Latest message. Latest message.</p>
              </div>
            `;
          });
      
          const html = await Promise.all(htmlPromises);
          setChatsHtml(html.join(""));
        }
    };
      
    useEffect(() => {
        const checkAuthState = async () => {
            await auth.onAuthStateChanged((user) => {
            if (user) {
                setAuthLoaded(true);
            }
        });
    };
      
    checkAuthState();
    }, []);
      
    useEffect(() => {
        if (authLoaded) {
          getChatsData();
        }
    }, [authLoaded]);

    return (
    <div class="container">
        <div class="centered-mw-40rem">
            <h1 class="text-center">Conversations</h1>

            <div class="centered-mw-40rem text-center">
                <label for="search-conversations" class="visually-hidden"></label>
                <input type="text" class="large-input" placeholder="Search Conversations" id="search-conversations" name="search-conversations"></input>
            </div>

            {
                <div dangerouslySetInnerHTML={{__html: chatsHtml}}></div>
            }
        </div>
        <div id="new-chat-container" class="container">
            <a class="small-button primary-button-noshadow" id="new-chat-btn" href="/create-chat">New</a>
        </div>
    </div>
    );
}

export default Home;