const initialState = {
  id: '',
  all: [
    {
      id: 'fake id',
      name: 'fake name',
      description: 'fake item',
      image: 'no Image yet',
      created: 'forever',
    },
  ],
};

const productsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_PRODUCTS':
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
