import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Form  } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Nodes.css';
import { PAGE_SIZE } from '../../../../constants';
import NodeModal from './NodeModal';
const FormItem = Form.Item
const style={marginBottom:0}
function Nodes({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'nodes/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: '/nodes',
        query: { page },
      })
    );
  }

  function editHandler(id, values) {
    dispatch({
      type: 'nodes/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'nodes/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'spec.externalID',
      key: 'name',
      render:(text) => (<a href="" >{text}</a>)
      
    },
    {
      title: 'Address',
      dataIndex: 'status.addresses',
      key: 'address',
      render:(text) => {
        return (
          <Form layout="horizontal">
          {text.map((key)=>
            <FormItem 
            key={key.type} 
            label={key.type} 
            labelCol={{span:8}} 
            wrapperCol={{span:14}}
            style={style}>
              {key.address}
            </FormItem>
          )}
          </Form>
          )
        
      }
      
    },
     {
      title: 'NodeInfo',
      dataIndex: 'status.nodeInfo',
      key: 'nodeInfo',
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
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <NodeModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </NodeModal>
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
          <NodeModal record={{}} onOk={createHandler}>
            <Button type="primary">Create Nodes</Button>
          </NodeModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.spec.externalID}
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
  const { list, total, page } = state.nodes;
  return {
    loading: state.loading.models.nodes,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Nodes);
