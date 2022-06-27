const backendUrl = process.env.BACKEND_URL.replace(/"/g, '')
const config = {
  nft_contract_address: process.env.NFT_CONTRACT_ADDRESS.replace(/"/g, ''),
  infura_key: process.env.INFURA_KEY.replace(/"/g, ''),
  filesUrl: backendUrl + '/files/',
  apiUrl: backendUrl + '/api',
  broadcastingAuth: backendUrl + '/api/broadcasting/auth',
  pusher_key: process.env.PUSHER_KEY.replace(/"/g, ''),
  pusher_cluster: process.env.PUSHER_CLUSTER.replace(/"/g, ''),
  pusher_force_tls: process.env.PUSHER_FORCE_TLS.replace(/"/g, '') === 'true',
  pusher_encrypted: process.env.PUSHER_ENCRYPTED.replace(/"/g, '') === 'true'
}

module.exports = config
