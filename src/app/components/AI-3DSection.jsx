import Image from "next/image";
import "../styles/AI-3DSection.css";

const AI3DSection = () => {
  return (
    <section className="AI-3DSection">
      {/* Top Row - Feature Cards */}
      <div className="icons-section">
        <div className="icons-top">
          <div className="feature-card">
            <Image
              src="/aigeneration.svg"
              alt="AI Design"
              width={460}
              height={200}
              className="feature-img"
            />
            <div className="feature-overlay">
              <h3>AI-POWERED DESIGN GENERATION</h3>
              <p>
                Harness the power of real-time data and predictive analytics to
                forecast, influence, and define the future of fashion trends.
              </p>
            </div>
          </div>
          <div className="feature-card">
            <video
              src="/3DVideo.mp4"
              width="360"
              height="100"
              className="feature-video"
              controls
              autoPlay
              loop
              muted
            />
            <div className="feature-overlay">
              <h3>3D PROTOTYPING</h3>
              <p>
                Bring your ideas to life with advanced 3D modeling tools that
                allow you to visualize, refine, and perfect every detail of your
                design.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row - Three Info Boxes */}
        <div className="icons-bottom">
          <div className="icon-box">
            <Image src="/chatlogo.svg" alt="Chat Logo" width={50} height={50} />
            <span>In-chat messaging</span>
            <p>Say goodbye to endless emails.</p>
          </div>
          <div className="icon-box">
            <Image
              src="/manfacturenetrowklogo.svg"
              alt="Network Logo"
              width={50}
              height={50}
            />
            <span>Manufacturer Network</span>
            <p>Join our network to receive global orders and support.</p>
          </div>
          <div className="icon-box">
            <Image
              src="/flexibleMoqsLogo.svg"
              alt="MOQ Logo"
              width={50}
              height={50}
            />
            <span>Flexible MOQ's</span>
            <p>Predictive analytics for optimal inventory management.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AI3DSection;
