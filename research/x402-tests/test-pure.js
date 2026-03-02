const express = require('express');
const app = express();
console.log("--- Mencoba menyalakan server... ---");
app.get('/', (req, res) => res.send('Gate Open'));
app.listen(3001, () => {
    console.log('✅ BERHASIL: Server Pure JS nyala di 3001');
});
