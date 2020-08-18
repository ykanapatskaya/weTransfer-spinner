import { createContext } from 'react';
import { Status, Sizes } from './types';
import { radiusSizes } from './constants';

export interface SpinnerContextProps {
  percentage?: number;
  status?: Status
  size?: Sizes;
  radius?: number;
}

export const SpinnerContext = createContext<SpinnerContextProps>({
  percentage: 0,
  size: Sizes.MEDIUM,
  status: Status.NOT_STARTED,
  radius: radiusSizes[Sizes.MEDIUM],
});
