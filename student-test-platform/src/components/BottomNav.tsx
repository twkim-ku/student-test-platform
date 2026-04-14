import { useState } from 'react';
import styles from './BottomNav.module.css';

interface BottomNavProps {
  currentItem: number;
  totalItems: number;
  onNavigate: (item: number) => void;
}

// Status types for visual indicator
type ItemStatus = 'answered' | 'flagged' | 'current' | 'unanswered';

function getStatus(i: number, current: number): ItemStatus {
  if (i === current) return 'current';
  // Mock some answered/flagged items
  if ([1,2,3,5,6,9,10,12,14,15].includes(i)) return 'answered';
  if ([4, 11, 17].includes(i)) return 'flagged';
  return 'unanswered';
}

export default function BottomNav({ currentItem, totalItems, onNavigate }: BottomNavProps) {
  const [_showItemMap, setShowItemMap] = useState(false);

  const answeredCount = [1,2,3,5,6,9,10,12,14,15].length;
  const flaggedCount = 3;

  return (
    <div className={styles.bottomNav}>
      {/* Left: Item Navigation */}
      <div className={styles.leftSection}>
        <button
          className={styles.itemMapToggle}
          onClick={() => setShowItemMap(v => !v)}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          Items
        </button>

        <div className={styles.itemStrip}>
          {Array.from({ length: Math.min(totalItems, 16) }, (_, i) => i + 1).map(n => {
            const status = getStatus(n, currentItem);
            return (
              <button
                key={n}
                className={`${styles.itemBtn} ${styles[`status_${status}`]}`}
                onClick={() => onNavigate(n)}
                title={`Item ${n}`}
              >
                {n}
              </button>
            );
          })}
          {totalItems > 16 && (
            <span className={styles.moreItems}>+{totalItems - 16}</span>
          )}
        </div>

        {/* Progress summary */}
        <div className={styles.progressSummary}>
          <span className={styles.progressItem}>
            <span className={styles.dot} style={{ background: 'var(--success)' }} />
            {answeredCount}/{totalItems}
          </span>
          <span className={styles.progressItem}>
            <span className={styles.dot} style={{ background: '#e5a00d' }} />
            {flaggedCount} flagged
          </span>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className={styles.rightSection}>
        <button className={styles.navBtn} onClick={() => onNavigate(Math.max(1, currentItem - 1))}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>

        <button className={styles.navBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"/>
            <path d="M3 12h18"/>
            <path d="M3 18h18"/>
          </svg>
          Clear
        </button>

        <button
          className={`${styles.navBtn} ${styles.navBtnPrimary}`}
          onClick={() => onNavigate(Math.min(totalItems, currentItem + 1))}
        >
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <div className={styles.divider} />

        <button className={styles.navBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          Save
        </button>

        <button className={styles.navBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
          </svg>
          Review
        </button>

        <button className={`${styles.navBtn} ${styles.navBtnDanger}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
          End Test
        </button>
      </div>
    </div>
  );
}
