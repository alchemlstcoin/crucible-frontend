import {
  DiscordIcon,
  EtherscanIcon,
  GithubIcon,
  UniswapIcon,
} from '../components/icons';

export const externalLinks = [
  {
    label: 'Discord',
    icon: <DiscordIcon />,
    href: 'http://discord.alchemist.wtf',
  },
  {
    label: 'Code',
    icon: <GithubIcon />,
    href: 'https://github.com/alchemist-community/alchemist-frontend',
  },
  {
    label: 'Etherscan',
    icon: <EtherscanIcon />,
    href:
      'https://etherscan.io/token/0x88acdd2a6425c3faae4bc9650fd7e27e0bebb7ab',
  },
  {
    label: 'Uniswap',
    icon: <UniswapIcon />,
    href:
      'https://info.uniswap.org/token/0x88acdd2a6425c3faae4bc9650fd7e27e0bebb7ab',
  },
];

export const internalLinks = [
  // {
  //   label: 'Home',
  //   to: '/',
  // },
  {
    label: 'Crucible minting',
    to: '/',
  },
  // {
  //   label: 'FAQs',
  //   to: '/faqs',
  // },
];
