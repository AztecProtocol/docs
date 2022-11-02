---
title: Aztec Connector Contracts
---

This guide is intended for readers interested in developing Aztec Connector contracts or learning about them technically, instead of using them.

:::tip

**Connector contracts** and **Bridge contracts** are the same thing and the terms are used interchangeably.

:::

:::note

Aztec Connector contracts used to be called Bridge contracts. The name has been updated to reduce confusion around the contract behavior. The contracts are not bridging between separate blockchains as is often the case when referring to a bridge.

References to bridges have been updated in the documentation and relevant READMEs, but not in the source code.

:::

## What is Aztec Connect

Aztec Connect is a framework that enables users to access protocols on Ethereum Layer 1 (L1) privately, securely and inexpensively. It consists of three main components:

**L1 Protocols:** your favorite protocols already deployed and running on L1, e.g. Lido, Element, Yearn, Uniswap and more.

**Aztec Connector Contracts**: smart contracts on L1 that facilitate the Aztec rollup contract to interact with other L1 Protocols on behalf of L2 Aztec Network users.

**Aztec SDK**: a tool set for developing user-facing applications to interact with the Aztec Network, including APIs for interacting with L1 Protocols using Aztec Connector contracts.

A typical flow of action starts from a user initiating an interaction request through a frontend powered by the Aztec SDK. The request is then passed to the Aztec backend and the corresponding Aztec Connector contract, which interacts with the specific L1 Protocol on behalf of the user.

## What are Aztec Connector Contracts?

Aztec Connector contract are L1 smart contracts that conform L1 Protocols to the interface of the L1 Aztec rollup contract. They enable L2 Aztec users to interact with L1 Protocols cheaply and privately.

A connector contract models any L1 Protocol as an asset swap. Up to two input assets and two output assets can be specified for each connector:

