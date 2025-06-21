import {
  useClearNotification,
  useGetNotification,
} from "@/api/NotificationApi";
import { useAuth0 } from "@auth0/auth0-react";

import { useEffect } from "react";
import { ChatState } from "@/Context/ChatProvider";
import { Link } from "react-router-dom";
import { useUpdateIsChatSelected } from "@/api/MyUserApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const MobileNotification = () => {
  const {
    notifications = [],
    isLoading,
    forceRefetch,
    refetch,
  } = useGetNotification();
  const { isAuthenticated } = useAuth0();
  const { socket, setSelectedChat } = ChatState();
  const { deleteNotification } = useClearNotification();
  const { isChatSelected } = useUpdateIsChatSelected();

  useEffect(() => {
    if (!socket) return; // Ensure socket exists

    const handleNewMessage = () => {
      refetch(); // ✅ Correct function to refresh notifications
    };

    socket.on("message received", handleNewMessage);

    return () => {
      socket.off("message received", handleNewMessage);
    };
  }, [socket, forceRefetch]);

  const handleClearNotification = async () => {
    try {
      await deleteNotification(); // Wait for deletion
      const result = await refetch(); // Wait for refetch
      console.log("Refetch result:", result);
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };
  const handleRedirectToChat = async (notification: any) => {
    setSelectedChat(notification.message.chat);
    await isChatSelected(true);
  };

  return isAuthenticated ? (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {notifications.length > 0 && (
            <span className="bg-red-300 relative bottom-3 left-8 rounded-xl p-1 text-[10px]">
              {notifications.length}
            </span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-bell-icon lucide-bell"
          >
            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
          </svg>
        </DropdownMenuTrigger>
        {notifications.length > 0 && (
          <DropdownMenuContent className="w-[300px] max-w-xs bg-white shadow-lg rounded-lg p-2 max-h-60 overflow-y-auto">
            {isLoading && <div>Loading...</div>}
            {notifications.length > 0 && (
              <div
                className="underline font-bold flex justify-end cursor-pointer text-sm p-2"
                onClick={() => handleClearNotification()}
              >
                Clear
              </div>
            )}
            {notifications.map((notification: any, index: number) => (
              <Link
                to="/chat"
                onClick={() => handleRedirectToChat(notification)}
                className="flex flex-col text-sm bg-gray-200 m-2 p-2 rounded shadow break-words whitespace-normal"
                key={index}
              >
                <span className="font-semibold">
                  {notification.message?.sender.email}
                </span>
                <span>
                  {notification.message?.content || "No message content"}
                </span>
              </Link>
            ))}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  ) : null;
};

export default MobileNotification;
