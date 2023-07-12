import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId, isPlaying }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  const onPlayerReady = event => {
    playerRef.current = event.target;
    if (!isPlaying) {
      playerRef.current.pauseVideo();
    }
  };

  return (
    <YouTube videoId={videoId} onReady={onPlayerReady} />
  );
};

export default YouTubePlayer;
