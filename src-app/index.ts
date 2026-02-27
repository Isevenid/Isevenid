import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains';
import * as dotenv from 'dotenv';
import abiData from '../abi.json'; // Pastikan path benar

dotenv.config();

// 1. Setup Akun dari Private Key
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

// 2. Setup Public Client (Untuk Membaca Data)
const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.RPC_URL)
});

// 3. Setup Wallet Client (Untuk Mengirim Transaksi)
const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(process.env.RPC_URL)
});

const contractAddress = '0xF12Ad3441679fC684094bF1028B7130CD5dC0ACB';
const abi = abiData; 

async function payUSDC(recipient: `0x${string}`, amount: bigint) {
  console.log("\n--- Mengirim USDC... ---");
  const usdcAddress = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
  const erc20Abi = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
  try {
    const hash = await walletClient.writeContract({
      address: usdcAddress,
      abi: erc20Abi,
      functionName: "transfer",
      args: [recipient, amount],
    });
    console.log(`Transaksi USDC terkirim! Hash: ${hash}`);
    await publicClient.waitForTransactionReceipt({ hash });
    console.log("Pembayaran USDC berhasil!");
  } catch (error) {
    console.error("Gagal mengirim USDC:", error);
  }
}

async function updateProfile(newName: string, newBio: string, newLink: string) {
  console.log("\n--- Memperbarui Profil... ---");
  try {
    const hash = await walletClient.writeContract({
      address: contractAddress,
      abi: abi,
      functionName: "updateProfile",
      args: [newName, newBio, newLink],
    });
    console.log(`Transaksi terkirim! Hash: ${hash}`);
    await publicClient.waitForTransactionReceipt({ hash });
    console.log("Profil berhasil diperbarui!");
  } catch (error) {
    console.error("Gagal memperbarui profil:", error);
  }
}

async function main() {
  console.log("--- Memeriksa Kontrak Isevenid di Base Sepolia ---");

  try {
    // Membaca Data
    const name = await publicClient.readContract({
      address: contractAddress,
      abi: abi,
      functionName: 'name',
    });

    const bio = await publicClient.readContract({
      address: contractAddress,
      abi: abi,
      functionName: 'bio',
    });

    console.log(`Nama : ${name}`);
    console.log(`Bio  : ${bio}`);
    console.log(`Owner: ${account.address}`);
    await updateProfile("IndraSeven Pro", "Fullstack Web3 Dev", "https://github.com/indraseven");
    // Kirim 1 USDC ke alamat tujuan
    await payUSDC("0x4ad705e8F0a969Ba5eD8ff6E51894bE0F97de6D7", 1000000n);

  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

main();

