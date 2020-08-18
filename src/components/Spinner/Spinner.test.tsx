import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import { Sizes } from './types';
import { Spinner } from './Spinner';

afterEach(cleanup);

describe('<Spinner />', () => {
  test('default size', () => {
    render(<Spinner />)

    expect(screen.getByTestId('spinner')).toHaveAttribute('style', 'width: 160px; height: 160px;');
  });

  test('small size', () => {
    render(<Spinner size={Sizes.SMALL} />)

    expect(screen.getByTestId('spinner')).toHaveAttribute('style', 'width: 100px; height: 100px;');
  })
});
