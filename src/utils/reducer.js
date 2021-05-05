export const createReducer = ({ initialState, callbacks }) => {
    return (state, action) => {
      return callbacks
        .filter(callback => callback.actionType === action.type)
        .reduce(
          (prevState, callback) => {
            return callback.actionFunction(prevState, action);
          },
          state ? initialState.merge(state) : initialState,
        );
    };
  };