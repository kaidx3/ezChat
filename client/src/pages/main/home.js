import { useEffect, useState } from 'react'
import { getChatsUid } from '../../api/chatApi'

const Home = ({ auth }) => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const [chats, setChats] = useState([]);

  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const getChatsData = async () => {
    if (auth.currentUser) {
      const currentUid = auth.currentUser.uid;
      const chats = await getChatsUid(currentUid);

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

      setChats(chats);
      console.log(chats)
      return;
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
    <div className="container">
      <div className="centered-mw-40rem">
        <h1 className="text-center">Conversations</h1>

        <div className="centered-mw-40rem text-center">
          <label htmlFor="search-conversations" className="visually-hidden"></label>
          <input type="text" className="large-input" placeholder="Search Conversations" id="search-conversations" name="search-conversations"></input>
        </div>

        {
          chats.map((chat, index) => {
            return (
              <a className="unstyled-link" href={`/conversation/?chatId=${chat.ChatID}`} key={index}>
                <div className="chat-display-card">
                  <div className="flex space-between">
                    <h2>{chat.ChatName == "" ? chat.ChatUsernames : chat.ChatName}</h2>
                    <p>{new Date(Date.parse(chat.LatestEventDate)).toLocaleString(undefined, options)}</p>
                  </div>
                  <p>{chat.LatestMessage}</p>
                </div>
              </a>
            )
          })
        }
        
      </div>
      <div id="new-chat-container" className="container">
        <a className="small-button primary-button-noshadow" id="new-chat-btn" href="/create-chat">New</a>
      </div>
    </div>
  );
}

export default Home;