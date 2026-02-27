// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Test} from "forge-std/Test.sol";
import {Isevenid} from "../src/Isevenid.sol";

contract IsevenidTest is Test {
    Isevenid public isevenidProfile;
    address public hacker = address(0x1); // Alamat untuk simulasi hacker

    function setUp() public {
        // Deploy kontrak dengan data awal
        isevenidProfile = new Isevenid("IndraSeven", "Web3 Developer", "github.com/Isevenid");
    }

    // Menggunakan 'view' untuk menghindari warning (optimasi)
    function testProfileInitialization() public view {
        assertEq(isevenidProfile.name(), "IndraSeven");
        assertEq(isevenidProfile.bio(), "Web3 Developer");
        assertEq(isevenidProfile.portfolioLink(), "github.com/Isevenid");
        assertEq(isevenidProfile.owner(), address(this));
    }

    function testUpdateProfileAsOwner() public {
        isevenidProfile.updateProfile("Indra", "Senior Web3 Developer", "github.com/Isevenid");
        assertEq(isevenidProfile.name(), "Indra");
        assertEq(isevenidProfile.bio(), "Senior Web3 Developer");
    }

    // Tes keamanan: Pastikan hanya pemilik yang bisa update
    function testUpdateProfileNotOwner() public {
        // Berpura-pura menjadi hacker
        vm.prank(hacker);
        vm.expectRevert("Hanya pemilik yang dapat mengupdate profil");

        // Ini seharusnya gagal karena hacker bukan pemilik
        isevenidProfile.updateProfile("Hacked", "Hacked Bio", "hacked.com");
    }
}

