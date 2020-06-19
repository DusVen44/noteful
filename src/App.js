import React, { Component } from 'react';
import './App.css';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import ContentContainer from './contentContainer/ContentContainer';
import AppContext from './AppContext';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: [],
      notes: [],
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

  handleNoteDeleteUpdate = id => {
    this.setState({
      notes: this.state.notes.filter((note) => { 
        return note.id !== id 
      }
      )
    })
  }

  handleNewFolder = newFolder => {
    this.setState({
      folders: [...this.state.folders, newFolder]
    })
  }

  handleNewNote = newNote => {
    this.setState({
      notes: [...this.state.notes, newNote]
    })
  }

  render() {
    const value = {
      folders: this.state.folders,
      notes: this.state.notes,
      handleNoteDeleteUpdate: this.handleNoteDeleteUpdate.bind(this),
      handleNewFolder: this.handleNewFolder.bind(this),
      handleNewNote: this.handleNewNote.bind(this)
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