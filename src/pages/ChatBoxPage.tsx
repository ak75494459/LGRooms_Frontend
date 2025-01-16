import { useFetchChat } from "@/api/ChatApi";
import ChatBox from "@/components/ChatBox";

const ChatBoxPage = () => {
  const { chats, isLoading } = useFetchChat();
  return (
    <>
      <ChatBox chats={chats} isLoading={isLoading} />
    </>
  );
};

export default ChatBoxPage;
