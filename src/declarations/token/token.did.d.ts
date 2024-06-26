import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'getSymbol' : () => Promise<string>,
  'payOut' : () => Promise<string>,
  'transferAmount' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
