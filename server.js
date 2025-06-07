const express = require('express');
const { Connection, Transaction, Keypair } = require('@solana/web3.js');
const bs58 = require('bs58');

const app = express();
app.use(express.json({ limit: '10mb' }));

// Configuration
const connection = new Connection('https://api.mainnet-beta.solana.com');

console.log('🔥 Service Solana démarré !');

// Endpoint principal
app.post('/execute-swap', async (req, res) => {
  try {
    console.log('🚀 Nouvelle demande de swap !');
    
    const { transaction, privateKey } = req.body;
    
    // Décoder et signer
    const tx = Transaction.from(Buffer.from(transaction, 'base64'));
    const keypair = Keypair.fromSecretKey(bs58.decode(privateKey));
    tx.sign(keypair);
    
    // Envoyer
    const signature = await connection.sendRawTransaction(tx.serialize());
    
    console.log('✅ Succès ! Signature:', signature);
    
    res.json({
      success: true,
      signature: signature,
      explorerUrl: `https://solscan.io/tx/${signature}`
    });
    
  } catch (error) {
    console.log('❌ Erreur:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Page de test
app.get('/', (req, res) => {
  res.send(`
    <h1>🔥 Solana Auto Signer</h1>
    <p>✅ Service fonctionnel !</p>
    <p>📡 Endpoint: POST /execute-swap</p>
    <p>🕐 ${new Date()}</p>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Service démarré sur le port ${PORT}`);
});
