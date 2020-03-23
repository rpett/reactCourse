import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'



const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)
    const [notification, setNotification] = useState({})

    useEffect(() => {
      noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
    }, [])

    const addNote = (event) => {
      event.preventDefault()
      const noteObject = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() > 0.5
      }

      noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
        setNotification(
          {
            className: 'success', 
            message:`Added '${returnedNote.content}' `}
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
    
    const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
    
      noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setNotification(
          {
            className: 'error', 
            message:`Note '${note.content}' was already removed from server`}
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
    }

    const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
    }
    
    const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    return (
      <div>
        <h1>Notes</h1>
        <Notification notification={notification} />
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>
        <ul>
          {notesToShow.map((note, i) => 
            <Note 
              key={i}
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange}/>
          <button type="submit">save</button>
        </form>
      </div>
    )
}
  
export default App