import React from 'react'
import { useLocalStorage } from '../utils/useLocalStorage'

export default function SemesterPlanner(){
  const [weeks, setWeeks] = useLocalStorage('study:semester', Array.from({length:16}).map((_,i)=>({id:i+1,note:''})))
  const update = (i, note)=> { const copy=[...weeks]; copy[i].note = note; setWeeks(copy) }

  return (
    <div className="card">
      <h3>📅 Планировщик семестра</h3>
      <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8, marginTop:8}}>
        {weeks.map((w,i)=>(
          <div key={w.id} style={{padding:8,border:'1px solid #eef2f7',borderRadius:8,background:'#fff'}}>
            <div style={{fontWeight:600}}>Неделя {i+1}</div>
            <textarea value={w.note} onChange={e=>update(i,e.target.value)} placeholder="Задачи/мероприятия" style={{width:'100%',marginTop:6,borderRadius:6,padding:6}} rows={3}/>
          </div>
        ))}
      </div>
      <div className="small" style={{marginTop:8}}>Изменения сохраняются автоматически</div>
    </div>
  )
}
