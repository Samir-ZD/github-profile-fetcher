import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (


        <div className="hero">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold">404-Page Not Found</h1>
                    <Link to='/' className='text-center hero-content btn btn-neutral m-3'>Back to Home</Link>
                </div>
            </div>
        </div>



    )
}

export default NotFound