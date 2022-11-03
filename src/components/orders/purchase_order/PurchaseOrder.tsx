import Table, { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { DeliveryOrderModel } from '../../../models/delivery_order_model'
import purchaseOrderservice from '../../../services/delivery_order_service'
import CustomRow from '../../common/Row'
import { Typography } from 'antd';
import WrapperContainer from '../../common/WrapperContainer'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';
import CreateDeliveryOrderModal from './CreatePurchaseOrder'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteModal from '../../common/DeleteModal'

const { Title } = Typography;


const DeliveryOrder = () => {
  const [open, setOpen] = useState(false);

  const [purchaseOrders, setpurchaseOrders] = useState<DeliveryOrderModel[]>([])
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
      title: "Order ID",
      dataIndex: "_id",
      key: "id",
    },
    {
      title:"PO Number",
      key:"poNo",
    },
    {
      title:"PO Date",
      key:"poDate",
    },
    {
      title:"Supplier Name",
      key:"supName",
    },
    {
      title:"Store",
      key:"Store",
    },
    {
      title:"Net Amount",
      key:"nAmount",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record: DeliveryOrderModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => {
            const d: DeliveryOrderModel = {
              _id: record._id,
              date: new Date(record.date),
              transactionDate: new Date(record.transactionDate),
              transactionType: record.transactionType,
              coustomer: record.coustomer,
              shippingAddress: record.shippingAddress,
              status: record.status,
              totalBill: record.totalBill,
              companyId: record.companyId,
            }

            setSelectedOrder(d)
            setIsEditModalOpen(true)
          }}></Button>
          <Button icon={<DeleteOutlined />} onClick={() => {
            const d: DeliveryOrderModel = {
              _id: record._id,
              date: new Date(record.date),
              transactionDate: new Date(record.transactionDate),
              transactionType: record.transactionType,
              coustomer: record.coustomer,
              shippingAddress: record.shippingAddress,
              status: record.status,
              totalBill: record.totalBill,
              companyId: record.companyId,
            }
            setSelectedOrder(d);
            setIsDeleteModalOpen(true)
          }}></Button>
        </Space>
      }
    },
    {
      title:"Action",
      key:"action",
    }
  ]


  const deleteDeliveryOrder = async () => {
    await purchaseOrderservice.deleteDeliveryItem(selectedOrder?._id!);
    await refresher()
    setIsDeleteModalOpen(false)
  }

  const refresher = async () => {
    await purchaseOrderservice.getDeliveryItems(0, 10)
      .then((val) => {
        setpurchaseOrders([...val])
      });
  }


  useEffect(() => {
    purchaseOrderservice.getDeliveryItems(0, 10)
      .then((val) => {
        setpurchaseOrders([...val])
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
      <Table columns={columns} className="table" dataSource={purchaseOrders} />
      <CreateDeliveryOrderModal
        shouldOpen={open}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
        handleOk={handleOk} />
      <CreateDeliveryOrderModal
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

export default DeliveryOrder