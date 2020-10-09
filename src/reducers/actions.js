export const addUser = (userData, router) => dispatch =>  {
    
    dispatch({
        type: 'ADD_USER',
        payload: userData,
    })

}