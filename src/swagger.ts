// import swaggerAutogen from "swagger-autogen";
import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "SUPA MENU API",
    description:
      "Supa Menu API Documentation",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Auth",
      description: "Authentication routes",
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be "header", "query" or "cookie"
      name: "Authorization", // name of the header, query parameter or cookie
      description: "any description...",
    },
  },
  definitions: {
  },
};


const outputFile = "../swagger-output.json";
const endpointsFiles = ["./app"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

// swaggerAutogen()(outputFile, routes, doc);
export default swaggerAutogen()(outputFile, endpointsFiles, doc)
