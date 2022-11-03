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

const PuchaseItems = () => {

  const [isAddItemModalOpen, setIsAddItemModal] = useState<boolean>(false);
  const [items,setItems] = useState<ItemModel[]>([])

  const addItem = () => {
    setIsAddItemModal(true)
  }

  const cancelItem = () => {
    setIsAddItemModal(false)
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
          <Button icon={<EditOutlined key={record._id} />} onClick={() => { }}></Button>
          <Button icon={<DeleteOutlined key={record._id} />} onClick={() => { }}></Button>
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
          <AddButton onClick={addItem} />
        </CustomRow>
        <Table dataSource={items} columns={columns} style={{ width: "100%", height: "100%" }} />
      </WrapperCard>
      <AddItemModal isOpen={isAddItemModalOpen} handleCancel={cancelItem} handleOk={addItem} />
    </WrapperContainer>
  )
}

export default PuchaseItems