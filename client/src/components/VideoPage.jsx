import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';  // adjust path if needed

export default function VideoPage() {
  const { videoId } = useParams();

  return (
    <>
      <Header />
      <main style={{ padding: '20px' }}>
        <h1>Video Page</h1>
        <p>Showing video ID: <strong>{videoId}</strong></p>
        {/* Add your video player and video info here */}
      </main>
    </>
  );
}
