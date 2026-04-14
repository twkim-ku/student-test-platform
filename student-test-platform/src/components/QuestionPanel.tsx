import { useState } from 'react';
import styles from './QuestionPanel.module.css';

const question = {
  number: 7,
  total: 24,
  standard: 'RST.11-12.1',
  stem: 'According to the passage, which of the following best describes the relationship between plants and soil microorganisms?',
  choices: [
    {
      id: 'A',
      text: 'A one-way relationship in which microorganisms depend entirely on plants for nutrients and survival.',
    },
    {
      id: 'B',
      text: 'A mutually beneficial relationship in which plants actively shape their microbial environment while microorganisms enhance plant nutrient uptake.',
    },
    {
      id: 'C',
      text: 'A competitive relationship in which plants and microorganisms vie for the same soil nutrients.',
    },
    {
      id: 'D',
      text: 'A passive relationship in which microorganisms randomly colonize soil without regard to the plant species present.',
    },
  ],
  hint: 'Consider the passage\'s discussion of "rhizosphere priming" and mycorrhizal networks.',
};

export default function QuestionPanel() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.panelLabel}>Question</span>
          <span className={styles.questionCount}>
            {question.number} of {question.total}
          </span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.standardBadge}>{question.standard}</span>
          <span className={styles.typeBadge}>Multiple Choice</span>
        </div>
      </div>

      <div className={styles.content}>
        {/* Question stem */}
        <div className={styles.stemBlock}>
          <span className={styles.questionNum}>{question.number}.</span>
          <p className={styles.stem}>{question.stem}</p>
        </div>

        {/* Answer choices */}
        <div className={styles.choices}>
          {question.choices.map(choice => (
            <button
              key={choice.id}
              className={`${styles.choice} ${selected === choice.id ? styles.selected : ''}`}
              onClick={() => setSelected(prev => prev === choice.id ? null : choice.id)}
            >
              <div className={`${styles.choiceLetter} ${selected === choice.id ? styles.selectedLetter : ''}`}>
                {choice.id}
              </div>
              <p className={styles.choiceText}>{choice.text}</p>
            </button>
          ))}
        </div>

        {/* Hint */}
        <div className={styles.hintSection}>
          <button
            className={styles.hintToggle}
            onClick={() => setShowHint(h => !h)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          {showHint && (
            <div className={styles.hintBox}>
              <p className={styles.hintText}>{question.hint}</p>
            </div>
          )}
        </div>
      </div>

      {/* Selection status bar */}
      <div className={styles.statusBar}>
        {selected ? (
          <>
            <div className={styles.statusDot} />
            <span className={styles.statusText}>
              Answer <strong>{selected}</strong> selected
            </span>
          </>
        ) : (
          <>
            <div className={`${styles.statusDot} ${styles.statusEmpty}`} />
            <span className={styles.statusText}>No answer selected</span>
          </>
        )}
      </div>
    </div>
  );
}
