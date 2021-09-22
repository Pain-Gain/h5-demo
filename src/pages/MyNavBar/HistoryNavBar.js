import React, {useState, useEffect}  from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { useHistory } from "react-router-dom";

const HistoryNavBar = () => {
  

let history = useHistory();
return (
  <NavBar
    mode="light"
    // icon={<Icon type="left" />}
    // onLeftClick={() => console.log('onLeftClick')}
    rightContent={[
      <i onClick={() => history.push('/Filter')} className="iconfont icon-shaixuan" style={{ color: "#101010",fontSize: "18px" }}></i>
      // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
      // <Icon key="1" type="ellipsis" />,
    ]}
  >移动端demo</NavBar>
)
}

export default HistoryNavBar;
