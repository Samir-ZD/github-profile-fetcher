const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


// search usernames
export const fetchUsers = async (text) => {

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

            return { items, total_count }
        }

    } catch (error) {
        console.error('Error fetching users:', error)
    }
}

//search profile (single user)
export const searchUser = async (login) => {
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

        console.log(data)
        return data
    }
    catch (error) {
        console.error('Error searching user:', error)
    }
}


// Get users repositories
export const getUserRepos = async (login) => {

    try {
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10,
        })
        const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const data = await res.json()

        return data

    } catch (error) {
        console.error('Error fetching repos:', error)
    }
}

