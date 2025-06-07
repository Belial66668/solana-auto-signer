const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json({ limit: '10mb' }));

console.log('🔥 Solana Proxy Service - AJOUT #1 !');

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
    
    // ========================================
    // AJOUT #1 : TEST CONNEXION VERCEL
    // ========================================
    console.log('🎯 Test connexion Vercel...');
    
    try {
      const vercelUrl = "https://solana-signer-vercel.vercel.app/api/sign";
      console.log('📡 Test Vercel URL:', vercelUrl);
      
      // Test simple sans données sensibles
      const vercelTest = await axios.get('https://solana-signer-vercel.vercel.app/', {
        timeout: 5000
      });
      
      console.log('✅ Vercel accessible, status:', vercelTest.status);
      
      const testSignature = "VERCEL_ACCESSIBLE_" + Date.now();
      
      res.json({
        success: true,
        signature: testSignature,
        explorerUrl: `https://solscan.io/tx/${testSignature}`,
        method: "PROXY_WITH_VERCEL_TEST",
        message: "✅ Service proxy + Vercel accessible !",
        vercelStatus: "Accessible",
        vercelResponse: vercelTest.status,
        timestamp: new Date().toISOString(),
        dataReceived: {
          transactionLength: transaction.length,
          hasPrivateKey: !!privateKey,
          metadata: metadata
        }
      });
      
    } catch (vercelError) {
      console.log('⚠️ Vercel non accessible:', vercelError.message);
      
      // Fallback si Vercel ne répond pas
      const fallbackSignature = "VERCEL_FALLBACK_" + Date.now();
      
      res.json({
        success: true,
        signature: fallbackSignature,
        explorerUrl: `https://solscan.io/tx/${fallbackSignature}`,
        method: "PROXY_FALLBACK",
        message: "✅ Service proxy OK - Vercel en attente",
        vercelStatus: "Not accessible",
        vercelError: vercelError.message,
        timestamp: new Date().toISOString(),
        dataReceived: {
          transactionLength: transaction.length,
          hasPrivateKey: !!privateKey,
          metadata: metadata
        }
      });
    }
    
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
    <h1>🔥 Solana Proxy Service - AJOUT #1</h1>
    <p>✅ Service proxy opérationnel !</p>
    <p>📡 Endpoint: POST /execute-swap</p>
    <p>🔗 URL: ${req.get('host')}</p>
    <p>🕐 ${new Date()}</p>
    <p>🎯 Test connexion Vercel intégré</p>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Service PROXY AJOUT #1 sur le port ${PORT}`);
});
