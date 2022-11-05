import React, { useEffect, useState } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons';
import CustomRow from '../common/Row';
import WrapperContainer from '../common/WrapperContainer'
import { Button, Space, Tooltip } from 'antd'
import { Typography } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { CustomeModel } from '../../models/customer_model';
import AddCustomerModal from './AddCustomerModal';
import CustomerService from '../../services/customer_service';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteModal from '../common/DeleteModal';

const { Title } = Typography;




const Customer = () => {
  const [customers, setCustomers] = useState<CustomeModel[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomeModel>();
  const [isEditModalOpen, setIsEditaModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteAddModalOpen] = useState<boolean>(false);



  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState<boolean>(false);





  const openAddCuastomerModal = async () => {
    await refresher();
    setIsAddCustomerOpen(!openAddCuastomerModal);

  }

  const closeAddCustomerModal = async () => {
    await refresher();
    setIsAddCustomerOpen(false);
  }



  const columns: ColumnsType<CustomeModel> = [
    // {
    //   title: "ID",
    //   dataIndex: "_id",
    //   key: "id"
    // },
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
      dataIndex: "mobile",
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
    {
      title: "Actions",
      key: "status",
      render: (_, record: CustomeModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => {
            const d: CustomeModel = {
              _id: record._id,
              name: record.name,
              date: record.date,
              address: record.address,
              companyId: record.companyId,
              nic: record.nic,
              email: record.email,
              mobile: record.mobile,
            }
            setSelectedCustomer(d)
            setIsEditaModalOpen(true)
          }}></Button>
          <Button icon={<DeleteOutlined />} onClick={() => {
            const d: CustomeModel = {
              _id: record._id,
              name: record.name,
              date: record.date,
              address: record.address,
              companyId: record.companyId,
              nic: record.nic,
              email: record.email,
              mobile: record.mobile,

            }
            setSelectedCustomer(d);
            setDeleteAddModalOpen(true)
          }}></Button>
        </Space>
      }
    },
  ]

  const deleteCustomer  = async()=>{

    await CustomerService.deleteCustomer(selectedCustomer?._id!)
    await refresher()
    setDeleteAddModalOpen(false);
}


  const refresher = async () => {
    await CustomerService.getCustomers(1, 10).then(result => {
      setCustomers([...result])
    });
  }

  useEffect(() => {
    CustomerService.getCustomers(1, 10).then(result => {
      setCustomers([...result])
    });
  }, [])

  return (
    <WrapperContainer>
      <CustomRow>
        <Title level={3}>Customers</Title>
        <Tooltip title="Add Customer">
          <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} onClick={() => { setIsAddCustomerOpen(true) }} />
        </Tooltip>
      </CustomRow>
      <Table columns={columns} className="table" dataSource={customers} />
      <AddCustomerModal handleOk={async()=>{await refresher(); setIsAddCustomerOpen(false); }} handleCancel={closeAddCustomerModal} isOpen={isAddCustomerOpen} />
      <AddCustomerModal handleOk={async () => { await refresher(); setIsEditaModalOpen(false); }} handleCancel={() => { setIsEditaModalOpen(false); }} isOpen={isEditModalOpen} customer={selectedCustomer} />
      <DeleteModal isModalOpen={isDeleteModalOpen} handleCancel={()=>{setDeleteAddModalOpen(false)}} handleOk={deleteCustomer} text="Do you want t delete this customer ?" />  
 </WrapperContainer>
  )
}

export default Customer