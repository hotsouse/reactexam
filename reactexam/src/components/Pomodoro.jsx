import React, { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '../utils/useLocalStorage'

function format(sec){
  const m = Math.floor(sec/60).toString().padStart(2,'0')
  const s = (sec%60).toString().padStart(2,'0')
  return `${m}:${s}`
}

export default function Pomodoro(){
  const [workMin, setWorkMin] = useLocalStorage('pomo:work', 25)
  const [breakMin, setBreakMin] = useLocalStorage('pomo:break', 5)
  const [isRunning, setRunning] = useState(false)
  const [isWork, setIsWork] = useState(true)
  const [seconds, setSeconds] = useState(workMin*60)
  const timerRef = useRef(null)
  const [prod, setProd] = useLocalStorage('study:prod', []) // [{date:'YYYY-MM-DD', count:1}]

  useEffect(()=> setSeconds((isWork?workMin:breakMin)*60), [workMin, breakMin, isWork])

  useEffect(()=>{
    if(isRunning){
      timerRef.current = setInterval(()=> setSeconds(s=> {
        if(s<=1){
          clearInterval(timerRef.current)
          setRunning(false)
          // notify
          if('Notification' in window && Notification.permission === 'granted'){
            new Notification(isWork? 'Рабочая сессия окончена':'Перерыв окончен', {body: isWork? 'Отметьте прогресс' : 'Пора работать!'})
          }
          // add productivity if finished work
          if(isWork){
            const today = new Date().toISOString().slice(0,10)
            const idx = prod.findIndex(p=>p.date===today)
            if(idx>=0){ const copy = [...prod]; copy[idx].count += 1; setProd(copy) }
            else { setProd([{date:today, count:1}, ...prod]) }
          }
          setIsWork(!isWork)
          return 0
        }
        return s-1
      }),1000)
    }
    return ()=> clearInterval(timerRef.current)
  },[isRunning, isWork, prod, setProd])

  return (
    <div className="card">
      <h2>⏱ Помодоро-таймер</h2>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:8}}>
        <div>
          <div className="timer-display">{format(seconds)}</div>
          <div className="small">Фаза: {isWork? 'Работа':'Перерыв'}</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <div style={{display:'flex',gap:8}}>
            <button className="button" onClick={()=>setRunning(true)}>Start</button>
            <button className="small" onClick={()=>setRunning(false)}>Pause</button>
            <button className="small" onClick={()=>{ setRunning(false); setSeconds((isWork?workMin:breakMin)*60) }}>Reset</button>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <label className="small">Work (min)</label>
            <input className="input" type="number" value={workMin} onChange={e=>setWorkMin(Number(e.target.value)||1)} style={{width:80}}/>
            <label className="small">Break (min)</label>
            <input className="input" type="number" value={breakMin} onChange={e=>setBreakMin(Number(e.target.value)||1)} style={{width:80}}/>
          </div>
        </div>
      </div>

      <div style={{marginTop:10}}>
        <button className="small" onClick={()=>{
          if('Notification' in window) Notification.requestPermission().then(p=> alert(p==='granted'? 'Уведомления включены':'Разрешение не предоставлено'))
          else alert('Уведомления не поддерживаются в этом браузере')
        }}>Включить уведомления</button>
      </div>
    </div>
  )
}
