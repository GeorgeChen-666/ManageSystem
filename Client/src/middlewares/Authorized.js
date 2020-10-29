// console.log('打印' + 1);
// setTimeout(function () {
//   console.log('打印' + 2);
// });
// new Promise(function (resolve, reject) {
//   console.log('打印' + 3);
// }).then(console.log('打印' + 4));
// console.log('打印' + 10);
// new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     console.log('打印' + 5);
//   });
// }).then(console.log('打印' + 6));
// setTimeout(function () {
//   new Promise(function (resolve, reject) {
//     console.log('打印' + 7);
//   });
// });
export default function createAuthorized() {//extraArgument
  return ({ dispatch, getState }) => (next) => (action) => {
    // if (typeof action === 'function') {
    //   return action(dispatch, getState, extraArgument);
    // }
    // const {
    //   Users: { currentUser },
    // } = getState();

    setTimeout(() => {
      next(action);
    }, 3000);
    //return null;
  };
}
