import React, {useState, useEffect}  from 'react';
import { NavBar, Icon } from 'antd-mobile';
import DetailNavBar from '../MyNavBar/DetailNavBar';
import BriefDetail from './Details/BriefDetail';


const BriefDetailView = (props) => {
  const {id, type} = props;
  return (
    <div>
      <DetailNavBar title= "简略详情"/>
      <BriefDetail id={id} type={type} />
    </div>
  )
}
export default BriefDetailView;
