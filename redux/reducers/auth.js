const defaultState = {
    isLoggedIn: false,
    username: '',
    screen:''
};
 
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN': 
            return Object.assign({}, state, { 
                isLoggedIn: true,
                username: action.username
            });
        break;
        case 'LOGOUT':
            return Object.assign({}, state, { 
                isLoggedIn: false,
                username:''
            });
        break; 
        case 'screen':
        return Object.assign({}, state, {
          screen:action.name
        });
        break;   
        default:
            return state;
    }
}