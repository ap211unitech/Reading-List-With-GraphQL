require("dotenv").config();
const express = require("express");
const app = express();

const schema = require("./schema/schema");


const { graphqlHTTP } = require("express-graphql");
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})