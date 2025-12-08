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
        <section className="col main-col">
          {page==='dashboard' && <>
            <TaskTracker />
            <Pomodoro />
            <AutoScheduler />
            <DeadlineTracker />
          </>}
          {page==='notes' && <Notes />}
          {page==='flashcards' && <Flashcards />}
          {page==='mindmap' && <MindMap />}
          {page==='breathing' && <Breathing />}
        </section>

        <aside className="col side-col">
          <ProductivityChart />
          <SemesterPlanner />
          <StressMeter />
          <SleepSounds />
          <FocusMode />
          <ExamModeToggle />
        </aside>
      </main>
    </div>
  )
}
