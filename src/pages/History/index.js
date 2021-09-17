
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import { ListView } from 'antd-mobile';
import {adapterFun} from '../../tool';
import MyTabs from '../MyTables';
import './index.scss'



const HistoryList = (props) => {



  const MyBody = (props) => {
    return (
      // <MyTabs>
      //   {props.children}
      // </MyTabs>
      <div className="am-list-body my-body">
        <span style={{ display: 'none' }}>you can custom body wrap element</span>
        {props.children}
      </div>
    );
  }
  
  
  const listData = [
    {
      id: '0',
      type: 'photo',
      img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      title: '标题一占位文字',
      date: '2019-12-12',
      author: '普益标准',
    },
    {
      id: '1',
      type: 'digest',
      title: '标题二占位文字',
      digest: '摘要占位文字，摘要占位文字摘要占位文字摘要占位文字摘要占位文字摘要占位文字摘要占位文字摘要占位文字',
    },
    {
      id: '2',
      type: 'brief',
      title: '标题三占位文字',
    },
  ];
  const NUM_SECTIONS = 3;
  const NUM_ROWS_PER_SECTION = 5;
  let pageIndex = 0;
  
  const dataBlobs = {}; //数据
  let sectionIDs = [];  //选中行
  let rowIDs = [];
  const genData = (pIndex = 0) => {
    // console.log('historyGenData+++++++++++++++++++++++');
    for (let i = 0; i < NUM_SECTIONS; i++) {
      const ii = (pIndex * NUM_SECTIONS) + i;
      const sectionName = `${ii}`;
      sectionIDs.push(sectionName);
      dataBlobs[sectionName] = sectionName;
      rowIDs[ii] = [];
  
      for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
        const rowName = `${jj}`;
        rowIDs[ii].push(rowName);
        dataBlobs[rowName] = rowName;
      }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
    // console.log('sectionIDs',sectionIDs);
    // console.log('rowIDs',rowIDs);
  
  }

  const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
  const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

  const dataSource = new ListView.DataSource({
    getRowData,
    getSectionHeaderData: getSectionData,
    rowHasChanged: (row1, row2) => row1 !== row2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  });

  // 这个地方应该是 今天给你的那个计算
  let clientHeight = (document.documentElement.clientHeight - 139) / 100;
  const [data, setData] = useState(dataSource);
  const [isLoading, setIsLoading] = useState(true);
  const [height, setHeight] = useState(clientHeight);

  let refContainer = useRef(null);

  useEffect(() => {    
    adapterFun(375);
    const hei = (document.documentElement.clientHeight - 139) / 100;

    setTimeout(() => {
      // console.log('11111111111111111111111');
      genData();
      setData(data.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs));
      setIsLoading(false);
      setHeight({hei})
    }, 600);
    return () => {
      sectionIDs = [];
    };
    const dom = document.documentElement.getElementsByClassName('aaa');
  },[]);

  //滑到页底，加载下一页
  const onEndReached = (event) => {
    if (isLoading) {
      return;
    }
    // console.log('-----------------reach end', event);
    setIsLoading(true);
    setTimeout(() => {
      genData(++pageIndex);
      setData(data.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs));
      setIsLoading(false);
    }, 2000);
  }

  
    //列表项间分割线
  const separator = (sectionID, rowID) => (
    <div
      // key={`${sectionID}-${rowID}`}
      key={`Section ${sectionID}-S${sectionID}, R${rowID}`}
      style={{
          width:'3.23rem',
          marginLeft: '0.21rem',
          borderTop: '2px solid #ECECED',
        }}
    />
  );

  const renderDetail = (ListId) =>{

  }
 
  let index = listData.length - 1;
  //列表项渲染
  const row = (rowData, sectionID, rowID) => {
    // console.log('-----------------rowData', rowData);
    if (index < 0) {
      index = listData.length - 1;
    }
    const obj = listData[index--];
    const ListId = NUM_ROWS_PER_SECTION * sectionID + rowID
    if(obj.type == "photo"){
      // console.log(`S${sectionID}, R${rowID}  ${obj.type}`);
      return (
        <div key={`S${sectionID}, R${rowID}`} >
        <div onClick={(e) => this.renderDetail(ListId, e)} className='photo-list-box' >
          <img className='photo-list-img' src={obj.img} alt="" />
          <div className='photo-list-box-1' >
            <p className='photo-list-title' >{obj.title}</p>
            <div className='photo-list-box-2' >
              <p className='photo-list-author' >{obj.author}</p>
              <p className='photo-list-date'>{obj.date}</p>
            </div>
          </div>
        </div>
      </div>
      );
    } else if(obj.type == "digest") {
      // console.log(`S${sectionID}, R${rowID}  ${obj.type}`);
      return (
        <div key={`S${sectionID}, R${rowID}`} >
          <div onClick={(e) => renderDetail(ListId, e)} className='digest-list-box' >
            <p className='digest-list-title' >{obj.title}</p>
            <p className='digest-list-digest' >{obj.digest}</p>
          </div>
        </div>
      );
    } else if(obj.type == "brief") {
      // console.log(`S${sectionID}, R${rowID}  ${obj.type}`);
      return (
        <div key={`S${sectionID}, R${rowID}`} >
          <div onClick={(e) => renderDetail(ListId, e)} className='brief-list-box' >
            <p className='brief-list-title' >{obj.title}</p>
            {/* <p className='digest-list-digest' >{obj.digest}</p> */}
          </div>
        </div>
      );
      }
  };

  return (
    <ListView
    ref={el => refContainer = el}
    dataSource={data}
    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
      {isLoading ? 'Loading...' : 'Loaded'}
    </div>)}
    renderBodyComponent={() => <MyBody />}
    renderRow={row} //列表项
    renderSeparator={separator} //列表项间分隔
    style={{
      height: `${height}rem`,
      width:'100%',
      overflow: 'auto',
    }}
    pageSize={4}
    onScroll={() => { console.log('scroll'); }}
    scrollRenderAheadDistance={500}
    onEndReached={onEndReached}
    onEndReachedThreshold={10}
  />
)
}
export default HistoryList;
