import { useEffect, useState } from 'react'
import { getChatsUid } from '../../api/chatApi'
import { searchUid } from '../../api/userApi'
import { getLatestMessage } from '../../api/messageApi'

const Home = ({ auth }) => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const [chatsHtml, setChatsHtml] = useState("")

  const getChatsData = async () => {
    if (auth.currentUser) {
      const currentUid = auth.currentUser.uid;
      const chats = await getChatsUid(currentUid);

      let chatsWithMessage = await Promise.all(chats.map(async chat => {
        return {
          chatId: chat.chatID,
          extraChatInfo: chat.extraChatInfo,
          members: chat.members,
          latestMessage: await getLatestMessage(chat.chatID)
        };
      }));

      chatsWithMessage.sort((a, b) => {
        const timeSentA = Date.parse(a.latestMessage[0]?.TimeSent) || 0;
        const timeSentB = Date.parse(b.latestMessage[0]?.TimeSent) || 0;
        const dateCreatedA = Date.parse(a.extraChatInfo[0]?.DateCreated) || 0;
        const dateCreatedB = Date.parse(b.extraChatInfo[0]?.DateCreated) || 0;

        const combinedTimeA = Math.max(timeSentA, dateCreatedA);
        const combinedTimeB = Math.max(timeSentB, dateCreatedB);

        if (combinedTimeA > combinedTimeB) {
          return -1;
        } else if (combinedTimeA < combinedTimeB) {
          return 1;
        }

        return 0;
      });

      const getLargestDateString = (chat) => {
        const createDate = Date.parse(chat.extraChatInfo[0].DateCreated);
        const latestMessage = chat.latestMessage && chat.latestMessage[0];
        
        const options = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      
        if (latestMessage && latestMessage.TimeSent) {
          const messageDate = Date.parse(latestMessage.TimeSent);
      
          if (messageDate > createDate) {
            return new Date(messageDate).toLocaleString(undefined, options);
          } else {
            return new Date(createDate).toLocaleString(undefined, options);
          }
        } else {
          return new Date(createDate).toLocaleString(undefined, options);
        }
      };

      const htmlPromises = chatsWithMessage.map(async (chat) => {
        console.log(chat)
        const memberPromises = chat.members.map(async (member) => {
          const user = await searchUid(member);
          return user[0].Username;
        });
        const memberNames = await Promise.all(memberPromises);
        const memberNamesHTML = memberNames.map((name) => `<span>${name}</span>`).join(", ");

        return `
        <a class="unstyled-link" href="/conversation/?chatId=${chat.chatId}">
          <div class="chat-display-card">
            <div class="flex space-between">
              <h2>${chat.extraChatInfo[0].ChatName == "" ? memberNamesHTML : chat.extraChatInfo[0].ChatName}</h2>
              <p>${getLargestDateString(chat)}</p>
            </div>
            <p>${chat.latestMessage.length > 0 ? chat.latestMessage[0].MessageContent : ""}</p>
          </div>
        </a>
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