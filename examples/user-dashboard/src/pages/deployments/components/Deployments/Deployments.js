import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Form  } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Deployments.css';
import { PAGE_SIZE } from '../../../../constants';
import DeploymentModal from './DeploymentModal';
const FormItem = Form.Item
const style={marginBottom:0}
function Deployments({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'deployments/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: '/deployments',
        query: { page },
      })
    );
  }

  function editHandler(id, values) {
    dispatch({
      type: 'deployments/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'deployments/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'metadata.name',
      key: 'name',
      render:(text) => (<a href="" >{text}</a>)
      
    },
    /* {
      title: 'Namespace',
      dataIndex: 'metadata',
      key: 'metadata',
      render:(text) => {
        return (
          <Form layout="horizontal">
          {Object.keys(text).map((key)=>
            <FormItem key={key} label={key} labelCol={{span:8}} wrapperCol={{span:14}} style={style}>{text[key]}</FormItem>
          )}
          </Form>
        )
        
      }
      
    },
     {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render:(text) => {
        return (
        <Form layout="horizontal">
        {Object.keys(text).map((key)=>
          <FormItem key={key} label={key} labelCol={{span:8}} wrapperCol={{span:14}} style={style}>{text[key]}</FormItem>
        )}
        </Form>
        )
      }
    }, */
   
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <DeploymentModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </DeploymentModal>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandler.bind(null, record.id)}
          >
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <DeploymentModal record={{}} onOk={createHandler}>
            <Button type="primary">Create Deployments</Button>
          </DeploymentModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.metadata.name}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.deployments;
  return {
    loading: state.loading.models.deployments,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Deployments);
