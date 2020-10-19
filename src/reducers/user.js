const INITIAL_STATE = {
  user: {
    isAuth: false,
  },
  followedGroups: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        followedGroups: [...state.followedGroups, action.payload],
      };
    case 'SET_FOLLOWINGS':
      return {
        ...state,
        followedGroups: action.payload,
      };
    case 'UPDATE_GROUP':
      let mutated = state.followedGroups.filter(group => {
        return group._id === action.payload.roomId;
      });

      mutated[0].messages = action.payload.messages;

      return {
        ...state,
      };
    default:
      return state;
  }
}
