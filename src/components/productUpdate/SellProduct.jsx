import React from 'react'
import QRScanner from './QRScanner'
import { useSelector } from 'react-redux'
import Table from './Table'
import { sellProduct } from '../../redux/slice/sellProductSlice'

const SellProduct = () => {
  const productList = useSelector((state)=>{
    return state.sellProduct.showToUser;
  })
  return (
    <section>
      <QRScanner  />
      <Table currInventory={false} productList = {productList} />
    </section>
  )
}

export default SellProduct
