import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import govIdIcon from '../assets/icon-govid-card.png';
import flagUk from '../assets/flag-uk.png';
import iconIdCard from '../assets/icon-method-idcard.png';
import iconPassport from '../assets/icon-method-passport.png';
import iconLicense from '../assets/icon-method-license.png';
import './Screens.css';
import './GovernmentIdScreen.css';

const METHODS = [
  { key: 'idcard', label: 'ID card', icon: iconIdCard },
  { key: 'passport', label: 'passport', icon: iconPassport },
  { key: 'license', label: 'driver’s license', icon: iconLicense },
];

export default function GovernmentIdScreen() {
  const navigate = useNavigate();
  const [method, setMethod] = useState(null);

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" bg="#ffffff" />

      <img src={govIdIcon} alt="" className="govid-icon anim-fade-scale anim-d1" />
      <p className="govid-heading anim-fade-up anim-d2">government ID</p>

      <div className="govid-form anim-fade-up anim-d3">
        <div className="govid-field">
          <p className="govid-field__label">document issuing country/region</p>
          <div className="govid-select">
            <img src={flagUk} alt="" className="govid-select__flag" />
            <span className="govid-select__text">london</span>
            <span className="govid-select__chevron" />
          </div>
        </div>

        <div className="govid-field">
          <p className="govid-field__label">what method would you prefer to use?</p>
          <div className="govid-methods">
            {METHODS.map((m) => (
              <button
                key={m.key}
                type="button"
                className="govid-method"
                onClick={() => setMethod(m.key)}
              >
                <span className="govid-method__left">
                  <img src={m.icon} alt="" className="govid-method__icon" />
                  <span className="govid-method__label">{m.label}</span>
                </span>
                <span className={`govid-method__radio${method === m.key ? ' govid-method__radio--selected' : ''}`}>
                  {method === m.key && <span className="govid-method__check" />}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="govid-cta-wrap">
        <button
          className="govid-cta anim-fade-up anim-d4"
          onClick={() => navigate('/join/government-id-upload')}
        >
          confirm
        </button>
      </div>

      <HomeIndicator variant="dark" />
    </div>
  );
}
