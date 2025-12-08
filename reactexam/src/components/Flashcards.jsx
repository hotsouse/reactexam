import React, {useState} from 'react'
import { useLocalStorage } from '../utils/useLocalStorage'

export default function Flashcards(){
  const [cards, setCards] = useLocalStorage('study:cards', [
    {id:1,q:'Что такое Big O?', a:'Оценка сложности алгоритма', known:false}
  ])
  const [q,setQ] = useState(''); const [a,setA] = useState('')

  const add = ()=>{ if(!q.trim()||!a.trim())return; setCards([{id:Date.now(), q:q.trim(), a:a.trim(), known:false}, ...cards]); setQ(''); setA('') }
  const toggleKnown = id => setCards(cards.map(c=>c.id===id?{...c,known:!c.known}:c))

  return (
    <div className="card">
      <h3>🧠 Флеш-карточки</h3>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <input className="input" placeholder="Вопрос" value={q} onChange={e=>setQ(e.target.value)} />
        <input className="input" placeholder="Ответ" value={a} onChange={e=>setA(e.target.value)} />
        <button className="button" onClick={add}>Add</button>
      </div>
      <div style={{marginTop:10,display:'grid',gap:8}}>
        {cards.map(c=>(
          <div key={c.id} className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontWeight:600}}>{c.q}</div>
              <div className="small">{c.known? `Знаешь` : `Не знаешь`}</div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="small" onClick={()=>toggleKnown(c.id)}>{c.known? 'Mark unknown' : 'Mark known'}</button>
              <button className="small" onClick={()=>alert(c.a)}>Show answer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
