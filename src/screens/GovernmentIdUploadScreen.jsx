import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import govIdIcon from '../assets/icon-govid-card.png';
import checkHook from '../assets/icon-check-hook.svg';
import addIcon from '../assets/icon-add.svg';
import './Screens.css';
import './GovernmentIdUploadScreen.css';

export default function GovernmentIdUploadScreen() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  useDeviceChrome({ statusBarVariant: 'dark', statusBarBg: '#ffffff', homeIndicatorVariant: 'dark' });

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
  };

  return (
    <div className="screen screen--white">
      <img src={govIdIcon} alt="" className="govup-icon anim-fade-scale anim-d1" />
      <p className="govup-heading anim-fade-up anim-d2">government ID</p>

      <label className="govup-upload anim-fade-scale anim-d3">
        {photo ? (
          <img src={photo} alt="" className="govup-upload__photo" />
        ) : (
          <span className="govup-upload__empty">
            <img src={addIcon} alt="" className="govup-upload__add" />
            <span>tap to upload your ID photo</span>
          </span>
        )}
        <input type="file" accept="image/*" className="govup-upload__input" onChange={handleFile} />
      </label>

      <div className="govup-checklist anim-fade-up anim-d4">
        <p className="govup-checklist__label">please confirm that your photo is</p>
        <p className="govup-checklist__item">
          <img src={checkHook} alt="" /> readable, clear and not blurry
        </p>
        <p className="govup-checklist__item">
          <img src={checkHook} alt="" /> well-lit, not reflective, not too dark
        </p>
        <p className="govup-checklist__item">
          <img src={checkHook} alt="" /> ID occupies most of the image
        </p>
      </div>

      <div className="govup-checklist govup-checklist--expiry anim-fade-up anim-d5">
        <p className="govup-checklist__label">please confirm that</p>
        <p className="govup-checklist__item">
          <img src={checkHook} alt="" /> ID not expired
        </p>
      </div>

      <div className="govup-cta-wrap">
        <button
          className="govup-cta anim-fade-up anim-d6"
          onClick={() => navigate('/join/live-selfie')}
        >
          confirm
        </button>
      </div>
    </div>
  );
}
