import type { Transport } from './data/trips';

export type RootStackParamList = {
  Login: undefined;
  Search: { transport: Transport } | undefined;
  Results: { transport: Transport };
  Seats: { transport: Transport };
  Confirmation: { transport: Transport; seat: number };
};
