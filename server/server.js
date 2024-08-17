// JSON Server module
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

// Make sure to use the default middleware
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
 // Add custom route here if needed
 jsonServer.rewriter({
    "/api/*": "/$1",
    "/products": "/products",
    "/cart": "/cart",
    "/cart/:id": "/cart/:id",
    "/products/search": "/products?name_like=:searchTerm"
  })
);
server.use(router);
// Listen to port
server.listen("https://profile-fyi-backend-xi.vercel.app/", () => {
 console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
