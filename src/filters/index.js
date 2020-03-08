// 引入vue
import Vue from 'vue'
// 时间格式化库
// import moment from 'moment'

// 轻型时间格式化库
import dateFormat from 'date-fns/format'

// Vue.filter('dateFormat',function(value,format='YYYY-MM-DD HH:mm:ss'){
//     return moment(value).format(format)
// })

Vue.filter('dateFormat',function(value,format='yyyy-MM-dd HH:mm:ss'){
    return dateFormat(value,format)
})