import React, {useState, useEffect}  from 'react';
import { NavBar, Icon } from 'antd-mobile';
import DetailNavBar from '../MyNavBar/DetailNavBar';
import DigestDetail from './Details/DigestDetail';


const DigestDetailView = (props) => {
  const {id, type} = props;
  return (
    <div>
      <DetailNavBar title= "摘要详情"/>
      <DigestDetail id={id} type={type} />
    </div>
  )
}
export default DigestDetailView;
