import * as React from 'react';

export const AppVersion = () => {
  return <>{process.env.APP_VERSION}</>;
};
