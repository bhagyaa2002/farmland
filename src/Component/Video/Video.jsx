import React from 'react'
import './Viedostyle.scss'


const extractVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:embed\/|watch\?v=|v\/|.+\?v=)?([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
const Video = ({ embedId }) => {
  const videoId = extractVideoId(embedId) || embedId;
  return(
    <div className="video-responsive">
      <iframe
        width="530"
        height="300"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}
export default Video