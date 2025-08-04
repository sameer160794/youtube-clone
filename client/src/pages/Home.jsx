import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import './Home.css';

const categories = ['All', 'React', 'Node.js', 'MongoDB', 'Web Dev', 'Tutorials'];

const sampleVideos = [
  {
    videoId: 'video01',
    title: 'Learn React in 30 Minutes',
    thumbnailUrl: 'https://via.placeholder.com/300x200',
    uploader: 'user01',
    views: 15200,
    channelName: 'Code with John',
    category: 'React',
  },
  {
    videoId: 'video02',
    title: 'Node.js Crash Course',
    thumbnailUrl: 'https://via.placeholder.com/300x200',
    uploader: 'user02',
    views: 23000,
    channelName: 'Dev with Mike',
    category: 'Node.js',
  },
  {
    videoId: 'video03',
    title: 'MongoDB for Beginners',
    thumbnailUrl: 'https://via.placeholder.com/300x200',
    uploader: 'user03',
    views: 8900,
    channelName: 'Code Base',
    category: 'MongoDB',
  },
  {
    videoId: 'video04',
    title: 'Responsive Web Design',
    thumbnailUrl: 'https://via.placeholder.com/300x200',
    uploader: 'user04',
    views: 15000,
    channelName: 'DesignX',
    category: 'Web Dev',
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredVideos =
    activeCategory === 'All'
      ? sampleVideos
      : sampleVideos.filter((video) => video.category === activeCategory);

  return (
    <div className="home">
      {/* Top header */}
      <Header />

      {/* Sidebar + Main Content */}
      <div className="content">
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="main-content">
          {/* Filter buttons */}
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                className={activeCategory === cat ? 'active' : ''}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Video cards */}
          <div className="videos">
            {filteredVideos.map((video) => (
              <VideoCard key={video.videoId} video={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
