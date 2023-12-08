import { createContext, useReducer } from "react"
import gitHubReducer from "./GithubReducer"

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


export const GithubProvider = ({ children }) => {

    const initialState = {
        users: [],
        user: {},
        count: 0,
        repos: [],
        loading: true
    }

    const [state, dispatch] = useReducer(gitHubReducer, initialState)

    // Search username(s)
    const fetchUsers = async (text) => {

        try {

            const params = new URLSearchParams({
                q: text
            })

            const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
                headers: { Authorization: `token ${GITHUB_TOKEN}` },
            })

            if (!res.ok) {
                throw new Error(`Error fetching users: ${res.status}`)
            }

            const { items, total_count } = await res.json()

            if (total_count === 0) {
                console.log('No users found.')
            } else {
                console.log(`Total Count: ${total_count}`)

                dispatch({
                    type: 'GET_USERS',
                    payload: {items, total_count}
                })
            }

        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }


    //Get total numbers of searched users
    const getTotalUsers = async (text) => {

        try {

            const params = new URLSearchParams({ q: text })

            const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
                headers: { Authorization: `token ${GITHUB_TOKEN}` },
            })


            if (!res.ok) {
                throw new Error(`Error fetching users: ${res.status}`)
            }

            const data = await res.json()

            const totalCount = data.total_count

            dispatch({
                type: "TOTAL_USERS",
                payload: totalCount
            })

            console.log("getTotalUsers:", totalCount)

        } catch (error) {
            console.error("Error fetching user count:", error)
        }
    }

    // Search user profile
    const searchUser = async (login) => {
        try {

            const res = await fetch(`${GITHUB_URL}/users/${login}`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            })

            if (!res.ok) {
                return window.location = '/notfound'
            }

            const data = await res.json()

            //reducer
            dispatch({
                type: 'SEARCH_USER',
                payload: data
            })

            console.log(data)
        }
        catch (error) {
            console.error('Error searching user:', error)
        }
    }

    // Get users repositories
    const getUserRepos = async (login) => {

        try {
            const params = new URLSearchParams({
                sort: 'created',
                per_page: 10,
            })
            const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,
                {
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}`
                    }
                })

            const data = await res.json()

            dispatch({
                type: 'GET_USER_REPOS',
                payload: data
            })

        } catch (error) {
            console.error('Error fetching repos:', error)
        }
    }

    // Clear users from search input and sets count to zero  
    const clearUsers = () => {

        dispatch({
            type: 'CLEAR_USERS',
        })
    }

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        count: state.count,
        repos: state.repos,
        getTotalUsers,
        fetchUsers,
        searchUser,
        getUserRepos,
        clearUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext