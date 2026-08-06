import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import identityIconWhite from '../assets/icon-identity-white.png';
import './Screens.css';
import './SetToneScreen.css';

export default function SetToneScreen() {
  return (
    <div className="screen set-tone-screen">
      <StatusBar variant="light" />

      <img src={identityIconWhite} alt="" className="set-tone-icon" />

      <div className="set-tone-heading">
        <p className="set-tone-line set-tone-line--lets">let&rsquo;s</p>
        <p className="set-tone-line set-tone-line--set">set</p>
        <p className="set-tone-line set-tone-line--the">the</p>
        <p className="set-tone-line set-tone-line--tone">tone</p>
      </div>

      <p className="set-tone-body">
        choose your interests, boundaries, and curiosities so the right
        people know what you&rsquo;re into.
      </p>

      <div className="set-tone-cta-wrap">
        <button className="set-tone-cta">start chat with AI</button>
      </div>

      <HomeIndicator variant="light" />
    </div>
  );
}
