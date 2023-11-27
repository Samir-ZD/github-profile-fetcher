import { createContext, useState } from "react";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


export const GithubProvider = ({children})=>{
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${GITHUB_URL}/users`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
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

    return <GithubContext.Provider value={{
        users,
        loading,
        fetchUsers,
    }}>
        {children}
    </GithubContext.Provider>
}
export default GithubContext