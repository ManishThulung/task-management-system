import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import menu from "../../../assets/menu.png";
import { LogoutModalWrapper } from "../../../styles/ModalWrapper";

export default function AdminNavbar() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const showNav = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    setUser("");
    setIsOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="z-10">
      <nav className="fixed top-0 w-full bg-slate-500 items-center flex p-4">
        <div className="flex justify-between items-center w-full flex-wrap md:flex-nowrap max-md:justify-center">
          <div className="flex max-md:justify-between max-md:w-full">
            <h1 className="text-xl text-white font-bold cursor-pointer">
              Logo
            </h1>

            <button
              className="flex justify-end md:hidden ring-1 ring-black rounded"
              onClick={showNav}
            >
              <img src={menu} />
            </button>
          </div>

          <div className="flex max-md:flex-col">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                toggle ? " flex" : " hidden"
              } text-gray-900 text-xl hover:text-gray-300 mx-auto md:mx-0 md:flex md:mt-0 items-center justify-center font-medium  px-1 p-2 rounded-lg mt-4 w-24`}
            >
              Logut
            </button>

            <button
              className={`${
                toggle ? " flex" : " hidden"
              } text-indigo-800 hover:bg-gray-300 mx-auto md:mx-0 md:flex md:mt-0 items-center justify-center font-medium bg-gray-100 px-1 p-2 rounded-lg mt-4 w-24`}
            >
              <Link to="/app/me">Profile</Link>
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <LogoutModalWrapper
          title={"Logout"}
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          onOk={handleLogout}
          className="w-[800px]"
        >
          <p>Are you sure you want to logout?</p>
        </LogoutModalWrapper>
      )}
    </div>
  );
}
