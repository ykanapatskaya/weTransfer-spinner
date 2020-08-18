import React from 'react';
import { act, cleanup, renderHook } from '@testing-library/react-hooks';

import { useMimicUploader } from './useMimicUploader';

afterEach(cleanup);

describe('useMimicUploader', () => {
  test('uploading is in progress being paused, reset', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useMimicUploader(2500));

    expect(result.current.status).toEqual('NOT_STARTED');
    expect(result.current.progress).toEqual(0);

    act(() => {
      result.current.startUploading();
    });

    jest.advanceTimersByTime(1000);

    expect(result.current.status).toEqual('IN_PROGRESS');
    expect(result.current.progress).toEqual(250);

    jest.advanceTimersByTime(1000);

    act(() => {
      result.current.stopUploading();
    });

    expect(result.current.status).toEqual('PAUSED');
    expect(result.current.progress).toEqual(500);

    act(() => {
      result.current.resetUploading();
    });

    expect(result.current.status).toEqual('NOT_STARTED');
    expect(result.current.progress).toEqual(0);

    jest.useRealTimers();
  });

  test('uploading is completed', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useMimicUploader(2500));

    expect(result.current.status).toEqual('NOT_STARTED');
    expect(result.current.progress).toEqual(0);

    act(() => {
      result.current.startUploading();
    });

    jest.advanceTimersByTime(15000);

    expect(result.current.status).toEqual('COMPLETED');

    jest.useRealTimers();
  });
})
