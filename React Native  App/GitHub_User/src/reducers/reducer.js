const initState = {
  data: [],
  user: '',
  repo: [],
  follow: [],
};

export const reducer = (state = initState, action) => {
  if (action.type === 'Add_Data') {
    return {
      ...state,
      data: [action.payload.details],
      user: action.payload.users,
    };
  } else if (action.type === 'Add_Repo') {
    return {
      ...state,
      repo: action.payload,
    };
  } else if (action.type === 'Add_Follow') {
    return {
      ...state,
      follow: action.payload,
    };
  }
  return state;
};
