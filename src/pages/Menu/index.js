import { TabBar } from 'antd-mobile';

import React, {useState, useEffect} from 'react';
// import axios from '../../axios/index'
// import './index.css';
import MyTabs from '../MyTables';
import MenuNavBar from '../MyNavBar/MenuNavBar';
import '../../../node_modules/antd-mobile/dist/antd-mobile.min.css';
import liulanjilu from "../../icon/liulanjilu.png"
import liulanjilu1 from "../../icon/liulanjilu1.png"
import caidan from "../../icon/caidan.png"
import caidan1 from "../../icon/caidan1.png"

const MenuBar = () => {

  const [selectedTab, setSelectedTab] = useState('blueTab');
  const [hidden, setHidden] = useState(false);
  const [fullScreen, setFullScreen] = useState(true);

  // useEffect(() => {
  // },[]);
  const renderContent = (pageText) => {

    if(pageText == 'content') {
      return (
        <div >
          
          <MenuNavBar />
          <MyTabs />
          {/* MenuBar test!!!! */}
        </div>
      );
    }else if(pageText == 'history'){
      return (
        <div >
          MenuBar test!!!!
          History page!!!!
        </div>
      );
    }
  }

  return (
    <div style={fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      hidden={hidden}
      tabBarPosition='bottom'
    >
      <TabBar.Item
        title="内容市场"
        key="内容市场"
        icon={<img src= {caidan} style={{ width: '22px', height: '22px' }} />}
        selectedIcon={<img src= {caidan1} style={{ width: '22px', height: '22px' }} />}
        selected={selectedTab === 'blueTab'}
        onPress={() => {
          setSelectedTab('blueTab');
        }}
        data-seed="logId"
      >
        {renderContent('content')}
      </TabBar.Item>
      <TabBar.Item
        title="浏览记录"
        key="浏览记录"
        icon={<img src= {liulanjilu} style={{ width: '22px', height: '22px' }} />}
        selectedIcon={<img src= {liulanjilu1} style={{ width: '22px', height: '22px' }} />}
        selected={selectedTab === 'yellowTab'}
        onPress={() => {
          setSelectedTab('yellowTab');
        }}
        data-seed="logId"
      >
        {renderContent('history')}
      </TabBar.Item>

      
    </TabBar>
  </div>
)
}

export default MenuBar;