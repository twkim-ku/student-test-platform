import { useState, useEffect } from 'react';
import TestHeader from './components/TestHeader';
import Toolbar from './components/Toolbar';
import SplitPanel from './components/SplitPanel';
import PassagePanel from './components/PassagePanel';
import QuestionPanel from './components/QuestionPanel';
import BottomNav from './components/BottomNav';
import './App.css';

function useTimer(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const fmt = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${fmt(h)}:${fmt(m)}:${fmt(s)}` : `${fmt(m)}:${fmt(s)}`;
}

export default function App() {
  const [currentItem, setCurrentItem] = useState(7);
  const [isDark, setIsDark] = useState(true);
  const timeRemaining = useTimer(4200); // 70 minutes

  return (
    <div className="app" data-theme={isDark ? 'dark' : 'light'}>
      <TestHeader
        testName="Grade 11 Science Assessment — Unit 4: Ecology & Earth Systems"
        subject="Science"
        section="Section 2"
        timeRemaining={timeRemaining}
        studentName="Jordan Ramirez"
        studentId="ST-29847"
      />
      <Toolbar isDark={isDark} onToggleTheme={() => setIsDark(d => !d)} />
      <SplitPanel
        left={<PassagePanel />}
        right={<QuestionPanel />}
      />
      <BottomNav
        currentItem={currentItem}
        totalItems={24}
        onNavigate={setCurrentItem}
      />
    </div>
  );
}
