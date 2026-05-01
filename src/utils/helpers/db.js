const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

async function connect(){
    mongoServer = await MongoMemoryServer.create() // <--- Creates in-memory database
    const uri = mongoServer.getUri() // <--- Fetches connection string from database
    await mongoose.connect(uri) // <--- Connects to the in-memory db with connection string
}

async function disconnect(){
    if(mongoose.connection.readyState !== 0){
        await mongoose.disconnect()
    }
    if(mongoServer){
        await mongoServer.stop()
    }
}

async function clear(){
    const collections = mongoose.collections
    for(const key in collections){
        await collections[key].deleteMany({})
    }
}

module.exports = { connect, disconnect, clear }
