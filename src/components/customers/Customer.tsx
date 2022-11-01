import React, { useState } from 'react'


import { PlusCircleOutlined } from '@ant-design/icons';
import CustomRow from '../common/Row';
import WrapperContainer from '../common/WrapperContainer'
import { Button, Tooltip } from 'antd'
import { Typography } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { CustomeModel } from '../../models/customer_model';
import AddCustomerModal from './AddCustomerModal';
const { Title } = Typography;

const columns: ColumnsType<CustomeModel> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "NIC",
    dataIndex: "nic",
    key: "nic"
  },
  {
    title: "Mobile Numer",
    dataIndex: "mobile-number",
    key: "mobile-number"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },

]


const Customer = () => {

  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState<boolean>(false);

  const openAddCuastomerModal = () => {
    setIsAddCustomerOpen(true);
  }

  const closeAddCustomerModal = () => {
    setIsAddCustomerOpen(false);
  }

  return (
    <WrapperContainer>
      <CustomRow>
        <Title level={3}>Customers</Title>
        <Tooltip title="Add Delivery Order">
          <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} onClick={() => { setIsAddCustomerOpen(true)}} />
        </Tooltip>
      </CustomRow>
      <Table columns={columns} className="table" dataSource={[]} />
      <AddCustomerModal handleOk={openAddCuastomerModal} handleCancel={closeAddCustomerModal} isOpen={isAddCustomerOpen} />
    </WrapperContainer>
  )
}

export default Customer