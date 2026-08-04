import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import HomeIndicator from '../components/HomeIndicator';
import OnboardingHeader from '../components/OnboardingHeader';
import identityIcon from '../assets/icon-identity.png';
import './Screens.css';
import './OnboardingFlow.css';
import './SexScreen.css';

const ZONES = [
  { key: 'female', label: 'female', clip: 'polygon(0 0, 100% 0, 50% 50%)', labelPos: { top: '6%', left: '50%' } },
  {
    key: 'nonbinary',
    label: 'non binary',
    clip: 'polygon(100% 0, 100% 100%, 50% 50%)',
    labelPos: { top: '52%', left: '92%' },
  },
  { key: 'male', label: 'male', clip: 'polygon(0 100%, 100% 100%, 50% 50%)', labelPos: { top: '96%', left: '50%' } },
  {
    key: 'trans',
    label: 'trans',
    clip: 'polygon(0 0, 0 100%, 50% 50%)',
    labelPos: { top: '52%', left: '8%' },
  },
];

export default function SexScreen() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [selected, setSelected] = useState(false);

  const handlePick = (key) => {
    setActive(key);
    setSelected(true);
    setTimeout(() => navigate('/join/name'), 550);
  };

  return (
    <div className="screen screen--white">
      <StatusBar variant="dark" />
      <OnboardingHeader step={5} onBack={() => navigate('/join/verify')} />

      <div className="ob-content" style={{ top: '150px', gap: '16px' }}>
        <h1 className="ob-h1">how do you identify?</h1>
        <p className="ob-body">Choose the gender that fits you best, you can update it later.</p>
      </div>

      <div className={`sex-icon-wrap ${selected ? 'sex-icon-wrap--selected' : ''}`}>
        <img src={identityIcon} alt="" className="sex-icon-img" />
        {ZONES.map((z) => (
          <button
            key={z.key}
            className="sex-zone"
            style={{ clipPath: z.clip }}
            aria-label={z.label}
            onMouseEnter={() => !selected && setActive(z.key)}
            onMouseLeave={() => !selected && setActive(null)}
            onClick={() => handlePick(z.key)}
          />
        ))}
        {ZONES.map((z) => (
          <span
            key={z.key}
            className={`sex-zone-label ${active === z.key ? 'sex-zone-label--visible' : ''}`}
            style={{ top: z.labelPos.top, left: z.labelPos.left }}
          >
            {z.label}
          </span>
        ))}
      </div>

      <HomeIndicator variant="light" />
    </div>
  );
}
