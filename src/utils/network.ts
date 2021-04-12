export enum Network {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  xDAI = 100,
}

export function networkName(networkId: Network) {
  switch (Number(networkId)) {
    case 1:
      return 'main';
    case 3:
      return 'ropsten';
    case 4:
      return 'rinkeby';
    case 5:
      return 'goerli';
    case 6:
      return 'kotti';
    case 42:
      return 'kovan';
    default:
      return 'localhost';
  }
}
