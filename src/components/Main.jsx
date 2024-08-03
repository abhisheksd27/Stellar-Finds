import React, { useState } from "react";
import Apod from "./main/Apod";
import NeoWs from "./main/NeoWs";
import Epic from "./main/Epic";

const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("Apod");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClick = (view) => {
    setSelectedView(view);
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-black dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a
              href=""
              className="flex-grow flex items-center justify-center md:justify-start"
            >
              <img
                src="https://play-lh.googleusercontent.com/pLeFHi-NlpN-zhcP4hBGA8XCLSow8-LLMEORNT7icBWzbBbY9T_fmJQ_9Y2fb9vqBdU=w240-h480-rw"
                className="h-8 me-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Stellar Finds
              </span>
            </a>
          </div>
        </div>
      </nav>

      <div className="flex flex-grow mt-16">
        <aside
          id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 bg-white border-r border-gray-200 dark:bg-black dark:border-gray-700`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-black">
            <ul className="space-y-2 font-medium">
              <li onClick={() => handleSidebarClick("Apod")}>
                <span className="ms-3 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  APOD-API
                </span>
              </li>
              <li onClick={()=> handleSidebarClick("NeoWs")}>
                <span className="ms-3 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                Asteroids - NeoWs
                </span>
              </li>
              <li onClick={()=> handleSidebarClick("Epic")}>
                <span className="ms-3 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                EPIC
                </span>
              </li>
            </ul>
          </div>
        </aside>
        

        <div className="flex-grow  text-white sm:ml-64 h-full">
          {selectedView === "Apod" && <Apod />}
          {selectedView === "NeoWs" && <NeoWs />}
          {selectedView === "Epic" && <Epic />}
        </div>
      </div>
    </div>
  );
};

export default Main;
