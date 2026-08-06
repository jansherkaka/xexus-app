import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import HomeIndicator from "../components/HomeIndicator";
import logo from "../assets/xexus-logo-red-small.png";
import bgPhoto from "../assets/location-bg.jpg";
import arrowBack from "../assets/icon-arrow-back.svg";
import "./Screens.css";
import "./LocationScreen.css";

export default function LocationScreen() {
  const navigate = useNavigate();

  const handleEnableLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {},
        () => {},
      );
    }
    navigate("/join/verify");
  };

  return (
    <div className="screen location-screen">
      <div className="location-bg">
        <img src={bgPhoto} alt="" className="location-bg__photo anim-fade-scale" />
      </div>

      <StatusBar variant="dark" />

      <div className="location-topbar">
        <button
          className="location-back"
          onClick={() => navigate("/")}
          aria-label="Back"
        >
          <img src={arrowBack} alt="" />
        </button>
        <div className="location-brand">
          <img src={logo} alt="Xexus" className="location-brand__logo" />
          <div className="location-brand__progress">
            <div className="location-brand__progress-fill" />
          </div>
        </div>
      </div>

      <div className="location-content">
        <div className="location-text">
          <h1 className="location-heading anim-fade-up anim-d1">
            <p>we are a</p>
            <p>location</p>
            <p>based</p>
            <p>experience</p>
          </h1>
          <p className="location-body anim-fade-up anim-d3">
            Share your location to see who&rsquo;s active nearby and unlock
            real-time discovery around you.
          </p>
        </div>

        <button className="location-cta anim-fade-up anim-d5" onClick={handleEnableLocation}>
          Enable location
        </button>
      </div>

      <HomeIndicator variant="light" />
    </div>
  );
}
