const jwt = require('jsonwebtoken');


/**
 * Reads Identity Access Control Permissions, 
 * based on specific roles or on a permissions object embedded in a JWT
 * or supplied as an independent object.
 * 
 * @class AccessControl
 */
class AccessControl {
  /**
   * Creates an instance of AccessControl.
   * @param {String|Object} token 
   * 
   * @memberof AccessControl
   */
  constructor(token) {
    if (!token) {
      throw new Error('No JWT string passed: A JWT is required');
    }

    this.token = token;
    this.extractPermissions();
  }
  
  /**
   * Extract the role permissions from the JWT
   * or use the already provided role permissions object 
   * in supplied in the constructor token parameter
   * 
   * 
   * @memberof AccessControl
   */
  extractPermissions() {
    let token = this.token;

    /* Decode the JWT if the token parameter is a string 
     * or set permissions directly if the token is an object.
     * If none of the above types were sent, throw an invalid error
     */
    if (typeof token === 'string') {
      try {
        let decoded = jwt.verify(token, 'xperience');
        
        /* Decoded JWT should contain a 'roles' or 'permissions' object in the data object
         * Example:
         * permissions: {
         *  user: ["read", "create", "delete"],
         *  blog: ["create", "delete"],
         *  invoice: ["read", "delete"]
         * }
         */
        this.permissions = decoded.data.permissions || decoded.data.roles
      } catch(e) {
        this.permissions = null;
        console.log(e.toString());
      }
    } else if (typeof token === 'object') {
      this.permissions = token;
    } else {
      throw new Error('Please provide a valid JWT token or permissions object');
    }
  }

  /**
   * Verifies if the account can perform a specified action on a data object
   * it requires a rule in the format `type:action`
   * where type is the data or object on which to check action
   * Ex: type could be `blog`, `invoice`, `post` etc.
   * action is the required action that can be performed on the data or object
   * Ex: action could be `create`, `delete`, `edit`, `update` etc.
   * 
   * @param {string} rule 
   * @returns {bool|error}
   * 
   * @memberof AccessControl
   */
  can(rule) {
    let type = '';
    let action = '';
    if (/[A-Z0-9]:[A-Z0-9]/i.test(rule)) {
      const tokens = rule.split(':');
      type = tokens[0];
      action = tokens[1];
      return this.checkPermission(type, action)
    } else {
      throw new Error('Please provide the rule in the correct format. Rule should be in the format: `type:action` Ex: `Blog:delete` ')
    }
  }

  /**
   * Check the permissions object for permissions
   * 
   * @param {string} type 
   * @param {string} action 
   * @returns 
   * 
   * @memberof AccessControl
   */
  checkPermission(type, action) {
    let permissions = this.permissions;

      if (permissions && permissions[type] && permissions[type].indexOf(action) !== -1) {
        return true;
      }  else {
        return false;
      }
  }
}

module.exports = {
  AccessControl
};