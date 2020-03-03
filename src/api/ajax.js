// 封装ajax；
/*
返回值：promise对象；
*/
import axios from 'axios'

export default function ajax(url,method='get',data={}){
  return new Promise(function(resolve,reject){
      let promise;
      if(method.toLowerCase()==='get'){
          let urlStr='';
          Object.keys(data).forEach((key)=>{
              urlStr+=key+'='+data[key]+'&';
          })
          if(urlStr!==''){
            url+='?'+urlStr;
        }
        promise=axios.get(url);
      }else{
          promise=axios.post(url,data);
      }
      promise.then(response=>resolve(response.data)).catch(error=>reject(error));
  })
}