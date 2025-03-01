import {
  useClearNotification,
  useGetNotification,
} from "@/api/NotificationApi";
import { useAuth0 } from "@auth0/auth0-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useEffect } from "react";
import { ChatState } from "@/Context/ChatProvider";
import { Link } from "react-router-dom";
import { useUpdateIsChatSelected } from "@/api/MyUserApi";

const Notification = () => {
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
      <HoverCard>
        <HoverCardTrigger>
          {notifications.length > 0 && (
            <span className="bg-red-300 relative bottom-3 left-8 rounded-xl p-1 text-[10px]">
              {notifications.length}
            </span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0d0c0c"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-bell ml-2 cursor-pointer inline"
          >
            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
          </svg>
        </HoverCardTrigger>
        {notifications.length > 0 && (
          <HoverCardContent className="ml-2 max-sm:mr-6 cursor-pointer overflow-y-scroll h-[20rem]">
            {isLoading && <div>Loading...</div>}
            {notifications.length > 0 && (
              <div
                className="underline font-bold flex justify-end cursor-pointer"
                onClick={() => handleClearNotification()}
              >
                Clear
              </div>
            )}

            {notifications.map((notification: any, index: number) => (
              <Link
                to="/chat"
                onClick={() => handleRedirectToChat(notification)}
                className="flex flex-col text-[10px] bg-gray-300 m-2 p-2 rounded shadow break-words break-all whitespace-pre-wrap"
                key={index}
              >
                {notification.message?.sender.email} -{" "}
                {notification.message?.content || "No message content"}
              </Link>
            ))}
          </HoverCardContent>
        )}
      </HoverCard>
    </>
  ) : (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0d0c0c"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-bell ml-2 cursor-pointer inline"
          >
            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
          </svg>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="bg-gray-300 m-2 p-2 rounded shadow break-words break-all whitespace-pre-wrap">
            No Notification
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

export default Notification;
