const express = require('express');
const app = express();
app.use(express.json({ limit: '10mb' }));

console.log('🔥 Service Stable démarré !');

// Endpoint principal
app.post('/execute-swap', async (req, res) => {
  try {
    console.log('🚀 Requête de swap reçue !');
    
    const { transaction, privateKey, metadata } = req.body;
    
    // Log détaillé pour debugging
    console.log('📋 Transaction:', transaction ? `${transaction.substring(0, 50)}...` : 'Manquante');
    console.log('🔑 Private key:', privateKey ? 'Présente' : 'Manquante');
    console.log('📊 Metadata:', JSON.stringify(metadata, null, 2));
    console.log('🕐 Timestamp:', new Date().toISOString());
    
    // Vérification des données
    if (!transaction) {
      throw new Error('Transaction manquante');
    }
    
    if (!privateKey) {
      throw new Error('Private key manquante');
    }
    
    console.log('✅ Toutes les données sont présentes');
    console.log('🎯 Transaction length:', transaction.length);
    console.log('💼 Bot source:', metadata?.bot || 'Unknown');
    
    // Simulation détaillée
    const testSignature = "STABLE_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    
    console.log('🎉 Traitement simulé terminé avec succès');
    console.log('📋 Signature générée:', testSignature);
    
    res.json({
      success: true,
      signature: testSignature,
      explorerUrl: `https://solscan.io/tx/${testSignature}`,
      message: "✅ Service stable - Données reçues et traitées",
      timestamp: new Date().toISOString(),
      dataReceived: {
        transactionLength: transaction ? transaction.length : 0,
        hasPrivateKey: !!privateKey,
        metadata: metadata,
        processingTime: "Instantané"
      },
      nextStep: "Ajouter le vrai code Solana progressivement"
    });
    
  } catch (error) {
    console.error('❌ Erreur traitement:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Page d'accueil
app.get('/', (req, res) => {
  res.send(`
    <h1>🔥 Solana Service - Version Stable</h1>
    <p>✅ Service fonctionnel et stable !</p>
    <p>📡 Endpoint: POST /execute-swap</p>
    <p>🔗 URL: ${req.get('host')}</p>
    <p>🕐 ${new Date()}</p>
    <p>📊 Status: OPÉRATIONNEL</p>
    <p>⚡ Mode: Réception et traitement des données</p>
    <p>🎯 Prêt pour ajout progressif du code Solana</p>
  `);
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Solana Service Stable',
    timestamp: new Date().toISOString(),
    version: '1.0-stable'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Service STABLE démarré sur le port ${PORT}`);
  console.log(`📡 Health: http://localhost:${PORT}/health`);
  console.log(`🔥 Execute: http://localhost:${PORT}/execute-swap`);
  console.log(`✅ SERVICE PRÊT ET STABLE !`);
});
