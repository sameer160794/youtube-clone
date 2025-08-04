import './RecommendedVideoCard.css';

export default function RecommendedVideoCard({ video }) {
  return (
    <div className="recommended-video-card">
      <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
      <div className="video-details">
        <h4 className="title">{video.title}</h4>
        <p className="channel">{video.channelName}</p>
        <p className="views">{video.views.toLocaleString()} views</p>
        <p className="description">{video.description}</p>
      </div>
    </div>
  );
}
