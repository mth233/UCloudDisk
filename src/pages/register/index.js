import React, {Component} from 'react';
import {
	Form, Input, Checkbox, Button
} from 'antd';
import {connect} from 'react-redux';
import {actionCreators} from './store';


const FormItem = Form.Item;
var data;

class RegistrationFormWrapper extends Component {
	// state = {
	// 	confirmDirty: false,
	// 	autoCompleteResult: [],
	// };

	// handleSubmit = (e) => {
	// 	e.preventDefault();
	//
	// };

	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({confirmDirty: this.state.confirmDirty || !!value});
	};

	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], {force: true});
		}
		callback();
	};


	onChange = (e) => {
		this.setState({[e.target.name]: e.target.initialValue});
	};

	render() {
		const {getFieldDecorator} = this.props.form;
		data = this.state;
		const formItemLayout = {
			labelCol: {
				xs: {span: 24},
				sm: {span: 8},
			},
			wrapperCol: {
				xs: {span: 24},
				sm: {span: 16},
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 16,
					offset: 8,
				},
			},
		};


		return (
			<Form onSubmit={this.handleSubmit} style={{
				border: '1px #aaaaaa solid',
				width: '600px',
				margin: '40px auto',
				boxShadow: '0 4px 5px rgba(0, 0, 0, 0.3)'
			}}>
				<p align="center">用户注册</p>
				<FormItem style={{width: '400px', margin: 'auto'}}
									{...formItemLayout}
									label="Username"
				>
					{getFieldDecorator('email', {
						rules: [{
							type: 'regexp', message: 'User name can not contain @ and .',
						}, {
							required: true, message: 'Please input your Usernmae!',
						}],
					})(
						<Input
							name="username"
							onChange={this.onChange}
						/>
					)}
				</FormItem>
				<FormItem style={{width: '400px', margin: 'auto'}}
									{...formItemLayout}
									label="Password"
				>
					{getFieldDecorator('password', {
						rules: [{
							required: true, message: 'Please input your password!',
						}, {
							validator: this.validateToNextPassword,
						}],
					})(
						<Input type="password"
									 name="password"
									 onChange={this.onChange}/>
					)}
				</FormItem>
				<FormItem
					style={{width: '400px', margin: 'auto'}}
					{...formItemLayout}
					label="Confirm Password"
				>
					{getFieldDecorator('confirm', {
						rules: [{
							required: true, message: 'Please confirm your password!',
						}, {
							validator: this.compareToFirstPassword,
						}],
					})(
						<Input type="password" onBlur={this.handleConfirmBlur}/>
					)}
				</FormItem>
				<FormItem {...tailFormItemLayout} style={{margin: 'auto'}}>
					{getFieldDecorator('agreement', {
						valuePropName: 'checked',
					})(
						<Checkbox>I have read the <a href="">agreement</a></Checkbox>
					)}
				</FormItem>
				<FormItem style={{width: '200px', margin: 'auto'}} {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">Register</Button>
				</FormItem>
			</Form>
		);
	}

}

const mapState = (state) => {
	return {
		username: state.getIn(['home', 'username']),
		password: state.getIn(['home', 'password']),
		confirmDirty: state.getIn(['home', 'confirmDirty']),
		autoCompleteResult: state.getIn(['home', 'autoCompleteResult'])
	}
};
const mapDispatch = (dispatch) => ({
	handleSubmit(e) {
		e.preventDefault();
		console.log(data);
		dispatch(actionCreators.userSignupRequest(data))
	}
});

const RegistrationForm = Form.create()(RegistrationFormWrapper);
export default connect(mapState, mapDispatch)(RegistrationForm);