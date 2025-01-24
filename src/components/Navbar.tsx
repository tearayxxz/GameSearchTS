import { Link } from "react-router-dom";
import NavLogo from "../images/NavLogo.svg";

export default function Navbar() {
  return (
    <div className="shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.1)] transition-all bg-white">
      <div className="max-w-[1127px] mx-auto">
        <Link to="/" className="flex items-center justify-start ml-4">
          <img src={NavLogo} alt="NavLogo" className="w-36 lg:w-40 transition-all"/>
        </Link>
      </div>
    </div>
  );
}
