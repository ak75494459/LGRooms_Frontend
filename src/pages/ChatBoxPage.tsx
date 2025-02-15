import { useAccessChat, useFetchChat } from "@/api/ChatApi";
import ChatBox from "@/components/ChatBox";
import { ChatState } from "@/Context/ChatProvider";
import { useEffect, useRef, useState } from "react";

const ChatBoxPage = () => {
  const { chats, isLoading, refetch } = useFetchChat(); // `refetch` to manually trigger fetching chats
  const { setFetchChats, fetchChats } = ChatState();
  const { createChat } = useAccessChat();
  const targetId = import.meta.env.VITE_TARGET_ID;

  const isCreatingChat = useRef(false);
  const [chatCreated, setChatCreated] = useState(false);

  useEffect(() => {
    if (
      (!chats || (Array.isArray(chats) && chats.length === 0)) &&
      !isCreatingChat.current
    ) {
      isCreatingChat.current = true;
      createChat(targetId)
        .then(() => {
          setChatCreated(true); // Mark chat as created
          refetch(); // ✅ Fetch chats after chat is created
        })
        .finally(() => {
          isCreatingChat.current = false;
        });
    }
  }, [chats, createChat, targetId, refetch]);

  useEffect(() => {
    if (chatCreated && chats) {
      setFetchChats(chats); // ✅ Set fetched chats after creation
    }
  }, [chatCreated, chats, setFetchChats]);

  if (isLoading) {
    return <div>Loading chats...</div>;
  }

  return <ChatBox chats={fetchChats} isLoading={isLoading} />;
};

export default ChatBoxPage;
