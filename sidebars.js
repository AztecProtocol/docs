/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    "intro",
    {
      type: 'category',
      label: 'Aztec 3',
      items: [
        'aztec3/overview',
        'aztec3/history',
        {
          type: 'category',
          label: 'Milestones',
          items: [
            'aztec3/milestones/features-initial-ldt',
            'aztec3/milestones/milestones',
            'aztec3/milestones/milestone1-1', // Consider removing in favour of 'components' (see below), which is an edited version of milestone1-1.
          ]
        },
        {
          type: 'category',
          label: 'Architecture',
          items: [
            'aztec3/architecture/architecture',
            {
              type: 'category',
              label: 'Components',
              items: [
                'aztec3/architecture/components/components',
                'aztec3/architecture/components/acir-simulator',
                'aztec3/architecture/components/archiver',
                'aztec3/architecture/components/aztec-node',
                'aztec3/architecture/components/aztec-rpc',
                'aztec3/architecture/components/barretenberg.js',
                'aztec3/architecture/components/circuits.js',
                'aztec3/architecture/components/circuits',
                'aztec3/architecture/components/end-to-end',
                'aztec3/architecture/components/ethereum.js',
                'aztec3/architecture/components/foundation',
                'aztec3/architecture/components/kernel-prover',
                'aztec3/architecture/components/key-store',
                'aztec3/architecture/components/l1-contracts',
                'aztec3/architecture/components/merkle-tree',
                'aztec3/architecture/components/noir-contracts',
                'aztec3/architecture/components/p2p',
                'aztec3/architecture/components/prover-client',
                'aztec3/architecture/components/sequencer-client',
                'aztec3/architecture/components/world-state',
              ]
            },
          ]
        },
        {
          type: 'category',
          label: 'Protocol',
          items: [
            {
              type: 'category',
              label: 'Trees',
              items: [
                'aztec3/protocol/trees/trees',
                'aztec3/protocol/trees/indexed-merkle-tree',
              ]
            },
            'aztec3/protocol/circuits',
            'aztec3/protocol/contract-creation',
            'aztec3/protocol/notes-and-nullifiers',
            'aztec3/protocol/communication-abstractions',
            'aztec3/protocol/public-functions-vm-architectures'
          ]
        }
      ]
    },
    "noir",
    "aztec-connect-sunset",
    "glossary",
  ],
};

module.exports = sidebars;
