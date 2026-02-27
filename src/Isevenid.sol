// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract Isevenid {
    // Menyimpan nama profil
    string public name;
    // Menyimpan bio singkat
    string public bio;
    // Menyimpan link GitHub atau portofolio
    string public portfolioLink;
    // Menyimpan alamat wallet pemilik profil
    address public owner;

    // Event untuk melacak perubahan profil
    event ProfileUpdated(string newName, string newBio);

    constructor(string memory _name, string memory _bio, string memory _portfolioLink) {
        name = _name;
        bio = _bio;
        portfolioLink = _portfolioLink;
        owner = msg.sender; // Pembuat kontrak adalah pemilik
    }

    // Fungsi untuk memperbarui profil (hanya pemilik)
    function updateProfile(string memory _newName, string memory _newBio, string memory _newPortfolioLink) public {
        require(msg.sender == owner, "Hanya pemilik yang dapat mengupdate profil");

        name = _newName;
        bio = _newBio;
        portfolioLink = _newPortfolioLink;

        emit ProfileUpdated(_newName, _newBio);
    }
}

