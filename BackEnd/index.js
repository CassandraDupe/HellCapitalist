const express = require('express');
const { ApolloServer } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language

// Provide resolver functions for your schema fields
const resolvers = require("./src/resolvers.js")
const typeDefs = require("./src/schema.js")
//Ajout du monde
let world = require("./src/world.js")

const server = new ApolloServer({
    typeDefs, resolvers,
    context: async ({ req }) => ({
        world: world
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
