import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import './ChannelPage.css';

export default function ChannelPage() {
  const { id } = useParams(); // channelId or userId from route
  const user = JSON.parse(localStorage.getItem('user'));
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchChannelVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos`);
        const filtered = res.data.filter(video => video.uploader?._id === id);
        setVideos(filtered);

        if (filtered.length > 0) {
          setChannel({
            channelName: filtered[0].uploader.username,
            description: `${filtered[0].uploader.username}'s channel`,
            banner: 'https://via.placeholder.com/800x200',
            ownerId: filtered[0].uploader._id,
          });
        }
      } catch (err) {
        console.error('Failed to load channel videos', err);
      }
    };

    fetchChannelVideos();
  }, [id]);

  const isOwner = user?._id === channel?.ownerId;

  if (!channel) return <p>Loading channel...</p>;

  return (
    <div className="channel-page">
      <img className="channel-banner" src={channel.banner} alt="Banner" />

      <div className="channel-info">
        <h2>{channel.channelName}</h2>
        <p>{channel.description}</p>
        <p>Videos uploaded: {videos.length}</p>

        {isOwner && <button>Edit Channel</button>}
      </div>

      <div className="channel-videos">
        <h3>Videos</h3>
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video._id} className="video-with-actions">
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
