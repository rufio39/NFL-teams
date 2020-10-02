const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectID;

let client

function connect(locals) {

    const uri = process.env.DB_URL;

    client = new MongoClient(uri, { useUnifiedTopology: true })

    return client.connect()
    .then((connection) => {
        console.log("connection successfull")
        locals.collectionTeams = connection.db('NFL-teams').collection('teams')
    })
    .catch(err => {
        console.log(err)
        process.exit()
    })
}
function close() {
    client.close()
}

function readAll(info) {
    return info.collection.find(info.query).toArray();
}

function createOne(info) {
    return info.collection.insertOne(info.doc);
}

function deleteOne(info) {
    return info.collection.deleteOne({ _id: ObjectID(info.id) });
}

function replaceOne(info) {
    return info.collection.findOneAndReplace({ _id: ObjectID(info.id) }, info.doc);
}

function changeOne(info) {
    return info.collection.findOneAndUpdate(info.query, { $set: info.doc });
}

module.exports.connect = connect;
module.exports.close = close;
module.exports.readAll = readAll;
module.exports.createOne = createOne;
module.exports.replaceOne = replaceOne;
module.exports.changeOne = changeOne;
module.exports.deleteOne = deleteOne;
