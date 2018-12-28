import axios from 'axios';
import * as constants from './constants';


const getFile = (content, files, all) => ({
	type: constants.GET_FILES,
	content,
	files,
	all,
});
const getSearch = (value) => ({
	type: constants.SEARCH_ITEM,
	value,
})

export const search = (value) => {
	return (dispatch) => {
		dispatch(getSearch(value))
	}
};

var content = [];
export const getDetail = () => {
	console.log("test list");
	return (dispatch) => {
		axios.get('/interfaces/file/get_file_list').then((res) => {
			const status = res.status;
			// console.log(res.data.result);
			// console.log(status);
			// console.log(res.data.result.length);
			var files = [];
			var all = [];
			if (status === 200) {
				for (let i = 0; i < res.data.result.length; i++) {
					all.push(res.data.result[i]);
					if (res.data.result[i].file_hash !== "DIR") {
						content.push(res.data.result[i]);
					} else {
						files.push(res.data.result[i]);
					}
				}
				//const content = res.data.result;
				//console.log(content);
				// console.log(content);
				// console.log(files);
				// console.log(all);
				dispatch(getFile(content, files, all));
			}

		}).then(
			// ()=>{console.log("ab")}

		).catch(() => {

		})
	}
};
