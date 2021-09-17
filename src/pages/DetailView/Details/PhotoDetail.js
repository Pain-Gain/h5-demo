import React, {useState, useEffect} from 'react';
import axios from '../../../axios/index'
import {adapterFun} from '../../../tool'
import './index.scss';


const PhotoDetail = (props) => {

  const [content, setContent] = useState({});
  const {id, type} = props;
  var params = {
    id: id,
    type: type 
  }

  const requestDetail = ()=>{
    axios.Ajax({
        url:'detail',
        data:{
            params: params,
            isMock:true
        }
    }).then((res)=>{
        if(res.code == '00000'){
          console.log('res',res);
          setContent(res.data);
        }
    })
}

  useEffect(() => {
    adapterFun(375);
    requestDetail();
  },[]);
  var text = content.text;
  function createMarkup() {
    return {__html: text};
  }

  return (
    <div>
      <p className="Detail-title">{content.title}</p>
      <div className="box">
      <p className="Detail-author" >{content.autohor}</p>
      <p className="Detail-date" >{content.date}</p>
      </div>
      <img className="Detail-img" src='../../logo512.png' />
      <div className="Detail-content" dangerouslySetInnerHTML={createMarkup()} />
    </div>
  )
}

export default PhotoDetail;
