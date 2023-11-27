import React, { useState, useEffect } from 'react'
import UserItem from './UserItem'

function UserResults() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
                headers: {
                    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
                }
            })

            const data = await res.json()
            setUsers(data)
            setLoading(false)

            // console.log(data)
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }

    }
    if (!loading) {

        return (
            <div className='grid grid-row-3 gap-8 xl:grid-cols-3 lg:grid-cols-3 md:grid-row-2'>
                {/* <div className='grid grid-rows-2 md:grid-rows-2 gap-8'> */}
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>

        )
    } else {
        return <h3>Loading...</h3>
    }
}

export default UserResults