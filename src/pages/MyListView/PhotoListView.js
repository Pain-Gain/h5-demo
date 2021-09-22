
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import { ListView, Toast } from 'antd-mobile';
import {adapterFun} from '../../tool';
import MyTabs from '../MyTables';
import axios from '../../axios/index'
import './index.scss'
import { useHistory } from "react-router-dom";

function MyBody(props) {
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
    type: 'photo',
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: '标题二占位文字标题二占位文字标题二占位文字标题二占位文字标题二占位文字',
    date: '2019-12-12',
    author: '普益标准',
  },
  {
    id: '2',
    type: 'photo',
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: '标题三占位文字标题三占位文字标题三占位文字标题三占位文字标题三占位文字',
    date: '2019-12-12',
    author: '普益标准',
  },
];


const PhotoListView = (props) => {


  const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
  const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

  const dataSource = new ListView.DataSource({
    getRowData,
    getSectionHeaderData: getSectionData,
    rowHasChanged: (row1, row2) => row1 !== row2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  });

  let clientHeight = (document.documentElement.clientHeight - 139) / 100;
  const [data, setData] = useState(dataSource);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(true);
  const [height, setHeight] = useState(clientHeight);
  const [pageNum, setPageNum] = useState('0');
  const [reqData, setReqData] = useState([]);

    const NUM_SECTIONS = 2;
  const NUM_ROWS_PER_SECTION = 5;
  let pageIndex = 0;

  var params = {
    pageIndex: pageIndex,
    pageSize: 10 
  }
  function getReqData(props) {
    const {list} = props;
    console.log("list",list);
    setReqData(list);
    setIsRequesting(false);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    console.log("reqData",reqData);
    Toast.hide();
    
  }
  
  function requestList() {
    axios.requestList(getReqData, '/photoList', params, true);
    console.log("reqData",reqData);
    console.log("111111111111111111111111111");
  }
  
  const dataBlobs = {}; //数据
  let sectionIDs = [];  //选中行
  let rowIDs = [];
  function genData(pIndex = 0) {
    console.log("2222222222222222222222222222");
    // console.log('PhotoGenData');
    requestList();
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
  }  

  let refContainer = useRef(null);

  useEffect(() => {    
    adapterFun(375);
    const hei = (document.documentElement.clientHeight - 139) / 100;

    setTimeout(() => {
      genData();
      Toast.loading('Loading...', 0, () => {
        console.log('Load complete !!!');
      });
      setData(data.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs));
      setIsLoading(false);
      setHeight({hei})
    }, 600);
    return () => {
      sectionIDs = [];
    };

  },[]);


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
      key={`Section ${sectionID}-S${sectionID}, R${rowID}`}
      style={{
          width:'3.36rem',
          marginLeft: '0.21rem',
          borderTop: '2px solid #ECECED',
        }}
    />
  );

  let history = useHistory();

  const renderDetail = (ListId) =>{
    history.push({
      pathname: '/PhotoDetail',
      state:{
        id: ListId,
        type: 'photo'
      }
    });
  }
 
  let index = listData.length - 1;
  //列表项
  const row = (rowData, sectionID, rowID) => {
    console.log("3333333333333333333333333333333");
    if (index < 0) {
      index = listData.length - 1;
    }
    const obj = listData[index--];
    const ListId = NUM_ROWS_PER_SECTION * sectionID + rowID
    return (
      isRequesting? <div/> : 
      <div key={`S${sectionID}, R${rowID}`} >
        <div onClick={(e) => renderDetail(ListId, e)} className='photo-list-box' >
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
export default PhotoListView;
