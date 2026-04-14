import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './StackedView.module.css';

// ── Data ────────────────────────────────────────────────────────────────
const tableData = {
  caption: 'Table 1: Soil Health Indicators by Farm Management Type (5-Year Average)',
  headers: ['Indicator', 'Conventional', 'Reduced-Till', 'Regenerative', 'Old-Growth Forest'],
  rows: [
    ['Organic Matter (%)',           '1.8',  '2.4',  '4.1',  '6.7'],
    ['Microbial Biomass (μg C/g)',   '142',  '198',  '387',  '621'],
    ['Fungal-to-Bacterial Ratio',    '0.31', '0.49', '1.12', '2.84'],
    ['Water Retention (mm/hr)',      '8.2',  '14.6', '28.3', '47.1'],
    ['Carbon Sequestration (t/ha/y)','0.4',  '0.9',  '2.3',  '3.8'],
    ['Earthworm Count (per m²)',     '11',   '24',   '61',   '98' ],
    ['N₂O Emissions (kg N/ha/y)',    '4.2',  '3.1',  '1.4',  '0.6'],
  ],
  highlight: [2, 4], // rows to accent (0-indexed)
};

const question = {
  number: 8,
  total: 24,
  standard: 'RST.11-12.7',
  type: 'Select All That Apply',
  stem: 'Based on the data in Table 1, which of the following conclusions are best supported by the evidence? Select ALL that apply.',
  choices: [
    {
      id: 'A',
      text: 'Regenerative farming practices are associated with a higher fungal-to-bacterial ratio compared to conventional farming, suggesting greater mycorrhizal network complexity.',
    },
    {
      id: 'B',
      text: 'Conventional farming produces more earthworms per square meter than reduced-till farming, indicating that tilling promotes soil biodiversity.',
    },
    {
      id: 'C',
      text: 'There is a positive correlation between carbon sequestration rate and microbial biomass across all four management types shown.',
    },
    {
      id: 'D',
      text: 'Reduced-till farming eliminates all differences in soil health indicators when compared to regenerative agriculture.',
    },
    {
      id: 'E',
      text: 'Old-growth forest soil sequesters approximately 9.5 times more carbon per hectare per year than conventional farmland.',
    },
  ],
  correctIds: ['A', 'C'], // for hint purposes only
};

// ── Horizontal resizable divider ─────────────────────────────────────────
function useVerticalSplit(initialPct = 38) {
  const [splitPct, setSplitPct] = useState(initialPct);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      setSplitPct(Math.min(65, Math.max(25, (y / rect.height) * 100)));
    };
    const up = () => setDragging(false);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
  }, [dragging]);

  return { splitPct, dragging, onMouseDown, containerRef };
}

// ── Sub-components ───────────────────────────────────────────────────────
function InstructionSection() {
  return (
    <div className={styles.instrPanel}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Instructions &amp; Stimulus</span>
        <span className={styles.instrNote}>Read the table carefully before answering.</span>
      </div>

      <div className={styles.instrContent}>
        <p className={styles.instrText}>
          The following table presents five-year average measurements of soil health indicators
          collected from four different land management types. Use the data to answer the question below.
        </p>

        <div className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            <caption className={styles.tableCaption}>{tableData.caption}</caption>
            <thead>
              <tr>
                {tableData.headers.map((h, i) => (
                  <th key={i} className={i === 0 ? styles.thIndicator : styles.thValue}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, ri) => (
                <tr key={ri} className={tableData.highlight.includes(ri) ? styles.rowHighlight : ''}>
                  {row.map((cell, ci) => (
                    ci === 0
                      ? <td key={ci} className={styles.tdIndicator}>{cell}</td>
                      : <td key={ci} className={styles.tdValue}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function QuestionSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);

  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className={styles.questionPanel}>
      <div className={styles.sectionHeader}>
        <div className={styles.qHeaderLeft}>
          <span className={styles.sectionLabel}>Question</span>
          <span className={styles.qCount}>{question.number} of {question.total}</span>
        </div>
        <div className={styles.qHeaderRight}>
          <span className={styles.stdBadge}>{question.standard}</span>
          <span className={styles.typeBadge}>{question.type}</span>
        </div>
      </div>

      <div className={styles.questionContent}>
        <p className={styles.stem}>{question.stem}</p>

        <div className={styles.choices}>
          {question.choices.map(choice => {
            const isSelected = selected.has(choice.id);
            return (
              <button
                key={choice.id}
                className={`${styles.choice} ${isSelected ? styles.choiceSelected : ''}`}
                onClick={() => toggle(choice.id)}
              >
                <div className={`${styles.checkbox} ${isSelected ? styles.checkboxSelected : ''}`}>
                  {isSelected && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
                <span className={styles.choiceLetter}>{choice.id}</span>
                <p className={styles.choiceText}>{choice.text}</p>
              </button>
            );
          })}
        </div>

        <div className={styles.hintRow}>
          <button className={styles.hintToggle} onClick={() => setShowHint(h => !h)}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          {showHint && (
            <div className={styles.hintBox}>
              <p>Re-read the fungal-to-bacterial ratio and carbon sequestration rows. Look for monotonic trends across all four management types.</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.statusBar}>
        {selected.size > 0 ? (
          <>
            <div className={styles.statusDot} />
            <span className={styles.statusText}>
              {selected.size} answer{selected.size > 1 ? 's' : ''} selected:{' '}
              <strong>{Array.from(selected).sort().join(', ')}</strong>
            </span>
          </>
        ) : (
          <>
            <div className={`${styles.statusDot} ${styles.statusEmpty}`} />
            <span className={styles.statusText}>No answers selected</span>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────
export default function StackedView() {
  const { splitPct, dragging, onMouseDown, containerRef } = useVerticalSplit(40);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${dragging ? styles.dragging : ''}`}
    >
      {/* Top: Instructions */}
      <div className={styles.topPane} style={{ height: `${splitPct}%` }}>
        <InstructionSection />
      </div>

      {/* Horizontal drag handle */}
      <div
        className={`${styles.handle} ${dragging ? styles.handleActive : ''}`}
        onMouseDown={onMouseDown}
      >
        <div className={styles.handleDots}>
          <span /><span /><span /><span /><span /><span />
        </div>
      </div>

      {/* Bottom: Question */}
      <div className={styles.bottomPane} style={{ height: `${100 - splitPct}%` }}>
        <QuestionSection />
      </div>
    </div>
  );
}
