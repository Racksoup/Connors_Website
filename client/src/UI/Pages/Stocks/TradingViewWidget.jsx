import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef();

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = '';

    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container__widget';

    const copyright = document.createElement('div');
    copyright.className = 'tradingview-widget-copyright';
    copyright.innerHTML = `
      <a href="https://www.tradingview.com/heatmap/stock/" rel="noopener nofollow" target="_blank">
        <span class="blue-text">Stock Heatmap</span>
      </a>
      <span class="trademark"> by TradingView</span>
    `;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      dataSource: 'SPX500',
      blockSize: 'market_cap_basic',
      blockColor: 'change',
      grouping: 'sector',
      locale: 'en',
      symbolUrl: '',
      colorTheme: 'dark',
      exchanges: [],
      hasTopBar: false,
      isDataSetEnabled: false,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      width: '100%',
      height: '114%',
    });

    const wrapper = document.createElement('div');
    wrapper.className = 'tradingview-widget-container';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';

    wrapper.appendChild(widget);
    wrapper.appendChild(copyright);
    wrapper.appendChild(script);

    container.current.appendChild(wrapper);
  }, []);

  return <div className='tv-heatmap-root' ref={container} />;
}

export default memo(TradingViewWidget);

