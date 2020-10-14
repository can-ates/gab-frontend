export const setRoom = (roomData) => dispatch =>  {
    
    dispatch({
        type: 'SET_ROOM',
        payload: roomData,
    })

}