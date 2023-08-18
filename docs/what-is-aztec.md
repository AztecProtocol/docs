---
title: What is Aztec?
---

Aztec is a Layer 2 ZK-rollup running on Ethereum, designed to enable programmable privacy. It allows developers to build fully-programable, privacy-preserving smart contracts, with composable call semantics using our ZK-Snark programming language: [Noir](./noir).

**Why?**

Public blockchains utilize peer-to-peer networks and a consensus protocol to establish the correct record of events.
The core unit of intent (a transaction) is a request to update a state, based on the logic of a predefined program.
The blockchain node computes this state update and records it on a shared ledger. The authenticity of the ledger is enforced by other nodes "checking" the work of the current node — only possible if the transactions and their data are public and visible to anyone.

Ethereum is an example of a public blockchain, and enables the processing of transactions with arbitrary, Turing-complete computation.

**Aztec is an encrypted blockchain**, where the core unit of intent is a Zero-Knowledge proof (ZKP), not a transaction request. The ZKP proves the correct execution of a specific transaction and any resultant state update.

Individual transaction proofs are recursively aggregated or "rolled up" using a ZK-rollup construction, used for final verification on Ethereum.

To read more about the network, how it works, and the types of applications that can be built, head to Aztec's Architecture [here](./aztec/overview).
