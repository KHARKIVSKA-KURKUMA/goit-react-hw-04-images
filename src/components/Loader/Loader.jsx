import React from 'react';
import { MutatingDots } from 'react-loader-spinner';

export default function Loader() {
  return (
    <MutatingDots
      height="100"
      width="100"
      color="#0097fc"
      secondaryColor="#dffd00"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '100px',
      }}
    />
  );
}
