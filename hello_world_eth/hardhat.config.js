/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-etherscan')

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: '0.7.3',
  defaultNetwork: 'ropsten',
  networks: {
    hardhat: {},
    ropsten: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: 'YVH97MACFV3YNV1HS34QHQ9RQ48DTBHEWB',
  },
}
