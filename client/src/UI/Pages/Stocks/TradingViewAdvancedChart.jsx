import React, { useEffect, useRef, memo } from 'react';

function TradingViewAdvancedChart({ symbol, interval }) {
  const container = useRef();

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = '';

    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container__widget';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval,
      timezone: 'America/New_York',
      theme: 'dark',
      style: '1',
      locale: 'en',
      allow_symbol_change: false,
      hide_top_toolbar: true,
      hide_legend: false,
      save_image: false,
      calendar: false,
      support_host: 'https://www.tradingview.com',
    });

    const wrapper = document.createElement('div');
    wrapper.className = 'tradingview-widget-container';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';

    wrapper.appendChild(widget);
    wrapper.appendChild(script);
    container.current.appendChild(wrapper);
  }, [symbol, interval]);

  return <div className='tv-advanced-chart-root' ref={container} />;
}

export default memo(TradingViewAdvancedChart);
