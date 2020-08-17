import React, { Component } from 'react'
import './Sidebar.css'
import { Route, NavLink } from 'react-router-dom'
import AppContext from '../AppContext'
import AddFolder from './../addFolder/AddFolder';
import PropTypes from 'prop-types';

export default class Sidebar extends Component {
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
        const folders = this.context.folders;
        let buttonText
        if (this.state.showForm === false) {
            buttonText = "Add Folder"
        } else {
            buttonText = "Cancel"
        };

        return (
            <div className="sidebar-box">
                <ul>
                    {folders.map(folder => {
                        return (
                            <Route
                                key={folder.id}
                                render={ () => {
                                    return <NavLink
                                            to={`/${folder.id}`}
                                            className="nav-link"
                                            activeClassName="active">
                                                <li className="nav-link-box">
                                                    {folder.folder_name}
                                                </li>
                                            </NavLink>
                                }}
                            />
                        )
                    })}
                </ul>

                <button 
                    className="add-folder-button"
                    onClick={this.toggleForm}
                >
                    {buttonText}
                </button>
                <div className="add-folder-form-container">
                    {this.state.showForm && <AddFolder toggleForm={this.toggleForm}/>}
                </div>

            </div>
        )
    }
    }

Sidebar.propTypes = {
    toggleForm: PropTypes.func,
}