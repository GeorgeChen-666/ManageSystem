import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
const demoState = atom({
  key: 'demo', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export default demoState;
