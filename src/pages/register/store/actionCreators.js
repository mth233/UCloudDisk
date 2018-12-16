import axios from 'axios';
import * as constants from './constants';

export const errMessage = () => ({
	type: constants.ILLEGAL_USERNAME
});
export const repUsername = ()=>({
	type:constants.REPEATED_USERNAME
});
export const userSignupRequest = (username,password) => {
	let formData = new FormData();
	formData.append('username', username);
	formData.append('password', password);
	return (dispatch) => {
		return axios.post('/api/users/reg', formData).then((res) => {
			const status = res.status;
			if (status) {
				const err_code = res.error_code;
				if (err_code === 1001) {
					dispatch(errMessage())
				}else{
					dispatch(repUsername());
				}
			}
		});
	}
};
