import { useState } from 'react';
import { isValid, parse } from 'date-fns';

import './StockData.css';

function StockData() {

  const [ inputDate, setInputDate ] = useState('5-January-2000');
  const [ error, setError ] = useState();
  const [ stockData, setStockData ] = useState();

  const onInputChange = (e) => {
    setInputDate(e.target.value);
  };

  const onSearchClick = () => {
    fetchData(inputDate);
  };

  const formatDate = (date) => {
    return parse(date, 'd-MMMM-yyyy', new Date());
  }

  const onInputKeyUp = (e) => {
    if (e.key === 'Enter') {
      fetchData(inputDate);
    }
  };

  const fetchData = (date) => {
    setError();
    setStockData();

    const formattedDate = formatDate(date);
    if (!isValid(formattedDate)) return setError(true);

    fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${date}`)
      .then(response => response.json())
      .then(json => {
        if (json.data && json.data.length > 0) return setStockData(json.data[0]);
        setStockData();
      })
      .catch(err => setError('error at fetching data'));
  };

  return (
    <div className="stock-data">
      <input value={inputDate} onChange={onInputChange} onKeyUp={onInputKeyUp}/>
      <button onClick={onSearchClick}>Search</button>
      {
        error && <div className="error">date must be valid e.g. 5-January-2000</div>
      }
      {
        stockData ?
          <ul>
            <li>Open: {stockData.open}</li>
            <li>Close: {stockData.close}</li>
            <li>High: {stockData.high}</li>
            <li>Low: {stockData.low}</li>
          </ul> :
          <div className="no-results">No Results Found</div>
      }
    </div>
  )
}

export default StockData;
