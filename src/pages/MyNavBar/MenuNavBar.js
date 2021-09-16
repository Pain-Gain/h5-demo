import React, {useState, useEffect}  from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { useHistory } from "react-router-dom";

const MenuNavBar = () => {

let history = useHistory();
return (
  <NavBar
    mode="light"
    rightContent={[
      <i onClick={() => history.push('/home')} className="iconfont icon-wenhao" style={{ color: "#101010",fontSize: "18px" }}></i>
    ]}
  >移动端demo</NavBar>
)
}
export default MenuNavBar;
