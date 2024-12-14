import "./App.css";
import Folder from "./Component/Folder";

function App() {
  const folders = [
    {
      EVALUATION: [
        { Documents: ["Document1.jpg", "Document2.jpg", "Document3.jpg"] },
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
    },
  ];
  return (
    <div className="">
      {folders.map((ele, i) => {
        return (
          <div className="w-full">
            <Folder folder={ele} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
