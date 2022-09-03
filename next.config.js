/**
 * Created 
 * Created by kagiso eugen sebogodion 22/09/03.
 *
 */

/**
 * @author Kagiso Eugene Sebogodi
 *@Organization chameleon-techie pty
 */
module.exports = {
  async rewrites() {
    return [
     
     
      // Rewriting to an external URL
      {
        source: '/allUsers',
        destination: 'http://localhost:9000/allUsers',
      },
      {
        source: '/pagination/:indelast*/:indefirst*',
        destination:'http://localhost:9000/pagination/:indefirst*/:indelast*',
      },
    ]
  },
}
