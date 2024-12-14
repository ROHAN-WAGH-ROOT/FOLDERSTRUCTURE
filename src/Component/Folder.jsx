import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { MdPlayCircle } from "react-icons/md";
import { TfiAlignLeft } from "react-icons/tfi";

export default function Folder({ folder }) {
  const [openFolder, setOpenFolder] = useState(true);
  return (
    <div className="">
      <div className="flex cursor-pointer">
        <div className="ml-2">
          {Object.keys(folder).map((key) => {
            return (
              <div>
                <div
                  className="text-black flex mr-3"
                  onClick={() => {
                    setOpenFolder((prev) => !prev);
                  }}
                >
                  {openFolder ? (
                    <IoIosArrowForward className="flex justify-center text-center m-auto mr-3" />
                  ) : (
                    <IoIosArrowDown className="flex justify-center text-center my-auto" />
                  )}
                  <div className={`${openFolder ? "" : "ml-3"}`}>{key}</div>
                </div>
                {!openFolder && (
                  <div>
                    {Object.entries(folder).map((ele) => {
                      return (
                        <div>
                          {ele[1].map((data) => {
                            if (typeof data == "string") {
                              return (
                                <div className="ml-10 flex my-auto">
                                  {data.split(".")[1] == "jpg" ? (
                                    <div className="flex my-auto mr-1">
                                      <CiImageOn />
                                    </div>
                                  ) : data.split(".")[1] == "mp4" ? (
                                    <div className="flex my-auto mr-1">
                                      <MdPlayCircle />
                                    </div>
                                  ) : data.split(".")[1] == "dmg" ? (
                                    <div className="flex my-auto mr-1">
                                      <TfiAlignLeft size={12} />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {data}
                                </div>
                              );
                            } else {
                              return (
                                <div className="ml-5">
                                  <Folder folder={data} />
                                </div>
                              );
                            }
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
