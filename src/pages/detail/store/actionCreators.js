import axios from 'axios';
import * as constants from './constants';

const changeDetail = (title, content) => ({
	type: constants.CHANGE_DETAIL,
	content
});
const getFile = (content) =>({
	type:constants.GET_FILES,
	content
})

export const getDetail = () => {
	return (dispatch) => {
		axios.get('/interfaces/file/get_file_list').then((res) => {
			const status = res.status;
			console.log(res.data.result);
			console.log(status);
			if (status===200){
				const content = res.data.result;
				dispatch(getFile(content));
			}

		}).catch(() => {
			
		})
	}
};