import { Link } from 'react-router-dom';
import './VideoCard.css';

export default function VideoCard({ video }) {
  return (
    <Link to={`/video/${video.videoId}`} className="video-card-link">
      <div className="video-card">
        <img src={video.thumbnailUrl} alt={video.title} />
        <div className="video-info">
          <div className="video-title">{video.title}</div>
          <div className="video-channel">{video.channelName}</div>
          <div className="video-views">{video.views.toLocaleString()} views</div>
        </div>
      </div>
    </Link>
  );
}
