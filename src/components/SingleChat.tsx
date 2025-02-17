import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { useAllMessages, useSendMessage } from "@/api/MessageApi";
import { useGetMyUser, useUpdateIsChatSelected } from "@/api/MyUserApi";
import { MessageType } from "@/types";
import { io } from "socket.io-client";
import { ChatState } from "@/Context/ChatProvider";

type Props = {
  url: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const socket = io(API_BASE_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
});

const SingleChat = ({ url }: Props) => {
  const { currentUser, currentLoading } = useGetMyUser();
  const { sendMessages } = useSendMessage();
  const [newMessage, setNewMessage] = useState(url);
  const [message, setMessage] = useState<MessageType[]>([]);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);
  const { selectedChat, setNotification, setActiveChatId, activeChatId } =
    ChatState();
  const { messages } = useAllMessages(selectedChat._id);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const { isChatSelected } = useUpdateIsChatSelected();

  useEffect(() => {
    if (!currentUser) return;

    socket.emit("setup", currentUser);
    socket.on("connected", () => setSocketConnected(true));

    return () => {
      socket.off("connected");
    };
  }, [currentUser]);
  useEffect(() => {
    const handleDisconnect = () => {
      console.log("User is disconnecting...");
      socket.emit("user_disconnected", currentUser?._id);
      isChatSelected(false); // Update state/API before closing
      socket.disconnect();
    };

    window.addEventListener("beforeunload", handleDisconnect);

    return () => {
      window.removeEventListener("beforeunload", handleDisconnect);
    };
  }, [currentUser]);

  useEffect(() => {
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    if (socket && selectedChat?._id) {
      socket.emit("join chat", selectedChat._id);
    }
  }, [selectedChat]);
  useEffect(() => {
    if (selectedChat?._id) {
      setActiveChatId(selectedChat._id);
      socket.emit("join chat", selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (scrollEndRef.current) {
      scrollEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setMessage(messages);
    }
  }, [messages]);

  useEffect(() => {
    socket.on("message received", async (newMessageReceived: MessageType) => {
      if (selectedChat._id !== newMessageReceived.chat._id) {
        setNotification((prev) => {
          if (!prev.some((msg) => msg._id === newMessageReceived._id)) {
            return [newMessageReceived, ...prev];
          }
          return prev;
        });
      } else {
        setMessage((prev) => [...prev, newMessageReceived]);
      }
    });

    return () => {
      socket.off("message received");
    };
  }, [selectedChat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerlength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerlength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerlength);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      socket.emit("stop typing", selectedChat._id);
      if (!newMessage.trim()) return;

      try {
        const sentMessage = await sendMessages({
          content: newMessage,
          chatId: selectedChat._id,
          selectedChatId: activeChatId,
        });
        socket.emit("new message", sentMessage);
        setMessage((prev) => [...prev, sentMessage]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  if (currentLoading || !currentUser) {
    return <div>Loading...</div>;
  }

  const getSender = (loggedUser: any, users: any) => {
    const sender = users[0]._id === loggedUser._id ? users[1] : users[0];
    return sender.name ? sender.name : sender.email;
  };

  return (
    <div className="m-2 my-5 border shadow h-full w-full p-3 rounded flex flex-col shadow-lg static max-md:mx-0 ">
      <div className="flex">
        <div className="bg-gray-50 text-black font-bold p-1 px-3 m-3 rounded">
          {getSender(currentUser, selectedChat.users)}
        </div>
      </div>
      <div className="flex-grow bg-white flex flex-col p-3 overflow-y-scroll  h-[20rem] w-full">
        {message.map((m, i) => (
          <div key={m._id || i} className="message mx-2 my-1">
            <span
              style={{
                backgroundColor:
                  m.sender._id === currentUser._id ? "#BEE3F8" : "#B9F5D0",
                float: m.sender._id === currentUser._id ? "right" : "left",
                marginTop: "10px",
                borderRadius: "20px",
                padding: "10px 15px",
                maxWidth: "70%",
                display: "block",
                wordWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                clear: "both",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
        <div ref={scrollEndRef} />
      </div>
      {isTyping ? (
        <svg
          className="bg-white mb-3 ml-5"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="10"
          viewBox="0 0 120 30"
          fill="none"
        >
          <circle cx="15" cy="15" r="15" fill="#999">
            <animate
              attributeName="r"
              from="15"
              to="15"
              begin="0s"
              dur="0.8s"
              values="15;9;15"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="60" cy="15" r="9" fill="#999">
            <animate
              attributeName="r"
              from="9"
              to="9"
              begin="0.2s"
              dur="0.8s"
              values="9;15;9"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="105" cy="15" r="15" fill="#999">
            <animate
              attributeName="r"
              from="15"
              to="15"
              begin="0.4s"
              dur="0.8s"
              values="15;9;15"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      ) : (
        <></>
      )}
      <div className="mt-auto bg-gray-100 p-3">
        <Input
          className="w-fullbg-white"
          type="text"
          placeholder="Type your message and press Enter"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default SingleChat;
