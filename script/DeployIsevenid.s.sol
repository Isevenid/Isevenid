// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Script} from "forge-std/Script.sol";
import {Isevenid} from "../src/Isevenid.sol";

contract DeployIsevenid is Script {
    function run() external {
        // Mengambil private key dari file .env secara aman
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Memulai sesi broadcast (pengiriman transaksi)
        vm.startBroadcast(deployerPrivateKey);

        // --- Deploy Kontrak ---
        // Isi dengan data awal profil Anda
        new Isevenid("IndraSeven", "Web3 Developer", "github.com/Isevenid");

        // Mengakhiri sesi broadcast
        vm.stopBroadcast();
    }
}

