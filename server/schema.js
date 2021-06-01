// after adding these imports:
import {
    GraphQLSchema,
    GraphQLString as StringType,
} from 'graphql';

// minimalistic schema

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            hi: {
                type: StringType,
                resolve: () => 'Hello world!'
            }
        }
    })
});

export default schema;