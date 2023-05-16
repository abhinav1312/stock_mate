import React from 'react'
import { useSelector } from 'react-redux'
import QRScanner from './QRScanner'
import Table from './Table'

const SellProduct = () => {
  const productList = useSelector((state)=>{
    return state.sellProduct.showToUser;
  })
  return (
    <div>
      <QRScanner  />
      <Table currInventory={false} productList = {productList} />
    </div>
  )
}

export default SellProduct
