import React, {useState, useEffect} from 'react';
import axios from '../../axios/index'
import './index.scss';


const DigestDetail = (props) => {

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
    requestDetail();
  },[]);

  var text = content.text;
  function createMarkup() {
    return {__html: text};
  }

  return (
    <div>
      <p className="Detail-title">{content.title}</p>
      <p className="Detail-tag" >摘要</p>
      <p className="Detail-digest" >{content.digest}</p>
      <div className="Detail-content" dangerouslySetInnerHTML={createMarkup()} />
    </div>
  )
}

export default DigestDetail;
