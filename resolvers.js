import db from "./_db.js";

export const resolvers = {
  Query: {
    games(){
      return db.games
    },
    game(_, args){
      return db.games.find(game => game.id === args.id)
    },
    reviews(){
      return db.reviews
    },
    review(_, args){
      return db.reviews.find(review => review.id === args.id)
    },
    authors(){
      return db.authors
    },
    author(_, args){
      return db.authors.find(author => author.id === args.id)
    }
  },
  Game: {
    reviews(parent){
      return db.reviews.filter(review => review.game_id === parent.id)
    }
  },
  Review: {
    game(parent){
      return db.games.find(game => game.id === parent.game_id)
    },
    author(parent){
      return db.authors.find(author => author.id === parent.author_id)
    }
  },
  Author: {
    reviews(parent){
      return db.reviews.filter(review => review.author_id === parent.id)
    }
  },
  Mutation: {
    addGame(_, arg){
      console.log(arg)
      let newGame = {
        id: Math.floor(Math.random()*10000).toString(),
        ...arg.input
      }
      db.games.push(newGame)
      return newGame
    },
    editGame(_, arg){
      const { id, input: gameData} = arg
      const gameIndexToUpdate = db.games.findIndex(game => game.id === id)
      if(gameIndexToUpdate === -1){
        throw new Error("No game found with given id")
      }
      if(gameData.title){
        db.games[gameIndexToUpdate].title = gameData.title
      }
      if(gameData.platform){
        db.games[gameIndexToUpdate].platform = gameData.platform
      }
      return db.games[gameIndexToUpdate]
    },
    deleteGame(_, arg){
      const gameIndexToDelete = db.games.findIndex(game => game.id === arg.id)
      if(gameIndexToDelete === -1){
        throw new Error("No game found with given id")
      }
      let itemToDelete = db.games[gameIndexToDelete]
      db.games.splice(gameIndexToDelete, 1)
      return itemToDelete
    }
  }
}
