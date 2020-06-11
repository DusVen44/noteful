import React, { Component } from 'react'
import { Route, NavLink, Link } from 'react-router-dom'
import './App.css'
import data from './Store'
import Header from './header/Header'
import Home from './home/Home'
import Note from './note/Note'
import Sidebar from './sidebar/Sidebar'
import NoteList from './notelist/NoteList'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: data.folders,
      notes: data.notes
    }
  }

  renderNavLinks() {
    const { folders, notes } = this.state;
    const folderList = folders.map(folder => {
      return (
        <Route
          key={folder.id}
          render={ () => {
            return  <NavLink 
                      to={`/${folder.id}`}
                      className="nav-link"
                      activeClassName="active"> 
                        <li className="nav-link-box">
                          {folder.name}
                        </li>
                    </NavLink>
          }}
        />
      )
    })
    return folderList
  }

  renderMainContent() {
    const { folders, notes } = this.state;
    const noteList = notes.map(note => {
      return (
        <Route 
          key={note.id}
          path={`/${note.folderId}`}
          render={ routeProps => {
            return  <Link to={`/${note.id}`}>
                      <li className="note-link-box">
                        {note.name}
                      </li>
                    </Link>
          }}
        />
      )
    })
    return noteList
  }

  renderNote() {
    const { folders, notes } = this.state;
    const note = notes.map(note => {
      return (
        <Route
          key={note.id}
          path={`/${note.id}`}
          render={ routeProps => {
            return <Route 
                    path={`/${note.id}`} 
                    render={ routeProps => {
                      return <Note {...routeProps} {...note}/>
                    }} />
          }}
        />
      )
    })
    return note
  }

  render() {
    const { folders, notes } = this.state;
    return (
      <div>
        <Header />
        <Sidebar renderNavLinks={this.renderNavLinks()} />

        <Route exact path='/' component={Home} />

        <Route
          path={`/:${folders.id}`}
          render={ routeProps => {
            return <NoteList renderMainContent={this.renderMainContent()}
                             renderNote={this.renderNote()}/>
          }}
        />

      </div>
    )
  }
}