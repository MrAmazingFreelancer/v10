import '@app/styles.css';
import './website-player.css';
import { createPlayer } from '@videojs/react';
import { Video, VideoSkin, videoFeatures } from '@videojs/react/video';
import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

type PlaylistItem = {
  title: string;
  description: string;
  src: string;
  poster?: string;
};

const playlist: PlaylistItem[] = [
  {
    title: 'Intro Reel',
    description: 'Replace this with your own MP4 path in Apache htdocs.',
    src: '/media/intro.mp4',
    poster: '/media/intro-poster.jpg',
  },
  {
    title: 'Product Walkthrough',
    description: 'Second sample slot for your hosted video.',
    src: '/media/walkthrough.mp4',
    poster: '/media/walkthrough-poster.jpg',
  },
];

const Player = createPlayer({ features: videoFeatures });

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = useMemo(() => playlist[currentIndex], [currentIndex]);

  return (
    <div className="shell">
      <header className="hero">
        <h1>Website Video Player</h1>
        <p>Video.js v10 React player, optimized for direct Apache/XAMPP hosting.</p>
      </header>

      <section className="grid">
        <article className="player-panel">
          <div className="player-shell">
            <Player.Provider>
              <VideoSkin poster={current.poster}>
                <Video key={current.src} src={current.src} playsInline controls preload="metadata" />
              </VideoSkin>
            </Player.Provider>
          </div>
          <div className="meta">
            <h2>{current.title}</h2>
            <p>{current.description}</p>
          </div>
        </article>

        <aside className="playlist-panel">
          <h2 className="playlist-title">Playlist</h2>
          <div className="playlist">
            {playlist.map((item, index) => (
              <button
                key={item.src}
                className={`track${index === currentIndex ? ' active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                type="button"
              >
                <p className="track-title">{item.title}</p>
                <p className="track-sub">{item.src}</p>
              </button>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
