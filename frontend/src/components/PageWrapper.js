import React from 'react';

const PageWrapper = ({ children }) => {
  const wrapperStyle = {
    maxWidth: '60%',
    margin: '0 auto',
  };

  return <div style={wrapperStyle}>{children}</div>;
};

export default PageWrapper;
