import React, { useState } from 'react';
import './StockChartView.scss';
import TradingViewAdvancedChart from './TradingViewAdvancedChart.jsx';

const tickers = [
  // ===== USA BIG TECH =====
  { symbol: 'NASDAQ:AAPL', label: 'AAPL' },
  { symbol: 'NASDAQ:MSFT', label: 'MSFT' },
  { symbol: 'NASDAQ:NVDA', label: 'NVDA' },
  { symbol: 'NASDAQ:AMZN', label: 'AMZN' },
  { symbol: 'NASDAQ:GOOGL', label: 'GOOGL' },
  { symbol: 'NASDAQ:META', label: 'META' },

  // ===== FINANCE =====
  { symbol: 'NYSE:JPM', label: 'JPM' },
  { symbol: 'NYSE:V', label: 'V' },
  { symbol: 'NYSE:MA', label: 'MA' },

  // ===== INDICES =====
  { symbol: 'SP:SPX', label: 'S&P 500' },
  { symbol: 'NASDAQ:NDX', label: 'NASDAQ 100' },
  { symbol: 'DJ:DJI', label: 'DOW JONES' },
  { symbol: 'RUSSELL:RUT', label: 'RUSSELL 2000' },

  // ===== FOREX (MAJORS) =====
  { symbol: 'FX:EURUSD', label: 'EUR/USD' },
  { symbol: 'FX:USDJPY', label: 'USD/JPY' },
  { symbol: 'FX:GBPUSD', label: 'GBP/USD' },
  { symbol: 'FX:AUDUSD', label: 'AUD/USD' },
  { symbol: 'FX:USDCAD', label: 'USD/CAD' },
  { symbol: 'FX:USDCHF', label: 'USD/CHF' },
  { symbol: 'FX:NZDUSD', label: 'NZD/USD' },

  // ===== FOREX (CROSSES) =====
  { symbol: 'FX:EURJPY', label: 'EUR/JPY' },
  { symbol: 'FX:EURGBP', label: 'EUR/GBP' },
  { symbol: 'FX:GBPJPY', label: 'GBP/JPY' },
  { symbol: 'FX:CADJPY', label: 'CAD/JPY' },
  { symbol: 'FX:CHFJPY', label: 'CHF/JPY' },

  // ===== COMMODITIES =====
  { symbol: 'TVC:GOLD', label: 'Gold' },
  { symbol: 'TVC:SILVER', label: 'Silver' },
  { symbol: 'TVC:PLATINUM', label: 'Platinum' },
  { symbol: 'TVC:PALLADIUM', label: 'Palladium' },

  { symbol: 'TVC:USOIL', label: 'Oil (WTI)' },
  { symbol: 'TVC:UKOIL', label: 'Oil (Brent)' },
  { symbol: 'TVC:NATGAS', label: 'Natural Gas' },

  // ===== CRYPTO =====
  { symbol: 'BINANCE:BTCUSDT', label: 'Bitcoin' },
  { symbol: 'BINANCE:ETHUSDT', label: 'Ethereum' },

  // ===== VOLATILITY / RATES =====
  { symbol: 'CBOE:VIX', label: 'VIX' },
  { symbol: 'TVC:US10Y', label: 'US 10Y Yield' },

  // ===== ETFs (MARKET SNAPSHOT) =====
  { symbol: 'AMEX:SPY', label: 'SPY' },
  { symbol: 'NASDAQ:QQQ', label: 'QQQ' },
  { symbol: 'AMEX:IWM', label: 'IWM' },

  { symbol: 'AMEX:XLF', label: 'Financials ETF' },
  { symbol: 'AMEX:XLK', label: 'Tech ETF' },
  { symbol: 'AMEX:XLE', label: 'Energy ETF' },
  { symbol: 'AMEX:XLV', label: 'Healthcare ETF' },
];

const timeframeMap = {
  '5Y': 'W',
  '1Y': 'D',
  '1M': '60',
  '1D': '5',
};

const StockChartView = () => {
  const [selectedTicker, setSelectedTicker] = useState(tickers[0]);
  const [selectedRange, setSelectedRange] = useState('1Y');

  return (
    <div className='StockChartView'>
      <div className='chart-half'>
        <TradingViewAdvancedChart
          symbol={selectedTicker.symbol}
          interval={timeframeMap[selectedRange]}
        />
      </div>

      <div className='list-half'>
        <div className='range-buttons'>
          {['5Y', '1Y', '1M', '1D'].map((range) => (
            <button
              key={range}
              className={selectedRange === range ? 'range-btn active' : 'range-btn'}
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </button>
          ))}
        </div>

        <div className='ticker-list'>
          {tickers.map((ticker) => (
            <button
              key={ticker.symbol}
              className={
                selectedTicker.symbol === ticker.symbol
                  ? 'ticker-row active'
                  : 'ticker-row'
              }
              onClick={() => setSelectedTicker(ticker)}
            >
              {ticker.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockChartView;
