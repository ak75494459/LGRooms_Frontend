import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PublicRoomChatButton = () => {
  const naviagte = useNavigate();

  const { isAuthenticated } = useAuth0();
  const shareUrlToChat = window.location.href;
  const handleChat = () => {
    if (!isAuthenticated) {
      toast.error("Please Log In for chat");
      return;
    }
    if (isAuthenticated) {
      naviagte("/chat", { state: { shareUrl: shareUrlToChat } });
    }
  };

  return (
    <Button
      className="flex m-2 px-10 w-full items-center py-5 justify-center py-6 "
      onClick={handleChat}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-message-square-text"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M13 8H7" />
        <path d="M17 12H7" />
      </svg>
      <div className="font-bold ">Chat for this room</div>
    </Button>
  );
};

export default PublicRoomChatButton;
