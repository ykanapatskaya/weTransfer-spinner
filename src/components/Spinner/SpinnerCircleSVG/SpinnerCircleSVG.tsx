import React, { useContext } from 'react';
import classNames from 'classnames';

import { SpinnerContext, SpinnerContextProps } from '../context';
import { Status } from '../types';

import styles from './SpinnerCircleSVG.css';

export const SpinnerCircleSVG: React.FC = () => {
  const { percentage, status, radius } = useContext(SpinnerContext);

  const strokeWidth = 10;
  const innerRadius = radius - strokeWidth / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - percentage / 100 * circumference;
  const diameter = radius*2;

  return (
    <svg
      height={diameter}
      width={diameter}
      className={classNames(
        styles.spinner,
        { [styles['spinner--processing']]: status === Status.IN_PROGRESS },
        { [styles['spinner--paused']]: status === Status.PAUSED }
      )}
      shapeRendering="geometricPrecision"
      viewBox={`0 0 ${diameter} ${diameter}`}
    >
      <circle
        className={styles.backgroundCircle}
        r={innerRadius}
        cx={radius}
        cy={radius}
        fill="transparent"
        strokeWidth={strokeWidth}
        style={{
          strokeDasharray: circumference,
        }}
      />
      <circle
        className={styles.trackingCircle}
        r={innerRadius}
        cx={radius}
        cy={radius}
        fill="transparent"
        strokeWidth={strokeWidth}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
          borderRadius: strokeWidth,
        }}
      />
    </svg>
  )
};
