import React, { useState } from "react";
import Folder from "./Component/Folder";

export default function App() {
  const [folders, setFolders] = useState({
    EVALUATION: [
      { Documents: ["Document1.jpg", "Document2.jpg"] },
      { Desktop: ["Screenshot1.jpg", "videopal.mp4"] },
      {
        Downloads: [
          { Drivers: ["Printerdriver.dmg", "cameradriver.dmg"] },
          {
            Applications: [
              "Webstorm.dmg",
              "Pycharm.dmg",
              "FileZila.dmg",
              "Mattermost.dmg",
            ],
          },
          "chromedriver.dmg",
        ],
      },
    ],
  });

  const [currentActiveFolder, setCurrentActiveFolder] = useState(null); // Tracks the active folder for input

  const addFolder = (path, folderName) => {
    const paths = path.split("/"); // Split the path into parts
    const newFolders = { ...folders }; // Clone the folder structure to avoid mutation
    let current = newFolders;
  
    // Traverse through the path and find the correct folder location
    for (let i = 0; i < paths.length; i++) {
      const currentFolder = paths[i];
  
      // If we reach "EVALUATION", handle it as a special case (since it's an array)
      if (currentFolder === "EVALUATION") {
        current = current[currentFolder]; // Move to the EVALUATION array
      } else {
        // For paths beyond "EVALUATION", traverse deeper in the folder structure
        if (Array.isArray(current[currentFolder])) {
          // If it's an array, loop through the elements
          let found = false;
          for (let folder of current[currentFolder]) {
            if (folder.hasOwnProperty(currentFolder)) {
              current = folder[currentFolder]; // Move into the folder
              found = true;
              break;
            }
          }
          if (!found) {
            current[currentFolder] = {}; // If folder not found, create it
            current = current[currentFolder]; // Move into the newly created folder
          }
        } else if (current[currentFolder] && typeof current[currentFolder] === "object") {
          // If the current folder is an object, just move to the next level
          current = current[currentFolder];
        } else {
          // If currentFolder is neither an object nor array, we can't proceed
          console.error("Invalid path structure at:", currentFolder);
          return;
        }
      }
    }
  
    // Now add the new folder to the final folder in the path
    if (current && typeof current === "object") {
      if (!current[folderName]) {
        current[folderName] = []; // Add the folder as an empty array (or object) as a child
      }
    } else {
      console.error("Failed to add folder: `current` is not an object", current);
    }
  
    // Update the folder structure state with the new folder
    setFolders(newFolders); // Trigger re-render with updated folder structure
  };
  
  
  
  
  
  
  
  

  return (
    <div>
      <Folder
        folder={folders}
        folderPath="" // Root path starts as empty
        currentActiveFolder={currentActiveFolder}
        setCurrentActiveFolder={setCurrentActiveFolder}
        onAddFolder={addFolder}
      />
    </div>
  );
}
