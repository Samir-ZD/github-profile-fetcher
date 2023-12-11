import { createContext, useReducer } from "react"
import gitHubReducer from "./GithubReducer"

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {

    const initialState = {
        users: [],
        user: {},
        count: 0,
        repos: [],
        loading: true
    }

    const [state, dispatch] = useReducer(gitHubReducer, initialState)

    
    return <GithubContext.Provider value={{
        ...state,
        dispatch,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext