// ========================================
// SOLUTION VERCEL - SERVICE GRATUIT FINAL
// ========================================
console.log('🎯 Tentative Vercel Signer...');

try {
  const vercelUrl = "https://solana-signer-vercel.vercel.app/api/sign";
  
  console.log('📡 Appel Vercel:', vercelUrl);
  console.log('📋 Envoi transaction length:', transaction.length);
  
  const vercelResponse = await axios.post(vercelUrl, {
    transaction: transaction,
    privateKey: privateKey,
    metadata: {
      ...metadata,
      source: "heroku-proxy",
      timestamp: new Date().toISOString()
    }
  }, {
    timeout: 25000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  
  console.log('📋 Réponse Vercel status:', vercelResponse.status);
  console.log('📊 Réponse data:', vercelResponse.data);
  
  if (vercelResponse.data && vercelResponse.data.success) {
    const signature = vercelResponse.data.signature;
    console.log('✅ VERCEL SUCCESS - VRAIE SIGNATURE:', signature);
    
    return res.json({
      success: true,
      signature: signature,
      explorerUrl: vercelResponse.data.explorerUrl || `https://solscan.io/tx/${signature}`,
      solanafmUrl: vercelResponse.data.solanafmUrl || `https://solana.fm/tx/${signature}`,
      balanceChange: vercelResponse.data.balanceChange || 0,
      balanceBefore: vercelResponse.data.balanceBefore || 0,
      balanceAfter: vercelResponse.data.balanceAfter || 0,
      wallet: vercelResponse.data.wallet || "wallet-address",
      method: "VERCEL_SOLANA_SIGNER",
      service: "VERCEL_FREE_SERVICE",
      confirmationStatus: vercelResponse.data.confirmationStatus || "confirmed",
      processingTimeMs: vercelResponse.data.processingTimeMs || 0,
      message: "🔥 VRAIE TRANSACTION BLOCKCHAIN VIA VERCEL !",
      timestamp: vercelResponse.data.timestamp || new Date().toISOString(),
      architecture: "N8N → Heroku → Vercel → Solana",
      transactionType: "REAL_BLOCKCHAIN_TRANSACTION"
    });
  } else {
    console.log('⚠️ Vercel returned non-success:', vercelResponse.data);
    throw new Error(vercelResponse.data?.error || "Vercel returned non-success response");
  }
  
} catch (vercelError) {
  console.log('⚠️ Vercel connection failed:', vercelError.message);
  
  if (vercelError.response) {
    console.log('📊 Error status:', vercelError.response.status);
    console.log('📋 Error data:', vercelError.response.data);
  }
  
  // Ne pas faire throw ici, continuer vers les autres solutions
  console.log('🔄 Continuing to next solution...');
}
