import React, { Component } from 'react'
import AppContext from './../AppContext'
import ValidationError from '../validationError/ValidationError';
import PropTypes from 'prop-types'

export default class AddNote extends Component {    
    constructor(props){
        super(props)
        this.state = {
            name: "",
            folderId: "",
            content: ""
        };
    }

    static contextType = AppContext;

    updateName(name) {
        this.setState({
            name: name,
        })
    }

    validateName() {
        const name = this.state.name;
        if (name.length === 0) {
            return 'Note Name is required!';
        }
    }

    updateFolder(folderId) {
        this.setState({
            folderId: folderId
        })
    }

    validateFolder() {
        const folderId = this.state.folderId;
        if (folderId === "") {
            return 'Must select a Folder!'
        }
    }

    updateContent(content) {
        this.setState({
            content: content
        })
    }

    validateContent() {
        const content = this.state.content;
        if (content.length === 0) {
            return 'Note Content is required!';
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ 
                name: this.state.name,
                folderId: this.state.folderId,
                content: this.state.content
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
                    {folder.name}
                </option>
            )
        })

        return (
            <form className="new-note-form" onSubmit={this.handleSubmit}>
                
                <label htmlFor="noteName">Note Name: </label>
                <input 
                    type="text"
                    name="noteName"
                    id="noteName"
                    onChange={e => this.updateName(e.target.value)}
                    required
                />
                <ValidationError message={this.validateName()} />
                <br></br>

                <label htmlFor="folderOptions">Folder to add Note to: </label>
                <select 
                    name="folderOptions"
                    value={this.state.folderId}
                    onChange={e => this.updateFolder(e.target.value)}
                >
                    <option value="">Select Folder</option>
                    {options}
                </select>
                <ValidationError message={this.validateFolder()} />
                <br></br>

                <label htmlFor="content">Note: </label><br></br>
                <textarea
                    name="content"
                    id="content"
                    onChange={e => this.updateContent(e.target.value)}
                    required
                ></textarea>
                <ValidationError message={this.validateContent()} />
                <br></br>

                <button 
                    type="submit"
                    className="submit-button"
                    disabled={!this.state.name || !this.state.folderId || !this.state.content}>
                    Add New Note
                </button>

            </form>
        )
    }
}

AddNote.propTypes = {
    handleSubmit: PropTypes.func,
    updateName: PropTypes.func,
    updateFolder: PropTypes.func,
    updateContent: PropTypes.func
}