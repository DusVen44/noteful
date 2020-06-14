import React, { Component } from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import Note from './note/Note';
import Sidebar from './sidebar/Sidebar';
import ContentContainer from './contentContainer/ContentContainer';
import AppContext from './AppContext';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: [],
      notes: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:9090/folders'),
      fetch('http://localhost:9090/notes')
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));
        
        return Promise.all([notesRes.json(), foldersRes.json()])
      })
      .then(([folders, notes]) => {
        this.setState({
          folders: folders,
          notes: notes
        });
      })
      .catch(error => {
        console.log({error});
      });
  }

  renderNavLinks() {
    const { folders } = this.state;
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

  renderNoteList() {
    const { notes } = this.state;
    const noteList = notes.map(note => {
      return (
        <Route 
          key={note.id}
          path={`/${note.folderId}`}
          render={ () => {
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
    const { notes } = this.state;
    const note = notes.map(note => {
      return (
        <Route
          key={note.id}
          path={`/${note.id}`}
          render={ () => {
            return <Route 
                    path={`/${note.id}`} 
                    render={ routeProps => {
                      return <Note 
                              {...routeProps} 
                              {...note}
                              id={note.id}
                              onClickGoBack={() => routeProps.history.goBack()}/>
                    }} />
          }}
        />
      )
    })
    return note
  }

  render() {
    const value={
      folders: this.state.folders,
      notes: this.state.notes,
      renderNavLinks: this.renderNavLinks(),
      renderNoteList: this.renderNoteList(),
      renderNote: this.renderNote()
    }
    return (
      <AppContext.Provider value={value}>
      <div>
        <Header />

        <Sidebar />

        <ContentContainer />

      </div>
      </AppContext.Provider>
    )
  }
}