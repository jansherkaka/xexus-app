import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import OnboardingHeader from '../components/OnboardingHeader';
import examplePhoto from '../assets/photo-example.jpg';
import './Screens.css';
import './OnboardingFlow.css';
import './PhotosScreen.css';

export default function PhotosScreen() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([examplePhoto, null, null, null, null, null]);
  const fileInputRef = useRef(null);
  const activeSlot = useRef(null);

  const openPicker = (index) => {
    activeSlot.current = index;
    fileInputRef.current?.click();
  };

  const onFileChosen = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSlots((prev) => {
      const next = [...prev];
      next[activeSlot.current] = url;
      return next;
    });
    e.target.value = '';
  };

  const hasAnyPhoto = slots.some(Boolean);

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" />
      <OnboardingHeader step={7} onBack={() => navigate('/join/name')} />

      <div className="ob-content" style={{ top: '135px', gap: '14px' }}>
        <h1 className="ob-h1" style={{ fontSize: '40px' }}>
          add your photos
        </h1>
        <p className="ob-body">
          Face card, mystery, or just the right angle, give them a preview 😉
        </p>

        <div className="photos-privacy">
          🔒 Your photos are only shown in your private gallery &mdash; they&rsquo;re never
          public or searchable.
        </div>

        <div className="photos-grid">
          {slots.map((src, i) => (
            <button key={i} className="photos-slot" onClick={() => openPicker(i)}>
              {src ? (
                <img src={src} alt="" className="photos-slot__img" />
              ) : (
                <span className="photos-slot__plus">+</span>
              )}
            </button>
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onFileChosen}
        />

        <button
          className="ob-btn ob-btn--red ob-btn--auto"
          disabled={!hasAnyPhoto}
          onClick={() => navigate('/join/ai-setup')}
        >
          Next
        </button>
      </div>

      <HomeIndicator variant="light" />
    </div>
  );
}
