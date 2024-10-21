import React, { useEffect } from "react";

const YouTubePlayer = ({ id }) => {
  useEffect(() => {
    // Function to initialize YouTube player
    const onYouTubeIframeAPIReady = () => {
      if (window.YT) {
        new window.YT.Player(`player-${id}`, {
          // Use a unique ID for each player
          videoId: id,
          playerVars: {
            autoplay: 0,
            loop: 1,
            controls: 0,
            modestbranding: 0,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              event.target.mute();
              // event.target.playVideo();
            },
          },
        });
      } else {
        console.error("YouTube IFrame API not available");
      }
    };

    // Check if the API script is already loaded
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      // Add the API ready callback to the global window object
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

      // Load the YouTube IFrame API script if not already loaded
      if (
        !document.querySelector(
          'script[src="https://www.youtube.com/iframe_api"]'
        )
      ) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [id]); // Add id as a dependency to the useEffect

  return (
    <div>
      <div className="w-full " id={`player-${id}`}></div>{" "}
    </div>
  );
};

export default YouTubePlayer;
