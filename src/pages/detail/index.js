/*
 * @Author: 刘鑫
 * @Date: 2018-12-08 15:51:17
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {actionCreators} from "./store";
import {Layout, Menu, Breadcrumb, Icon, List, Avatar, Button, Skeleton} from "antd";
import "./style.css";
import UploadForm from "./upload";

class Detail extends Component {
	render() {
		const {Content} = Layout;
		const loadMore = !this.props.initLoading && !this.props.loading ? (
			<div style={{
				textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
			}}
			>
				<Button onClick={this.onLoadMore}>loading more</Button>
			</div>
		) : null
		return (
			<Content style={{padding: '0 50px'}}>
				<Layout style={{padding: '24px 0', background: '#fff'}}>
					<UploadForm/>
					<Content style={{padding: '0 24px', minHeight: 280}}>
						<List
							className="demo-loadmore-list"
							loading={this.props.initLoading}
							itemLayout="horizontal"
							loadMore={loadMore}
							dataSource={this.props.content}
							renderItem={item => (
								<List.Item actions={[<a>edit</a>, <a>more</a>]}>
									<Skeleton avatar title={false} loading={item.loading} active>
										<List.Item.Meta
											avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
											title={<a href="https://ant.design">{item.name.last}</a>}
											description="Ant Design, a design language for background applications, is refined by Ant UED Team"
										/>
										<div>content</div>
									</Skeleton>
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
	content: state.getIn(['detail', 'content'])
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
