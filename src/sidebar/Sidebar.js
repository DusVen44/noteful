import React from 'react'
import './Sidebar.css'
import AppContext from '../AppContext'

export default function Sidebar() {

    return (
        <AppContext.Consumer>
            {(value) => (
                <div className="sidebar-box">
                    <ul>
                        {value.renderNavLinks}
                    </ul>
                    <button className="add-folder-button">Add Folder</button>
                </div>
                )}
        </AppContext.Consumer>
    )
}