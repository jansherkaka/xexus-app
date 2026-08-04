import { useCallback, useEffect, useRef, useState } from 'react';
import './WheelDatePicker.css';

const ITEM_HEIGHT = 44;
const VISIBLE_ROWS = 7;
const PAD_ROWS = Math.floor(VISIBLE_ROWS / 2);

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function WheelColumn({ items, selectedIndex, onSelect }) {
  const ref = useRef(null);
  const timeoutRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(selectedIndex);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = selectedIndex * ITEM_HEIGHT;
    setCenterIndex(selectedIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = selectedIndex * ITEM_HEIGHT;
    if (Math.abs(el.scrollTop - target) > 2) el.scrollTop = target;
    setCenterIndex(selectedIndex);
  }, [selectedIndex]);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(items.length - 1, Math.round(el.scrollTop / ITEM_HEIGHT)));
    setCenterIndex(idx);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => onSelect(idx), 120);
  }, [items.length, onSelect]);

  return (
    <div className="wheel-col" ref={ref} onScroll={handleScroll}>
      <div style={{ height: ITEM_HEIGHT * PAD_ROWS }} />
      {items.map((item, i) => (
        <div
          key={item}
          className={`wheel-col__item${i === centerIndex ? ' wheel-col__item--active' : ''}`}
          style={{ height: ITEM_HEIGHT, lineHeight: `${ITEM_HEIGHT}px` }}
        >
          {item}
        </div>
      ))}
      <div style={{ height: ITEM_HEIGHT * PAD_ROWS }} />
    </div>
  );
}

export default function WheelDatePicker({ value, onChange, minYear = 1940 }) {
  const maxYear = new Date().getFullYear();
  const initial = value ? new Date(value) : new Date(2000, 0, 1);
  const [year, setYear] = useState(initial.getFullYear());
  const [month, setMonth] = useState(initial.getMonth());
  const [day, setDay] = useState(initial.getDate());

  const years = [];
  for (let y = minYear; y <= maxYear; y++) years.push(y);
  const dCount = daysInMonth(year, month);
  const days = Array.from({ length: dCount }, (_, i) => i + 1);
  const clampedDay = Math.min(day, dCount);

  useEffect(() => {
    if (day > dCount) setDay(dCount);
  }, [dCount, day]);

  useEffect(() => {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(clampedDay).padStart(2, '0')}`;
    onChange(iso);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, clampedDay]);

  return (
    <div className="wheel-picker">
      <div className="wheel-picker__highlight" />
      <WheelColumn items={MONTHS} selectedIndex={month} onSelect={setMonth} />
      <WheelColumn items={days} selectedIndex={clampedDay - 1} onSelect={(i) => setDay(i + 1)} />
      <WheelColumn items={years} selectedIndex={year - minYear} onSelect={(i) => setYear(minYear + i)} />
    </div>
  );
}
