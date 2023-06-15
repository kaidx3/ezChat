import { useEffect, useState } from 'react'
import { getChatsUid } from '../../api/chatApi'

const Home = ({ auth }) => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const [chatsHtml, setChatsHtml] = useState("")

  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const getChatsData = async () => {
    if (auth.currentUser) {
      const currentUid = auth.currentUser.uid;
      const chats = await getChatsUid(currentUid);

      console.log(chats)

      chats.sort((a, b) => {
        const timeA = Date.parse(a.LatestEventDate) || 0;
        const timeB = Date.parse(b.LatestEventDate) || 0;

        if (timeA > timeB) {
          return -1;
        } else if (timeA < timeB) {
          return 1;
        }

        return 0;
      });

      let chatHtml = "";

      chats.map(chat => {
        chatHtml += `
          <a class="unstyled-link" href="/conversation/?chatId=${chat.ChatID}">
            <div class="chat-display-card">
              <div class="flex space-between">
                <h2>${chat.ChatName == "" ? chat.ChatUsernames : chat.ChatName}</h2>
                <p>${new Date(Date.parse(chat.LatestEventDate)).toLocaleString(undefined, options)}</p>
              </div>
              <p>${chat.LatestMessage}</p>
            </div>
          </a>
        `;
      })

      setChatsHtml(chatHtml)
      return
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
          <div dangerouslySetInnerHTML={{ __html: chatsHtml }}></div>
        }
      </div>
      <div id="new-chat-container" class="container">
        <a class="small-button primary-button-noshadow" id="new-chat-btn" href="/create-chat">New</a>
      </div>
    </div>
  );
}

export default Home;