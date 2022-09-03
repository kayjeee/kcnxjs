/**
 * Created 
 * Created by kagiso eugen sebogodion 22/09/03.
 *
 */

/**
 * @author Kagiso Eugene Sebogodi
 *@Organization chameleon-techie pty
 */
import "next-auth/jwt"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    userRole?: "admin"
  }
}
