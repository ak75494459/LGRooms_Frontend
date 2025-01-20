import { useState } from "react";
import { Button } from "./ui/button";
import SingleChat from "./SingleChat";
import { useLocation } from "react-router-dom";


type Props = {
  chats: any[];
  isLoading: boolean;
};

const ChatBox = ({ chats, isLoading }: Props) => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [url, setUrl] = useState("");
  const location = useLocation();
  const shareUrl = location.state?.shareUrl;


  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSelectChat = (chat: any) => {
    setSelectedChat(chat);
    setUrl(shareUrl);
  };

  return (
    <>
      <div className="overflow-x-scroll  flex">
        {chats.map((chat: any, index: number) => (
          <Button
            className={"p-5 mx-2"}
            onClick={() => handleSelectChat(chat)}
            key={chat._id}
          >
            <span>{index + 1}</span>
            <span style={{ marginLeft: "8px" }}>Click to start Chat</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-headset"
            >
              <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
              <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
            </svg>
          </Button>
        ))}
      </div>
      {selectedChat ? (
        <SingleChat
          selectedChat={selectedChat}
          url={url}
        />
      ) : null}
    </>
  );
};

export default ChatBox;
