const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

const schema = buildSchema(`
  type Student {
    id: ID!
    name: String!
    course: String!
  }

  type Query {
    students: [Student!]!
  }
`);

const students = [
  {
    id: "1",
    name: "Juan Dela Cruz",
    course: "BSIT"
  },
  {
    id: "2",
    name: "Maria Santos",
    course: "BSCS"
  },
  {
    id: "3",
    name: "Pedro Reyes",
    course: "BSIT"
  }
];

const root = {
  students: () => students
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("GraphQL server running at http://localhost:4000/graphql");
});