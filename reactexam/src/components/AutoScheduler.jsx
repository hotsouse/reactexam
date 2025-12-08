import React from 'react'
import { useLocalStorage } from '../utils/useLocalStorage'

export default function AutoScheduler(){
  const [tasks] = useLocalStorage('study:tasks',[])
  const schedule = () => {
    const pending = tasks.filter(t=>!t.done)
    const days = 7
    const buckets = Array.from({length:days}, ()=>[])
    for(let i=0;i<pending.length;i++){ buckets[i%days].push(pending[i]) }
    let out = 'Автоматический план на 7 дней:\\n'
    buckets.forEach((b,i)=>{ out += `Day ${i+1}: ${b.map(x=>x.title).join(', ') || '—'}\\n` })
    alert(out)
  }
  return (
    <div className="card">
      <h4>⚡ Auto Scheduler</h4>
      <div style={{marginTop:8}}>
        <button className="button" onClick={schedule}>Сгенерировать план на неделю</button>
        <div className="small" style={{marginTop:8}}>Распределяет невыполненные задачи по дням равномерно</div>
      </div>
    </div>
  )
}
