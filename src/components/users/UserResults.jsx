import React, { useEffect, useContext } from 'react'
import UserItem from './UserItem'
import GithubContext from '../context/github/GithubContext'


function UserResults() {
    const { users, loading, fetchUsers } = useContext(GithubContext)

    useEffect(() => {
        fetchUsers()
    }, [])

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