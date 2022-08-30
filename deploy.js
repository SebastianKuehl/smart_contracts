const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
    // the url is provided by Ganache and can be found in the "RPC Server" field
    const provider = new ethers.providers.JsonRpcProvider(
        "HTTP://127.0.0.1:7545"
    );
    const wallet = new ethers.Wallet(
        "aa6aa43040d908165dd07aaedda39470afe9b021b8c219ae5b3caf0af87ec8dc",
        provider
    );
    const abi = fs.readFileSync(
        "./build/contracts_SimpleStorage_sol_SimpleStorage.abi",
        "utf8"
    );
    const binary = fs.readFileSync(
        "./build/contracts_SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    );
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait...");
    const contract = await contractFactory.deploy();
    const oneBlock = 1;
    const deploymentReceipt = await contract.deployTransaction.wait(oneBlock);
    console.log(deploymentReceipt);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });