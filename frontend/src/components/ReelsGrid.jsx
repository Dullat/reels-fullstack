import React from "react";
import ReelItem from "./ReelItem";

const ReelsGrid = ({ reels }) => {
  const [showReelBox, setShowReelBox] = React.useState(false);
  const [boxReelData, setBoxReelData] = React.useState(null);

  const onReelClick = (reel) => {
    setBoxReelData(reel);
    setShowReelBox(true);
  };
  return !reels ? (
    <p>No reels</p>
  ) : (
    <div>
      <div className={`grid grid-cols-3 gap-2`}>
        {reels.map((reel) => (
          <div
            onClick={() => onReelClick(reel)}
            key={reel._id}
            className={`w-full cursor-pointer relative`}
            style={{
              backgroundImage: `url('${reel.thumbnail}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              aspectRatio: "3/5",
            }}
          ></div>
        ))}
      </div>

      {showReelBox ? (
        <div
          className={`absolute inset-0 flex`}
          style={{ background: "rgba(0,0,0,.8)" }}
        >
          <div className="p-4 h-[70%] my-auto w-full relative">
            <ReelItem
              reel={boxReelData}
              index={0}
              isGloballyMuted={false}
              fromProfile={true}
            />
            <button
              className="absolute bottom-[-4rem] bg-white left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center text-2xl font-bold text-black cursor-pointer"
              onClick={() => setShowReelBox(false)}
            >
              X
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReelsGrid;
