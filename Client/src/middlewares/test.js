export default function createTest(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    return next(action);
  };
}
