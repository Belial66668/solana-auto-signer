// ========================================
// SOLUTION 2: RPC DIRECT AVEC RETRY
// ========================================
console.log('🎯 Tentative RPC Direct avec retry...');

const rpcEndpoints = [
  'https://api.mainnet-beta.solana.com',
  'https://solana-api.projectserum.com',
  'https://rpc.ankr.com/solana'
];

for (const rpcUrl of rpcEndpoints) {
  try {
    console.log('🔄 Test RPC:', rpcUrl);
    
    const rpcResponse = await axios.post(rpcUrl, {
      jsonrpc: "2.0",
      id: 1,
      method: "sendTransaction", 
      params: [
        transaction,
        {
          encoding: "base64",
          skipPreflight: false,
          preflightCommitment: "processed"
        }
      ]
    }, {
      timeout: 10000
    });
    
    if (rpcResponse.data.result) {
      const signature = rpcResponse.data.result;
      console.log('✅ RPC SUCCESS:', signature);
      
      return res.json({
        success: true,
        signature: signature,
        explorerUrl: `https://solscan.io/tx/${signature}`,
        method: "SOLANA_RPC_DIRECT",
        rpcUsed: rpcUrl,
        message: "🔥 VRAIE TRANSACTION VIA RPC !"
      });
    }
  } catch (rpcError) {
    console.log('⚠️ RPC failed:', rpcUrl, rpcError.message);
  }
}
