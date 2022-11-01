import { Button, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'
import { EmployeeModel } from '../../models/employee_model'
import AddButton from '../common/AddButton'
import CustomRow from '../common/Row'
import WrapperCard from '../common/WrapperCard'
import WrapperContainer from '../common/WrapperContainer'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AddUserModal from './AddUserModal'
import { useState } from "react"
const Users = () => {

  const [isAddUser, setIsAddUser] = useState<boolean>(false)

  const addUser = () => {
    setIsAddUser(true);
  }

  const cancelUser = () => {
    setIsAddUser(false)
  }

  const columns: ColumnsType<EmployeeModel> = [
    {
      title: "Item ID",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nic",
      key: "nic",
      dataIndex: "nic"

    },
    {
      title: "Age (years)",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Salary (lkr)",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "",
      key: "actions",
      render: (_, record: EmployeeModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined key={record._id} />} onClick={() => { }}></Button>
          <Button icon={<DeleteOutlined key={record._id} />} onClick={() => { }}></Button>
        </Space>
      }
    },
  ];

  return (
    <WrapperContainer>
      <WrapperCard>
        <CustomRow style={{ justifyContent: "space-between", padding: "16px" }} >
          <h1>Users</h1>
          <AddButton onClick={addUser} />
        </CustomRow>
        <Table dataSource={[]} columns={columns} style={{ width: "100%", height: "100%" }} />
      </WrapperCard>
      <AddUserModal handleOk={addUser} handleCancel={cancelUser} isOpen={isAddUser} />
    </WrapperContainer>
  )
}

export default Users