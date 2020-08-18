import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import { SpinnerLabel } from './SpinnerLabel';
import { SpinnerContext } from '../context';

afterEach(cleanup);

describe('<SpinnerLabel />', () => {
  test('shows passed percentage', () => {
    render(
      <SpinnerContext.Provider value={{ percentage: 20 }}>
        <SpinnerLabel />
      </SpinnerContext.Provider>
    );

    expect(screen.getByText('20')).toBeInTheDocument();
  })
});
