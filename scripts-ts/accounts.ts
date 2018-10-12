import BigNumber from "bignumber.js";

interface Account {
    address: string;
    secretKey: string;
    balance: string;
}

const basicEtherAmount = (new BigNumber("1000000000000000000000000000")).toString(16);

export const accounts: Account[] = [
    {
        address: "0x178b58a0c8db52dfc6190a4d23a6552b45057f80",
        secretKey: "0x340e383de49af0dfaf69349eb1b9f73d055d7ae559826183bb1d2d893908d8b8",
        balance: basicEtherAmount
    },
    {
        address: "0x92c4ab274d81ce1c4743c4916d750ac7a7aa6b07",
        secretKey: "0x2ed950bc0ff7fc1f62aa3b302437de9763d81dcde4ce58291756f84748d98ce9",
        balance: basicEtherAmount
    },
    {
        address: "0x481d5534c2f720e7e60b1405ccdb7fde894340c0",
        secretKey: "0xdaeb307eb13b4717d01d9f175ea3ed94374da8fefa52082379d2955579ce628a",
        balance: basicEtherAmount
    },
    {
        address: "0xf307421120b2432dddaee46bebceb4b084d259e6",
        secretKey: "0xce4b3dadb2e8e12032f27369e5ad4b04bb26d8ca0c468d2059ddf8c0491e2a63",
        balance: basicEtherAmount
    },
    {
        address: "0x6e96f05314dd5cd8673cfdea3cd7ed5338ec6921",
        secretKey: "0x756d8252500ae27255a4e822b4fadd9b8f7b4d16495dfe05af990f533baa9969",
        balance: basicEtherAmount
    },
    {
        address: "0xb9f574c327ff6a4faba76a3d5fec06937151f74c",
        secretKey: "0x34da9c7053c4eb0ed869ac6773f8dfe9964e3a0140a42da2c55fa4a55f975e9f",
        balance: basicEtherAmount
    },
    {
        address: "0x4713688a9706853b9dc6f2c2c36165aa4e4e24a0",
        secretKey: "0x46e5df8a291ff9112503a1007b0288f44132e4542397b4ca6415094393ef7cb9",
        balance: basicEtherAmount
    },
    {
        address: "0xc65f73f89bd9544cea6b20383e6c8cd3c48517e8",
        secretKey: "0x1e3816bb73ad4a70ea3e7606f930e2d2d492ab9d5c26776656191b1be2ae0204",
        balance: basicEtherAmount
    },
    {
        address: "0x3a72e9726ae14f3d76fb3b085a64904eb1ddfa77",
        secretKey: "0x3822d9785cb9d7d26ff5535ae455010e4520854729267fcde16676a540af85ae",
        balance: basicEtherAmount
    },
    {
        address: "0x9598e13b24f6827c5d4d31eaecb7effcd97c82c8",
        secretKey: "0x18c6db900c2d83112786a47d981dcac1311fbb8a96d6a850f2d095aa423d3f85",
        balance: basicEtherAmount
    },
];

/**
 * Finds presetup Account by provided address
 * @param address account address
 */
export function findAccount(address: string): Account | never {
    const found = accounts.find(a => a.address === address);
    if (found === undefined) {
        throw new Error(`Cannot find pre-defined account with address ${address}`);
    }
    return found;
}
