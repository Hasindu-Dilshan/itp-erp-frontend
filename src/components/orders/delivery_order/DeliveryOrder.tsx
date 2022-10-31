import Table, { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { DeliveryOrderModel } from '../../../models/delivery_order_model'
import DeliveryOrderService from '../../../services/delivery_order/delivery_order_service'
import CustomRow from '../../common/Row'
import { Typography } from 'antd';
import WrapperContainer from '../../common/WrapperContainer'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';
import CreateDeliveryOrderModal from './CreateDeliveryOrderModal'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteModal from '../../common/DeleteModal'

const { Title } = Typography;


const DeliveryOrder = () => {
  const [open, setOpen] = useState(false);

  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrderModel[]>([])
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrderModel>();
  const [deleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const columns: ColumnsType<DeliveryOrderModel> = [
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
      render: (_, record: DeliveryOrderModel) => {
        return <p>{record.status === 0 ? "Not Completed" : "Completed"}</p>
      }
    },
    {
      title: "Order Status",
      key: "status",
      render: (_, record: DeliveryOrderModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => { setSelectedOrder(record); }}></Button>
          <Button icon={<DeleteOutlined />} onClick={() => { setSelectedOrder(record); setIsDeleteModalOpen(true); }}></Button>
        </Space>
      }
    },
  ]


  const deleteDeliveryOrder = async () => {
    await DeliveryOrderService.deleteDeliveryItem(selectedOrder?._id!);
    refresher()
    setIsDeleteModalOpen(false)
  }

  const refresher = async () => {
    await DeliveryOrderService.getDeliveryItems(0, 10)
      .then((val) => {
        setDeliveryOrders([...val])
      });
  }

  useEffect(() => {
    DeliveryOrderService.getDeliveryItems(0, 10)
      .then((val) => {
        setDeliveryOrders([...val])
      });
  }, []);

  return (
    <WrapperContainer>
      <CustomRow>
        <Title level={3}>Delivery Order</Title>
        <Tooltip title="Add Delivery Order">
          <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} onClick={showModal} />
        </Tooltip>
      </CustomRow>
      <Table columns={columns} className="table" dataSource={deliveryOrders} />
      <CreateDeliveryOrderModal
        shouldOpen={open}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
      <DeleteModal isModalOpen={deleteModalOpen} handleOk={deleteDeliveryOrder} handleCancel={() => { console.log("cale"); setIsDeleteModalOpen(false) }} text={"Delete delivery order"} />
    </WrapperContainer>
  )
}

export default DeliveryOrder