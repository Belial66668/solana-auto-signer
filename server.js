const express = require('express');
const { Connection } = require('@solana/web3.js');
const app = express();
app.use(express.json({ limit: '10mb' }));

console.log('🔥 Service Stable avec Solana !');
const connection = new Connection('https://api.mainnet-beta.solana.com');
console.log('✅ Connexion Solana initialisée');

app.post('/execute-swap', async (req, res) => {
  try {
    console.log('🚀 Requête de swap reçue !');
    
    const { transaction, privateKey, metadata } = req.body;
    
    console.log('📋 Transaction:', transaction ? `${transaction.substring(0, 50)}...` : 'Manquante');
    console.log('🔑 Private key:', privateKey ? 'Présente' : 'Manquante');
    console.log('📊 Metadata:', JSON.stringify(metadata, null, 2));
    
    if (!transaction || !privateKey) {
      throw new Error('Données manquantes');
    }
    
    const testSignature = "STABLE_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    
    res.json({
      success: true,
      signature: testSignature,
      explorerUrl: `https://solscan.io/tx/${testSignature}`,
      message: "✅ Service stable avec Solana",
      timestamp: new Date().toISOString(),
      dataReceived: {
        transactionLength: transaction ? transaction.length : 0,
        hasPrivateKey: !!privateKey,
        metadata: metadata
      }
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message
    });
  }
});

app.get('/', (req, res) => {
  res.send(`
    <h1>🔥 Service Stable avec Solana</h1>
    <p>✅ Service opérationnel avec import Solana !</p>
    <p>📡 Endpoint: POST /execute-swap</p>
    <p>🕐 ${new Date()}</p>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Service STABLE avec Solana sur le port ${PORT}`);
});
