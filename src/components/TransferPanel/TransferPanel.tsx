import React, { useMemo } from 'react';

import { Spinner, Status } from '../Spinner';

import { useMimicUploader, MimicUploaderResult } from './useMimicUploader';
import styles from './TransferPanel.css';

export const TransferPanel: React.FC = () => {
  const uploadingSize = 2500;
  const { startUploading, stopUploading, resetUploading, progress, status }: MimicUploaderResult = useMimicUploader(uploadingSize);
  const percentage = useMemo(() => progress/uploadingSize*100, [progress]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {status === Status.IN_PROGRESS || status === Status.PAUSED ? (
          <div className={styles.spinner}>
            <Spinner percentage={percentage} status={status} />
          </div>
        ) : null}
        {status === Status.NOT_STARTED && <div className={styles.status}>Start Transfering</div>}
        {status === Status.COMPLETED && <div className={styles.status}>DONE</div>}
        {status === Status.IN_PROGRESS && <div className={styles.status}>Transfering...</div>}
        {status === Status.PAUSED && <div className={styles.status}>Paused</div>}
      </div>
      <div className={styles.footer}>
        <button onClick={startUploading} disabled={status === Status.IN_PROGRESS}>Start</button>
        <button onClick={stopUploading}>Stop</button>
        <button onClick={resetUploading}>Reset</button>
      </div>
    </div>
  );
};
