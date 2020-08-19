import React, { Component } from 'react'
import AppContext from './../AppContext'
import ValidationError from '../validationError/ValidationError';
import PropTypes from 'prop-types';
import AddError from '../addError/AddError';
import config from '../config';

export default class AddNote extends Component {    
    constructor(props){
        super(props)
        this.state = {
            name: {
                value: "",
                touched: false
            },
            folderId: {
                value: "",
                touched: false
            },
            content: {
                value: "",
                touched: false
            }
        };
    }

    static contextType = AppContext;

    updateName(name) {
        this.setState({
            name: {
                value: name,
                touched: true
        }
    })
}

    validateName() {
        const name = this.state.name.value;
        if (name.length === 0) {
            return 'Note Name is required!';
        }
    }

    updateFolder(folderId) {
        this.setState({
            folderId: {
                value: folderId,
                touched: true
        }
    })
    console.log(folderId)
}

    validateFolder() {
        const folderId = this.state.folderId.value;
        if (folderId === "") {
            return 'Must select a Folder!'
        }
    }

    updateContent(content) {
        this.setState({
            content: {
                value: content,
                touched: true
        }
    })
}

    validateContent() {
        const content = this.state.content.value;
        if (content.length === 0) {
            return 'Note Content is required!';
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        fetch(`${config.API_ENPOINT}/api/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ 
                note_name: this.state.name.value,
                folder_id: this.state.folderId.value,
                content: this.state.content.value
             })
        })  
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then((note) => {
            this.context.handleNewNote(note)
            this.props.toggleForm()
        })
        .catch(error => {
            alert("Could not add note.", error)
            console.log(error)
        })
    }

    render() {
        const options = this.context.folders.map(folder => {
            return (
                <option
                    key={folder.id}
                    id={folder.id}
                    value={folder.id}
                >
                    {folder.folder_name}
                </option>
            )
        })

        return (
            <AddError>
                <form className="new-note-form" onSubmit={this.handleSubmit}>
                    
                    <label htmlFor="noteName">Note Name: </label>
                    <input 
                        type="text"
                        name="noteName"
                        id="noteName"
                        onChange={e => this.updateName(e.target.value)}
                        required
                    />
                    {this.state.name.touched && <ValidationError message={this.validateName()} />}
                    <br></br>

                    <label htmlFor="folderOptions">Folder to add Note to: </label>
                    <select 
                        name="folderOptions"
                        value={this.state.folderId.value}
                        onChange={e => this.updateFolder(e.target.value)}
                    >
                        <option value="">Select Folder</option>
                        {options}
                    </select>
                    {this.state.folderId.touched && <ValidationError message={this.validateFolder()} />}
                    <br></br>

                    <label htmlFor="content">Note: </label><br></br>
                    <textarea
                        name="content"
                        id="content"
                        onChange={e => this.updateContent(e.target.value)}
                        required
                    ></textarea>
                    {this.state.content.touched && <ValidationError message={this.validateContent()} />}
                    <br></br>

                    <button 
                        type="submit"
                        className="submit-button"
                        disabled={!this.state.name || !this.state.folderId || !this.state.content}>
                        Add New Note
                    </button>

                </form>
            </AddError>
        )
    }
}

AddNote.propTypes = {
    handleSubmit: PropTypes.func,
    updateName: PropTypes.func,
    updateFolder: PropTypes.func,
    updateContent: PropTypes.func
}