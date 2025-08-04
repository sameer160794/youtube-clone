import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import './ChannelPage.css';

const sampleChannel = {
  channelId: 'channel01',
  channelName: 'Code with John',
  description: 'Coding tutorials and tech reviews by John Doe.',
  channelBanner: 'https://via.placeholder.com/800x200',
  owner: 'user01',
  subscribers: 5200,
  videos: [
    {
      videoId: 'video01',
      title: 'Learn React in 30 Minutes',
      thumbnailUrl: 'https://via.placeholder.com/300x200',
      channelName: 'Code with John',
      views: 15200,
    },
    {
      videoId: 'video02',
      title: 'Node.js Crash Course',
      thumbnailUrl: 'https://via.placeholder.com/300x200',
      channelName: 'Code with John',
      views: 20100,
    },
  ],
};

export default function ChannelPage() {
  const { id } = useParams(); // channelId from route
  const user = JSON.parse(localStorage.getItem('user'));

  const isOwner = user?.userId === sampleChannel.owner;

  return (
    <div className="channel-page">
      <img className="channel-banner" src={sampleChannel.channelBanner} alt="Banner" />

      <div className="channel-info">
        <h2>{sampleChannel.channelName}</h2>
        <p>{sampleChannel.description}</p>
        <p>Subscribers: {sampleChannel.subscribers}</p>

        {isOwner && <button>Edit Channel</button>}
      </div>

      <div className="channel-videos">
        <h3>Videos</h3>
        <div className="video-grid">
          {sampleChannel.videos.map((video) => (
            <div key={video.videoId} className="video-with-actions">
              <VideoCard video={video} />
              {isOwner && (
                <div className="video-actions">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
