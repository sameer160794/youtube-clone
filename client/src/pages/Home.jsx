import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import './Home.css';

const categories = ['All', 'React', 'Node.js', 'MongoDB', 'Web Dev', 'Tutorials'];

export default function Home({ searchQuery }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/videos');
        setVideos(res.data);
      } catch (err) {
        console.error('Failed to fetch videos', err);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = activeCategory === 'All' || video.category === activeCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home">
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

          {/* Video grid */}
          <div className="videos">
            {filteredVideos.length === 0 ? (
              <p>No videos found</p>
            ) : (
              filteredVideos.map((video) => <VideoCard key={video._id} video={video} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


