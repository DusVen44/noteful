import React from 'react'
import './Sidebar.css'

export default function Sidebar(props) {

    return (
        <div className="sidebar-box">
            <ul>
                {props.renderNavLinks}
            </ul>
            <button className="add-folder-button">Add Folder</button>
        </div>
    )
}
 