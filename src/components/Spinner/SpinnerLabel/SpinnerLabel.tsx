import React, { useContext } from 'react';
import classNames from 'classnames';

import { SpinnerContext } from '../context';

import styles from './SpinnerLabel.css';

export const SpinnerLabel: React.FC = () => {
  const { percentage, size } = useContext(SpinnerContext);

  return (
    <div className={classNames(
      styles.wrapper,
      styles[`wrapper--${size}`],
    )}>
      <div className={styles.container}>
        <span className={styles.number}>{percentage}</span>
        <span className={styles.percentSign}>%</span>
      </div>
    </div>
  )
};
