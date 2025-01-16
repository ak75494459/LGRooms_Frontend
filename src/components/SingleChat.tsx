import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { useAllMessages, useSendMessage } from "@/api/MessageApi";
import { useGetMyUser } from "@/api/MyUserApi";
import { MessageType } from "@/types";
import { io } from "socket.io-client";

type Props = {
  selectedChat: any;
  setSelectedChat: any;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const socket = io(API_BASE_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
});

const SingleChat = ({ selectedChat, setSelectedChat }: Props) => {
  const { currentUser, currentLoading } = useGetMyUser();
  const { sendMessages } = useSendMessage();
  const [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState<MessageType[]>([]);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);
  const { messages, isLoading: isMessagesLoading } = useAllMessages(
    selectedChat._id
  );

  useEffect(() => {
    if (currentUser) {
      socket.emit("setup", currentUser);
      socket.on("connected", () => console.log("Socket connected"));
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket && selectedChat?._id) {
      socket.emit("join chat", selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived: MessageType) => {
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        // Optionally handle notifications
      } else {
        setMessage((prev) => [...prev, newMessageReceived]);
      }
    });

    return () => {
      socket.off("message received");
    };
  }, [selectedChat]);

  useEffect(() => {
    if (scrollEndRef.current) {
      scrollEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setMessage(messages); // Update message state with new messages from the API
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!newMessage.trim()) return;

      try {
        const sentMessage = await sendMessages({
          content: newMessage,
          chatId: selectedChat._id,
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

  const getSender = (loggedUser: any, users: any) =>
    users[0]._id === loggedUser._id ? users[1].email : users[0].email;

  return (
    <div className="m-2 my-5 bg-gray-300 h-full w-full p-3 rounded flex flex-col">
      <div className="flex">
        <div className="bg-gray-50 text-black font-bold p-1 px-3 m-3 rounded">
          {getSender(currentUser, selectedChat.users)}
        </div>
      </div>
      <div className="flex-grow bg-white flex flex-col p-3 overflow-y-scroll h-[20rem]">
        {message.map((m, i) => (
          <div key={m._id || i} className="message mx-2 my-1">
            <span
              style={{
                backgroundColor:
                  m.sender._id === currentUser._id ? "#BEE3F8" : "#B9F5D0",
                float: m.sender._id === currentUser._id ? "right" : "left",
                marginTop: "10px",
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "70%",
                display: "inline-block",
                clear: "both",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
        <div ref={scrollEndRef} />
      </div>
      <div className="mt-auto bg-gray-50 p-3">
        <Input
          className="w-full"
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
