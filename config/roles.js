const userRolesAndRights = {
    member: ["getProducts", "getCategories", "getOrders", "createOrders","manageOrders","deleteAccount"],
    user: ["getProducts", "getCategories", "getOrders", "createOrders","manageOrders"],
  
    
  };
  
  const agentRolesAndRights = {
    agent: [
      "getProfile",
      "updateProfile",
      "getOrders", // If agents handle orders in some capacity
      "manageSales", // Assuming agents can manage their sales records
      "viewRewards", // Assuming agents can view their rewards or points
      "manageAgents",
      "manageCoupons",
      "agent",
      // Add any other rights specific to agents here
    ],
  };
  const adminRolesAndRights = {
    admin: [
      "getUsers",
      "manageUsers",
      "getProducts",
      "getCategories",
      "getOrders",
      "manageOrders",
      "getReturn",
      "manageCategories",
      "setVerified",
      "manageProducts", //for accessing products related to a specific vendor
      "createCoupon", //for creating a new coupon for a specific
      "createAgent",
      "manageAgents", //admin can create a agent
      "getAgents",
      "deleteAccount",
      "manageReturn", 
      "manageTheme",
      "manageVendor"
    ],
  };
  const userRoles = Object.keys(userRolesAndRights);
  const userRights = new Map(Object.entries(userRolesAndRights));
  
  const adminRoles = Object.keys(adminRolesAndRights);
  const adminRights = new Map(Object.entries(adminRolesAndRights));
  
  const agentRoles = Object.keys(agentRolesAndRights);
  const agentRights = new Map(Object.entries(agentRolesAndRights));
  
  const allRoles = Object.keys({
    ...userRolesAndRights,
    ...adminRolesAndRights,
    ...agentRolesAndRights,
  });
  const allRights = new Map(
    Object.entries({
      ...userRolesAndRights,
      ...agentRolesAndRights,
      ...adminRolesAndRights,
    })
  );
  
  module.exports = {
    userRoles,
    userRights,
    adminRoles,
    adminRights,
    agentRoles, 
    agentRights, 
    allRoles,
    allRights,
  };
  