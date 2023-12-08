import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'


function Navbar({ title }) {
    return (
        <nav className='navbar mb-12 shadow-lg bg-neutral text-neutral-content'>
            <div className="container mx-auto">
                <div className="flex-none px-2 mx-2"></div>
                <Link to='/' className='text-lg font-bold-align-middle'>
                    <FaGithub className='inline mx-2 text-3xl' />
                    <p className='inline pr-2 text-xl'>{title}</p>
                </Link>
                <div className="flex-1 px-2 mx-2">
                    <div className="flex justify-end">
                        <Link to='/' className='btn btn-ghost btn-sm rounded-btn'>Home</Link>
                        <Link to='/about' className='btn btn-ghost btn-sm rounded-btn'>About</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar