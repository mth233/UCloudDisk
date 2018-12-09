import axios from 'axios';
import * as constants from './constants';
import {fromJS} from 'immutable';


export const userSignupRequest = (userData) => {
	let formData = new FormData();
	formData.append('username', userData.username);
	formData.append('password', userData.password);
	return (dispatch) => {
		return axios.post('/api/users', formData).then((res) => {
			const status = res.status;
			if (status) {
				const error_code = res.error_code;
				const msg = res.msg;
			}
		});
	}
};
