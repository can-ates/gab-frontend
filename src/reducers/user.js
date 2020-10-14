const INITIAL_STATE = {
  user: {
      isAuth: false
  },
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_USER':
      
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    default:
      return state;
  }
}
