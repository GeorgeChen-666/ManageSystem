const initialState = {
  Error: {},
};
const Errors = (state = initialState, action) => {
  switch (action.type) {
    case Types.setError: {
      const { Error } = action.payload;
      let errorData = null;
      if (!!Error) {
        errorData = Error.response.data;
        errorData.message = JSON.parse(errorData.message);
      }
      return {
        ...state,
        Error: errorData,
      };
    }
    default:
      return state;
  }
};
export const setError = (Error) => ({
  type: Types.setError,
  payload: { Error },
});
export const Types = {
  setError: `${Errors.name}/setError`,
};
export default Errors;
