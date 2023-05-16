import React from 'react';
import Card from './Card';
import ItemInInventory from '../../assets/images/inventory.png';
import SoldItem from '../../assets/images/soldItem.png';
import Expired from '../../assets/images/expired.png';
import Revenue from '../../assets/images/revenue.png';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';
import LowSKU from './LowSKU';
import TopSelling from './TopSelling';
import DashboardFilter from './DashboardFilter';

const Dashboard = () => {
  return (
    <>
        
        <section>
          <h1 className='text-4xl pb-8 font-medium'>Dashboard</h1>
          <DashboardFilter />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card img={ItemInInventory} content="total items" data="3243" />
            <Card img={SoldItem} content="items sold in duration" data="493" />
            <Card img={Expired} content="items expired in duration" data="23" />
            <Card img={Revenue} content="revenue in duration" data="165873" />
          </div>
        </section>
      <section className="grid grid-cols-1 gap-8">
        <div className="p-8 rounded-md bg-white flex flex-col items-center justify-center">
          <h3 className='text-2xl font-medium'>Categorical sales revenue</h3>
          <PieChart />
        </div>
        <div className="p-8 rounded-md bg-white flex flex-col items-center justify-center">
        <h3 className='text-2xl font-medium'>Quantities sold</h3>
          <BarChart />
        </div>
        <div className="p-8 rounded-md bg-white flex flex-col items-center justify-center">
        <h3 className='text-2xl font-medium'>Monthly sales</h3>
          <LineChart />
        </div>
      </section>
      <section>
        <div className="grid md:grid-cols-2 gap-4">
          <LowSKU />
          <TopSelling />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
