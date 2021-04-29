import React from 'react';

const Container = ({ children, topPadding }) => {
  return (
    <div
      style={{
        maxWidth: '1024px',
      }}
      className={
        topPadding
          ? 'pt-32 px-4 w-full mx-auto my-0'
          : 'w-full px-4 mx-auto my-0'
      }
    >
      {children}
    </div>
  );
};

export default Container;
