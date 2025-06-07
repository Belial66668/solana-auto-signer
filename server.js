const express = require('express');
const app = express();
app.use(express.json({ limit: '10mb' }));

console.log('🔥 Service Test démarré !');

// Endpoint de test
app.post('/execute-swap', async (req, res) => {
  try {
    console.log('🚀 Test de swap reçu !');
    
    const { transaction, privateKey } = req.body;
    
    console.log('📋 Transaction reçue:', transaction ? 'OUI' : 'NON');
    console.log('🔑 Private key reçue:', privateKey ? 'OUI' : 'NON');
    
    // Simulation d'un succès
    const fakeSignature = "TEST_" + Date.now();
    
    res.json({
      success: true,
      signature: fakeSignature,
      explorerUrl: `https://solscan.io/tx/${fakeSignature}`,
      message: "Service de test - pas de vraie transaction",
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.log('❌ Erreur:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Page de test
app.get('/', (req, res) => {
  res.send(`
    <h1>🔥 Solana Auto Signer - TEST</h1>
    <p>✅ Service fonctionnel !</p>
    <p>📡 Endpoint: POST /execute-swap</p>
    <p>🔗 URL: ${req.get('host')}</p>
    <p>🕐 ${new Date()}</p>
    <p>⚠️ Mode TEST - Pas de vraies transactions</p>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Service TEST démarré sur le port ${PORT}`);
});
