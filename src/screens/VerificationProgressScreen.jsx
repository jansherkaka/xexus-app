import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import { useVerification } from '../context/VerificationContext';
import shieldHero from '../assets/icon-verif-shield-hero.png';
import iconCheck from '../assets/icon-check-small.svg';
import iconCircleX from '../assets/icon-circle-x.svg';
import iconIdCard from '../assets/icon-id-card-outline.svg';
import iconScanFace from '../assets/icon-scan-face.svg';
import iconShieldCheck from '../assets/icon-shield-check-outline.svg';
import iconChevron from '../assets/icon-chevron-right.svg';
import './Screens.css';
import './VerificationProgressScreen.css';

const STEPS = [
  {
    key: 'personalDetails',
    title: 'personal details',
    subtitle: 'name, date of birth, etc.',
    icon: iconCircleX,
    path: '/join/birthday',
  },
  {
    key: 'governmentId',
    title: 'government ID',
    subtitle: 'upload and verify your ID',
    icon: iconIdCard,
    path: '/join/government-id',
  },
  {
    key: 'liveSelfie',
    title: 'live selfie',
    subtitle: 'take a real-time selfie',
    icon: iconScanFace,
    path: '/join/live-selfie',
  },
];

export default function VerificationProgressScreen() {
  const navigate = useNavigate();
  const { progress } = useVerification();
  useDeviceChrome({ statusBarVariant: 'dark', statusBarBg: '#ffffff', homeIndicatorVariant: 'dark' });

  const firstIncompleteIndex = STEPS.findIndex((step) => !progress[step.key]);
  const allDone = firstIncompleteIndex === -1;

  return (
    <div className="screen screen--white">
      <img src={shieldHero} alt="" className="verifprog-hero verifprog-anim verifprog-anim-d1" />
      <p className="verifprog-heading verifprog-anim verifprog-anim-d2">verification progress</p>
      <p className="verifprog-subtext verifprog-anim verifprog-anim-d3">
        complete the steps below to verify your age and continue
      </p>

      <div className="verifprog-list verifprog-anim verifprog-anim-d4">
        {STEPS.map((step, i) => {
          const done = progress[step.key];
          const isCurrent = i === firstIncompleteIndex;
          const state = done ? 'done' : isCurrent ? 'current' : 'upcoming';
          return (
            <button
              key={step.key}
              type="button"
              className={`verifprog-card verifprog-card--${state}`}
              onClick={() => isCurrent && navigate(step.path)}
            >
              {done ? (
                <span className="verifprog-badge verifprog-badge--done">
                  <img src={iconCheck} alt="" />
                </span>
              ) : (
                <span className={`verifprog-badge verifprog-badge--outline${isCurrent ? ' verifprog-badge--outline-current' : ''}`}>
                  {i + 1}
                </span>
              )}
              <span className="verifprog-topic-icon">
                <img src={step.icon} alt="" />
              </span>
              <span className="verifprog-text">
                <span className={`verifprog-title${state === 'upcoming' ? ' verifprog-title--muted' : ''}`}>
                  {step.title}
                </span>
                <span className="verifprog-subtitle">{step.subtitle}</span>
              </span>
              {!done && (
                <span className={`verifprog-pill verifprog-pill--${isCurrent ? 'incomplete' : 'pending'}`}>
                  {isCurrent ? 'incomplete' : 'pending'}
                </span>
              )}
              <span className="verifprog-chevron">
                <img src={iconChevron} alt="" />
              </span>
            </button>
          );
        })}

        <div className={`verifprog-card verifprog-card--${allDone ? 'current' : 'upcoming'}`}>
          <span className={`verifprog-badge verifprog-badge--outline${allDone ? ' verifprog-badge--outline-current' : ''}`}>
            4
          </span>
          <span className="verifprog-topic-icon">
            <img src={iconShieldCheck} alt="" />
          </span>
          <span className="verifprog-text">
            <span className={`verifprog-title${allDone ? '' : ' verifprog-title--muted'}`}>age verification</span>
            <span className="verifprog-subtitle">final checks and review</span>
          </span>
          <span className={`verifprog-pill verifprog-pill--${allDone ? 'incomplete' : 'pending'}`}>
            {allDone ? 'incomplete' : 'pending'}
          </span>
          <span className="verifprog-chevron">
            <img src={iconChevron} alt="" />
          </span>
        </div>
      </div>

      <p className="verifprog-footnote verifprog-anim verifprog-anim-d5">
        your information is secure and will only be used for verification
      </p>

      <div className="verifprog-cta-wrap">
        <button
          className="verifprog-cta verifprog-anim verifprog-anim-d6"
          disabled={!allDone}
          onClick={() => navigate('/join/gender')}
        >
          confirm
        </button>
      </div>
    </div>
  );
}
