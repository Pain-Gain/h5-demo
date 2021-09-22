import React, { useState, useEffect, useRef } from "react";
import {Modal, List,  ListView, PullToRefresh, ActivityIndicator, Button, Tag, DatePicker, InputItem } from "antd-mobile";
import { useHistory } from "react-router-dom";
import axios from '../../axios/index'
import "./index.scss";
import HistoryNavBar from '../MyNavBar/HistoryNavBar';

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}


const HistoryList = (props) => {
  const PAGE_SIZE = 15;
  const clientHeight = (document.documentElement.clientHeight - 95) / 100;
  const [height, setHeight] = useState(clientHeight);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const orgList = useRef([]);
  const lv = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const listDataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  });
  const dataSource = useRef(listDataSource);

  const nowTimeStamp = Date.now();
  const now = new Date(nowTimeStamp);
  const [modal, setModal] = useState(false);
  const [deadline, setDeadline] = useState(now);
  const [title, setTitle] = useState("");
  const [type1, setType1] = useState(true);
  const [type2, setType2] = useState(true);
  const [type3, setType3] = useState(true);
  const [filter, setFilter] = useState(false);
  function formatDate(date) {
    const pad = n => n < 10 ? `0${n}` : n;
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    return `${dateStr}`;
  }


  const history = useHistory();
  // useEffect(() => {}, []);

  useEffect(() => {
    if(pageNum <= pageCount){
      setIsLoading(true);
      setRefreshing(true);
      _getOrgList(pageNum);
    }
  }, [pageNum,title,type1,type2,type3]);
  

  const dataSort = (source) => {
    let dateList = [];
    const results = [];
    source.map((item) => {
      if(!dateList.includes(item.BrowseDate)){
        dateList.push(item.BrowseDate);
        let result = [];
        result.push(item);
        results.push(result);
      }else {
        let index = dateList.indexOf(item.BrowseDate);
        results[index].push(item);
      }
    })
    return results;
  }

  const getOrgList = (pageNum) => {
    let date = formatDate(deadline);
    return new Promise((resolve) => {
      const data = [];
      var url = "HistoryList";
      var ReqData = {
        params: {
          deadline: date,
          title: title,
          type: {
            poto: type1,
            digest: type2,
            brief: type3,
          },
          pageIndex: pageNum,
          pageSize: PAGE_SIZE 
        },
        isMock: true
      }
      axios.Ajax({
          url,
          ReqData,
      }).then((res)=>{
        let list = res.data.list;
        list.map((item) => data.push(item));
        var ordereDdata = dataSort(data);
        let pagesum = res.data.page_count;
        setPageCount(pagesum);
        resolve({
          code: 0,
          data: ordereDdata,
        });
      })
    });
  };
  const _getOrgList = (pageNum) => {
    getOrgList(pageNum).then((res) => {
      if (res.code === 0) {
        if (res.data.length < 1) {
          setIsLoading(false);
          setRefreshing(false);
          return;
        }
        if (pageNum === 1) {
          dataSource.current = dataSource.current.cloneWithRows(res.data);
          orgList.current = res.data;
          console.log("dataSource", dataSource);
        } else {
          dataSource.current = dataSource.current.cloneWithRows([
            ...orgList.current,
            ...res.data,
          ]);
          orgList.current = [...orgList.current, ...res.data];
        }
        setRefreshing(false);
        setIsLoading(false);
      }
    });
  };


  const onEndReached = () => {
    setPageNum(pageNum + 1);
  };
  const onRefresh = () => {
    setPageNum(1);
  };

  const goToDetail = (ListId,type) => {
    history.push({
      pathname: "/historyDetail",
      state: {
        id: ListId,
        type,
      },
    });
  };


  const renderItem = (rowData) => {
    return(
      rowData.map((item,index)=>{
        if(item.type == "photo") {
          return(
            index == 0 ? 
            <div>
              <div className="browse-date">{item.BrowseDate}</div>
              <div onClick={(e) => goToDetail(item.id,item.type)} className="photo-list-box">
                <img className="photo-list-img" src={item.img} alt="" />
                <div className="photo-list-box-1">
                  <p className="photo-list-title">{item.title}</p>
                  <div className="photo-list-box-2">
                    <p className="photo-list-author">{item.author}</p>
                    <p className="photo-list-date">{item.date}</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                    width:'3.23rem',
                    marginLeft: '0.21rem',
                    borderTop: '2px solid #ECECED',
                  }}
              />
            </div> :
            <div>
              <div onClick={(e) => goToDetail(item.id,item.type)} className="photo-list-box">
                <img className="photo-list-img" src={item.img} alt="" />
                <div className="photo-list-box-1">
                  <p className="photo-list-title">{item.title}</p>
                  <div className="photo-list-box-2">
                    <p className="photo-list-author">{item.author}</p>
                    <p className="photo-list-date">{item.date}</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                    width:'3.23rem',
                    marginLeft: '0.21rem',
                    borderTop: '2px solid #ECECED',
                  }}
              />
          </div>
        );
        }if(item.type == "digest") {
          return(
            index == 0 ? 
            <div>
              <div className="browse-date">{item.BrowseDate}</div>
              <div onClick={(e) => goToDetail(item.id,item.type)} className="digest-list-box">
                <p className='digest-list-title' >{item.title}</p>
                <p className='digest-list-digest' >{item.digest}</p>
              </div>
              <div
                style={{
                    width:'3.23rem',
                    marginLeft: '0.21rem',
                    borderTop: '2px solid #ECECED',
                  }}
              />
            </div> :
            <div>
            <div onClick={(e) => goToDetail(item.id,item.type)} className="digest-list-box">
              <p className='digest-list-title' >{item.title}</p>
              <p className='digest-list-digest' >{item.digest}</p>
            </div>
              <div
                style={{
                    width:'3.23rem',
                    marginLeft: '0.21rem',
                    borderTop: '2px solid #ECECED',
                  }}
              />
            </div>
          );
        }if(item.type == "brief") {
          return(
            index == 0 ? 
            <div>
              <div className="browse-date">{item.BrowseDate}</div>
              <div onClick={(e) => goToDetail(item.id,item.type)} className="brief-list-box">
                <p className='brief-list-title' >{item.title}</p>
              </div>
              <div
                  style={{
                      width:'3.23rem',
                      marginLeft: '0.21rem',
                      borderTop: '2px solid #ECECED',
                    }}
                />
              </div> :
            <div>
            <div onClick={(e) => goToDetail(item.id,item.type)} className="brief-list-box">
              <p className='brief-list-title' >{item.title}</p>
            </div>
            <div
                style={{
                    width:'3.23rem',
                    marginLeft: '0.21rem',
                    borderTop: '2px solid #ECECED',
                  }}
            />
          </div>
          );
        }
      })
    );

  };


  const showModal = (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    setModal(true);
  }
  const onClose = () => {
    setModal(false);
  }

  const onWrapTouchStart = (e) => {
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  const handleSvbmit = () =>{
    setModal(false);
    setPageNum(1);
  }


  
  return (
    <>
      <HistoryNavBar filter = {showModal}/>
      <ActivityIndicator toast={true} text="加载中..." animating={refreshing} />
      <ListView
        ref={lv}
        dataSource={dataSource.current}
        renderFooter={() => (
          <div style={{ padding: 10, textAlign: "center" }}>
            {isLoading
              ? "Loading..."
              : orgList.current.length > 7
              ? "哎呀，到底了"
              : "加载完成"}
          </div>
        )}
        renderRow={renderItem}
        // renderSeparator={separator}
        style={{
          height: `${height}rem`,
          overflow: "auto",
          margin: "5px 0",
          width: "100%",
        }}
        pageSize={PAGE_SIZE}
        pullToRefresh={
          <PullToRefresh
            refreshing={refreshing}
            onRefresh={onRefresh} //下拉刷新
          />
        }
        scrollRenderAheadDistance={500} //当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
        onEndReached={onEndReached} //上拉加载
        onEndReachedThreshold={10} //调用onEndReached之前的临界值，单位是像素
      />

      <Modal
        visible={modal}
        transparent
        maskClosable={false}
        // onClose={onClose}
        // title="Title"
        // footer={[{ text: 'Ok', onPress: () => { console.log('ok'); onClose(); } }]}
        wrapProps={{ onTouchStart: onWrapTouchStart }}
        afterClose={() => { }}
      >
        <div className="Filter-body">
          <div className="Input-Area">
            <div className="Deadline">
              <div className="Deadline-Lab">最晚日期: </div>
              <List className="Deadline-DatePicker" style={{ width: "1.96rem", height:"0.26rem" }}>
                <DatePicker
                  value={deadline}
                  mode="date"
                  onChange={date => setDeadline(date)}
                >
                  <List.Item style={{ padding: 0 ,height: "0.26rem"}} ></List.Item>
                </DatePicker>
              </List>
            </div>
            <div className="TitleSearch">
              <div className="TitleSearch-Lab">标题搜索：</div>
              <div className="TitleSearch-TextareaItem">
                <InputItem
                  clear
                  maxLength="30"
                  onChange = {(value) => setTitle(value)}
                  placeholder="请输入标题搜索"
                />
              </div>
            </div>
            <div className="Type">
              <div className="Type-Lab">内容类型（多选）：</div>
              <div className="Type-Button-Box">
                <div  className="Type-Button-Box-1">
                <Tag className="Type-Button" selected onChange={ (selected)=> setType1(selected) } >图文型</Tag>
                <Tag className="Type-Button" selected onChange={ (selected)=> setType2(selected) } >摘要型</Tag>
                </div>
                <Tag className="Type-Button" selected onChange={ (selected)=> setType3(selected) } >简单型</Tag>
              </div>
            </div>
          </div>
          <div className="Submit">
            <Button onClick={onClose} className="Submit-Button" inline="true" >取消</Button>
            <Button onClick={handleSvbmit} className="Submit-Button" inline="true" >确定</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HistoryList;
