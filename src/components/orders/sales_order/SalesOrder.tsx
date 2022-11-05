import React, { useState, useEffect } from 'react'
import WrapperContainer from '../../common/WrapperContainer'
import WrapperCard from '../../common/WrapperCard'
import CustomRow from '../../common/Row'
import AddButton from '../../common/AddButton'
import { SalesOderModel } from '../../../models/sales_order_model'
import { Button, Select, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import AddSalesOrderModal from './AddSalesOrderModal'
import SalesOrderService from '../../../services/sales_order_service'
import DeleteModal from '../../common/DeleteModal'

const SalesOrder = () => {
  const [salesOrders, setSalseOrders] = useState<SalesOderModel[]>([]);
  const [openAddOrderModal, setOpenAddOrderModal] = useState<boolean>(false);
  const [openEditOrderModal, setOpenEditOrderModal] = useState<boolean>(false);
  const [selectedSalesItem, setSelectedSalesItem] = useState<SalesOderModel>();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);


  const deleteSalesOrder = async () => {
    await SalesOrderService.deleteSalesItem(selectedSalesItem!._id!)
      .then(() => { })
      .catch(err => console.log(`delete sales order failed ${err}`))
    await refresher();
    setDeleteModalOpen(false);
  }


  const addOrder = async () => {
    await refresher();
    setOpenAddOrderModal(false);
    setOpenEditOrderModal(false);
  }

  const cancelOrder = () => {
    setOpenAddOrderModal(false)
  }

  const columns: ColumnsType<SalesOderModel> = [

    {
      title: "Placed Date",
      key: "placed-date",
      render: (_, record: SalesOderModel) => {
        return <div>{record.date.toString().split("T")[0]}</div>
      }

    },
    {
      title: "Transaction Date",
      key: "transactionDate",
      render: (_, record: SalesOderModel) => {
        return <div>{record.transactionDate.toString().split("T")[0]}</div>
      }

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
        return <Select
          defaultValue={record.status}
          onChange={async (val: number) => {

            const s: SalesOderModel = {
              _id: record._id,
              date: record.date,
              transactionDate: record.transactionDate,
              transactionType: record.transactionType,
              coustomer: record.coustomer,
              shippingAddress: record.shippingAddress,
              totalBill: record.totalBill,
              status: val,
              companyId: record.companyId,
              itemId: record.itemId,
              itemName: record.itemName,
            };
            await SalesOrderService.updateDeliverItem(record._id!, s);
            refresher();

          }}
        >
          <Select.Option value={1}>  Completed </Select.Option>
          <Select.Option value={0}> Not Completed </Select.Option>
        </Select>
      }
    },
    {
      title: "",
      key: "status",
      render: (_, record: SalesOderModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined key={record._id} />} onClick={() => {
            setSelectedSalesItem(record);
            setOpenEditOrderModal(true);

          }}></Button>
          <Button icon={<DeleteOutlined key={record._id} />} onClick={() => {
            setSelectedSalesItem(record);
            setDeleteModalOpen(true);
          }}></Button>
        </Space>
      }
    },
  ]

  const refresher = async () => {
    SalesOrderService.getSalesItems(0, 10)
      .then((val) => {
        setSalseOrders([...val])
      });
  }

  useEffect(() => {
    SalesOrderService.getSalesItems(0, 10)
      .then((val) => {
        setSalseOrders([...val])
      });
  }, [])


  return (
    <WrapperContainer>
      <WrapperCard>
        <CustomRow style={{ justifyContent: "space-between", padding: "16px" }}>
          <h1>Sales Order</h1>
          <AddButton onClick={() => { setOpenAddOrderModal(true) }} />
        </CustomRow>
        <Table dataSource={salesOrders} columns={columns} style={{ width: "100%", height: "100%" }} />
      </WrapperCard>
      <AddSalesOrderModal handleOk={addOrder} handleCancel={cancelOrder} isOpen={openAddOrderModal} />
      <AddSalesOrderModal handleOk={addOrder} handleCancel={() => { setOpenEditOrderModal(false) }} isOpen={openEditOrderModal} order={selectedSalesItem} />
      <DeleteModal isModalOpen={deleteModalOpen} handleOk={deleteSalesOrder} handleCancel={() => { setDeleteModalOpen(false) }} text={"Delete delivery order"} />
    </WrapperContainer>
  )
}

export default SalesOrder