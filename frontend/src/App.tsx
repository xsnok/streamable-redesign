import './App.css'
import hulyLaserRemix from './assets/huly_laser_remix.webm'
import streamableScreenshot from './assets/streamable_main_screenshot.png'
import { useEffect, useRef, useState } from 'react'

function App() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.85);
  const [opacity, setOpacity] = useState(0.3);

  useEffect(() => {
    const handleScroll = () => {
      if (dashboardRef.current) {
        const rect = dashboardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // calculate how much it's visible based on scroll depth
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.7)));
        // Scale from 0.85 to 1
        setScale(0.85 + progress * 0.15);
        // Opacity from 0.3 to 1
        setOpacity(0.3 + progress * 0.7);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      <div className="video-overlay"></div>
      <video className="video-background" autoPlay loop muted playsInline>
        <source src={hulyLaserRemix} type="video/webm" />
      </video>

      <nav className="navbar">
        <div className="logo">STREAMABLE</div>
        <div className="nav-links">
          <a href="#">Use Cases</a>
          <a href="#">Features</a>
          <a href="#">About</a>
        </div>
        <button className="nav-cta">Learn More ↗</button>
      </nav>

      <main className="main-content">
        <section className="hero">
          <div className="badge">
            <span className="sparkle">✦</span> Now with Smart OBS Integration
          </div>
          <h1 className="hero-title">
            Never IRL stream with<br />issues ever again.
          </h1>
          <p className="hero-subtitle">
            +100,000 TOTAL HOURS STREAMED! <br />
            Automate your connections, engage viewers 24/7, and watch your channel grow — powered by cutting-edge tech.
          </p>
          <div className="hero-actions">
            <button className="secondary-btn">Get Started ↗</button>
            <button className="primary-btn">See It in Action ↗</button>
          </div>
        </section>

        <section className="dashboard-section" ref={dashboardRef}>
          <div
            className="dashboard-wrapper"
            style={{
              transform: `scale(${scale})`,
              opacity: opacity
            }}
          >
            <div className="dashboard-glow-container">
              <div className="dashboard-glow"></div>
            </div>
            <div className="dashboard-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <img
              src={streamableScreenshot}
              alt="Streamable Dashboard Dashboard"
              className="dashboard-image"
            />
          </div>
        </section>

        <div className="spacer"></div>
      </main>
    </div>
  )
}

export default App
