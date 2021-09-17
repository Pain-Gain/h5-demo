import React, {useState, useEffect}  from 'react';
import { NavBar, Icon } from 'antd-mobile';
import DetailNavBar from '../MyNavBar/DetailNavBar';
import PhotoDetail from './Details/PhotoDetail';


const PhotoDetailView = (props) => {
  const {id, type} = props;
  return (
    <div>
      <DetailNavBar title= "图文详情"/>
      <PhotoDetail id={id} type={type} />
    </div>
  )
}
export default PhotoDetailView;
