import React, {useState, useEffect}  from 'react';
import { NavBar, Icon } from 'antd-mobile';
import DetailNavBar from '../MyNavBar/DetailNavBar';
import PhotoDetail from '../DetailView/Details/PhotoDetail';
import DigestDetail from '../DetailView/Details/DigestDetail';
import BriefDetail from '../DetailView/Details/BriefDetail';
import { useHistory } from "react-router-dom";

const HistoryDetailView = () => {

  let history = useHistory();
  const id = history.location.state.id;
  const type = history.location.state.type;
  
  if(type == "photo") {
    return (
      <div>
        <DetailNavBar title= "图文详情"/>
        <PhotoDetail id={id} type={type} />
      </div>
    )
  }else if(type == "digest") {
    return (
      <div>
        <DetailNavBar title= "摘要详情"/>
        <DigestDetail id={id} type={type} />
      </div>
    )
  }else if(type == "brief") {
    return (
      <div>
        <DetailNavBar title= "简略详情"/>
        <BriefDetail id={id} type={type} />
      </div>
    )
  }


}
export default HistoryDetailView;
