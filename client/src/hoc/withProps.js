import React from 'react'
export default (Wrapper, inProps) => {
  return (props) => <Wrapper {...props} {...inProps} />;
};
