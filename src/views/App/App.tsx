import React, { useMemo } from 'react';

import { Spinner, Status } from '../../components/Spinner';

import styles from './App.css';
import { useMimicUploader } from './useMimicUploader';

export const App: React.FC = () => {
  const {startUploading, stopUploading, resetUploading, progress, status} = useMimicUploader(2500);
  const percentage = useMemo(() => progress/2500*100, [progress]);

  return (
    <div>
      <div className={styles.transferSpinner}>
        <Spinner percentage={percentage} status={status} />
      </div>
      <div className={styles.actionButtons}>
        <button onClick={startUploading} disabled={status === Status.IN_PROGRESS}>start</button>
        <button onClick={stopUploading}>stop</button>
        <button onClick={resetUploading}>reset</button>
      </div>
    </div>
  );
};
