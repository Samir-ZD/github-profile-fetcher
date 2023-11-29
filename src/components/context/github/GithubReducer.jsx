const gitReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {

                ...state,
                users: action.payload,
                loading: false
            }
        
        case 'CLEAR_USERS':
            return{
                users:[]
            }

        default:
            return state
    }
}

export default gitReducer