import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { SpinnerContext } from '../Spinner/context';
import { TransferPanel } from './TransferPanel';
import { useMimicUploader } from './useMimicUploader';

jest.mock('./useMimicUploader');

const mockStartUploading = jest.fn();
const mockStopUploading = jest.fn();
const mockResetUploading = jest.fn();
const mockStatus = jest.fn();

mockStatus.mockReturnValueOnce('NOT_STARTED');

beforeAll(() => {
  useMimicUploader.mockReturnValue({
    startUploading: mockStartUploading,
    stopUploading: mockStopUploading,
    resetUploading: mockResetUploading,
    status: 'NOT_STARTED',
  });
});

afterEach(cleanup);

describe('<TransferPanel />', () => {
  test('initial state', () => {
    render(<TransferPanel />)

    expect(screen.getByText('Start Transfering')).toBeInTheDocument();
  });

  test('start button', () => {
    render(<TransferPanel />)

    fireEvent.click(screen.getByText('Start'));

    expect(mockStartUploading).toHaveBeenCalled();
  });

  test('stop button', () => {
    render(<TransferPanel />)

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Stop'));

    expect(mockStartUploading).toHaveBeenCalled();
    expect(mockStopUploading).toHaveBeenCalled();
  })

  test('reset button', () => {
    render(<TransferPanel />)

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Reset'));

    expect(mockStartUploading).toHaveBeenCalled();
    expect(mockResetUploading).toHaveBeenCalled();
  })

  test('transfering state', () => {
    useMimicUploader.mockReturnValue({
      startUploading: mockStartUploading,
      stopUploading: mockStopUploading,
      resetUploading: mockResetUploading,
      status: 'IN_PROGRESS',
    });

    const { container } = render(<TransferPanel />)

    expect(screen.getByText('Transfering...')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  })

  test('completed state', () => {
    useMimicUploader.mockReturnValue({
      startUploading: mockStartUploading,
      stopUploading: mockStopUploading,
      resetUploading: mockResetUploading,
      status: 'COMPLETED',
    });

    const { container } = render(<TransferPanel />)

    expect(screen.getByText('DONE')).toBeInTheDocument();
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  })

  test('paused state', () => {
    useMimicUploader.mockReturnValue({
      startUploading: mockStartUploading,
      stopUploading: mockStopUploading,
      resetUploading: mockResetUploading,
      status: 'PAUSED',
    });

    const { container } = render(<TransferPanel />)

    expect(screen.getByText('Paused')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  })
});
