import swaggerAutogen from "swagger-autogen";

const autputFile = "./swagger-output.json";

const endPontsFiles = ["../index.ts"];

const doc = {
  info: {
    title: "Apis Rest Node Firebase y TS",
    description:
      "Apis Rest Node Firebase para una tienda de productos, gestiona tus productos y categorías.",
  },
  // con localhost
  host: "localhost:3000",
  // en caso de que tengas un dominio
  //host: "https://apis-rest-node-ts-firebase.vercel.app",
  schemes: ["http", "https"],
};

swaggerAutogen()(autputFile, endPontsFiles, doc);
