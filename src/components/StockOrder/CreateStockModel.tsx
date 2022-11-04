import React from 'react'
import { MouseEvent, useEffect, useState } from 'react'
import { DatePicker, Form, Modal, Col, Row, Input, Button, Table, Dropdown, Menu, Space, } from 'antd';
import { DeliveryOrderModel } from "../../models/delivery_order_model"
import stringValidator from "../common/validation_helper"
import DeliveryOrderService from '../../services/delivery_order_service';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table'
import { ItemModel } from '../purchase_request/item_model';
import { DownOutlined } from '@ant-design/icons';


interface Props {
    shouldOpen: boolean,
    confirmLoading: boolean,
    handleOk: () => void,
    handleCancel: ((e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void),
    deliveryOrder?: DeliveryOrderModel
 }

const CreateStockModal = ({shouldOpen,confirmLoading,handleOk,handleCancel,deliveryOrder}:Props) => {
  return (
    <div>CreateStockModal</div>
  )
}

export default CreateStockModal