import Image from "next/image";
import "../styles/OderVisibility.css"; // Import CSS file

const OrderVisibility = () => {
  return (
    <section className="odervisibility">
        <div className="odervisibilityleft">
            <Image src="/mobilepic.svg" alt="" width={250} height={586} className="mobilepic" />
        </div>

        <div className="odervisibilityright">
            <h1>REAL-TIME <br />ORDER <br /> VISIBILITY</h1>
            <p>Effortlessly monitor your order from design to delivery with automated approvals and streamlined shipments. Stay ahead with real-time, prioritized updates at every stage for a seamless and efficient experience.</p>
            <div>
            {/* <button><Image src="/playstorelogo.svg" alt="" width={20} height={20}  className="playstorelogo"/> Get It On PLAYSTORE</button>
            <button><Image src="/appstorelogo.svg" alt="" width={20} height={20} className="appstorelogo"/> Download it on APP STORE</button> */}
             <div className="store-buttons">
      {/* Play Store Button */}
      <button className="store-button">
        <Image src="/playstorelogo.svg" alt="Play Store" width={40} height={40} />
        <span className="button-text">
          Get it on <br />PLAYSTORE
        </span>
      </button>

      {/* App Store Button */}
      <button className="store-button">
        <Image src="/appstorelogo.svg" alt="App Store" width={40} height={40} />
        <span className="button-text">
          Download on <br />APP STORE
        </span>
      </button>
    </div>
       </div> 
       </div>
    </section>
  );
};

export default OrderVisibility;
