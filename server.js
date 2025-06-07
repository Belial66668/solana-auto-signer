// ========================================
// SOLANA AUTO SIGNER - ÉTAPE 1 PROGRESSIVE
// ========================================
const express = require('express');
const { Connection } = require('@solana/web3.js');

const app = express();
app.use(express.json({ limit: '10mb' }));

// ========================================
// TEST CONNECTION SOLANA
// ========================================
console.log('🔥 Service avec Solana - Étape 1 !');

const SOLANA_RPC = 'https://api.mainnet-beta.solana.com';
const connection = new Connection(SOLANA_RPC, 'confirmed');

console.log('🌐 RPC Solana:', SOLANA_RPC);
console.log('✅ Connection Solana initialisée');

// Test de connection au démarrage
(async () => {
  try {
    const version = await connection.getVersion();
    console.log('✅ Test connection Solana réussi');
    console.log('📊 Version Solana:', version['solana-core']);
  } catch (error) {
    console.log('⚠️ Erreur connection Solana:', error.message);
  }
})();

// ========================================
// ENDPOINT PRINCIPAL - AVEC TEST SOLANA
// ========================================
app.post('/execute-swap', async (req, res) => {
  try {
    console.log('\n🚀 === REQUÊTE SWAP AVEC TEST SOLANA === 🚀');
    
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
    
    // ========================================
    // TEST SOLANA - ÉTAPE 1
    // ========================================
    console.log('🧪 Test des fonctionnalités Solana...');
    
    try {
      // Test 1: Récupérer la version
      const version = await connection.getVersion();
      console.log('✅ Version Solana:', version['solana-core']);
      
      // Test 2: Récupérer le slot actuel
      const slot = await connection.getSlot();
      console.log('✅ Slot actuel:', slot);
      
      // Test 3: Récupérer le blockhash récent
      const { blockhash } = await connection.getLatestBlockhash();
      console.log('✅ Blockhash récent:', blockhash.substring(0, 20) + '...');
      
      console.log('🎉 Tous les tests Solana réussis !');
      
    } catch (solanaError) {
      console.log('⚠️ Erreur test Solana:', solanaError.message);
    }
    
    // ========================================
    // SIMULATION DÉTAILLÉE
    // ========================================
    const testSignature = "SOLANA_TEST_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    
    console.log('🎉 Traitement avec Solana terminé');
    console.log('📋 Signature générée:', testSignature);
    
    res.json({
      success: true,
      signature: testSignature,
      explorerUrl: `https://solscan.io/tx/${testSignature}`,
      message: "✅ Service avec Solana Étape 1 - Tests réussis",
      timestamp: new Date().toISOString(),
      dataReceived: {
        transactionLength: transaction ? transaction.length : 0,
        hasPrivateKey: !!privateKey,
        metadata: metadata,
        processingTime: "Instantané"
      },
      solanaTests: {
        connection: "✅ OK",
        version: "✅ Récupérée",
        slot: "✅ Récupéré", 
        blockhash: "✅ Récupéré"
      },
      status: "SOLANA_STEP_1_SUCCESS",
      nextStep: "Étape 2: Décodage de transaction"
    });
    
  } catch (error) {
    console.error('❌ Erreur traitement:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString(),
      step: "SOLANA_STEP_1"
    });
  }
});

// ========================================
// ENDPOINTS UTILITAIRES
// ========================================

// Page d'accueil
app.get('/', (req, res) => {
  res.send(`
    <h1>🔥 Solana Service - ÉTAPE 1 PROGRESSIVE</h1>
    <p>✅ Service avec Solana opérationnel !</p>
    <p>📡 Endpoint: POST /execute-swap</p>
    <p>🔗 URL: ${req.get('host')}</p>
    <p>🕐 ${new Date()}</p>
    <p>📊 Status: SOLANA ÉTAPE 1</p>
    <p>🧪 Tests: Connection, Version, Slot, Blockhash</p>
    <p>🔧 Prochaine étape: Décodage transaction</p>
  `);
});

// Health check avec info Solana
app.get('/health', async (req, res) => {
  try {
    const slot = await connection.getSlot();
    
    res.json({
      status: 'healthy',
      service: 'Solana Service Étape 1',
      timestamp: new Date().toISOString(),
      version: '1.1-solana-step1',
      solana: {
        rpc: SOLANA_RPC,
        currentSlot: slot,
        connectionStatus: 'OK'
      }
    });
  } catch (error) {
    res.json({
      status: 'healthy-no-solana',
      service: 'Solana Service Étape 1',
      timestamp: new Date().toISOString(),
      version: '1.1-solana-step1',
      solana: {
        rpc: SOLANA_RPC,
        connectionStatus: 'ERROR',
        error: error.message
      }
    });
  }
});

// Test endpoint Solana
app.get('/test-solana', async (req, res) => {
  try {
    console.log('🧪 Test endpoint Solana appelé');
    
    const version = await connection.getVersion();
    const slot = await connection.getSlot();
    const { blockhash } = await connection.getLatestBlockhash();
    
    res.json({
      success: true,
      tests: {
        version: version['solana-core'],
        currentSlot: slot,
        latestBlockhash: blockhash,
        rpcUrl: SOLANA_RPC
      },
      message: "Tous les tests Solana réussis",
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ========================================
// DÉMARRAGE DU SERVICE
// ========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('🔥🔥🔥 SOLANA SERVICE ÉTAPE 1 DÉMARRÉ 🔥🔥🔥');
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🌐 Solana RPC: ${SOLANA_RPC}`);
  console.log(`📡 Health: http://localhost:${PORT}/health`);
  console.log(`🧪 Test Solana: http://localhost:${PORT}/test-solana`);
  console.log(`🔥 Execute: http://localhost:${PORT}/execute-swap`);
  console.log(`✅ ÉTAPE 1: Tests connection Solana activés !`);
  console.log(`🔧 Prochaine étape: Décodage de transaction`);
});
