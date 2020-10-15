const INITIAL_STATE = {
  currentRoom: {
      title: '',
      avatar: '',
      private: '',
      participants: null,
      messages: null,
      founder: '',
      _id: ''
  },
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ROOM':
      return {
        ...state,
        currentRoom: action.payload,
      };
    default:
      return state;
  }
}
