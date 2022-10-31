import React, { useState } from 'react'
import WrapperContainer from '../../common/WrapperContainer'
import WrapperCard from '../../common/WrapperCard'
import CustomRow from '../../common/Row'
import AddButton from '../../common/AddButton'
import { SalesOderModel } from '../../../models/sales_order_model'
import { Button, Space, Table } from 'antd'
import { EditOutlined,DeleteOutlined} from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import AddSalesOrderModal from './AddSalesOrderModal'

const SalesOrder = () => {
  const [salesOrders,setSalseOrders] = useState<SalesOderModel[]>([]);
  const [openAddOrderModal,setOpenAddOrderModal] = useState<boolean>(false);



  const addOrder =()=>{
    setOpenAddOrderModal(true);
  }

const cancelOrder = ()=>{
  setOpenAddOrderModal(false)
}

 const columns: ColumnsType<SalesOderModel> = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Placed Date",
      dataIndex: "date",
      key: "placed-date",
    },
    {
      title: "Transaction Date",
      key: "transactionDate",
      dataIndex: "transactionDate"

    },
    {
      title: "Customer Name",
      dataIndex: "coustomer",
      key: "customer",
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shipping-address",
    },
    {
      title: "Total Bill",
      dataIndex: "totalBill",
      key: "total-bill",
    },
    {
      title: "Order Status",
      key: "status",
      render: (_, record: SalesOderModel) => {
        return <p>{record.status === 0 ? "Not Completed" : "Completed"}</p>
      }
    },
    {
      title: "",
      key: "status",
      render: (_, record: SalesOderModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined key={record._id}/>} onClick={()=>{}}></Button>
          <Button icon={<DeleteOutlined key={record._id}/>} onClick={()=>{}}></Button>
        </Space>
      }
    },
  ]


  return (
    <WrapperContainer>
      <WrapperCard>
          <CustomRow style={{justifyContent : "space-between",padding : "16px"}}>
              <h1>Sales Order</h1>
              <AddButton onClick={()=>{addOrder()}}/>
          </CustomRow>
      <Table dataSource={salesOrders} columns = {columns} style={{width : "100%",height : "100%"}}/>
      </WrapperCard>
      <AddSalesOrderModal handleOk={addOrder} handleCancel={cancelOrder} isOpen = {openAddOrderModal}/>
    </WrapperContainer>
  )
}

export default SalesOrder