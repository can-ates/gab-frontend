export const addUser = userData => dispatch => {
  dispatch({
    type: 'ADD_USER',
    payload: userData,
  });
};

export const updateUser = roomData => dispatch => {
  dispatch({
    type: 'UPDATE_USER',
    payload: roomData,
  });
};

export const setFollowings = roomData => dispatch => {
  dispatch({
    type: 'SET_FOLLOWINGS',
    payload: roomData,
  });
};

export const updateGroup = roomData => dispatch => {
  dispatch({
    type: 'UPDATE_GROUP',
    payload: roomData
  })
}
