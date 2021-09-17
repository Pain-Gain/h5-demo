var express = require("express");
var cors = require("cors");
var app = express();
const Mock = require("mockjs");
const port = 9091;

app.use(cors());

class BaseRes {
  constructor({ code, data, message, success }) {
    this.code = code;
    if (data !== undefined) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
    if (success) {
      this.success = true;
    }
  }
}

class SuccessRes extends BaseRes {
  constructor(data = {}) {
    super({
      code: "00000",
      data,
      message: "成功",
      success: true,
    });
  }
}

class ErrorRes extends BaseRes {
  constructor(data = {}) {
    super({
      code: "1111",
      data,
      message: "失败",
      success: false,
    });
  }
}

app.get("/baseDate", function (req, res) {
  const { list } = Mock.mock({
    "list|4": [
      {
        "id|+1": 0,
        "title|+1": ["Star Wars", "Back to the Future", "The Matrix", "Inception","Interstellar"],
        "releaseYear|1900-2021": 1,
      },
    ],
    "description": "Your app fetched this from a remote endpoint!",
    "title": "The Basics - Networking",

  })
  const data = new SuccessRes(list);
  res.json(data);
});

app.get("/photoList", function (req, res) {
  const { result } = Mock.mock({
    "result":{
      "list|10": [
        {
          "id|+1": 0,
          "type": 'photo',
          "title|+1": [
            "标题一占位文字", "标题二占位文字", "标题三占位文字",
            "标题四占位文字","标题五占位文字标题五占位文字标题五占位文字标题五占位文字","标题一占位文字",
            "标题一占位文字", "标题一占位文字", "标题一占位文字",
            "标题一占位文字"],
        "img": 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        "date": '2019-12-12',
        "author": '普益标准',
        "releaseYear|1900-2021": 1,
        },
      ],
      "page": 1,
      "page_size": 10,
      "total_count": 30,
      "page_count": 3,
      }
  })
  const data = new SuccessRes(result);
  res.json(data);
});



app.get("/detail", function (req, res) {

  const { result } = Mock.mock({
    "result":{
      "title": "标题一占位文字",
      "autohor": '普益标准',
      "date": '2019-12-12',
      "imgUrl": '../../111111.png',
      "digest": '摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，摘要部分的内容，',
      "text": `<p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容。<br/>
  </p>
  <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容。<br/>
  </p>
  <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容。<br/>
  </p>
  <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容。<br/>
  </p>
  <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容。<br/>
  </p>
  <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容。<br/>
  </p>
  <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容。<br/>
  </p>
  <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容。<br/>
  </p>
  <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容。<br/>
  </p>
  <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容。<br/>
  </p>
  <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容。<br/>
  </p>
  <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容。<br/>
  </p>
  <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容，正文部分的内容。<br/>
  </p>
  <p>
      <br/>
  </p>`
    }
  });
  const data = new SuccessRes(result);
  res.json(data);
});



//用户列表
app.get("/user/list", function (req, res) {
  const { result } = Mock.mock({
    "result":{
      "item_list|10": [{
      'id|+1': 1,
      'userName': '@cname',
      'sex|1-2': 1,
      'state|1-5': 1,
      'interest|1-8': 1,
      'isMarried|0-1': 1,
      'birthday': '2000-01-01',
      'address': '四川省成都市天府新区天府公园',
      'time': '06:00:00',
      }],
      "page": 1,
      "page_size": 10,
      "total_count": 30,
      "page_count": 3,
    }
  });
  const data = new SuccessRes(result);
  res.json(data);
});














// 今日签单金额
app.get("/api/edhic/total/area", function (req, res) {
  const { number } = Mock.mock({
    "number|10000-10000000.00-99": 1,
  });

  const data = new SuccessRes(number);
  res.json(data);
});


// 近7日保单量趋势
app.get("/api/edhic/nearest/policy", function (req, res) {
  const { list } = Mock.mock({
    "list|7": [
      {
        "label|+1": 10,
        "value|1-10000": 500,
      },
    ],
  });

  const data = new SuccessRes(list);
  res.json(data);
});

// 查询今日保单数量
app.get("/api/edhic/today/policy", function (req, res) {
  const data = new SuccessRes(
    Mock.mock([
      { label: "合计", "value|1-10000": 500 },
      { label: "车险", "value|1-10000": 500 },
      { label: "非车险", "value|1-10000": 500 },
    ])
  );
  res.json(data);
});

// 近7日客户数趋势
app.get("/api/edhic/nearest/customer", function (req, res) {
  const { list } = Mock.mock({
    "list|7": [
      {
        "label|+1": 10,
        "value|1-10000": 500,
      },
    ],
  });
  const data = new SuccessRes(list);
  res.json(data);
});
// 今日客户数量
app.get("/api/edhic/today/customer", function (req, res) {
  const data = new SuccessRes(
    Mock.mock([
      { label: "合计", "value|1-10000": 500 },
      { label: "个人", "value|1-10000": 500 },
      { label: "团体", "value|1-10000": 500 },
    ])
  );
  res.json(data);
});
// 今日机构保费
app.get("/api/edhic/today/company", function (req, res) {
  const data = new SuccessRes(
    Mock.mock([
      { label: "成都", "value|1-10000": 500 },
      { label: "上海", "value|1-10000": 500 },
      { label: "深圳", "value|1-10000": 500 },
      { label: "合肥", "value|1-10000": 500 },
      { label: "北京", "value|1-10000": 500 },
      { label: "广州", "value|1-10000": 500 },
    ])
  );
  res.json(data);
});
// 近7日保费趋势
app.get("/api/edhic/nearest/product", function (req, res) {
  const { list } = Mock.mock({
    "list|7": [
      {
        "label|+1": 10,
        "value|1-10000": 500,
      },
    ],
  });
  const data = new SuccessRes(list);
  res.json(data);
});

// 今日各渠道保费
app.get("/api/edhic/today/channel", function (req, res) {
  const { mockData } = Mock.mock({
    "mockData|7": [
      {
        "name|+1": ['直接业务',"个人代理","专业代理","网上业务","兼业代理", '经纪人一类', "经纪人二类"],
        "value|1000-100000.1-2": 1,
      },
    ],
  });
  // console.log(aaaaa.asdf.2131)
  
  const data = new SuccessRes(mockData);
  res.json(data);
});

// A类产品年度保费达成（万）- 总量


// 近7日保单量趋势
app.get("/api/edhic/today/product", function (req, res) {
  const { list } = Mock.mock({
    "list|3": [
      {
        "label|+1": 10,
        "value|1-10000": 500,
      },
    ],
  });

  const data = new SuccessRes(list);
  res.json(data);
});

app.listen(port, (err) => {
  console.log(`next application is running on ${port} port !`);
  console.log("err", err);
});
