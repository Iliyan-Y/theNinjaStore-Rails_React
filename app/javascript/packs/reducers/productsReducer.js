const initialState = {
  id: '',
  all: [],
};

const productsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_PRODUCTS':
      return Object.assign({}, state, {
        all: [...state.all, payload],
      });
    case 'CLEAR_PRODUCTS':
      return initialState;
    default:
      return state;
  }

  return state;
};

export default productsReducer;
