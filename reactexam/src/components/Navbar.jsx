import React from 'react'
export default function Navbar({page,setPage}){
  const items = [
    ['dashboard','Dashboard'],
    ['notes','Notes'],
    ['flashcards','Flashcards'],
    ['mindmap','MindMap'],
    ['breathing','Breathing']
  ]
  return (
    <header className="card nav">
      <div style={{fontWeight:700, marginRight:12}}>StudyHub</div>
      {items.map(([id,label])=>
        <button key={id} className={page===id?'active':''} onClick={()=>setPage(id)}>{label}</button>
      )}
      <div style={{marginLeft:'auto'}} className="small">Local demo · no backend</div>
    </header>
  )
}
