import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { SpinnerCircleSVG } from './SpinnerCircleSVG';
import { SpinnerContext } from '../context';
import { Status } from '../types';

afterEach(cleanup);

describe('<SpinnerLabel />', () => {
  test('matches styles for specified radius', () => {
    const { container } = render(
      <SpinnerContext.Provider value={{ percentage: 0, radius: 80 }}>
        <SpinnerCircleSVG />
      </SpinnerContext.Provider>
    )

    const svg = container.querySelector('svg');
    const circleBg = container.querySelectorAll('circle')[0];
    const circleLoading = container.querySelectorAll('circle')[1];

    expect(svg).toHaveAttribute('height', '160');
    expect(svg).toHaveAttribute('width', '160');
    expect(svg).toHaveAttribute('viewBox', '0 0 160 160');

    expect(circleBg).toHaveAttribute('r', '75');
    expect(circleBg).toHaveAttribute('cx', '80');
    expect(circleBg).toHaveAttribute('cy', '80');
    expect(circleBg).toHaveAttribute('style', 'stroke-dasharray: 502.6548245743669;');

    expect(circleLoading).toHaveAttribute('r', '75');
    expect(circleLoading).toHaveAttribute('cx', '80');
    expect(circleLoading).toHaveAttribute('cy', '80');
    expect(circleLoading).toHaveAttribute('style', 'stroke-dasharray: 502.6548245743669; stroke-dashoffset: 502.6548245743669; border-radius: 10px;');
  })

  test('matches styles for specified percentage', () => {
    const { container } = render(
      <SpinnerContext.Provider value={{ percentage: 20, radius: 80 }}>
        <SpinnerCircleSVG />
      </SpinnerContext.Provider>
    );

    const circleLoading = container.querySelectorAll('circle')[1];

    expect(circleLoading).toHaveAttribute('style', 'stroke-dasharray: 502.6548245743669; stroke-dashoffset: 402.1238596594935; border-radius: 10px;');
  })

  test('has class anme for rotating state', () => {
    const { container } = render(
      <SpinnerContext.Provider value={{ percentage: 20, radius: 80, status: Status.IN_PROGRESS }}>
        <SpinnerCircleSVG />
      </SpinnerContext.Provider>
    );

    expect(container.querySelector('svg')).toHaveAttribute('class', 'spinner spinner--processing');
  })

  test('has class name for paused state', () => {
    const { container } = render(
      <SpinnerContext.Provider value={{ percentage: 20, radius: 80, status: Status.PAUSED }}>
        <SpinnerCircleSVG />
      </SpinnerContext.Provider>
    );

    expect(container.querySelector('svg')).toHaveAttribute('class', 'spinner spinner--paused');
  })
});
