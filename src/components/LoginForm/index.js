import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import axios from 'axios';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    axios.post('http://localhost:3001/login', values)
      .then(res)
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card style={{ width: 300, marginRight: 'auto', marginLeft: 'auto', marginTop: 40 }}
            cover={<img style={{width: 300, height: 300, alignSelf: 'center'}}
                        alt="example"
                        src="https://vnu.edu.vn/upload/2012/04/12715/image/VNU-UET.jpg"
                  />}
            hasShadow
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a href="" style={{ float: 'right' }}>
              Forgot password
            </a>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
componentDidMount() {
  axios.get('http://localhost:3001/login')
    .then(res => {
      render() {
        `oke`;
      }
    })
}
export default Form.create({ name: 'normal_login' })(NormalLoginForm);
