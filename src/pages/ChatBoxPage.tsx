import { useFetchChat } from "@/api/ChatApi";
import ChatBox from "@/components/ChatBox";
import { ChatState } from "@/Context/ChatProvider";
import { useEffect } from "react";

const ChatBoxPage = () => {
  const { chats, isLoading } = useFetchChat();
  const { setFetchChats } = ChatState();

  useEffect(() => {
    setFetchChats(chats);
  }, [chats]);
  
  if (isLoading) {
    return <div>Loading chats...</div>; // Display a loading indicator
  }

  return (
    <>
      <ChatBox isLoading={isLoading} />
    </>
  );
};

export default ChatBoxPage;
