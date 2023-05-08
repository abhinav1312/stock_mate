import React, { useState } from 'react'
import CurrInventory from './CurrInventory';
import SoldInventory from './SoldInventory';

const Inventory = () => {
    const [currInventory, setCurrInventory] = useState(true);
  return (
    <section>
      <div className="grid grid-cols-2">
        <button onClick={()=>setCurrInventory(true)} style={currInventory? {backgroundColor: "grey"} : {backgroundColor: ""} } className="border">Current Inventory</button>
        <button onClick={()=>setCurrInventory(false)} style={currInventory? {backgroundColor: ""}: {backgroundColor: "grey"} } className="border">Sold Inventory</button>
      </div>

      {currInventory ? <CurrInventory /> : <SoldInventory /> }
    </section>

  )
}

export default Inventory
