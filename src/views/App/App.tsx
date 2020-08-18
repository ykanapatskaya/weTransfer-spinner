import React, { useMemo } from 'react';

import { TransferPanel } from '../../components/TransferPanel';

import styles from './App.css';

export const App: React.FC = () => (
  <div className={styles.transferPanel}>
    <TransferPanel />
  </div>
);
