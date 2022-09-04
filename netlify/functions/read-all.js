const mongodb = require("mongodb")
const username = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASSWORD;
const uri = process.env.MONGO_DB_URI;

exports.handler = async function (event, context) {
    const client = await mongodb.connect(`mongodb+srv://${username}:${password}@${uri}?retryWrites=true&w=majority`, { useUnifiedTopology: true })
    const db = client.db()

    try {
        const tasks = await db.collection("tasks")
            .find()
            .toArray()
        client.close()
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tasks)
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: "Please try again later."
        }
    }
}
