const mongodb = require("mongodb")
const username = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASSWORD;

exports.handler = async function (event, context, callback) {
    const client = await mongodb.connect(`mongodb+srv://${username}:${password}@cluster0.ugqf0.mongodb.net/tasks_hub?retryWrites=true&w=majority`, { useUnifiedTopology: true })
    const db = client.db()
    const ObjectID = require("mongodb").ObjectID;

    const data = JSON.parse(event.body)
    // console.log("Function `delete` invoked", data)

    try {
        const id = data;

        const tasks = await db.collection("tasks")
            .deleteOne({ _id: ObjectID(id) })
            .then((response) => {
                return callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(response)
                })
            })
        client.close()

    } catch (err) {
        console.log(err)
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: "Please try again later."
        }
    }
}