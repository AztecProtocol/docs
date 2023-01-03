---
title: Setup
---
import Image from '@theme/IdealImage';

Setting up the SDK.

<!-- This explainer will frequently reference code snippets from 
[the CLI reference repository](https://github.com/critesjosh/azteccli). You can pull this repo and follow along to run the examples yourself.

If you are building a web app, check out the [create react app reference repo](https://github.com/AztecProtocol/aztec-frontend-boilerplate). -->

The following examples are written in Typescript and assumes users will be creating keys using Metamask in a browser.

## Install

```shell
yarn add @aztec/sdk
```

Once the SDK is installed, import it into your project. Using Typescript is highly recommended.

```ts
import { createAztecSdk } from "@aztec/sdk";
```

## Provider Setup

You need to set up a connection to an Ethereum network and import a private key. Since this is assuming a Nodejs context there is no direct access to an Ethereum wallet.

```ts
import { JsonRpcProvider, AztecSdk, createAztecSdk, WalletProvider } from '@aztec/sdk';
```

```ts title="/src/latest/index.ts"
const ethereumProvider = new JsonRpcProvider(ETHEREUM_HOST);
const walletProvider = new WalletProvider(ethereumProvider);
if (PRIVATE_KEY) {
    walletProvider.addAccount(Buffer.from(PRIVATE_KEY, 'hex'));
}
```

## SDK setup

Once the provider is set up you can create an instance of the Aztec SDK, specifying the rollup host. When working on mainnet fork testnet, the corresponding sequencer endpoint is:

```shell
https://api.aztec.network/aztec-connect-testnet/falafel
```

You can connect to the Aztec sequencer that is connected to Ethereum at:

```shell
https://api.aztec.network/aztec-connect-prod/falafel
```

```ts
const setupSdk = async () => {
    sdk = await createAztecSdk(ethereumProvider, {
        serverUrl: "https://api.aztec.network/aztec-connect-testnet/falafel", // testnet
        memoryDb: true,            // set to false to save data
        minConfirmation: 1,        // ETH block confirmations
    });

    if (PRIVATE_KEY) {
        const keyStore = sdk.createLegacyKeyStore(address, registered);
        const aztecWalletProvider = await sdk.createAztecWalletProvider(keyStore);
        await sdk.addAccount(aztecWalletProvider);
    }

    await sdk.run();
};
```

### Debug

Run `export DEBUG=bb:*` in your terminal before running a Nodejs script to also turn on the debug logs.

## Browser debugging

If you have the `debug` flag set to `bb:*` to log output during development, make sure the browser console log level includes "verbose" to be able to see all of the output.

<Image img={require('/img/browser-dev-log.png')} />

---

You can enable debugging when you create the SDK instance.

```ts
const sdk = await createAztecSdk(ethereumProvider, {
  serverUrl: "https://aztec-connect-testnet-sdk.aztec.network", // mainnet fork testnet
  pollInterval: 1000,
  memoryDb: true,     // set to false to save DB in a project file rather than memory
  debug: "bb:*",
  minConfirmation: 1, // ETH block confirmations
});
```
