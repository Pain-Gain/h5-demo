// import { Modal } from 'antd'
import axios from 'axios'
// import JsonP from 'jsonp'
import { reject } from 'lodash'
// import Utils from '../utils/utils'
export default class Axios{

    //数据mock.js模拟，isMock参数指定数据获取途径，使用mock.js时为true
    static Ajax(options){
        let baseApi = '';
        if(options.ReqData.isMock){
            baseApi = 'http://localhost:9091'
        } else{
            baseApi = 'https://www.fastmock.site/mock/8a91b82d8e88a006772466a7032bac49/mockapi'
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params: (options.ReqData && options.ReqData.params) || ''
            }).then((response)=>{
                if (response.status == '200'){
                    let res = response.data;
                    if (res.code == '00000'){
                        resolve(res);
                    }else{
                        // Modal.info({
                        //     title:"提示",
                        //     content: res.msg
                        // })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }
    




}
