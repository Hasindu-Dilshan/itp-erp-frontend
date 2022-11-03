import Table, { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { DeliveryOrderModel } from '../../models/delivery_order_model'
import StockOrderService from '../../services/delivery_order_service'
import CustomRow from '../common/Row'
import { Typography } from 'antd';
import WrapperContainer from '../common/WrapperContainer'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteModal from '../common/DeleteModal'
import CreateStockModal from './CreateStockModel'
const { Title } = Typography;


const StockOrder = () => {
    const [open, setOpen] = useState(false);

    const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrderModel[]>([])
    const [selectedOrder, setSelectedOrder] = useState<any>();
    const [deleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);



    const openCloseEditModal = async () => {
    await refresher();
    setIsEditModalOpen(!isEditModalOpen);
  }

  const handleOk = async() => {
    await refresher();
    setOpen(false)
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const columns: ColumnsType<DeliveryOrderModel> = [
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
        title: "Price",
        key: "price",
        dataIndex: "price"
  
      },
      {
        title: "Manufacturer",
        dataIndex: "manufacturer",
        key: "manufacturer",
      },
      {
        title: "Quantity",
        dataIndex: "orderqty",
        key: "qty",
      },
  ]


  const deleteDeliveryOrder = async () => {
    await StockOrderService.deleteDeliveryItem(selectedOrder?._id!);
    await refresher()
    setIsDeleteModalOpen(false)
  }

  const refresher = async () => {
    await StockOrderService.getDeliveryItems(0, 10)
      .then((val) => {
        setDeliveryOrders([...val])
      });
  }


  useEffect(() => {
    StockOrderService.getDeliveryItems(0, 10)
      .then((val) => {
        setDeliveryOrders([...val])
      });
  }, []);




  return (
    <WrapperContainer>
      <CustomRow>
        <Title level={3}>Delivery Order</Title>
        <Tooltip title="Add Delivery Order">
          <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} onClick={() => { setOpen(true) }} />
        </Tooltip>
      </CustomRow>
      <Table columns={columns} className="table" dataSource={deliveryOrders} />
      <CreateStockModal
        shouldOpen={open}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
        handleOk={handleOk} />
      <CreateStockModal
        shouldOpen={isEditModalOpen}
        confirmLoading={false}
        handleCancel={openCloseEditModal}
        handleOk={openCloseEditModal}
        deliveryOrder={selectedOrder}
      />
      <DeleteModal isModalOpen={deleteModalOpen} handleOk={deleteDeliveryOrder} handleCancel={() => { console.log("cale"); setIsDeleteModalOpen(false) }} text={"Delete delivery order"} />
    </WrapperContainer>
  )
}

export default StockOrder