import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class DeploymentEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { spec, status } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="Edit Deployments"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="Name">
              {getFieldDecorator('name', {
                initialValue: '',
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="IP Address">
              {getFieldDecorator('address', {
                initialValue: '',
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="DeploymentInfo">
              {getFieldDecorator('deploymentInfo', {
                initialValue: '',
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(DeploymentEditModal);
