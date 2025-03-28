/**
 *
 * @param {string} role - User | Vendor | Admin | Agent role
 */
function getUserModelByRole(role) {
    if (!role) throw new Error("role is undefined");
    let model;
    switch (role) {
      case "member":
        model = "User";
        break;
      case "agent":
        model = "Agent";
        break;
      case "admin":
      case "superAdmin":
        model = "Admin";
        break;
  
      default:
        break;
    }
    return model;
  }
  
  module.exports = getUserModelByRole;
  