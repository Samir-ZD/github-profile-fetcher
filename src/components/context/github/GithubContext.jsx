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

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${GITHUB_URL}/users`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            })

            const data = await res.json()

            //reducer
            dispatch({
                type: 'GET_USERS',
                payload: data
            })

            // console.log(data)
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext