// import cookie from 'vue-cookies'
import api from 'network/request.js'

const getBanaer =()=>api({
	url:'/banaer/',
})


const getBrand =()=> api({
	url:'/brand/'
})

const getCategory =()=> api({
	url:'/category/'
})

const getCategoryBysex = params =>{
	// console.log(params)
	return api.get('/category/',{
		params:params
	})
}

const getShoes =()=> api({
	url:'/shoes/'
})

const getShoesByCon = params =>{
	// console.log(params)
	return api.get('/shoes/',{
		params:params
	})
}
const getShoeByPage = params =>api.get(params)
const getShoeById = params =>{
	return api.get(`/shoes/${params}`)
}
// patch方法的配置的data写法和post不一样，不然data传不到后台去
const updateShoe = (id,data) => api.patch(`/shoes/${id}/`,data)


const Login = data =>{
	console.log(data)
	return api({
		url:'/login/',
		method:'post',
		data:data
	})
}

const register = data =>{
	// console.log(data)
	return api.post('/user/',data)
}
const getuser = params =>{
	// console.log(cookie.get('token'))
	return api.get(`/user/${params}/`)
}
const editUser = (params,data) =>api.patch(`/user/${params}/`,data)

const addCart = data =>{
	return api({
		url:'/cart/',
		method:'post',
		// headers:{'Authorization':`JWT ${cookie.get('token')}`},
		data:data
	})
}
const getCart =()=>{
	return api.get('/cart/')
} 
const updateCart =(params,data)=> api.patch(`/cart/${params}/`,data)

const deleteCart = params =>{
	return api.delete(`/cart/${params}`)
}

const getAddress =()=> api.get('/address/')
const addAddress = data => api({
	url:'/address/',
	method:'post',
	data:data
})
const deleteAddress = params =>api.delete(`/address/${params}`)

const getOrder = ()=> api.get('/order/',{
	// headers:{'Authorization':`JWT ${cookie.get('token')}`}
})

const getOrderInfo =params =>api.get(`/order/${params}/`,{
	// headers:{'Authorization':`JWT ${cookie.get('token')}`}
})
const addOrder = data => api({
	url:'/order/',
	method:'post',
	data:data
})
const deleteOrder = params=> api.delete(`/order/${params}/`,{
})
const updateOrder = (id,data) =>api.patch(`/order/${id}/`,data)

const addComment = data =>api({
	url:'/comment/',
	method:'post',
	data:data
})
const getComment = () =>api.get('/comment/')

// const getShoeById = api.put('/topic/5/',params)
export { getBanaer,getBrand,getCategory,getCategoryBysex,
	getShoes,getShoesByCon,getShoeById,updateShoe,getShoeByPage,
	Login,register,getuser,editUser,
	addCart,getCart,updateCart,deleteCart,
	getAddress,addAddress,deleteAddress,
	getOrder,addOrder,getOrderInfo,deleteOrder,updateOrder,
	addComment,getComment }