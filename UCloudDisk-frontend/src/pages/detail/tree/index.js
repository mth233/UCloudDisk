import {Tree, Icon} from 'antd';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from "../store/actionCreators";

const DirectoryTree = Tree.DirectoryTree;
const {TreeNode} = Tree;

class TreeList extends Component {
	onSelect = () => {

	};

	onExpand = () => {

	};

	render() {
		return (
			<Fragment>
				<DirectoryTree
					multiple
					defaultExpandAll
					onSelect={this.onSelect}
					onExpand={this.onExpand} className="TreeListWrapper"
				>
					<TreeNode title="parent 0" key="0-0">
						<TreeNode title="leaf 0-0" key="0-0-0" isLeaf/>
						<TreeNode title="leaf 0-1" key="0-0-1" isLeaf/>
					</TreeNode>
					<TreeNode title="parent 1" key="0-1">
						<TreeNode title="leaf 1-0" key="0-1-0" isLeaf/>
						<TreeNode title="leaf 1-1" key="0-1-1" isLeaf/>
					</TreeNode>
					<TreeNode title="回收站" href="/delete" icon={() => (
						<Icon type={ 'delete'}/>
					)}/>
				</DirectoryTree>

			</Fragment>
		);
	}
}

const mapState = (state) => ({
	content: state.getIn(['detail', 'content']),
	files: state.getIn(['detail', 'files'])
});

const mapDispatch = (dispatch) => ({
	getDetail() {
		dispatch(actionCreators.getDetail());

	}
});
export default connect(mapState, mapDispatch)(TreeList);