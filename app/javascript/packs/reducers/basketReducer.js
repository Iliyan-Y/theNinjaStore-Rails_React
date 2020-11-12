const initialState = {
  items: [],
};

const basketReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }

  return state;
};

export default basketReducer;
