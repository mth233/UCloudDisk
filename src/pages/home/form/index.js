import {
	Form, Icon, Input, Button, Checkbox,
} from 'antd';
import actionCreators from './store/actionCreators';
import React from 'react';
import './style.css';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				U云盘登陆
				<br/><br/>
				<FormItem>
					{getFieldDecorator('userName', {
						rules: [{required: true, message: 'Please input your username!'}],
					})(
						<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{required: true, message: 'Please input your Password!'}],
					})(
						<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
									 placeholder="Password"/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true,
					})(
						<Checkbox>Remember me</Checkbox>
					)}
					<a className="login-form-forgot" href="" style={{float:'right'}} >Forgot password</a>
					<br/>
					<Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
						Log in
					</Button>
					Or <a href="/register">register now!</a>
				</FormItem>
			</Form>
		);
	}
}

const mapState = (state) => ({
	loginStatus: state.getIn(['login', 'login'])
})

const mapDispatch = (dispatch) => ({
	login(accountElem, passwordElem){
		dispatch(actionCreators.login(accountElem.value, passwordElem.value))
	},
	logout(){
		dispatch(actionCreators)
	}
})
const LoginForm = Form.create()(NormalLoginForm);
export default connect(mapState, mapDispatch)(LoginForm);