import React from 'react';

const Container = ({ children, topPadding, zIndex }) => {
  return (
    <div
      style={{
        maxWidth: '1024px',
      }}
      className={
        topPadding && !zIndex
          ? 'pt-32 px-4 w-full mx-auto my-0'
          : zIndex
          ? 'pt-32 px-4 w-full mx-auto my-0 z-20'
          : 'w-full px-4 mx-auto my-0'
      }
    >
      {children}
    </div>
  );
};

export default Container;
