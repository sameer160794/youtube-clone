import { Link } from 'react-router-dom';
import './VideoCard.css';

export default function VideoCard({ video }) {
  return (
    <Link to={`/video/${video._id}`} className="video-card-link">
      <div className="video-card">
        <img src={video.thumbnail} alt={video.title} />
        <div className="video-info">
          <div className="video-title">{video.title}</div>
          <div className="video-channel">{video.uploader?.username || 'Unknown Channel'}</div>
          <div className="video-views">{video.views?.toLocaleString?.() || 0} views</div>
        </div>
      </div>
    </Link>
  );
}
