const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const fs = require("fs");

const typeDefs = fs.readFileSync("./schema.graphql", "utf-8");

const playlists = [
  {
    id: "1",
    name: "My Playlist",
    songs: [
      {
        id: "1",
        title: "Believer",
        artist: "Imagine Dragons",
        duration: 204,
      },
      {
        id: "2",
        title: "Perfect",
        artist: "Ed Sheeran",
        duration: 263,
      },
    ],
  },
];

const resolvers = {
  Query: {
    playlist: (_, { id }) => {
      return playlists.find((playlist) => playlist.id === id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
}).then(({ url }) => {
  console.log(`GraphQL server running at ${url}`);
});