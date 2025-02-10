import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
  const { user, logout } = useAuth0();
  const CONTROLLER_EMAIL = import.meta.env.VITE_PUBLIC_ROOM_EMAIL;
  return (
    <>
     
      <div className="flex flex-col flex-1 gap-y-2">
        <Link
          to="/user-profile"
          className="flex bg-white items-center font-bold hover:text-[#91999E] mt-1"
        >
          User Profile
        </Link>
        <Link
          to="/show-rooms"
          className="flex bg-white items-center font-bold hover:text-[#91999E] mt-1"
        >
          Show rooms
        </Link>
        <Link
          to="/chat"
          className="flex bg-white items-center font-bold hover:text-[#91999E] mt-1"
        >
          Chat with us
        </Link>
        {user?.email === CONTROLLER_EMAIL ? (
          <Link
            to="/add-public-room"
            className="font-bold hover:text-[#91999E]"
          >
            Add Public Room
          </Link>
        ) : null}
        {user?.email === CONTROLLER_EMAIL ? (
          <Link to="/rooms-details" className="font-bold hover:text-[#91999E] ">
            Room Details
          </Link>
        ) : null}
        <Button
          onClick={() => logout()}
          className="flex items-center px-3 font-bold hover:bg-[#91999E]"
        >
          Log Out
        </Button>
      </div>
    </>
  );
};

export default MobileNavLinks;
