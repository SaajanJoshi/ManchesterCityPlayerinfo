export const login = (username) => {
    return {type: 'LOGIN', username: username};
};

export const logout = () => {
    return {type: 'LOGOUT'};
};

export const screen = (name) =>{
    return {type : 'screen',name:name};
}