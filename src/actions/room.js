export const setRoom = roomData => dispatch => {
  dispatch({
    type: 'SET_ROOM',
    payload: roomData,
  });
};

export const setMessages = messages => dispatch => {
    dispatch({
        type: 'SET_MESSAGES',
        payload: messages
    })
}
