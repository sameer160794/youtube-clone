import { useParams } from 'react-router-dom';
import Header from '../components/Header'; // make sure header is included
import RecommendedVideoCard from '../components/RecommendedVideoCard'; // create this new component
import './VideoPlayer.css';

const sampleVideo = {
  videoId: 'video01',
  title: 'Learn React in 30 Minutes',
  description: 'A quick tutorial to get started with React.',
  channelName: 'Code with John',
  channelAvatar: 'https://via.placeholder.com/48',
  subscribers: 5200,
  views: 15200,
  likes: 1023,
  dislikes: 45,
  comments: [
    {
      commentId: 'comment01',
      userId: 'user02',
      text: 'Great video! Very helpful.',
      timestamp: '2024-09-21T08:30:00Z',
    },
  ],
};

const recommendedVideos = [
  {
    videoId: 'video02',
    title: 'React Hooks Explained',
    thumbnailUrl: 'https://via.placeholder.com/120x70',
    description: 'A quick intro to React Hooks.',
    channelName: 'Code with John',
    views: 10500,
  },
  {
    videoId: 'video03',
    title: 'Advanced React Patterns',
    thumbnailUrl: 'https://via.placeholder.com/120x70',
    description: 'Learn advanced React component patterns.',
    channelName: 'Dev with Mike',
    views: 8700,
  },
  // Add more recommended videos here
];

export default function VideoPlayer() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <div className="video-player-page">
        <div className="main-video-section">
          <div className="video-container">
            <iframe
              title="video"
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              frameBorder="0"
              allowFullScreen
            />
          </div>

          <div className="video-info">
            <h2>{sampleVideo.title}</h2>
            <p>{sampleVideo.views.toLocaleString()} views</p>

            <div className="channel-info">
              <img
                src={sampleVideo.channelAvatar}
                alt="Channel Avatar"
                className="channel-avatar"
              />
              <div className="channel-meta">
                <strong>{sampleVideo.channelName}</strong>
                <p>{sampleVideo.subscribers.toLocaleString()} subscribers</p>
              </div>
              <button className="subscribe-btn">Subscribe</button>
            </div>

            <div className="actions">
              <button>👍 {sampleVideo.likes}</button>
              <button>👎 {sampleVideo.dislikes}</button>
            </div>

            <p>{sampleVideo.description}</p>
          </div>

          {/* Comments section... */}
          <div className="comments">
            <h3>Comments</h3>
            <form>
              <input type="text" placeholder="Add a comment..." />
              <button type="submit">Post</button>
            </form>

            <ul>
              {sampleVideo.comments.map((c) => (
                <li key={c.commentId}>
                  <strong>{c.userId}:</strong> {c.text}
                  <span> ({new Date(c.timestamp).toLocaleString()})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended videos on right */}
        <aside className="recommended-videos">
          {recommendedVideos.map((video) => (
            <RecommendedVideoCard key={video.videoId} video={video} />
          ))}
        </aside>
      </div>
    </>
  );
}
