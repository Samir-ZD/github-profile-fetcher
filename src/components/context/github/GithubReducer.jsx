const gitReducer = (state, action) => {
    switch (action.type) {

        case 'GET_USERS':
            return {
                ...state,
                users: action.payload.items,
                count: action.payload.total_count,
                loading: false
            }

        case 'SEARCH_USER':
            return {
                ...state,
                user: action.payload,
                count: action.payload,
                loading: false
            }

        case 'TOTAL_USERS':
            return {
                ...state,
                // user: action.payload,
                count: action.payload,
                loading: false
            }

        case 'GET_USER_REPOS':
            return {
                ...state,
                repos: action.payload,
                loading: false
            }

        case 'CLEAR_USERS':
            return {
                ...state,
                users: [],
                user: {},
                count: 0,
                repos: [],
                loading: true
            }

        default:
            return {
                state,
                loading: true
            }
    }
}

export default gitReducer