import React from 'react'
import { Route } from 'react-router-dom'
import Home from './../home/Home'
import NoteList from './../notelist/NoteList'
import AppContext from '../AppContext'

export default function ContentContainer() {
    return (
        <AppContext.Consumer>
            {(value) => (
                <div>
                    <Route exact path='/' component={Home} />
                    <Route
                        path={value.folders.id}
                        render={ () => {
                            return <NoteList />
                        }}
                    />
                </div>)}
        </AppContext.Consumer>
    )
}
