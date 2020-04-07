import React from 'react';
import { Spin } from 'antd';

const LoadingIndicator = () => {
  return (
    <div className='fullScreenCenter'>
      <Spin />
    </div>
  );
};

export default LoadingIndicator;
