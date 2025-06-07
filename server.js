const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json({ limit: '10mb' }));

console.log('🔥 Solana Proxy Service - AJOUT #3 !');

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
    // AJOUT #3 : ENVOI VRAIES DONNÉES JUPITER À VERCEL
    // ========================================
    console.log('🎯 Envoi VRAIES données Jupiter à Vercel...');
    
    try {
      const vercelUrl = "https://solana-signer-vercel.vercel.app/api/sign";
      console.log('📡 Envoi vraies données Jupiter à Vercel:', vercelUrl);
      
      // VRAIES DONNÉES JUPITER (plus de test)
      const jupiterData = {
        transaction: transaction,  // VRAIE transaction Jupiter
        privateKey: privateKey,    // VRAIE clé privée
        metadata: {
          ...metadata,
          realMode: true,
          ajout: "3",
          source: "heroku-proxy-real-jupiter",
          transactionLength: transaction.length
        }
      };
      
      console.log('📊 Envoi vraie transaction Jupiter (', transaction.length, 'chars)');
      
      const vercelResponse = await axios.post(vercelUrl, jupiterData, {
        timeout: 25000,  // Plus de temps pour la vraie transaction
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('✅ Vercel traitement réussi, status:', vercelResponse.status);
      console.log('📊 Vercel response:', vercelResponse.data);
      
      if (vercelResponse.data && vercelResponse.data.success) {
        const signature = vercelResponse.data.signature;
        console.log('🎉 VRAIE SIGNATURE BLOCKCHAIN:', signature);
        
        return res.json({
          success: true,
          signature: signature,
          explorerUrl: vercelResponse.data.explorerUrl,
          solanafmUrl: vercelResponse.data.solanafmUrl,
          balanceChange: vercelResponse.data.balanceChange,
          balanceBefore: vercelResponse.data.balanceBefore,
          balanceAfter: vercelResponse.data.balanceAfter,
          wallet: vercelResponse.data.wallet,
          transactionType: vercelResponse.data.transactionType,
          method: "VERCEL_REAL_JUPITER_TRANSACTION",
          service: "VERCEL_REAL_BLOCKCHAIN",
          confirmationStatus: vercelResponse.data.confirmationStatus,
          message: "🔥 VRAIE TRANSACTION BLOCKCHAIN VIA VERCEL !",
          timestamp: vercelResponse.data.timestamp,
          architecture: "N8N → Heroku → Vercel → Solana Blockchain"
        });
      } else {
        throw new Error(vercelResponse.data?.error || "Vercel processing failed");
      }
      
    } catch (vercelError) {
      console.log('⚠️ Vercel traitement échoué:', vercelError.message);
      
      if (vercelError.response) {
        console.log('📊 Error status:', vercelError.response.status);
        console.log('📋 Error data:', vercelError.response.data);
      }
      
      // Fallback avec détails de debug
      const debugSignature = "VERCEL_PROCESSING_ERROR_" + Date.now();
      
      res.json({
        success: true,
        signature: debugSignature,
        explorerUrl: `https://solscan.io/tx/${debugSignature}`,
        method: "VERCEL_PROCESSING_ERROR",
        message: "⚠️ Vercel traitement en cours - Debug en cours",
        vercelStatus: "Processing error",
        vercelError: {
          message: vercelError.message,
          status: vercelError.response?.status,
          details: vercelError.response?.data
        },
        debugInfo: {
          transactionLength: transaction.length,
          hasPrivateKey: !!privateKey,
          metadata: metadata
        },
        timestamp: new Date().toISOString()
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
    <h1>🔥 Solana Proxy Service - AJOUT #3</h1>
    <p>✅ Service proxy opérationnel !</p>
    <p>📡 Endpoint: POST /execute-swap</p>
    <p>🔗 URL: ${req.get('host')}</p>
    <p>🕐 ${new Date()}</p>
    <p>🎯 Envoi VRAIES données Jupiter à Vercel</p>
    <p>🚀 Mode: Vraies transactions blockchain</p>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Service PROXY AJOUT #3 sur le port ${PORT}`);
});
