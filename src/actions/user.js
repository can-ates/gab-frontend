export const addUser = (userData) => dispatch =>  {
    
    dispatch({
        type: 'ADD_USER',
        payload: userData,
    })

}