import React from 'react';
import { useParams} from 'react-router-dom';
export default (props) => {
  let {id} = useParams();
  return (<>
    <p>{id}</p>
    <p>some contents...</p>
    <p>some contents...</p>
  </>)
}