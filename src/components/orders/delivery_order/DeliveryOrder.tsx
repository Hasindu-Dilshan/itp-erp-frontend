import Table, { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { DeliveryOrderModel } from '../../../models/delivery_order_model'
import DeliveryOrderService from '../../../services/delivery_order/delivery_order_service'
import CustomRow from '../../common/Row'
import { Typography } from 'antd';
import WrapperContainer from '../../common/WrapperContainer'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import CreateDeliveryOrderModal from './CreateDeliveryOrderModal'
import axios from 'axios'
import baseUrl from '../../../config'
import companyId from '../../../config'

const { Title } = Typography;

const columns: ColumnsType<DeliveryOrderModel> = [
  {
    title: "Order ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Placed Date",
    dataIndex: "placed-date",
    key: "placed-date",
  },
  {
    title: "Transaction Date",
    dataIndex: "transaction-date",
    key: "transaction-date",
  },
  {
    title: "Transaction Type",
    dataIndex: "transaction-type",
    key: "transaction-type",
  },
  {
    title: "Order Source",
    dataIndex: "order-source",
    key: "order-source",
  },
  {
    title: "Delivery Type",
    dataIndex: "delivery-type",
    key: "delivery-type",
  },
  {
    title: "Vehicle Number",
    dataIndex: "vehicle-number",
    key: "vehicle-number",
  },
  {
    title: "Customer Name",
    dataIndex: "customer-name",
    key: "customer-name",
  },
  {
    title: "Shipping Address",
    dataIndex: "shipping-address",
    key: "shipping-address",
  },
  {
    title: "Total Bill",
    dataIndex: "total-bill",
    key: "total-bill",
  },
  {
    title: "Order Status",
    dataIndex: "status",
    key: "status",
  },
]


const DeliveryOrder = () => {
  const [open, setOpen] = useState(false);

  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrderModel[]>([])
  useEffect(() => {
    setDeliveryOrders(DeliveryOrderService.getDeliveryItems(0, 10));
  }, [])

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


  useEffect(() => {
    // axios.get(`${baseUrl}/delivery-order/${companyId}/0/1`).then((val => {

    // })).catch(err => console.log(`get delivery orders failed ${err}`))
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
    </WrapperContainer>
  )
}

export default DeliveryOrder