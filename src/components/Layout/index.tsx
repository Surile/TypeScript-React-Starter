import React from 'react'
import {Link, useHistory} from 'react-router-dom'

const Header = () => {
    return (
        <header style={{margin: '5px 0'}}>
            <Link style={{margin: '5px'}} to="/">
                home
            </Link>
            <Link style={{margin: '5px'}} to="/about">
                about
            </Link>
            <Link to="/private">trend</Link>
        </header>
    )
}

export default ({children}: {children: any}) => (
    <>
        <Header />
        {children}
    </>
)
