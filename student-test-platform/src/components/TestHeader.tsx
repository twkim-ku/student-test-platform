import styles from './TestHeader.module.css';

interface TestHeaderProps {
  testName: string;
  subject: string;
  section: string;
  timeRemaining: string;
  studentName: string;
  studentId: string;
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

export default function TestHeader({
  testName,
  subject,
  section,
  timeRemaining,
  studentName,
  studentId,
}: TestHeaderProps) {
  return (
    <header className={styles.header}>
      {/* Left: Test Info */}
      <div className={styles.testInfo}>
        <div className={styles.testMeta}>
          <span className={styles.pill}>{subject}</span>
          <span className={styles.sectionBadge}>{section}</span>
        </div>
        <h1 className={styles.testName}>{testName}</h1>
      </div>

      {/* Center: Timer */}
      <div className={styles.timerBlock}>
        <div className={styles.timerInner}>
          <ClockIcon />
          <span className={styles.timerLabel}>Time Remaining</span>
          <span className={styles.timerValue}>{timeRemaining}</span>
        </div>
      </div>

      {/* Right: Student Info */}
      <div className={styles.studentInfo}>
        <div className={styles.studentDetails}>
          <span className={styles.studentName}>{studentName}</span>
          <span className={styles.studentId}>ID: {studentId}</span>
        </div>
        <div className={styles.avatar}>
          <UserIcon />
        </div>
      </div>
    </header>
  );
}
