import { Button, Space, Table } from 'antd'
import React, { useState, useEffect } from 'react'
import AddButton from '../common/AddButton'
import CustomRow from '../common/Row'
import WrapperCard from '../common/WrapperCard'
import WrapperContainer from '../common/WrapperContainer'
import { ItemModel } from '../../models/item_model'
import { ColumnsType } from 'antd/lib/table'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AddItemModal from './AddItemModal'
import ItemService from '../../services/item_service'
import DeleteModal from '../common/DeleteModal'
import PurchaseOrderService from '../../services/purchase_service'
import { DeliveryOrderModel } from '../../models/delivery_order_model'

const PuchaseItems = () => {

  const [isAddItemModalOpen, setIsAddItemModal] = useState<boolean>(false);
  const [items, setItems] = useState<ItemModel[]>([])
  const [selectedItem, setSelectedItem] = useState<ItemModel>()
  const [isDeleteModalOpen, setIsDelete] = useState<boolean>(false);
  const addItem = async() => {
    setIsAddItemModal(false)
    await refresher();
  }

  const cancelItem = () => {
    setIsAddItemModal(false)
  }

  const refresher = async () => {
    await ItemService.getDeliveryItems(0, 10)
      .then(res => {
        setItems([...res]);
      })
      .catch(err => console.log(`get items from db failed ${err}`))
  }

  const deleteItem = async () => {
    if (selectedItem) {
      console.log("called")
      await ItemService.deleteDeliveryItem(selectedItem._id!)
      await refresher();
      setIsDelete(false);
    }
  }

  const columns: ColumnsType<ItemModel> = [
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
      title: "Order Status",
      key: "status",
      render: (_, record: ItemModel) => {
        return <p>{record.inStock ? "In stock" : "Out of stock"}</p>
      }
    },
    {
      title: "",
      key: "actions",
      render: (_, record: ItemModel) => {
        return <Space size="middle">
          <Button icon={<EditOutlined key={record._id} />} onClick={() => {
            setSelectedItem(record);
          }}></Button>
          <Button icon={<DeleteOutlined  />} onClick={() => {
            const i :ItemModel={
           _id: record._id,
           name : record.name,
           price : record.price,
           inStock : record.inStock,
           manufacturer : record.manufacturer,
           supplier : record.supplier,
           companyId : record.companyId,
          }
            setSelectedItem(i);
            setIsDelete(true);
          }}></Button>
        </Space>
      }
    },
  ]


  useEffect(() => {
    ItemService.getDeliveryItems(0, 10)
      .then(res => {
        setItems([...res]);
      })
      .catch(err => console.log(`get items from db failed ${err}`))
  }, [])


  return (
    <WrapperContainer>
      <WrapperCard>
        <CustomRow style={{ justifyContent: "space-between", padding: "16px" }} >
          <h1>Items</h1>
          <AddButton onClick={()=>{setIsAddItemModal(true)}} />
        </CustomRow>
        <Table dataSource={items} columns={columns} style={{ width: "100%", height: "100%" }} />
      </WrapperCard>
      <AddItemModal isOpen={isAddItemModalOpen} handleCancel={cancelItem} handleOk={addItem} />
      <DeleteModal isModalOpen={isDeleteModalOpen} handleCancel={() => { setIsDelete(false) }} handleOk={async () => { deleteItem(); }} text="Do you want to delete purchase order ? " />
    </WrapperContainer>
  )
}

export default PuchaseItems