import React, { useState, useContext, useRef } from 'react'
import GithubContext from '../context/github/GithubContext'
import AlertContext from '../context/alert/AlertContext'
import { fetchUsers } from '../context/github/GitHubActions'


function UserSearch() {

  const [text, setText] = useState("")

  const { users, dispatch } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)

  const inputText = useRef(text)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (inputText.current.value === "") {
      return setAlert("Please enter a username!", "error")
    }

    try {

      const users = await fetchUsers(text)

      dispatch({ type: 'GET_USERS', payload: users })

    } catch (error) {
      console.error("Error fetching users:", error)
      setAlert("An error occurred while fetching users.", "error")
    }
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input type="text" className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder='Search users' ref={inputText} onChange={(e) => setText(e.target.value)} />
              <button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">Search</button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={() => dispatch({ type: "CLEAR_USERS" })}>Clear</button>
        </div>)}
    </div>
  )
}

export default UserSearch