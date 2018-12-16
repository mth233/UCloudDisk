/*
 * @Author: 刘鑫
 * @Date: 2018-12-09 22:27:00
 */
import React, {Component} from "react";
import {Form, Input, Checkbox, Button} from "antd";
import {connect} from "react-redux";
import {actionCreators} from "./store";

const FormItem = Form.Item;
let formData = {
	username: '',
	password: ''
};

class RegistrationFormWrapper extends Component {
	state = {
		confirmDirty: false,
		autoCompleteResult: [],
		username: '',
		password: ''
	};


	handleConfirmBlur = e => {
		const value = e.target.value;
		this.setState({confirmDirty: this.state.confirmDirty || !!value});
	};

	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue("password")) {
			callback("Two passwords that you enter is inconsistent!");
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(["confirm"], {force: true});
		}
		callback();
	};

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	render() {
		//console.log(this.state);
		formData.username = this.state.username;
		formData.password = this.state.password;
		const {getFieldDecorator} = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: {span: 24},
				sm: {span: 8}
			},
			wrapperCol: {
				xs: {span: 24},
				sm: {span: 16}
			}
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 16,
					offset: 8
				}
			}
		};

		return (
			<Form
				// onSubmit={()=>this.props.handleSubmit(this.state)}


				style={{
					border: "1px #aaaaaa solid",
					width: "600px",
					margin: "40px auto",
					boxShadow: "0 4px 5px rgba(0, 0, 0, 0.3)"
				}}
			>
				<p align="center">用户注册</p>
				<FormItem
					style={{width: "400px", margin: "auto"}}
					{...formItemLayout}
					label="Username"
				>
					{getFieldDecorator("email", {
						rules: [
							{
								type: "regexp",
								message: "User name can not contain @ and ."
							},
							{
								required: true,
								message: "Please input your Usernmae!"
							}
						]
					})(<Input name="username" onChange={this.onChange}/>)}
				</FormItem>
				<FormItem
					style={{width: "400px", margin: "auto"}}
					{...formItemLayout}
					label="Password"
				>
					{getFieldDecorator("password", {
						rules: [
							{
								required: true,
								message: "Please input your password!"
							},
							{
								validator: this.validateToNextPassword
							}
						]
					})(
						<Input type="password" name="password" onChange={this.onChange}/>
					)}
				</FormItem>
				<FormItem
					style={{width: "400px", margin: "auto"}}
					{...formItemLayout}
					label="Confirm Password"
				>
					{getFieldDecorator("confirm", {
						rules: [
							{
								required: true,
								message: "Please confirm your password!"
							},
							{
								validator: this.compareToFirstPassword
							}
						]
					})(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
				</FormItem>
				<FormItem {...tailFormItemLayout} style={{margin: "auto"}}>
					{getFieldDecorator("agreement", {
						valuePropName: "checked"
					})(
						<Checkbox>
							I have read the <a href="">agreement</a>
						</Checkbox>
					)}
				</FormItem>
				<p>{
					this.props.error_code === 1001 ? '用户名只能由字母、数字、下划线组成，开头必须是字母，不能超过16位' :
						this.props.error_code === 1002 ? '用户名已存在' : ''
				}</p>

				<FormItem
					style={{width: "200px", margin: "auto"}}
					{...tailFormItemLayout}
				>
					<Button type="primary" htmlType="submit"
									onClick={() => {this.props.handleSubmit(formData.username, formData.password)}
									}>
						Register
					</Button>
				</FormItem>
			</Form>
		);
	}
}

const mapState = (state) => {
	return {
		error_code: state.getIn((['register', 'error_code']))
	};
};
const mapDispatch = (dispatch) => {
	return {
		handleSubmit(username, password) {
			// e.preventDefault();
			// console.log(e.target);
			dispatch(actionCreators.userSignupRequest(username, password));
		},

	};
};

const RegistrationForm = Form.create()(RegistrationFormWrapper);
export default connect(
	mapState,
	mapDispatch
)(RegistrationForm);
