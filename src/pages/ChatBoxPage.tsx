import { useAccessChat, useFetchChat } from "@/api/ChatApi";
import ChatBox from "@/components/ChatBox";
import { ChatState } from "@/Context/ChatProvider";
import { useEffect, useRef } from "react";

const ChatBoxPage = () => {
  const { chats, isLoading } = useFetchChat();
  const { setFetchChats } = ChatState();
  const { createChat } = useAccessChat();
  const targetId = import.meta.env.VITE_TARGET_ID;

  // 🔥 Use a ref to track chat creation status
  const isCreatingChat = useRef(false);

  useEffect(() => {
    if (
      (!chats || (Array.isArray(chats) && chats.length === 0)) &&
      !isCreatingChat.current
    ) {
      isCreatingChat.current = true; // Prevent duplicate calls
      createChat(targetId).finally(() => {
        isCreatingChat.current = false; // Reset after completion
      });
    }
  }, [chats, createChat, targetId]);

  useEffect(() => {
    if (chats) {
      setFetchChats(chats);
    }
  }, [chats, setFetchChats]);

  if (isLoading) {
    return <div>Loading chats...</div>;
  }

  return (
    <>
      <ChatBox isLoading={isLoading} />
    </>
  );
};

export default ChatBoxPage;
