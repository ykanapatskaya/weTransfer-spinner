import { useCallback, useEffect, useRef, useState } from 'react';
import { Status } from '../../components/Spinner';

export const useMimicUploader = (totalSize = 500) => {
  const timerRef = useRef<NodeJS.Timeout>();
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<Status>(Status.NOT_STARTED);
  const percent: number = 2500 / 100;
  const timeout: number = 100;

  const updateProgress = useCallback(() => {
    setProgress(progress => progress + percent);
  }, [progress, setProgress])

  const startUploading = useCallback(() => {
    setStatus(Status.IN_PROGRESS);
    timerRef.current = setInterval(updateProgress, timeout);
  }, [timerRef])

  const stopUploading = useCallback(() => {
    const timeoutId = timerRef.current;
    if (timeoutId) {
      timerRef.current = undefined;
      clearInterval(timeoutId);
      setStatus(Status.PAUSED);
    }
  }, [timerRef])

  const resetUploading = useCallback(() => {
    stopUploading()
    setProgress(0);
    setStatus(Status.NOT_STARTED);
  }, [timerRef])

  useEffect(() => {
    if (progress >= totalSize) {
      stopUploading()
      setProgress(0);
      setStatus(Status.COMPLETED);
    }
  }, [progress])

  return {progress, status, startUploading, stopUploading, resetUploading};
}
