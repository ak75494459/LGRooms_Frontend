import { MessageType } from "@/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";

import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  children: React.ReactNode;
};

interface ChatContextType {
  notification: MessageType[];
  setNotification: Dispatch<SetStateAction<MessageType[]>>;
  selectedChat: any;
  setSelectedChat: Dispatch<SetStateAction<any>>;
  fetchChats: any[];
  setFetchChats: Dispatch<SetStateAction<any[]>>;
  socket: any;
  setActiveChatId: Dispatch<SetStateAction<string>>;
  activeChatId: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const socket = io(API_BASE_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
});

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatProvider = ({ children }: Props) => {
  const { currentUser } = useGetMyUser();

  const [notification, setNotification] = useState<MessageType[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [activeChatId, setActiveChatId] = useState<any>("");
  const [fetchChats, setFetchChats] = useState<any[]>([]);

  useEffect(() => {
    if (currentUser) {
      socket.emit("setup", currentUser);
    }
  }, [currentUser]);

  return (
    <ChatContext.Provider
      value={{
        notification,
        setNotification,
        selectedChat,
        setSelectedChat,
        fetchChats,
        setFetchChats,
        socket,
        activeChatId,
        setActiveChatId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("ChatState must be used within a ChatProvider");
  }
  return context;
};

export default ChatProvider;
