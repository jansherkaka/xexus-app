import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import addIcon from '../assets/icon-add.svg';
import './Screens.css';
import './PhotosScreen.css';

export default function PhotosScreen() {
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
      <div className="photos-text">
        <p className="photos-heading anim-fade-up anim-d1">add your photo</p>
        <p className="photos-body anim-fade-up anim-d2">
          face or body is fine. we apply an ambiguity filter to keep you
          more anonymous. no visible genitalia, please.
        </p>
      </div>

      <label className="photos-slot anim-fade-scale anim-d3">
        {photo ? (
          <img src={photo} alt="" className="photos-slot__img" />
        ) : (
          <img src={addIcon} alt="" className="photos-slot__add" />
        )}
        <input
          type="file"
          accept="image/*"
          className="photos-slot__input"
          onChange={handleFile}
        />
      </label>

      <div className="photos-cta-wrap">
        <button
          className="photos-cta anim-fade-up anim-d4"
          onClick={() => navigate('/join/get-active')}
        >
          next
        </button>
      </div>
    </div>
  );
}
