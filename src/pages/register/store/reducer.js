import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	username: '',
	password: '',
	confirmDirty: false,
	autoCompleteResult: [],
});



export default (state = defaultState, action) => {
	switch(action.type) {
		// case constants.CHANGE_HOME_DATA:
		// 	return changeHomeData(state, action);
		// case constants.ADD_ARTICLE_LIST:
		// 	return addArticleList(state, action);
		// case constants.TOGGLE_SCROLL_TOP:
		// 	return state.set('showScroll', action.show);
		default:
			return state;
	}
}