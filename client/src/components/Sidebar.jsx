import { useState } from 'react';
import './Sidebar.css'; // optional styling

const categories = ['Home', 'Subscriptions', 'Shorts', 'MongoDB', 'Web Dev', 'Tutorials'];

export default function Sidebar() {
  const [active, setActive] = useState('All');

  return (
    <aside className="sidebar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={active === cat ? 'active' : ''}
          onClick={() => setActive(cat)}
        >
          {cat}
        </button>
      ))}
    </aside>
  );
}
