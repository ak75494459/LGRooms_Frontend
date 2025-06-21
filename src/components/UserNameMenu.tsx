import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Notification from "./Notification";
import { useGetMyUser } from "@/api/MyUserApi";

const UserNameMenu = () => {
  const { user, logout } = useAuth0();
  const { currentUser } = useGetMyUser();
  const targetId = import.meta.env.VITE_TARGET_ID;
  return (
    <>
      <Notification />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center px-3 font-bold gap-2">
          <CircleUserRound className="text-black" />

          <span className=" hover:underline"> {user?.email}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link
              to="/user-profile"
              className="font-bold hover:text-[#91999E] m-auto"
            >
              User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              to="/show-rooms"
              className="font-bold hover:text-[#91999E] m-auto"
            >
              Show Rooms
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/chat" className="font-bold hover:text-[#91999E] m-auto">
              Chat with us
            </Link>
          </DropdownMenuItem>
          {currentUser?._id === targetId ? (
            <DropdownMenuItem>
              <Link
                to="/add-public-room"
                className="font-bold hover:text-[#91999E] m-auto"
              >
                Add Public Room
              </Link>
            </DropdownMenuItem>
          ) : null}
          {currentUser?._id === targetId ? (
            <DropdownMenuItem>
              <Link
                to="/rooms-details"
                className="font-bold hover:text-[#91999E] m-auto"
              >
                Room Details
              </Link>
            </DropdownMenuItem>
          ) : null}
          <Separator />
          <DropdownMenuItem>
            <Button
              className="flex font-bold flex-1 bg-black"
              onClick={() => logout()}
            >
              Log Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserNameMenu;
