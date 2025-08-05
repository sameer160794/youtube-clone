import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RecommendedVideoCard from '../components/RecommendedVideoCard';
import './VideoPlayer.css';

export default function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [commentText, setCommentText] = useState('');

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const userId = user?._id || user?.id;

  // ✅ Fetch video with view increment
  const fetchVideo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/videos/${id}/viewed`);
      setVideo(res.data);
    } catch (err) {
      console.error('Error fetching video:', err);
    }
  };

  // ✅ Fetch recommended videos
  const fetchRecommended = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/videos');
      const others = res.data.filter((v) => v._id !== id);
      setRecommendedVideos(others);
    } catch (err) {
      console.error('Error fetching recommended videos:', err);
    }
  };

  // ✅ Fetch on initial load or when video ID changes
  useEffect(() => {
    fetchVideo();
    fetchRecommended();
  }, [id]);

  // ✅ Re-fetch video when login/logout happens (to update comments with usernames)
  useEffect(() => {
    if (video) {
      fetchVideo();
    }
  }, [userId]);

  const handleLike = async () => {
    if (!userId) return alert('Please log in to like the video.');
    try {
      const res = await axios.post(`http://localhost:5000/api/videos/${id}/like`, { userId });
      setVideo(res.data);
    } catch (err) {
      console.error('Error liking video:', err);
    }
  };

  const handleDislike = async () => {
    if (!userId) return alert('Please log in to dislike the video.');
    try {
      const res = await axios.post(`http://localhost:5000/api/videos/${id}/dislike`, { userId });
      setVideo(res.data);
    } catch (err) {
      console.error('Error disliking video:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!userId) return alert('Please log in to comment.');

    try {
      await axios.post(`http://localhost:5000/api/videos/${id}/comment`, {
        userId,
        text: commentText.trim(),
      });

      // ✅ Re-fetch updated video with new comments
      await fetchVideo();
      setCommentText('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  if (!video) return <p>Loading video...</p>;

  return (
    <div className="video-player-page">
      <div className="main-video-section">
        <div className="video-container">
          <iframe
            title="video"
            width="100%"
            height="400px"
            src={video.url.replace('watch?v=', 'embed/')}
            frameBorder="0"
            allowFullScreen
          />
        </div>

        <div className="video-info">
          <h2>{video.title}</h2>
          <p>{video.views?.toLocaleString() || 0} views</p>

          <div className="channel-info">
            <img
              src={'https://dummyimage.com/48x48/ccc/000.png&text=Avatar'}
              alt="Channel Avatar"
              className="channel-avatar"
            />
            <div className="channel-meta">
              <strong>{video.uploader?.username || 'Unknown Channel'}</strong>
              <p>{video.subscribers?.toLocaleString?.() || '—'} subscribers</p>
            </div>
            <button className="subscribe-btn">Subscribe</button>
          </div>

          <div className="actions">
            <button onClick={handleLike}>👍 {video.likes?.length || 0}</button>
            <button onClick={handleDislike}>👎 {video.dislikes?.length || 0}</button>
          </div>

          <p>{video.description}</p>
        </div>

        <div className="comments">
          <h3>Comments</h3>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>

          {video.comments?.length > 0 ? (
            <ul>
              {video.comments.map((c, idx) => (
                <li key={idx}>
                  <strong>
                    {typeof c.userId === 'object' && c.userId?.username
                      ? c.userId.username
                      : 'Unknown User'}
                  </strong>
                  : {c.text}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>

      <aside className="recommended-videos">
        {recommendedVideos.map((vid) => (
          <RecommendedVideoCard key={vid._id} video={vid} />
        ))}
      </aside>
    </div>
  );
}
