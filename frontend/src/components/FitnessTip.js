import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageWrapper from './PageWrapper';

const FitnessTip = () => {
  const [quote, setQuote] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.kanye.rest/');
      setQuote(response.data.quote);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <PageWrapper className="quote" onClick={fetchQuote}>
      <p>
        {quote}
      </p>
      <button onClick={fetchQuote}>Click to get a new quote</button>
    </PageWrapper>
  );
};

export default FitnessTip;
