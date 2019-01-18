import { GraphQLServer } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';


function createServer(context) {
    return new GraphQLServer({
        typeDefs: "src/schema.graphql",
        resolvers: {
            Mutation,
            Query
        },
        context
    });
}

export default createServer;