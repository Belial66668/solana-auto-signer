const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json({ limit: '10mb' }));

console.log('🔥 Solana Proxy Service - AJOUT #2 !');

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
    // AJOUT #2 : ENVOI DONNÉES TEST À VERCEL
    // ========================================
    console.log('🎯 Test envoi données à Vercel...');
    
    try {
      const vercelUrl = "https://solana-signer-vercel.vercel.app/api/sign";
      console.log('📡 Envoi données test à Vercel:', vercelUrl);
      
      // Envoi de données de test (pas les vraies données sensibles)
      const testData = {
        transaction: "TEST_TRANSACTION_DATA_AJOUT2",
        privateKey: "TEST_PRIVATE_KEY_AJOUT2",
        metadata: {
          ...metadata,
          testMode: true,
          ajout: "2",
          source: "heroku-proxy-test"
        }
      };
      
      const vercelResponse = await axios.post(vercelUrl, testData, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('✅ Vercel répond, status:', vercelResponse.status);
      console.log('📊 Vercel data:', vercelResponse.data);
      
      const testSignature = "VERCEL_DATA_TEST_" + Date.now();
      
      res.json({
        success: true,
        signature: testSignature,
        explorerUrl: `https://solscan.io/tx/${testSignature}`,
        method: "PROXY_WITH_VERCEL_DATA_TEST",
        message: "✅ Service proxy + Vercel accepte les données !",
        vercelStatus: "Data accepted",
        vercelResponse: {
          status: vercelResponse.status,
          dataReceived: vercelResponse.data
        },
        timestamp: new Date().toISOString(),
        dataReceived: {
          transactionLength: transaction.length,
          hasPrivateKey: !!privateKey,
          metadata: metadata
        }
      });
      
    } catch (vercelError) {
      console.log('⚠️ Vercel erreur données:', vercelError.message);
      
      if (vercelError.response) {
        console.log('📊 Error status:', vercelError.response.status);
        console.log('📋 Error data:', vercelError.response.data);
      }
      
      // Fallback avec plus d'infos
      const fallbackSignature = "VERCEL_DATA_ERROR_" + Date.now();
      
      res.json({
        success: true,
        signature: fallbackSignature,
        explorerUrl: `https://solscan.io/tx/${fallbackSignature}`,
        method: "PROXY_DATA_FALLBACK",
        message: "✅ Service proxy OK - Vercel données en attente",
        vercelStatus: "Data error",
        vercelError: {
          message: vercelError.message,
          status: vercelError.response?.status,
          data: vercelError.response?.data
        },
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
    <h1>🔥 Solana Proxy Service - AJOUT #2</h1>
    <p>✅ Service proxy opérationnel !</p>
    <p>📡 Endpoint: POST /execute-swap</p>
    <p>🔗 URL: ${req.get('host')}</p>
    <p>🕐 ${new Date()}</p>
    <p>🎯 Test envoi données à Vercel intégré</p>
    <p>📊 Mode: Données de test vers Vercel</p>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Service PROXY AJOUT #2 sur le port ${PORT}`);
});
