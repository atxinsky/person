const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'eth', 'data.json');

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.json();
}

async function main() {
  const data = {
    updated_at: new Date().toISOString(),
    price: null,
    market_cap: null,
    volume_24h: null,
    change_24h: null,
    change_7d: null,
    change_30d: null,
    fear_greed: null,
  };

  // 1. CoinGecko - price, market cap, volume, changes
  try {
    const cg = await fetchJSON(
      'https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false'
    );
    data.price = cg.market_data.current_price.usd;
    data.market_cap = cg.market_data.market_cap.usd;
    data.volume_24h = cg.market_data.total_volume.usd;
    data.change_24h = cg.market_data.price_change_percentage_24h;
    data.change_7d = cg.market_data.price_change_percentage_7d;
    data.change_30d = cg.market_data.price_change_percentage_30d;
    data.ath = cg.market_data.ath.usd;
    data.ath_date = cg.market_data.ath_date.usd;
    data.ath_change = cg.market_data.ath_change_percentage.usd;
    data.circulating_supply = cg.market_data.circulating_supply;
    console.log(`[OK] CoinGecko: ETH = $${data.price}`);
  } catch (e) {
    console.error('[FAIL] CoinGecko:', e.message);
  }

  // 2. Fear & Greed Index
  try {
    const fg = await fetchJSON('https://api.alternative.me/fng/?limit=1');
    data.fear_greed = {
      value: parseInt(fg.data[0].value),
      label: fg.data[0].value_classification,
    };
    console.log(`[OK] Fear & Greed: ${data.fear_greed.value} (${data.fear_greed.label})`);
  } catch (e) {
    console.error('[FAIL] Fear & Greed:', e.message);
  }

  // Write to file
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  console.log(`[OK] Written to ${DATA_FILE}`);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
