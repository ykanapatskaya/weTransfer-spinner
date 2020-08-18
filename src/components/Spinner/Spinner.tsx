import React, { useMemo } from 'react';
import classNames from 'classnames';

import { SpinnerContext, SpinnerContextProps } from './context';
import { SpinnerCircleSVG } from './SpinnerCircleSVG';
import { SpinnerLabel } from './SpinnerLabel';
import { radiusSizes } from './constants';
import { Status, Sizes } from './types';
import styles from './Spinner.css';

export interface SpinnerProps {
  percentage: number;
  status: Status;
  size?: Sizes;
}

export const Spinner: React.FC<SpinnerProps> = ({ percentage, status, size = Sizes.MEDIUM }) => {
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
        style={{ width: radius*2+'px', height: radius*2+'px'}}
      >
        <SpinnerCircleSVG />
        <SpinnerLabel />
      </div>
    </SpinnerContext.Provider>
  )
};



