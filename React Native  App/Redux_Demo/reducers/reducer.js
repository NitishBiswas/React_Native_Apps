const initState = {
  data: 0,
};

export const reducer = (state = initState, action) => {
  if (action.type === 'ADD_DATA') {
    return {
      ...state,
      data: action.payload,
    };
  }
  return state;
};
