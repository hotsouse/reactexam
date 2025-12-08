import React, {useState} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useLocalStorage } from '../utils/useLocalStorage'

export default function Notes(){
  const [notes,setNotes] = useLocalStorage('study:notes', [{id:Date.now(), title:'Лекции', content:'# Мои заметки\n\n- пункт 1'}])
  const [idx,setIdx] = useState(0)

  const add = ()=>{ setNotes([{id:Date.now(), title:'Новая заметка', content:''}, ...notes]); setIdx(0) }
  const update = (i, key, val)=>{ const c=[...notes]; c[i][key]=val; setNotes(c) }

  return (
    <div className="card" style={{display:'flex',gap:12}}>
      <div style={{width:240}}>
        <div style={{display:'flex',gap:8,marginBottom:8}}>
          <button className="button" onClick={add}>New</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {notes.map((n,i)=>(<div key={n.id} className="card" style={{cursor:'pointer'}} onClick={()=>setIdx(i)}><div style={{fontWeight:600}}>{n.title}</div></div>))}
        </div>
      </div>
      <div style={{flex:1}}>
        <input className="input" value={notes[idx]?.title||''} onChange={e=>update(idx,'title',e.target.value)} />
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <textarea className="input" value={notes[idx]?.content||''} onChange={e=>update(idx,'content',e.target.value)} rows={12} />
          <div style={{width:320,overflow:'auto',background:'#fafafa',padding:8,borderRadius:8}}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} children={notes[idx]?.content||''} />
          </div>
        </div>
      </div>
    </div>
  )
}
