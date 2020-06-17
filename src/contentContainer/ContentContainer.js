import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './ContentContainer.css'
import Home from './../home/Home'
import NoteList from './../notelist/NoteList'
import AppContext from '../AppContext'

export default function ContentContainer() {
    return (
        <AppContext.Consumer>
            {(value) => (
                <div className="content-container">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path={value.folders.id} component={NoteList} />
                    </Switch>
                </div>)}
        </AppContext.Consumer>
    )
}
