import axios from 'axios'
// import Cookies from 'js-cookie'
import cookie from 'vue-cookies'


const api = axios.create({
	// baseURL:'http://39.108.163.207/api',
	baseURL:'http://127.0.0.1:8000/api',
	Timeout:5000,
	headers: {
    // 'X-CSRFToken': Cookies.get('csrftoken')
  }
})
api.interceptors.request.use(
	config =>{
		if (cookie.get('token')) {
			config.headers['authorization'] = `JWT ${cookie.get('token')}`
		}
		// console.log(config)
		return config;
	}
	)

api.interceptors.response.use(res=>{
	return res.data
},err =>{
	console.log(err.response.statusText)
	if (err.response.statusText== 'Unauthorized') {
		console.log(window.location.href)
		window.location.href='/login'
	}
	else{
		return Promise.reject(err)
	}
	
})


export default api