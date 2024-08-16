import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuTable2,
  LuUser2,
  LuCog,
  LuArrowLeftFromLine,
  LuChevronLeft,
} from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { PiSparkleLight } from "react-icons/pi";
import { IoLibraryOutline } from "react-icons/io5";
import SmallFooter from "../../Small-Footer/smallfooter";

const StudentSideBar = ({ isOpen, setIsOpen }) => {
  const Menus = [
    {
      title: "Home",
      icon: <LuTable2 />,
      link: "/student/dashboard",
    },
    {
      title: "Tasks",
      icon: <FaTasks />,
      link: "/student/tasks",
    },
    {
      title: "Tools",
      icon: <PiSparkleLight />,
      link: "/student/tools",
    },
    {
      title: "Library",
      icon: <IoLibraryOutline />,
      link: "/student/library",
    },
    {
      title: "Profile",
      icon: <LuUser2 />,
      link: "/student/settings",
      gap: true,
    },
  ];

  const [userData, setUserData] = useState({});
  const [Index, setIndex] = useState(null);

  const changeIndex = (index) => {
    localStorage.setItem("sidebarIndex", index);
    setIndex(index);
  };

  const getUserData = () => {
    const sidebarIndex = localStorage.getItem("sidebarIndex");
    setIndex(sidebarIndex);
    setUserData({
      _id: "",
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
    });
  };

  const signOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    getUserData();
  }, [Index]);

  return (
    <div
      className={`${
        isOpen ? "w-60 bg-[#EAFAF4]" : "w-20"
      } flex flex-col justify-between backdrop-blur-sm bg-[#EAFAF4]/80 text-black h-[100vh] p-5 duration-300 sticky border border-secondary`}
    >
      <div>
        <LuChevronLeft
          className={`absolute text-sky-700 -right-3 top-12 bg-zinc-100 text-4xl border-secondary border rounded-full ${
            !isOpen && "rotate-180"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className="flex gap-x-4 items-center">
          <img src="" alt="unilogo" className="w-8" />
          {userData ? (
            <div>
              <h1
                className={`text-black rounded-lg origin-left font-medium text-xl duration-200 font-serif ${
                  !isOpen && "scale-0"
                }`}
              >
                {`${userData.firstName} ${userData.lastName}`}
              </h1>

              <h1
                className={`text-black rounded-lg origin-left text-sm duration-200 font-serif ${
                  !isOpen && "scale-0"
                }`}
              >
                {`${userData.email}`}
              </h1>
            </div>
          ) : (
            ""
          )}
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link key={index} to={`${Menu.link}`}>
              <li
                className={`flex rounded-md p-2 cursor-pointer bg-none text-black hover:text-primary focus:text-black text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-7" : "mt-2"} ${
                  Index == index ? "backdrop-blur-sm bg-white/70" : ""
                } `}
                onClick={() => changeIndex(index)}
              >
                {Menu.icon}
                <span
                  className={`${!isOpen && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
          <li
            onClick={() => signOut()}
            className="flex rounded-md p-2 cursor-pointer text-black hover:text-primary focus:text-black text-sm items-center gap-x-4 mt-2"
          >
            <LuArrowLeftFromLine />
            <span className={`${!isOpen && "hidden"} origin-left duration-200`}>
              Signout
            </span>
          </li>
        </ul>
        <br />
      </div>
      <div className={`${!isOpen && "hidden"}`}>
        <hr />
        <SmallFooter/>
      </div>
    </div>
  );
};

export default StudentSideBar;


