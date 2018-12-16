import {
	Form, Icon, Input, Button, Checkbox,
} from 'antd';
import * as actionCreators from './store/actionCreators';
import React from 'react';
import {connect} from 'react-redux';
import './style.css';

const FormItem = Form.Item;
let formData = {
	username: '',
	password: ''
};

class NormalLoginForm extends React.Component {
	state = {
		judgeLogin:false,
		username: '',
		password: ''
	};
	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	render() {
		const {getFieldDecorator} = this.props.form;
		formData.username = this.state.username;
		formData.password = this.state.password;
		return (
			<Form onSubmit={() => this.props.handleSubmit(formData.username, formData.password)} className="login-form">
				U云盘登陆
				<br/><br/>
				<FormItem>
					{getFieldDecorator('userName', {
						rules: [{required: true, message: 'Please input your username!'}],
					})(
						<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} name="username"
									 placeholder="Username" onChange={this.onChange}/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{required: true, message: 'Please input your Password!'}],
					})(
						<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" name="password"
									 placeholder="Password" onChange={this.onChange}/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true,
					})(
						<Checkbox>Remember me</Checkbox>
					)}
					<a className="login-form-forgot" href="" style={{float: 'right'}}>Forgot password</a>
					<br/>
					<Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
						Log in
					</Button>
					Or <a href="/register">register now!</a>
				</FormItem>
			</Form>
		);
	}
}

const mapState = (state) => ({
	error_pwd : state.getIn(['login','pwd']),
	loginStatus: state.getIn(['login', 'login'])
});

const mapDispatch = (dispatch) => ({
	handleSubmit(accountElem, passwordElem) {
		dispatch(actionCreators.login(accountElem.value, passwordElem.value));
	},
	logout() {
		dispatch(actionCreators.logout());
	}
});
const LoginForm = Form.create()(NormalLoginForm);
export default connect(mapState, mapDispatch)(LoginForm);