import axios from 'axios';
import * as constants from './constants';

const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	value: true
});
const loginError = () => ({
	type: constants.ERROR_PASSWORD,
});

export const logout = () => ({
	type: constants.LOG_OUT,
	value: false
});

export const login = (accout, password,history) => {
	var formData = new FormData();
	formData.append('username', accout);
	formData.append('password', password);
	return (dispatch) => {
		axios.post('/interfaces/user/login', formData).then((res) => {
			const status = res.status;
			console.log(status);
			if (status===200) {
				dispatch(changeLogin());
				history.push('/detail');
				console.log(history);
			} else {
				dispatch(loginError());
			}
		})
	}
};

export const userLogout = () => {
	return (dispatch) => {
		axios.post("/interfaces/user/logout").then((res) => {
			//const status = res.status;
			const error_code = res.error_code;
			if (!error_code) {
				dispatch(logout());
			}
		})
	}
};