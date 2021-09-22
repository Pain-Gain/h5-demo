import React, {useState, useEffect}  from 'react';
import { NavBar, Icon, Button, Tag, DatePicker, List } from 'antd-mobile';
import { useHistory } from "react-router-dom";
import {adapterFun} from '../../tool';
import './index.scss'

const Filter = () => {
  const [deadline, setDeadline] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState([]);

  const nowTimeStamp = Date.now();
  const now = new Date(nowTimeStamp);
  useEffect(() => {    
    adapterFun(375);
  },[])

  let history = useHistory();

  function onChange(selected) {
    console.log(`tag selected: ${selected}`);
  }
  
  return (
    <div className="Filter-body">
      <div className="Input-Area">
        <div className="Deadline">
          <div className="Deadline-Lab">最晚日期: </div>
          <List className="Deadline-DatePicker" style={{ width: "1.96rem"  }}>
            <DatePicker
              value={now}
              // onChange={date => this.setState({ date })}
            >
              <List.Item style={{ padding: 0 }} ></List.Item>
            </DatePicker>
          </List>
          {/* <div  className="Deadline-DatePicker">日期选择框</div> */}
        </div>
        <div className="TitleSearch">
          <div className="TitleSearch-Lab">标题搜索：</div>
          <div className="TitleSearch-TextareaItem">TextareaItem</div>
        </div>
        <div className="Type">
          <div className="Type-Lab">内容类型（多选）：</div>
          <div className="Type-Button-Box">
            <div  className="Type-Button-Box-1">
            <Tag className="Type-Button" selected data-seed="logId">Basic</Tag>
            <Tag className="Type-Button" selected>Selected</Tag>
            </div>
            <Tag className="Type-Button" selected onChange={onChange}>Callback</Tag>
          </div>
        </div>
      </div>

      <div className="Submit">
        <Button onClick={() => history.push('/menu')} className="Submit-Button" inline="true" >取消</Button>
        <Button onClick={() => history.push('/menu')} className="Submit-Button" inline="true" >确定</Button>
      </div>


    </div>
  )
}

export default Filter;


{
  <List className="date-picker-list" style={{ backgroundColor: 'white',width: "1.96rem%" }}>
  <DatePicker
    // value={this.state.date}
    mode="date"
    onChange={date => {}}
  >
    <List.Item style={{ width: "100%" }}></List.Item>
  </DatePicker>

</List>
}
