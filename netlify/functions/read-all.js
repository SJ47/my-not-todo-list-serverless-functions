const ddbDocumentClient = require("./config")

exports.handler = async function (event, context) {
    const params = {
        TableName: "tasks",
    };

    try {
        // Get all items in the table
        const tasks = await ddbDocumentClient.scan(params).promise()

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tasks.Items)
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
