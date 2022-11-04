import React, { useEffect, useState } from 'react'


import { PlusCircleOutlined } from '@ant-design/icons';
import CustomRow from '../../common/Row';
import WrapperContainer from '../../common/WrapperContainer'
import { Button, Space, Tooltip } from 'antd'
import { Typography } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { PhurchaseOrderModel } from '../../../models/purchase_order';

import PurchaseOrderService from '../../../services/purchase_service';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddPurchaseOrder from './AddPurchaseOrder';
const { Title } = Typography;




const PurchaseOrder = () => {
  const [open, setOpen] = useState(false);

  const [purchaseOrders, setPurchaseOrders] = useState<PhurchaseOrderModel[]>([]);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<PhurchaseOrderModel>();
  const [isEditModalOpen, setIsEditaModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteAddModalOpen] = useState<boolean>(false);

  const [isAddPurchaseOrderOpen, setIsAddPurchaseOrderOpen] = useState<boolean>(false);

  const openAddCuastomerModal = async () => {
    await refresher();
    setIsAddPurchaseOrderOpen(!openAddCuastomerModal);

  }
  const handleOk = async() => {
    await refresher();
    setOpen(false)
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };


  const closeAddPurchaseOrder = async () => {
    await refresher();
    setIsAddPurchaseOrderOpen(false);
  }


  const columns: ColumnsType<PhurchaseOrderModel> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id"
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseOrderDate",
      key: "purchase-date",
      render: (_, record: PhurchaseOrderModel) => {
        return <div>{record.purchaseOrderDate.toString().split("T")[0]}</div>
      }
    },
    {
      title: "Supplier Name",
      dataIndex: "suppierName",
      key: "nic",
      render: (_, record: PhurchaseOrderModel) => {
        return <div>{record.suppierName.toString().split("T")[0]}</div>
      }
    },
    {
      title: "Store",
      dataIndex: "store",
      key: "store",
      render: (_, record: PhurchaseOrderModel) => {
        return <div>{record.store.toString().split("T")[0]}</div>
      }
    },
    {
      title: "Net Amount",
      dataIndex: "netAmount",
      key: "netAmount",
      render: (_, record: PhurchaseOrderModel) => {
        return <div>{record.netAmount.toString().split("T")[0]}</div>
      }
    },

    {
      title: "Actions",
      key: "status",
      render: (_, record: PhurchaseOrderModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => {
            const d: PhurchaseOrderModel = {
              _id: record._id,
              purchaseOrderDate: record.purchaseOrderDate,
              suppierName: record.suppierName,
              store: record.store,
              netAmount: record.netAmount,
              status: record.status,
              companyId: record.companyId,
            }
            setSelectedPurchaseOrder(d)
            setIsEditaModalOpen(true)
          }}></Button>
          <Button icon={<DeleteOutlined />} onClick={() => {
            const d: PhurchaseOrderModel = {
              _id: record._id,
              purchaseOrderDate: record.purchaseOrderDate,
              suppierName: record.suppierName,
              store: record.store,
              netAmount: record.netAmount,
              status: record.status,
              companyId: record.companyId,

            }
            setSelectedPurchaseOrder(d);
            setDeleteAddModalOpen(true)
          }}></Button>
        </Space>
      }
    },
  ]

  const refresher = async () => {
    await PurchaseOrderService.getPurchaseOrders(1, 10).then(result => {
      setPurchaseOrders([...result])
    });
  }

  useEffect(() => {
    PurchaseOrderService.getPurchaseOrders(1, 10).then(result => {
      setPurchaseOrders([...result])
    });
  }, [])

  return (
    <WrapperContainer>
      <CustomRow>
        <Title level={3}>PurchaseOrders</Title>
        <Tooltip title="Add Delivery Order">
          <Button type="primary" shape="circle" icon={<PlusCircleOutlined />} onClick={() => { setIsAddPurchaseOrderOpen(true) }} />
        </Tooltip>
      </CustomRow>
      <Table columns={columns} className="table" dataSource={purchaseOrders} />
      <AddPurchaseOrder 
      handleOk={openAddCuastomerModal} handleCancel={closeAddPurchaseOrder} shouldOpen={isAddPurchaseOrderOpen} />
      <AddPurchaseOrder handleOk={async () => { await refresher(); setIsEditaModalOpen(false); }} handleCancel={() => { setIsEditaModalOpen(false); }} shouldOpen={isEditModalOpen} order={selectedPurchaseOrder} />
    </WrapperContainer>
  )
}

export default PurchaseOrder