import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (
        <div className="header-box">
            <h1 className="title">
                <Link to='/'>Noteful</Link>
            </h1>
        </div>
    )
}
