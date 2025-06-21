import { useAuth0 } from "@auth0/auth0-react";
import UserNameMenu from "./UserNameMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <UserNameMenu />
      ) : (
        <div
          className="font-bold  hover:underline  cursor-pointer"
          onClick={async () => {
            await loginWithRedirect();
          }}
        >
          Log In
        </div>
      )}
    </span>
  );
};

export default MainNav;
