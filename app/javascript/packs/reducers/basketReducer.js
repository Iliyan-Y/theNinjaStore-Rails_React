const initialState = {
  items: [],
};

const basketReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_PRODUCT':
      return Object.assign({}, state, {
        items: [...state.items, payload],
      });
    default:
      return state;
  }

  return state;
};

export default basketReducer;
