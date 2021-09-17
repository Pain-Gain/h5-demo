import React, {useState, useEffect} from 'react';
import axios from '../../../axios'
import './index.scss';


const BriefDetail = (props) => {

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
      <div className="Detail-content" dangerouslySetInnerHTML={createMarkup()} />
    </div>
  )
}

export default BriefDetail;
