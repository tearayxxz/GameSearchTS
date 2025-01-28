import { Link } from "react-router-dom";
import NavLogo from "../images/NavLogo.svg";

interface NavbarProps {
  sticky?: boolean;
}

export default function Navbar({ sticky = true }: NavbarProps) {
  return (
    <div
      className={`shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] transition-all ${
        sticky ? "sticky" : "fixed"
      } top-0 w-full z-50 backdrop-filter backdrop-blur-lg bg-opacity-30`}
    >
      <div className="max-w-[1127px] mx-auto">
        <Link to="/" className="flex items-center justify-start ml-4">
          <img
            src={NavLogo}
            alt="NavLogo"
            className="w-36 lg:w-40 transition-all"
          />
        </Link>
      </div>
    </div>
  );
}
