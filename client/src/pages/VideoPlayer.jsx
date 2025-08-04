import { useParams } from 'react-router-dom';
import './VideoPlayer.css';

const sampleVideo = {
  videoId: 'video01',
  title: 'Learn React in 30 Minutes',
  description: 'A quick tutorial to get started with React.',
  channelName: 'Code with John',
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

export default function VideoPlayer() {
  const { id } = useParams(); // This will be 'video01', etc.

  return (
    <div className="video-player-page">
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
        <p>{sampleVideo.views} views</p>
        <p>{sampleVideo.channelName}</p>

        <div className="actions">
          <button>👍 {sampleVideo.likes}</button>
          <button>👎 {sampleVideo.dislikes}</button>
        </div>

        <p>{sampleVideo.description}</p>
      </div>

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
  );
}
