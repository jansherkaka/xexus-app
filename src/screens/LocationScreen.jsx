import { useNavigate } from "react-router-dom";
import { useDeviceChrome } from "../context/DeviceChromeContext";
import bgPhoto from "../assets/location-bg.jpg";
import "./Screens.css";
import "./LocationScreen.css";

export default function LocationScreen() {
  const navigate = useNavigate();
  useDeviceChrome({ statusBarVariant: "dark", statusBarBg: "#3e3126", homeIndicatorVariant: "light" });

  const handleEnableLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {},
        () => {},
      );
    }
    navigate("/join/age-gate");
  };

  return (
    <div className="screen location-screen">
      <div className="location-bg">
        <img src={bgPhoto} alt="" className="location-bg__photo anim-fade-scale" />
      </div>

      <div className="location-content">
        <div className="location-text">
          <h1 className="location-heading anim-fade-up anim-d1">
            <p className="location-heading__line location-heading__line--big">we are a</p>
            <p className="location-heading__line location-heading__line--small location-heading__line--location">
              location
            </p>
            <p className="location-heading__line location-heading__line--small location-heading__line--based">
              based
            </p>
            <p className="location-heading__line location-heading__line--big">experience</p>
          </h1>
          <p className="location-body anim-fade-up anim-d3">
            Share your location to see who&rsquo;s active nearby and unlock
            real-time discovery around you.
          </p>
        </div>
      </div>

      <div className="location-cta-wrap">
        <button className="location-cta anim-fade-up anim-d5" onClick={handleEnableLocation}>
          Enable location
        </button>
      </div>
    </div>
  );
}
