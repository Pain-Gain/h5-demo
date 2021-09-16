/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { ListView } from 'antd-mobile';
import {adapterFun} from '../../tool'
import './index.scss'

function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

const data = [
  {
    id: '0',
    type: '0',
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '标题一占位文字',
    date: '2019-12-12',
    author: '普益标准',
  },
  {
    id: '1',
    type: '0',
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: '标题二占位文字标题二占位文字标题二占位文字标题二占位文字标题二占位文字',
    date: '2019-12-12',
    author: '普益标准',
  },
  {
    id: '2',
    type: '0',
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: '标题三占位文字标题三占位文字标题三占位文字标题三占位文字标题三占位文字',
    date: '2019-12-12',
    author: '普益标准',
  },
];
const NUM_SECTIONS = 6;
const NUM_ROWS_PER_SECTION = 6;
let pageIndex = 0;

const dataBlobs = {}; //数据
let sectionIDs = [];  //选中行
let rowIDs = [];
function genData(pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = (pIndex * NUM_SECTIONS) + i;
    const sectionName = `Section ${ii}`;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
    console.log('dataBlobs',dataBlobs);
  }
  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
  console.log('sectionIDs',sectionIDs);
  console.log('rowIDs',rowIDs);
}

class MyListView extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    console.log('dataSource', dataSource);

    this.state = {
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
    };
  }

  componentDidMount() {
    adapterFun(375);
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    setTimeout(() => {
      genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
        height: hei,
      });
    }, 600);
  }

  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {//hasMore 指示是否是最后一页
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      genData(++pageIndex);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          borderTop: '2px solid #ECECED',
        }}
      />
    );

    let index = data.length - 1;

    //列表项
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} >
          <div className='list-box' >
            <img className='list-img' src={obj.img} alt="" />
            <div className='list-box-1' >
              <p className='list-title' >{obj.title}</p>
              <div className='list-box-2' >
                <p className='list-author' >{obj.author}</p>
                <p className='list-date'>{obj.date}</p>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        // renderBodyComponent={() => <MyBody />}
        renderRow={row} //列表项
        renderSeparator={separator} //列表项间分隔
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        pageSize={4}
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
export default MyListView;
// ReactDOM.render(<Demo />, mountNode);

