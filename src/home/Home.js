import React from 'react'
import './Home.css'

export default function Home() {
    return (
        <div className="home-box">
            <h1>Welcome to Noteful!</h1>
            <p className="intro">
                Select a Folder from the left to view its Notes. You can add a Folder by clicking
                the "Add Folder" Button. Once a Folder is selected, you can add a Note by clicking
                the "Add Note" Button.
            </p>
        </div>
    )
}
