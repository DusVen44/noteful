import React from 'react'
import './NoteList.css'
import AppContext from '../AppContext'

export default function NoteList() {
    
    return (
        <AppContext.Consumer>
            {(value) => (
                <div className="note-list-box">
                    <ul>
                        {value.renderNoteList}
                    </ul>
                    <div className="note">
                        {value.renderNote}
                    </div>
                </div>
        )}
        </AppContext.Consumer>
    )
}
