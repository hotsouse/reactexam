import React, { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import TaskTracker from './components/TaskTracker.jsx'
import Pomodoro from './components/Pomodoro.jsx'
import ProductivityChart from './components/ProductivityChart.jsx'
import SemesterPlanner from './components/SemesterPlanner.jsx'
import Flashcards from './components/Flashcards.jsx'
import Notes from './components/Notes.jsx'
import MindMap from './components/MindMap.jsx'
import StressMeter from './components/StressMeter.jsx'
import Breathing from './components/Breathing.jsx'
import SleepSounds from './components/SleepSounds.jsx'
import FocusMode from './components/FocusMode.jsx'
import DeadlineTracker from './components/DeadlineTracker.jsx'
import AutoScheduler from './components/AutoScheduler.jsx'
import ExamModeToggle from './components/ExamMode.jsx'
import './app.css'

export default function App(){
  const [page, setPage] = useState('dashboard')
  return (
    <div className="app-root">
      <Navbar page={page} setPage={setPage} />
      <main className="app-grid">
        {page === 'dashboard' && (
          <div className="dashboard-grid">
            {/* Первый ряд - основные инструменты */}
            <div className="grid-row">
              <div className="grid-card task-tracker">
                <TaskTracker />
              </div>
              <div className="grid-card pomodoro">
                <Pomodoro />
              </div>
              <div className="grid-card auto-scheduler">
                <AutoScheduler />
              </div>
              <div className="grid-card productivity">
                <ProductivityChart />
              </div>
            </div>
            
            {/* Второй ряд - инструменты для фокуса и релаксации */}
            <div className="grid-row">
              <div className="grid-card stress-meter">
                <StressMeter />
              </div>
              <div className="grid-card sleep-sounds">
                <SleepSounds />
              </div>
              <div className="grid-card focus-mode">
                <FocusMode />
              </div>
              <div className="grid-card exam-mode">
                <ExamModeToggle />
              </div>
              <div className="grid-card breathing">
                <Breathing />
              </div>
            </div>
            
            {/* Третий ряд - трекер дедлайнов */}
            <div className="grid-row">
              <div className="grid-card deadline-tracker">
                <DeadlineTracker />
              </div>
            </div>
            
            {/* Четвертый ряд - планировщик семестра */}
            <div className="grid-row">
              <div className="grid-card semester-planner">
                <SemesterPlanner />
              </div>
            </div>
          </div>
        )}
        
        {page !== 'dashboard' && (
          <section className="full-page">
            {page === 'notes' && <Notes />}
            {page === 'flashcards' && <Flashcards />}
            {page === 'mindmap' && <MindMap />}
            {page === 'breathing' && <Breathing />}
          </section>
        )}
      </main>
    </div>
  )
}