import React from 'react';
import { atom, useRecoilState, snapshot_UNSTABLE } from 'recoil';
const Demo = () => {
  const textState = atom({
    key: 'textState',
    default: '777',
  });
  //const [text, setText] = useRecoilState(textState);
  const fuck = snapshot_UNSTABLE().getLoadable(textState);
  console.log(fuck);
  return <div>666</div>;
};
export default Demo;