![](https://i.imgur.com/2N4Noha.jpg)

> **Note:** Assets A and B shall be of identical amounts (but not necessarily of identical types) in the current design to avoid free-riders. Further research to lift the limitation is underway.

The asset swap delay depends on whether the connector is designed to be synchronous or asynchronous. For more information on synchronicity, check the [Sync vs Async](#Sync-vs-Async) section.

A high-level look of the Lido-Curve connector that swaps users' ETH into wstETH:

![](https://i.imgur.com/0wtoDKk.jpg)

For more information on how Aztec Connector contracts work, check the workshop video linked at the beginning of this guide and the [Aztec Connect](../how-aztec-works/aztec-connect) section of the Aztec Docs.
    
## Workshop Video

Certain content of this guide is also covered in this workshop video:

[![](https://i.imgur.com/fA8f1Du.jpg)](https://www.youtube.com/watch?v=029Vm6PAnrM&t=1822s)

## Writing a Connector

### Solidity Dev Env
    
An Aztec Connector contract is developed entirely in Solidity. You are therefore welcome to choose your preferred Solidity development environment.
    
We recommend [Foundry](https://book.getfoundry.sh/) given the interconnected nature of Aztec Connector contracts with existing Mainnet protocols.

### Boilerplates
    
To get started with an example setup, follow the steps below:
    
1. Fork the [Aztec Connector contracts repository](https://github.com/AztecProtocol/aztec-connect-bridges).

2. Clone your fork:
    
```shell
git clone https://github.com/{YOUR_GITHUB_USERNAME}/aztec-connect-bridges.git
```

3. Create a new branch with your preferred connector name:
    
```shell
git checkout -b {YOUR_GITHUB_USERNAME}/{CONNECTOR_NAME}
```
    
4. Change directory into `aztec-connect-bridges`:

```shell
cd aztec-connect-bridges
```
    
5. Install dependencies and build the repository:
    
```shell
yarn setup
```

6. Copy and rename the example folders as your boilerplates to work on:

```
src/bridges/example
src/test/example
src/client/example
src/deployment/example
src/specs/TEMPLATE.md
```

You are now equipped to write your first Aztec Connector contract! Simply start by reading and implementing your connector over the boilerplate files.

For more information on how the Aztec rollup contract would call your connector, check [IDeFiBridge.sol](https://github.com/AztecProtocol/aztec-connect-bridges/blob/master/src/aztec/interfaces/IDefiBridge.sol).

### BridgeCallData

In production, a connector is called by a user creating a client-side proof via the Aztec SDK. These transaction proofs are sent to the sequencer for aggregation. The sequencer then sends the aggregate rollup proof with the sum of all users' proofs with identical `BridgeCallData` ([class definition](../sdk/types/bridge-clients/BridgeData)) to your connector contract in one go for gas savings and improved privacy.

A `BridgeCallData` uniquely defines the expected inputs/outputs of an L1 interaction. It is a `uint256` that represents a bit-string containing multiple fields. When unpacked its data is used to create a `BridgeData` struct in the rollup contract.

The structure of the bit-string is as follows (starting at the least significant bit):

| bit position | bit length | definition | description |
| - | - | - | - |
| 0 | 32 | `bridgeAddressId` | id of bridge/connector smart contract address |
| 32 | 30 | `inputAssetA` | asset id of 1st input asset |
| 62 | 30 | `inputAssetB` | asset id of 1st input asset |
| 92 | 30 | `outputAssetA` | asset id of 1st output asset |
| 122 | 30 | `outputAssetB` | asset id of 2nd output asset |
| 184 | 64 | `auxData` | custom auxiliary data for connector-specific logic |

> **Note:** The last 8 bits of the `BridgeCallData` bit-string are wasted as the rollup proving circuits cannot support values of full 256 bits (248 is the largest multiple of 8 that we can use).  
    
`bitConfig` definition:

| bit | meaning |
| - | - |
| 0 | secondInputInUse |
| 1 | secondOutputInUse |

> **Note:** Despite using only 2 bits in the current design, `bitConfig` is 32 bits large for future-proofing (new bit flags would be needed to add e.g.  NFT support).

For more information on bridge call data, check the [Aztec Connector Contracts repository](https://github.com/AztecProtocol/aztec-connect-bridges) README.

### Tests

Testing is critical to ensure your connector is working as intended. Refer to example tests under [`src/test/bridges/example/`](https://github.com/AztecProtocol/aztec-connect-bridges/tree/master/src/test/bridges/example) and other tests under [`src/test/bridges/`](https://github.com/AztecProtocol/aztec-connect-bridges/tree/master/src/test/bridges) for inspirations.

The main objective of unit tests is to demonstrate the connector works by itself. The testing focus is recommended to be on edge cases, reverts, output value assertions and fuzzy tests.

The main objective of end-to-end (E2E) tests, meanwhile, is to demonstrate the connector works in a production-like environment. The testing setup should involve mocking the rollup with [`BridgeTestBase.sol`](https://github.com/AztecProtocol/aztec-connect-bridges/blob/master/src/test/aztec/base/BridgeTestBase.sol) and the focus is recommended to be on event emissions and token transfers.

For example, for Foundry users to test the ExampleUnitTest contract:

```shell
forge test --match-contract ExampleUnitTest -vvv
```

### Deployment

The best way to deploy your connector is through a deployment script with Foundry.

:::info
Read more about Solidity scripting with foundry [here](https://book.getfoundry.sh/tutorials/solidity-scripting).
:::

Refer to [`ExampleDeployment.s.sol`](https://github.com/AztecProtocol/aztec-connect-bridges/tree/master/src/deployment/example) and other scripts under [`src/deployment`](https://github.com/AztecProtocol/aztec-connect-bridges/tree/master/src/deployment) for inspirations.

The following command will run the `deployAndList()` function in `ExampleDeployment.s.sol`. You will need to export a couple of environment variables before running the command.

```shell
export network=testnet # wont work on mainnet, permissionless connector listing not enabled yet
export simulateAdmin=false # to broadcast your deployment to the testnet
```

```shell
forge script --fork-url https://aztec-connect-testnet-eth-host.aztec.network:8545 --private-key $PRIV --legacy --ffi ExampleDeployment --sig "deployAndList()" --broadcast
```

where `$PRIV` is a private key for an Ethereum account on the testnet that has ETH to pay fees.

The bridge id will be printed in the terminal, something similar to:

```
== Logs ==
  simulating: testnet
  Current chain id: 677868
  Rollup at: 0xca41ca7363323d88598c5d0a8de2c02fb13ab772
  Deploying example bridge
  Example bridge deployed to: 0x90c0b9bdcedbac5282451e4d8f8226f6a1bb87cb
  Example bridge address id: 19
```

Some notes on the additional flags in the above command:

- `--ffi` allows us to access stuff outside solidity, so we use it to fetch rollup processor address
- `--sig` is the function signature that we want to call
- `--legacy` is because ganache (which the testnet is running on) and eip1559 don't play well
- `-vvvv` prints trace
- `broadcast` will broadcast the deployment transactions to the testnet (rather than running simulations)

Refer to [this section](https://github.com/AztecProtocol/aztec-connect-bridges#writing-a-bridge) of the connector repo README for more detail.

### Testnet Deployment Info

You can use these commands to get all of assets and connector that the Aztec core team has deployed on the testnet.

```shell
# export env vars
export RPC=https://aztec-connect-testnet-eth-host.aztec.network:8545
export network=testnet
export simulateAdmin=false

# run script
forge script --fork-url $RPC --ffi DataProviderDeployment --sig "readBogota()"
```

### Add Custom Token

To add support for a custom token that is deployed to the testnet, call `function setSupportedAsset(address _token, uint256 _gasLimit) external;` on the rollup contract. The testnet rollup contract address is `0x614957a8ae7b87f18fa3f207b6619c520a022b4f`.

:::note
Permissionless token listing to mainnet is not yet supported. This only works for the testnet.
:::

To do this:

1. Import the [IRollupProcessor.sol](https://github.com/AztecProtocol/aztec-connect/blob/master/blockchain/contracts/interfaces/IRollupProcessor.sol) contract into [Remix](https://remix.ethereum.org)
2. Compile IRollupProcessor.sol
3. [Connect Metamask to the testnet](./getting-started.md#testnet-information)
4. Connect Remix and Metamask
5. Create an instance of IRollupProcessor.sol at address `0x614957a8ae7b87f18fa3f207b6619c520a022b4f`
6. Call `setSupportedAsset()` with your token address and `200000` for the `_gasLimit`. The `_gasLimit` tells the Aztec client how much gas token transfers use. 200,000 is an overestimate that is fine for testnet transactions, but you should test your token for more precise gas usage before deploying to mainnet.

To get the assets that Aztec supports, call `IRollupProcessor.getSupportedAssets()`. This will return two arrays, an array of token addresses and an array of gas limits.

### Aux Data

The `auxData` field in the connector call data is custom auxiliary data supporting bridge-specific logic.

To benefit from the gas savings and improved privacy of aggregated proofs with identical `bridgeCallData`, the definition of `auxData` of a connector could be an important consideration during its design process.
    
### Rebasing Token

Tokens bridged onto the Aztec Network are represented as Aztec notes of fixed values. Bridging rebasing tokens like Lido stETH and Ampleforth naively without wrappers would result in users losing out on entitled rewards and suffering from insolvent withdrawals.

The use of a canonical wrapper like Lido wstETH / a self-built wrapper to anchor the amounts of bridged assets is therefore highly recommended.

### Sync vs Async

Depending on the application, Aztec Connect interactions that require 2-step processes can utilize the asynchronous option by flipping the `isAsync` flag during connector design.

An example of an asynchronous connector would be [Element's](https://github.com/AztecProtocol/aztec-connect-bridges/blob/master/src/bridges/element/ElementBridge.sol), where redemptions are activated no earlier than the maturity of deposits.

### Stateful vs Stateless

Another consideration when designing an Aztec Connector contract is to decide if it should hold state within the contract.

For interactions involving fungible positions (e.g. token swaps), a stateless connector that does not hold funds outside calls is likely preferred for the generally smaller code base.

For interactions involving long-standing non-fungible positions (e.g. borrowing, DCA, limit orders), a stateful connector that handles accounting internally and holds funds between calls is likely required.

### Gas Limit

As a measure to avoid the entire Aztec rollup failing from out-of-gas issues, connectors are required to specify their upper gas usage limit when registering on the Aztec rollup.

Connector contract designers should take variations in gas usage that depend on alterable L1 state into account when deciding their gas limits.

### Connector contract Reverts

When a connector reverts, the Aztec rollup will emit an event indicating that the connector has reverted, and then continue with Aztec Connect interactions of other remaining connectors.

This could lead to tricky debugging if E2E tests are carried out as the first tests post-design, as revert messages are only discoverable in emitted events.

### ERC-4626

An [ERC-4626 Aztec Connector Contract](https://github.com/AztecProtocol/aztec-connect-bridges/blob/master/src/bridges/erc4626/ERC4626Bridge.sol) that supports tokenized vaults complying with the [EIP-4626 standard](https://eips.ethereum.org/EIPS/eip-4626) is available. If an Aztec Connect interaction can conform to an ERC-4626 position, it may be desirable to utilize the existing connector instead of building a new one.

## Resources

### [📝 Aztec Connector Contract Repo](https://github.com/AztecProtocol/aztec-connect-bridges/)

The repository containing code of Aztec Connector contracts deployed and in development, as well as boilerplates and information for writing a new connector.

### [👾 Discord](https://discord.gg/aztec)

Join the channels:

- [`#💻│aztec-connect`](https://discord.com/channels/563037431604183070/563038059826774017) to discuss Aztec Connect
- [`#🇨🇴│ethbogota`](https://discord.com/channels/563037431604183070/1021410163221086268) to discuss the ETHBogota Hackathon
