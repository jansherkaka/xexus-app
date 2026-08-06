import bottomNavImg from '../assets/icon-bottom-nav.svg';
import './BottomNav.css';

export default function BottomNav({ className = '', style, onProfile, onChat, onExplore, onMatches }) {
  return (
    <div className={`bottom-nav ${className}`} style={style}>
      <img src={bottomNavImg} alt="" className="bottom-nav__img" />
      <button className="bottom-nav__btn bottom-nav__btn--profile" aria-label="Profile" onClick={onProfile} />
      <button className="bottom-nav__btn bottom-nav__btn--chat" aria-label="Chat" onClick={onChat} />
      <button className="bottom-nav__btn bottom-nav__btn--explore" aria-label="Explore" onClick={onExplore} />
      <button className="bottom-nav__btn bottom-nav__btn--matches" aria-label="Matches" onClick={onMatches} />
    </div>
  );
}
