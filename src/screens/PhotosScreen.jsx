import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import logo from '../assets/xexus-logo-red-small.png';
import addIcon from '../assets/icon-add.svg';
import examplePhoto from '../assets/photo-example-thread.png';
import './Screens.css';
import './PhotosScreen.css';

const SLOT_COUNT = 6;

export default function PhotosScreen() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([examplePhoto, null, null, null, null, null]);

  const handleFile = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotos((prev) => {
      const next = [...prev];
      next[index] = url;
      return next;
    });
  };

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" />

      <div className="photos-topbar">
        <div className="photos-brand">
          <img src={logo} alt="Xexus" className="photos-brand__logo" />
          <div className="photos-brand__progress">
            <div className="photos-brand__progress-fill" />
          </div>
        </div>
      </div>

      <div className="photos-heading">
        <p className="photos-line photos-line--add">add</p>
        <p className="photos-line photos-line--your">your</p>
        <p className="photos-line photos-line--photos">photos</p>
      </div>

      <p className="photos-body">
        your photos stay private. share them only when you choose.
      </p>

      <div className="photos-grid">
        {Array.from({ length: SLOT_COUNT }, (_, i) => (
          <label key={i} className={`photos-slot${photos[i] ? '' : ' photos-slot--empty'}`}>
            {photos[i] ? (
              <img src={photos[i]} alt="" className="photos-slot__img" />
            ) : (
              <img src={addIcon} alt="" className="photos-slot__add" />
            )}
            <input
              type="file"
              accept="image/*"
              className="photos-slot__input"
              onChange={(e) => handleFile(i, e)}
            />
          </label>
        ))}
      </div>

      <div className="photos-cta-wrap">
        <button className="photos-cta" onClick={() => navigate('/join/get-active')}>
          next
        </button>
      </div>

      <HomeIndicator variant="dark" />
    </div>
  );
}
