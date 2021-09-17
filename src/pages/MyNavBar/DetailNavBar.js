import React, {useState, useEffect}  from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { useHistory } from "react-router-dom";

const DetailNavBar = (props) => {
  const {title} = props;
    
  let history = useHistory();
  return (
    <NavBar
      mode="light"
      icon={<Icon type="left" style={{ color: "#101010",fontSize: "18px" }} />}
      onLeftClick={() => history.push('/menu')}
    >{title}</NavBar>
  )
}
export default DetailNavBar;
