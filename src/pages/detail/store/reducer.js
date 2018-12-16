import {fromJS} from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	content: '',
	initLoading: true,
	loading: false,
});
const getFiles = (state, action) => {
	return state.merge({
		content: action.content
	})
};
export default (state = defaultState, action) => {
	switch (action.type) {
		case constants.CHANGE_DETAIL:
			return state.merge({
				title: action.title,
				content: action.content
			});
		case constants.GET_FILES:
			return getFiles(state, action);
		default:
			return state;
	}
}