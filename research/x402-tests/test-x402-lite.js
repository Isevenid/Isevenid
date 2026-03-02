const express = require('express');
const app = express();

// Middleware Manual x402 (Ultra Light)
app.use('/update-profile', (req, res, next) => {
    // Simulasi: Jika tidak ada header pembayaran, kirim status 402
    if (!req.headers['x-payment-proof']) {
        console.log("🔍 Hunter Insight: Client mencoba akses tanpa bayar. Mengirim 402...");
        
        res.setHeader('Access-Control-Expose-Headers', 'Payment-Required');
        res.setHeader('Payment-Required', 'version=1, method=base-sepolia, amount=1000000, to=0xF12Ad3441679fC684094bF1028B7130CD5dC0ACB');
        
        return res.status(402).json({
            error: "Payment Required",
            message: "Gunakan standar x402 untuk melakukan pembayaran ke Base Sepolia",
            instruction: "Kirim 1 USDC ke address yang tertera di header"
        });
    }
    next();
});

app.post('/update-profile', (req, res) => {
    res.json({ success: true, message: "Profil diperbarui! (Simulasi)" });
});

app.get('/', (req, res) => res.send('Gate Open & Lite x402 Ready'));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`\n🚀 Isevenid Lite Gateway JALAN di port ${PORT}`);
    console.log(`💡 Test akses: curl -i -X POST http://localhost:${PORT}/update-profile`);
});
