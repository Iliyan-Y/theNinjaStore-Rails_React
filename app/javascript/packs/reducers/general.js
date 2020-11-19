const initialState = {
  refresh: false,
};

const generalReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'REFRESH':
      return Object.assign({}, state, {
        refresh: !state.refresh,
      });
    default:
      return state;
  }

  return state;
};

export default generalReducer;
