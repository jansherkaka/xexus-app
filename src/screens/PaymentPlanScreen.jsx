import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeviceChrome } from '../context/DeviceChromeContext';
import iconShieldAlert from '../assets/icon-shield-alert.svg';
import iconRadioEmpty from '../assets/icon-plan-radio-empty.svg';
import iconCheck from '../assets/icon-plan-check.svg';
import iconClock from '../assets/icon-clock-small.svg';
import iconRadioCheck from '../assets/icon-plan-radio-check.svg';
import iconDot from '../assets/icon-plan-dot.svg';
import './Screens.css';
import './PaymentPlanScreen.css';

const PLANS = [
  {
    key: 'free',
    name: 'free',
    tagline: 'basic access',
    price: '£0',
    bullet: 'dot',
    featureWeight: 'semibold',
    features: ['profile', 'local discovery', 'messaging', 'limited invites', 'pre-consent templates'],
  },
  {
    key: 'xexusPlus',
    name: 'xexus+',
    tagline: 'everything in free, plus',
    price: '£9',
    bullet: 'check',
    featureWeight: 'bold',
    highlighted: true,
    badge: '3 days free trial',
    features: [
      'wider search radius on Live Lust Map',
      'app customisation (change colours & theme)',
      'ghost mode on the map',
      'extra invites',
      'advanced filters (mood, location, fetishes)',
      'message recall & edit',
    ],
  },
  {
    key: 'afterDark',
    name: 'xexus after dark',
    tagline: 'everything in xexus+, plus',
    price: '£19',
    bullet: 'check',
    featureWeight: 'regular',
    features: [
      'anonymous "no face no case" profiles',
      'archive chat access',
      'priority map placement',
      'event invites',
      'monthly VIP invite batch',
    ],
  },
];

export default function PaymentPlanScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('xexusPlus');
  useDeviceChrome({ statusBarVariant: 'light', statusBarBg: '#fd151b', homeIndicatorVariant: 'dark' });

  const goNext = () => navigate('/join');

  return (
    <div className="screen screen--red payment-screen">
      <div className="payment-scroll">
        <div className="payment-header anim-fade-up anim-d1">
          <p className="payment-heading">
            choose your
            <br />
            access
          </p>
          <p className="payment-subtitle">
            unlock the full XEXUS experience.
            <br />
            start free, upgrade anytime.
          </p>
        </div>

        <div className="payment-sheet anim-fade-up anim-d2">
          {PLANS.map((plan) => (
            <div key={plan.key} className="payment-plan-wrap">
              {plan.badge && (
                <div className="payment-plan-badge">
                  <img src={iconClock} alt="" />
                  <span>{plan.badge}</span>
                </div>
              )}
              <button
                type="button"
                className={`payment-plan-card${plan.highlighted ? ' payment-plan-card--highlighted' : ''}`}
                onClick={() => setSelected(plan.key)}
              >
                <div className="payment-plan-top">
                  <div className="payment-plan-name-wrap">
                    <span className="payment-plan-name">{plan.name}</span>
                    <span className="payment-plan-tagline">{plan.tagline}</span>
                  </div>
                  <div className="payment-plan-price-wrap">
                    <span className="payment-plan-price">
                      {plan.price}
                      <span className="payment-plan-price-unit"> /month</span>
                    </span>
                    <span className="payment-plan-radio">
                      <img src={selected === plan.key ? iconRadioCheck : iconRadioEmpty} alt="" />
                    </span>
                  </div>
                </div>
                <div className="payment-plan-features">
                  {plan.features.map((f) => (
                    <div key={f} className={`payment-plan-feature payment-plan-feature--${plan.featureWeight}`}>
                      <img src={plan.bullet === 'dot' ? iconDot : iconCheck} alt="" className={`payment-plan-feature__icon payment-plan-feature__icon--${plan.bullet}`} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </button>
            </div>
          ))}

          <div className="payment-trial-banner">
            <img src={iconShieldAlert} alt="" />
            <div className="payment-trial-banner__text">
              <p className="payment-trial-banner__title">3 days free trial on xexus+.</p>
              <p className="payment-trial-banner__body">cancel anytime before the trial ends.</p>
            </div>
          </div>

          <div className="payment-actions">
            <button className="payment-cta-primary" onClick={goNext}>
              start 3 days free trial
            </button>
            <span className="payment-or">or</span>
            <button className="payment-cta-secondary" onClick={goNext}>
              continue with free plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
