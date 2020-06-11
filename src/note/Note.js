import React from 'react'
import "./Note.css"

export default function Note(props) {
    console.log(props)
    const { name, content, } = props;
    return (
        <div>
            <div className="note-box">
                <h1>{name}</h1>
                <button className="delete-button">Delete Note</button>
            </div>
            <div className="note-content">
                <p>{content}</p>
            </div>
        </div>
    )
}
