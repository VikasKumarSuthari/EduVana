import React from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";

function VideoPlayer({ videoUrl }) {
  return (
    <div className="video-player">
      <h3>Video Lesson</h3>
      <div className="video-container">
        <ReactPlayer 
          url={videoUrl} 
          controls 
          className="react-player"
          width="100%" 
          height="auto" 
        />
      </div>
    </div>
  );
}

export default VideoPlayer;
