/*
 * @Author: 刘鑫
 * @Date: 2018-12-08 15:51:17
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {actionCreators} from "./store";
import {Layout, List, Button, Skeleton} from "antd";
import "./style.css";
import UploadForm from "./upload";
import TreeList from './tree';

class Detail extends Component {
	getFile = (e) => {
		console.log(e);
	}


	render() {

		const {Content} = Layout;
		const loadMore = !this.props.initLoading && !this.props.loading ? (
			<div style={{
				textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
			}}
			>
				<Button onClick={this.onLoadMore}>loading more</Button>
			</div>
		) : null;
		return (
			<Content style={{padding: '0 50px'}}>
				<Layout style={{padding: '24px 0', background: '#fff'}}>
					<div style={{margin: "10px"}}><UploadForm/></div>
					<Content style={{padding: '0 24px', minHeight: 280}}>
						<TreeList className="TreeListWrapper" />
						<List
							className="demo-loadmore-list ListWrapper"
							loading={this.props.content == null}
							itemLayout="horizontal"
							loadMore={loadMore}
							dataSource={this.props.all}
							renderItem={item => (
								<List.Item>
									{

										item.get("file_hash") === "DIR" ? null : (
											<Skeleton avatar title={false} loading={item.loading} active>
												<List.Item.Meta
													//avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
													// title={<a
													// 	href={require("../../statics/a.pdf")} target="_Blank">{item.get('file_path') +
													// "/" + item.get('file_name')}</a>
													// }
													title={
														<a href={encodeURIComponent("/interfaces/my_files/" + (item.get('file_path') + "/" +
															item.get("file_name")).substr(1)).replace(/%2F/g, "/")}
														//href="www.baidu.com"
														target="_Blank"
														rel="noopener noreferrer"
													>{item.get('file_path') +
													"/" + item.get('file_name')}</a>}

													description={"file size:  " + item.get('file_size') + "b"}/>
											</Skeleton>)
									}
								</List.Item>
							)}

						/>
					</Content>
				</Layout>
			</Content>
		);
	}

	componentDidMount() {
		this.props.getDetail();
	}
}

const mapState = (state) => ({
	initLoading: state.getIn(['detail', 'initLoading']),
	loading: state.getIn(['detail', 'loading']),
	content: state.getIn(['detail', 'content']),
	all:state.getIn(['detail','all']),
});

const mapDispatch = (dispatch) => ({
	getDetail() {
		dispatch(actionCreators.getDetail());

	}
});

export default connect(
	mapState,
	mapDispatch
)(withRouter(Detail));
