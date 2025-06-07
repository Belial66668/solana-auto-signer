const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json({ limit: '10mb' }));

console.log('🔥 Solana Proxy Service - RESTAURÉ !');

app.post('/execute-swap', async (req, res) => {
  try {
    console.log('🚀 Requête swap via PROXY...');
    
    const { transaction, privateKey, metadata } = req.body;
    
    if (!transaction || !privateKey) {
      throw new Error('Données manquantes');
    }
    
    console.log('📋 Transaction length:', transaction.length);
    console.log('🔑 Private key: Présente');
    console.log('🤖 Bot:', metadata?.bot);
    
    // Test Vercel simple
    const testSignature = "VERCEL_TEST_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    
    res.json({
      success: true,
      signature: testSignature,
      explorerUrl: `https://solscan.io/tx/${testSignature}`,
      method: "PROXY_STABLE",
      message: "✅ Service proxy restauré - Test Vercel prêt",
      timestamp: new Date().toISOString(),
      dataReceived: {
        transactionLength: transaction.length,
        hasPrivateKey: !!privateKey,
        metadata: metadata
      }
    });
    
  } catch (error) {
    console.error('❌ Erreur proxy:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.get('/', (req, res) => {
  res.send(`
    <h1>🔥 Solana Proxy Service - RESTAURÉ</h1>
    <p>✅ Service proxy opérationnel !</p>
    <p>📡 Endpoint: POST /execute-swap</p>
    <p>🔗 URL: ${req.get('host')}</p>
    <p>🕐 ${new Date()}</p>
    <p>⚡ Prêt pour intégration Vercel</p>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Service PROXY RESTAURÉ sur le port ${PORT}`);
});
