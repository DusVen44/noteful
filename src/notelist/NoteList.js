import React, { Component } from 'react'
import './NoteList.css'
import Note from '../note/Note';
import NoteBox from '../noteBox/NoteBox'
import AppContext from '../AppContext'
import { Route } from 'react-router-dom'
import AddNote from '../addNote/AddNote';
import PropTypes from 'prop-types';

export default class NoteList extends Component {
    state = {
        showForm: false,
    }

    static contextType = AppContext;

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    render() {
        let buttonText
        if (this.state.showForm === false) {
            buttonText = "Add Note"
        } else {
            buttonText = "Cancel"
        };

        return (
            <div className="note-list-box">
                <ul>
                    {this.context.notes.map(note => {
                        return (
                            <Route
                                key={note.id}
                                path={`/${note.folder_id}`}
                                render={ () => {
                                    return <NoteBox 
                                                name={note.note_name}
                                                id={note.id}
                                                date={note.date_modified}
                                                delete={this.context.delete}
                                                folder_id={note.folder_id}
                                            />
                                }}
                            />
                        )
                    })}
                </ul>

                <div className="note">
                    {this.context.notes.map(note => {
                        return <Route 
                                key={note.id}
                                path={`/${note.folder_id}/${note.id}`} 
                                render={ routeProps => {
                                    return <Note 
                                            {...routeProps} 
                                            {...note}
                                            id={note.id}
                                            folder_id={note.folder_id}
                                            />
                                    }} />
                    })}
                </div>

                <div className="add-note">
                    <button
                        className="new-note-button"
                        onClick={this.toggleForm}
                    >
                        {buttonText}
                    </button>
                    <div className="add-note-form-container">
                            {this.state.showForm && <AddNote toggleForm={this.toggleForm}/>}
                    </div>
                        
                </div>

            </div>
        )
    }
    }

    NoteList.propTypes = {
        toggleForm: PropTypes.func,
    }