// import { Modal } from 'antd'
import axios from 'axios'
// import JsonP from 'jsonp'
import { reject } from 'lodash'
// import Utils from '../utils/utils'
export default class Axios{
    //表单查询公共机制封装，isMock参数指定数据获取途径，使用mock.js时为true
    static requestList(_this, url, params, isMock){
        var data = {
            params: params,
            isMock,
        }
        this.Ajax({
            url,
            data,
        }).then((res)=>{
            let list = res.data.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            _this.setState({
                list,
                // // pagination:Utils.Pagination(res,(current)=>{
                // //     _this.params.page = current;
                // //     _this.requestList();
                // })
            })
        })
    
    }

    //mock.js版本
    static Ajax(options){
        let loading;
        // if(options.data && options.data.isShowLoadling !== false){
        //     loading = document.getElementById('ajaxLoading');
        //     console.log('loading:',loading)
        //     loading.style.display = 'block';
        // }
        let baseApi = '';
        if(options.data.isMock){
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
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                // if(options.data && options.data.isShowLoadling !== false){
                //     loading = document.getElementById('ajaxLoading');
                //     loading.style.display = 'none';
                // }
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
    
    //网吧后台
    static RequestList(_this, url, params){
        var data = {
            params: params,
            method: 'get'
        }
        this.ajax_Bar({
            url,
            data,
        }).then((res)=>{
            console.log('res.data.data:',res.data.data)
            let list = [];
            res.data.data.map((item, index) => {
                if(item.power){
                    item.power = JSON.parse(item.power);
                }
                list.push(item);
            });
            console.log('list:',list)

            _this.setState({
                list,
                isOk:true,
                // pagination:Utils.Pagination(res,(current)=>{
                //     _this.params.page = current;
                // })
            })
        })
    }
    
    static ajax_Bar(options){
        var storage = window.sessionStorage;  
        var token = storage.getItem("token");
        let loading;
        if(options.data && options.data.isShowLoadling !== false){
            loading = document.getElementById('ajaxLoading');
            console.log('loading:',loading)
            loading.style.display = 'block';
        }
        const baseApi = 'https://qa2-api-bar.01y.com';
        
        return new Promise((resolve,reject)=>{
            axios.defaults.headers.common['token'] = token;
            axios({
                url:options.url,
                method:options.data.method,
                baseURL:baseApi,
                timeout:5000,
                data: (options.data && options.data.params) || ''
            }).then((response)=>{
                if(options.data && options.data.isShowLoadling !== false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status == '200'){
                    let res = response.data;
                    if (res.error_code == '0'){
                        resolve(res);            
                    }else{
                        // Modal.info({
                        //     title:"提示",
                        //     content: res.message,
                        // })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    
    }
    




}
