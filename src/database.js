const mongoose = require('mongoose')

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Ansluten till MongoDB');
    } catch(e) {
        console.error('Kunde inte ansluta till MongoDB:', e.message)
        process.exit(1)
    }
}

module.exports = {connectToDatabase}