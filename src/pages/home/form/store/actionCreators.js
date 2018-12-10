import axios from 'axios';
import * as constants from './constants';

const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	value: true
})

export const logout = () => ({
	type: constants.LOGOUT,
	value: false
})

export const login = (accout, password) => {
	return (dispatch) => {
		axios.get('/interfaces/user/login?account=' + accout + '&password=' + password).then((res) => {
			const result = res.data.data;
			if (result) {
				dispatch(changeLogin())
			}else {
				alert('登陆失败')
			}
		})
	}
}

export const userLogout()=>{
	return (dispatch)=>{
		axios.post(/interfaces/user/logout).then((res)=>{
			status = res.status;
			error_code = res.error_code;
			if(!error_code){
				dispatch(logout());
			}
		})
	}
}