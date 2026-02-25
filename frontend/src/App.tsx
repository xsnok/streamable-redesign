import './App.css'
import hulyLaserRemix from './assets/huly_laser_remix.webm'
import blueDonut from './assets/blue_donut_remix.webm'
import streamableScreenshot from './assets/streamable_main_screenshot.png'
import featureBrb from './assets/features/streamable_brb.png'
import featureIngests from './assets/features/streamable_ingests.png'
import featureObs from './assets/features/streamable_obs.png'
import { useEffect, useRef, useState } from 'react'

function App() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.85);
  const [opacity, setOpacity] = useState(0.3);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Logic for dashboard scaling
      if (dashboardRef.current) {
        const rect = dashboardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.7)));
        setScale(0.85 + progress * 0.15);
        setOpacity(0.3 + progress * 0.7);
      }

      // Logic for navbar visibility (hide on scroll down, show on scroll up)
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      <div className="hero-background-wrapper">
        <div className="video-overlay"></div>
        <video className="video-background" autoPlay loop muted playsInline>
          <source src={blueDonut} type="video/webm" />
        </video>
        <div className="video-bottom-fade"></div>
      </div>

      <nav className={`navbar ${!isVisible ? 'hidden' : ''}`}>
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
              alt="Streamable Dashboard"
              className="dashboard-image"
            />
          </div>
        </section>

        {/* Features Section Styled Like Images */}
        <section className="features-section">
          <div className="feature-block light-bg">
            <div className="feature-content">
              <div className="feature-number dark">01</div>
              <h2 className="feature-title">PREMIUM<br />SERVERS</h2>
              <p className="feature-desc">
                High-quality servers up within 1 minute to get your IRL stream up and running smoothly.
                Seamlessly integrate your setup to accelerate your stream quality and connection reliability.
              </p>
            </div>
            <div className="feature-image-wrapper">
              <img src={streamableScreenshot} alt="Premium Servers" className="feature-image" />
            </div>
          </div>

          <div className="feature-block royal-blue-bg reverse">
            <div className="feature-content">
              <div className="feature-number royal-blue">02</div>
              <h2 className="feature-title">DROP<br />PROTECTION</h2>
              <p className="feature-desc">
                If you're streaming and lose connection, we'll prevent the stream from ending so your viewers don't get kicked. We also include a clips player so you can keep viewers engaged with your favorite highlights until you're back.
              </p>
            </div>
            <div className="feature-image-wrapper">
              <img src={featureBrb} alt="Drop Protection" className="feature-image" />
            </div>
          </div>

          <div className="feature-block dark-bg">
            <div className="feature-content">
              <div className="feature-number dark">03</div>
              <h2 className="feature-title">CLOUD<br />OBS</h2>
              <p className="feature-desc">
                Have your moderators or team edit and monitor your stream in real-time via cloud-hosted OBS, online from anywhere in the world. Enjoy direct access without remote-desktop lag.
              </p>
            </div>
            <div className="feature-image-wrapper">
              <img src={featureObs} alt="Cloud OBS" className="feature-image" />
            </div>
          </div>

          <div className="feature-block dark-blue-bg reverse">
            <div className="feature-content">
              <div className="feature-number dark-blue">04</div>
              <h2 className="feature-title">SEAMLESS<br />SWITCHING</h2>
              <p className="feature-desc">
                Stream from your desktop, phone, your kitchen, a cave, or wherever you want - all at the same time. Output to Twitch, Kick, Youtube, or any custom destination with full SRT HD support.
              </p>
            </div>
            <div className="feature-image-wrapper">
              <img src={featureIngests} alt="Switch Cameras" className="feature-image" />
            </div>
          </div>

          <div className="feature-block light-bg">
            <div className="feature-content">
              <div className="feature-number dark">05</div>
              <h2 className="feature-title">COLLAB<br />STREAMS</h2>
              <p className="feature-desc">
                Collab by adding other streamers' ingests with a simple friend request in Streamable! Share ingests mid-stream so you never have to pause if someone joins while you're streaming.
              </p>
            </div>
            <div className="feature-image-wrapper">
              <img src={streamableScreenshot} alt="Collab Stream" className="feature-image" />
            </div>
          </div>
        </section>

        <div className="spacer" style={{ height: '10vh' }}></div>
      </main>
    </div>
  )
}

export default App
