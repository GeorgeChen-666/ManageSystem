import React, {useState} from 'react'
import {Avatar} from 'antd';
import {SyncOutlined, CaretRightOutlined, PauseOutlined} from '@ant-design/icons';

export default ({isRunning = false}) => {
  const [isHover, setHover] = useState(false);
  const [, setRunning] = useState(false);
  return (<span
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
  >
    {(() => {
      if (isHover) {
        if (isRunning) {
          return <Avatar size={64} icon={<PauseOutlined onClick={()=>setRunning(false)}/>}/>
        } else {
          return <Avatar size={64} icon={<CaretRightOutlined onClick={()=>setRunning(true)} />}/>
        }
      } else {
        return <Avatar size={64} icon={<SyncOutlined spin={isRunning}/>}/>
      }
    })()}
  </span>)
}