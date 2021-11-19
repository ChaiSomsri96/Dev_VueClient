import axios from 'axios'

const onOk = (response) => {
    return response.data
}
  
const onError = (err) => {
    console.log('err' + err) // for debug
    return Promise.reject(err)
}

// create an axios instance
const service = axios.create({
    baseURL: 'http://localhost', // url = base url + request url
    // baseURL: 'http://localhost', // 'http://waltz.tx2.kr',
    // baseURL: 'http://waltz.tx2.kr', // url = base url + request url
    //baseURL: 'http://localhost', // 'http://waltz.tx2.kr',
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000, // request timeout
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-nhn-empid': "96b02530-82de-41c8-8223-3055c74e705e",
        'x-nhn-companyid': "e721e2da-29ee-4782-9672-3d2b150ac1a6",
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
})

/*
add this code for authenticated request
service.interceptors.request.use(
    config => {
      // do something before request is sent
      if (store.getters.token) {
        // let each request carry token
        // ['X-Token'] is a custom headers key
        // please modify it according to the actual situation
        config.headers['X-Token'] = getToken()
      }
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
)
*/

// response interceptor
service.interceptors.response.use(onOk, onError)

export default service