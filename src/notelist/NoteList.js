import React from 'react'
import './NoteList.css'

export default function NoteList(props) {
    return (
        <div className="note-list-box">
            <ul>
                {props.renderMainContent}
                {props.renderNote}
            </ul>
        </div>
    )
}
