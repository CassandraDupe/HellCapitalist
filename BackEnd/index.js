const fs = require("fs").promises;
async function readUserWorld(user) {
    try {
        const data = await fs.readFile("../userworlds/"+ user + "-world.json");
        //console.log("ok");
        return JSON.parse(data);
    }
    catch(error) {
        console.log(error);
        //console.dir(world);
        return world
    }
}

const express = require('express');
const { ApolloServer } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = require("./src/schema.js")
// Provide resolver functions for your schema fields
const resolvers = require("./src/resolvers.js")
//Ajout du monde
let world = require("./src/world.js")
//console.dir(world)

const server = new ApolloServer({
    typeDefs, resolvers,
    context: async ({ req }) => ({
        world: await readUserWorld(req.headers["x-user"]),
        user: req.headers["x-user"]
    })
})

const app = express();
app.use(express.static('public'));
server.start().then( res => {
    server.applyMiddleware({app});
    app.listen({port: 4000}, () =>
        console.log(`🚀 Server ready at
http://localhost:4000${server.graphqlPath}`)
    );
})
