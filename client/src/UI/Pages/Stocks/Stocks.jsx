import React, { useState } from 'react';
import './Stocks.scss';
import TradingViewWidget from './TradingViewWidget.jsx';
import StockChartView from './StockChartView.jsx';

const Stocks = () => {
  const [activePage, setActivePage] = useState('heatmap');

  return (
    <div className='Stocks'>
      <div className='stocks-content'>
        {activePage === 'heatmap' && <TradingViewWidget />}
        {activePage === 'chart' && <StockChartView />}
      </div>

      <div className='stocks-footer'>
        <button
          className={activePage === 'heatmap' ? 'footer-btn active' : 'footer-btn'}
          onClick={() => setActivePage('heatmap')}
        >
          Heatmap
        </button>

        <button
          className={activePage === 'chart' ? 'footer-btn active' : 'footer-btn'}
          onClick={() => setActivePage('chart')}
        >
          Charts
        </button>
      </div>
    </div>
  );
};

export default Stocks;
