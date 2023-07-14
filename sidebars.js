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
    "what-is-aztec",
    {
      label: "Aztec",
      type: "category",
      link: {
        type: "doc",
        id: "aztec/overview",
      },
      items: [
        {
          label: "How it works",
          type: "category",
          items: [
            "aztec/how-it-works/private-smart-contracts",
            "aztec/how-it-works/private-state",
            "aztec/how-it-works/private-public-execution",
            "aztec/how-it-works/l1-l2-messaging", // TODO: move to protocol?
          ],
        },

        {
          label: "Roadmap",
          type: "category",
          items: [
            "aztec/milestones/features-initial-ldt",
            "aztec/milestones/milestones",
            "aztec/milestones/cryptography-roadmap"
          ],
        },

        {
          label: "Developer",
          type: "category",
          items: [
            {
              label: "Dapps",
              type: "category",
              // link: {
              //   type: "doc",
              //   id: "aztec/developer/dapps/building-dapps",
              // },
              items: [
                "aztec/developer/dapps/building-dapps", // TODO
              ],
            },
            {
              label: "Noir Contracts",
              type: "category",
              // link: {
              //   type: "doc",
              //   id: "aztec/developer/noir-contracts/noir-contracts",
              // },
              items: [
                "aztec/developer/noir-contracts/noir-contracts",
                "aztec/developer/noir-contracts/getting-started",
                "aztec/developer/noir-contracts/concepts",
                "aztec/developer/noir-contracts/compiling-contracts",
                "aztec/developer/noir-contracts/testing-contracts",
                "aztec/developer/noir-contracts/errors",
              ],
            },
            {
              label: "Portal Contracts",
              type: "category",
              items: [
                "aztec/developer/portal-contracts/portal-contracts",
              ],
            },
            {
              label: "Sandbox",
              type: "category",
              // link: {
              //   type: "doc",
              //   id: "aztec/developer/sandbox/sandbox",
              // },
              items: [
                "aztec/developer/sandbox/sandbox",
                "aztec/developer/sandbox/components",
              ],
            },
            {
              label: "Wallet Providers",
              type: "category",
              items: [
                "aztec/developer/wallet-providers/building-a-wallet",
                "aztec/developer/wallet-providers/keys",
                "aztec/developer/wallet-providers/account-abstraction",
                "aztec/developer/wallet-providers/writing-an-account-contract",
              ],
            },
          ]
        },

        {
          label: "Protocol",
          type: "category",
          items: [
            {
              label: "Trees",
              type: "category",
              items: [
                "aztec/protocol/trees/trees",
                "aztec/protocol/trees/indexed-merkle-tree",
              ],
            },

            {
              label: "Circuits",
              type: "category",
              // link: {
              //   type: "doc",
              //   id: "aztec/protocol/circuits/circuits",
              // },
              items: [
                "aztec/protocol/circuits/circuits",
                "aztec/protocol/circuits/private-kernel",
                "aztec/protocol/circuits/public-kernel",
                "aztec/protocol/circuits/rollup",
              ],
            },

            "aztec/protocol/contract-creation",
            "aztec/protocol/public-functions-vm-architectures",
          ],
        },
        "aztec/history",
      ],
    },
    "noir",
    
    "aztec-connect-sunset",
    "glossary",
  ],
};

module.exports = sidebars;
