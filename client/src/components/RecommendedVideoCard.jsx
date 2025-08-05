import { Link } from 'react-router-dom';
import './RecommendedVideoCard.css';

export default function RecommendedVideoCard({ video }) {
  return (
    <Link to={`/video/${video._id}`} className="recommended-video-card">
      <img src={video.thumbnail} alt={video.title} className="thumbnail" />
      <div className="video-details">
        <h4 className="title">{video.title}</h4>
        <p className="channel">{video.uploader?.username || 'Unknown Channel'}</p>
        <p className="views">{video.views?.toLocaleString() || 0} views</p>
        <p className="description">{video.description}</p>
      </div>
    </Link>
  );
}
