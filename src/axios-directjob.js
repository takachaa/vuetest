import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://localhost:44358/api',
    // headers: {
    //     // 'Content-Type': 'application/json',
    //     // 'Content-Type': 'application/xml',
       
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    responseType: 'json' 
})

export default instance;