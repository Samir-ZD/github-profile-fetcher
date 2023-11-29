import { createContext, useReducer } from "react";
import gitHubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


export const GithubProvider = ({ children }) => {

    const initialState = {
        users: [],
        loading: true
    }

    const [state, dispatch] = useReducer(gitHubReducer, initialState)

    // Search Users
    const fetchUsers = async (text) => {
        try {

            const params = new URLSearchParams({
                q: text
            })

            const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            })

            const { items } = await res.json()

            //reducer
            dispatch({
                type: 'GET_USERS',
                payload: items
            })

            // console.log(data)
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    // clear users from search input  
    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS',
        })
    }

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
        clearUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext