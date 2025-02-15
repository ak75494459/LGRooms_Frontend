import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import SingleChat from "./SingleChat";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { ChatState } from "@/Context/ChatProvider";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useClearNotification } from "@/api/NotificationApi";
import { useGetMyUser, useUpdateIsChatSelected } from "@/api/MyUserApi";

type Props = {
  isLoading: boolean;
  chats: any;
};

const ChatBox = ({ isLoading, chats }: Props) => {
  const [url, setUrl] = useState("");
  const location = useLocation();
  const shareUrl = location.state?.shareUrl;
  const { isAuthenticated } = useAuth0();
  const { selectedChat, setSelectedChat } = ChatState();
  const { notification, setNotification } = ChatState();
  const { currentUser } = useGetMyUser();
  const targetId = import.meta.env.VITE_TARGET_ID;
  const { deleteNotification } = useClearNotification();
  const { isChatSelected } = useUpdateIsChatSelected();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (!selectedChat) {
      isChatSelected(false);
    }
  }, []);

  const handleSelectChat = async (chat: any) => {
    setSelectedChat(chat);
    setUrl(shareUrl);
    deleteNotification();
    await isChatSelected(true);

    if (!isAuthenticated) {
      toast.error("login to chat");
    }
  };

  return (
    <>
      {currentUser?._id === targetId ? (
        <HoverCard>
          <HoverCardTrigger>
            {notification.length > 0 ? (
              <span className="bg-red-600 relative bottom-5 left-8 rounded-xl p-1 text-[10px]">
                {notification.length}
              </span>
            ) : null}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill=""
              stroke="#0d0c0c"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-bell mb-5 ml-2 cursor-pointer inline"
            >
              <path d="M10.268 21a2 2 0 0 0 3.464 0" />
              <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
            </svg>
          </HoverCardTrigger>
          {notification.length > 0 ? (
            <HoverCardContent className="ml-2 cursor-pointer overflow-y-scroll h-[20rem]">
              {notification.map((notification, index) => (
                <Link
                  to="#"
                  onClick={() => handleSelectChat(notification.chat)}
                  className="flex flex-col text-[10px] bg-gray-300 m-2 p-2 rounded shadow break-words break-all whitespace-pre-wrap"
                  key={index}
                >
                  {notification.sender.email} - {notification.content}
                </Link>
              ))}

              <div
                className="underline font-bold flex justify-end"
                onClick={() => setNotification([])}
              >
                clear
              </div>
            </HoverCardContent>
          ) : null}
        </HoverCard>
      ) : null}
      <div className="overflow-x-scroll  flex">
        {chats?.map((chat: any, index: number) => (
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
      {selectedChat ? <SingleChat url={url} /> : null}
    </>
  );
};

export default ChatBox;
