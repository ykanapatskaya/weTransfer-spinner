import React, { useMemo } from 'react';

import { SpinnerContext, SpinnerContextProps } from './context';
import { SpinnerCircleSVG } from './SpinnerCircleSVG';
import { SpinnerLabel } from './SpinnerLabel';
import { radiusSizes } from './constants';
import { Status, Sizes } from './types';
import styles from './Spinner.css';

export interface SpinnerProps {
  percentage?: number;
  status?: Status;
  size?: Sizes;
}

export const Spinner: React.FC<SpinnerProps> = ({
  percentage = 0,
  size = Sizes.MEDIUM,
  status = Status.NOT_STARTED
}) => {
  const radius = useMemo(() => radiusSizes[size], [size]);

  const context = useMemo(() => ({
    percentage: Math.floor(percentage),
    status,
    size,
    radius,
  }), [
    percentage,
    status,
    size,
  ]);

  return (
    <SpinnerContext.Provider value={context}>
      <div
        className={styles.container}
        data-tag="spinner"
        style={{ width: radius*2+'px', height: radius*2+'px'}}
      >
        <SpinnerCircleSVG />
        <SpinnerLabel />
      </div>
    </SpinnerContext.Provider>
  )
};

