import React from 'react'

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeliveryOrder } from '../../models/delivery_order_model';



interface Props {
  columns: ColumnsType<DeliveryOrder>,
  data: DeliveryOrder[]
}


const CustomTable = ({ columns, data }: Props) => {
  return (
    <Table columns={columns} dataSource={data} className="table" />
  )
}

export default CustomTable