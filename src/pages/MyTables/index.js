import React from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import MyListView from '../MyListView/test';
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
        <MyListView />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
          {/* Content of second tab */}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
          Content of third tab
        </div>
      </Tabs>
    </div>
  );
}
export default MyTabs;
// ReactDOM.render(<MyTabs />, mountNode);


