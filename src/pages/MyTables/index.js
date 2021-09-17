import React from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import PhotoListView from '../MyListView/PhotoListView';
import DigestListView from '../MyListView/DigestListView';
import BriefListView from '../MyListView/BriefListView';
import '../../../node_modules/antd-mobile/dist/antd-mobile.min.css';


const tabs = [
  { title: '图文列表' },
  { title: '摘要列表' },
  { title: '简略列表' },
];

const MyTabs = () => {
  console.log('MyTabs');
  return(
    <div >
      <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
          <PhotoListView />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
          <DigestListView />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
          <BriefListView />
        </div>
      </Tabs>
    </div>
  );
}
export default MyTabs;
// ReactDOM.render(<MyTabs />, mountNode);


