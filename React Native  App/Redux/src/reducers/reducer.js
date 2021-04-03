const initState = {
  data: [],
  count: 0,
};

export const reducer = (state = initState, action) => {
  if (action.type === 'Add_Title') {
    return {
      ...state,
      data: [
        ...state.data,
        {
          title: action.payload,
          id: state.count + 1,
        },
      ],
      count: state.count + 1,
    };
  } else if (action.type === 'Delete_Data') {
    return {
      ...state,
      data: state.data.filter(data => {
        return data.id !== action.payload;
      }),
    };
  }
  return state;
};
