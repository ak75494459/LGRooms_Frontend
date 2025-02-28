import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <div className="border-b-2 border-b-[#91999E] py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl max-sm:text-xl font-bold tracking-tight bg-gradient-to-r from-black via-gray-600 to-gray-500 bg-clip-text text-transparent transition-all duration-300 hover:from-gray-500 hover:via-gray-600 hover:to-black"
        >
          LawGateROOms
        </Link>

        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
