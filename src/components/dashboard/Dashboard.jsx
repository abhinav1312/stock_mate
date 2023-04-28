import React from 'react';
import Card from './Card';
import ItemInInventory from '../../assets/images/inventory.png';
import SoldItem from '../../assets/images/soldItem.png';
import Expired from '../../assets/images/expired.png';
import Revenue from '../../assets/images/revenue.png';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';

const Dashboard = () => {
  return (
    <>
  
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            img={ItemInInventory}
            content="items in inventory"
            data="3243"
          />
          <Card img={SoldItem} content="Items sold" data="493" />
          <Card img={Expired} content="Expired items" data="23" />
          <Card img={Revenue} content="Revenue" data="165873" />
        </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="chart pie-chart lg:row-span-2">
          <PieChart />
        </div>
        <div className="chart bar-chart">
          <BarChart />
        </div>
        <div className="chart line-chart">
          <LineChart />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
