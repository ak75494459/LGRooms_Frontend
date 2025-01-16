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

const UserNameMenu = () => {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-[#91999E] gap-2">
        <CircleUserRound className="text-black" />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem >
          <Link to="/user-profile" className="font-bold hover:text-[#91999E] m-auto">
            User Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem >
          <Link to="/show-rooms" className="font-bold hover:text-[#91999E] m-auto">
            Show Rooms
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button className="flex font-bold flex-1 bg-black" onClick={()=>logout()}>Log Out</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNameMenu;
