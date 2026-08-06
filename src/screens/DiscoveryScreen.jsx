import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import logo from '../assets/xexus-logo-red-small.png';
import arrowBack from '../assets/icon-arrow-back.svg';
import cardPhoto from '../assets/discovery-card-photo.jpg';
import peekTop from '../assets/discovery-peek-4.jpg';
import peekBottom from '../assets/discovery-peek-2.jpg';
import onlineDot from '../assets/icon-online-dot.svg';
import iconX from '../assets/icon-x.svg';
import iconHeart from '../assets/icon-heart.svg';
import iconPin from '../assets/icon-pin.svg';
import './Screens.css';
import './DiscoveryScreen.css';

export default function DiscoveryScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen screen--white discovery-screen">
      <StatusBar variant="dark" />

      <img src={peekTop} alt="" className="discovery-peek discovery-peek--top anim-fade" />
      <img src={peekBottom} alt="" className="discovery-peek discovery-peek--bottom anim-fade" />

      <div className="discovery-topbar">
        <button className="discovery-back" onClick={() => navigate('/join/get-active')} aria-label="Back">
          <img src={arrowBack} alt="" />
        </button>
        <div className="discovery-brand">
          <img src={logo} alt="Xexus" className="discovery-brand__logo" />
        </div>
      </div>

      <div className="discovery-card anim-fade-scale anim-d1">
        <img src={cardPhoto} alt="" className="discovery-card__photo" />

        <div className="discovery-card__overlay">
          <div className="discovery-card__info">
            <div className="discovery-card__row">
              <p className="discovery-card__name">
                <span className="discovery-card__name-bold">PLAYDIRTY92,</span> 23 - 5’7
              </p>
              <p className="discovery-card__distance">2 miles away</p>
            </div>
            <div className="discovery-card__online">
              <span>Online</span>
              <img src={onlineDot} alt="" />
            </div>
          </div>
          <div className="discovery-card__bio">
            <p className="discovery-card__bio-label">Bio</p>
            <p className="discovery-card__bio-text">
              hi, i’m a queer guy &amp; i love to meet new ppl! I love martinis, swimming, and
              couples dates, deff looking for something casual.
            </p>
          </div>
        </div>
      </div>

      <div className="discovery-tag discovery-tag--1 anim-fade-up anim-d3">Something casual 👀</div>
      <div className="discovery-tag discovery-tag--2 anim-fade-up anim-d4">Queer</div>
      <div className="discovery-tag discovery-tag--3 anim-fade-up anim-d5">Hosting tonight 🏠</div>

      <button
        className="discovery-action discovery-action--dislike anim-fade-scale anim-d6"
        aria-label="Pass"
      >
        <img src={iconX} alt="" />
      </button>
      <button
        className="discovery-action discovery-action--like anim-fade-scale anim-d7"
        aria-label="Like"
      >
        <img src={iconHeart} alt="" />
      </button>
      <button
        className="discovery-action discovery-action--superlike anim-fade-scale anim-d8"
        aria-label="Open LiveLustMap"
        onClick={() => navigate('/join/map')}
      >
        <img src={iconPin} alt="" />
      </button>

      <BottomNav
        className="discovery-bottom-nav anim-fade-up"
        style={{ animationDelay: '0.7s' }}
      />
    </div>
  );
}
