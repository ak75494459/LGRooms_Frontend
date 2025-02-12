import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

import MobileNotification from "./MobileNotification";

const MobileNav = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  return (
    <div className="flex space-x-4">
      <MobileNotification />
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="text-black" />
        </SheetTrigger>
        <SheetContent className="space-y-3">
          <SheetTitle>
            {isAuthenticated ? (
              <span className="flex items-center font-bold gap-2">
                <CircleUserRound className="text-black" />
                {user?.email}
              </span>
            ) : (
              <span>Welcome to LovelyRent.com</span>
            )}
          </SheetTitle>
          <Separator />
          <SheetDescription className="flex">
            {isAuthenticated ? (
              <MobileNavLinks />
            ) : (
              <Button
                onClick={async () => await loginWithRedirect()}
                className="flex-1 font-bold text-white bg-black"
              >
                Log In
              </Button>
            )}
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
