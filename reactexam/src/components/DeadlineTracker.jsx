import React from 'react'
import { useLocalStorage } from '../utils/useLocalStorage'

export default function DeadlineTracker(){
  const [tasks] = useLocalStorage('study:tasks',[])
  const upcoming = tasks.filter(t=>t.due).map(t=>({...t, ms: new Date(t.due).getTime()})).sort((a,b)=>a.ms-b.ms)
  return (
    <div className="card">
      <h4>⏳ Дедлайны</h4>
      <div style={{marginTop:8}}>
        {upcoming.length===0 && <div className="small">Нет дедлайнов</div>}
        {upcoming.slice(0,5).map(t=><div key={t.id} style={{display:'flex',justifyContent:'space-between',padding:6,borderBottom:'1px solid #f1f5f9'}}>
          <div>{t.title}</div>
          <div className="small">{new Date(t.due).toLocaleString()}</div>
        </div>)}
      </div>
    </div>
  )
}
