import { ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { crucibleAbi } from '../abi/crucibleAbi';
import { crucibleFactoryAbi } from '../abi/crucibleFactoryAbi';
import { _abi } from '../interfaces/Erc20DetailedFactory';
import { config } from '../config/variables';

export async function getOwnedCrucibles(signer: any, provider: any) {
  const { crucibleFactoryAddress, lpTokenAddress } = config;

  const walletAddress = await signer.getAddress();

  const token = new ethers.Contract(lpTokenAddress, _abi, signer);
  const crucibleFactory = new ethers.Contract(
    crucibleFactoryAddress,
    crucibleFactoryAbi,
    signer
  );
  const filter = crucibleFactory.filters.Transfer(null, walletAddress);
  const crucibleEvents = await crucibleFactory.queryFilter(filter, 0, 'latest');
  const crucibles = crucibleEvents.map(async (data) => {
    let id = (data.args!.tokenId as ethers.BigNumber).toHexString();
    if (id.length < 42) {
      id = '0x' + id.slice(2).padStart(40, '0');
    }
    const crucible = new ethers.Contract(id, crucibleAbi, signer);
    const owner = crucibleFactory.ownerOf(id);
    const balance = token.balanceOf(crucible.address);
    const lockedBalance = crucible.getBalanceLocked(lpTokenAddress);
    const delegatedBalance = await crucible.getBalanceDelegated(
      lpTokenAddress,
      walletAddress
    );
    console.log('Delegated Blanace', formatUnits(delegatedBalance));
    return {
      id,
      balance: await balance,
      lockedBalance: await lockedBalance,
      owner: await owner,
    };
  });
  return (await Promise.all(crucibles)).filter(
    (crucible, index, resolvedCrucibles) =>
      crucible.owner === walletAddress &&
      resolvedCrucibles.slice(0, index).find((c) => c.id === crucible.id) ===
        undefined
  );
}
