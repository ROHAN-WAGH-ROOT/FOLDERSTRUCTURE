import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { TbBrowserPlus } from "react-icons/tb";

export default function Folder({
  folder,
  folderPath = "",
  currentActiveFolder,
  setCurrentActiveFolder,
  onAddFolder
}) {
  console.log('✌️currentActiveFolder --->', currentActiveFolder);
  const [openFolders, setOpenFolders] = useState({});
  const [folderName, setFolderName] = useState("");

  const toggleFolder = (key) => {
    setOpenFolders((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    openFolders[key] === true && setCurrentActiveFolder("");
  };

  const handleSaveFolder = () => {
    if (!folderName.trim()) return;
    setFolderName("");
    setCurrentActiveFolder("");
    onAddFolder(currentActiveFolder)
  };

  return (
    <div className="ml-2">
      {Object.keys(folder).map((key, index) => (
        <div key={index}>
          <div className="flex items-center">
            {openFolders[key] ? (
              <IoIosArrowDown
                className="mr-3 cursor-pointer"
                onClick={() => toggleFolder(key)}
              />
            ) : (
              <IoIosArrowForward
                className="mr-3 cursor-pointer"
                onClick={() => toggleFolder(key)}
              />
            )}
            <div className="flex items-center">
              {key}
              <TbBrowserPlus
                size={15}
                className="ml-2 cursor-pointer hover:text-blue-600"
                onClick={() => {
                  setCurrentActiveFolder(`${folderPath}/${key}`);
                  (openFolders[key] == undefined ||
                    openFolders[key] == false) &&
                    toggleFolder(key);
                }}
              />
            </div>
          </div>
          {openFolders[key] && (
            <div className="ml-5">
              {currentActiveFolder === `${folderPath}/${key}` && (
                <div className="ml-5 mt-2">
                  <input
                    type="text"
                    className="border border-gray-400 rounded p-1 w-48"
                    placeholder="Enter folder name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                  />
                  <button
                    className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleSaveFolder}
                  >
                    Save
                  </button>
                </div>
              )}

              {folder[key].map((item, idx) => {
                if (typeof item === "string") {
                  return (
                    <div key={idx} className="ml-5">
                      {item}
                    </div>
                  );
                } else {
                  const newPath = `${folderPath}/${key}`;
                  return (
                    <Folder
                      key={idx}
                      folder={item}
                      folderPath={newPath}
                      currentActiveFolder={currentActiveFolder}
                      setCurrentActiveFolder={setCurrentActiveFolder}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
