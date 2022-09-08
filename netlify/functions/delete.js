const ddbDocumentClient = require("./config")

exports.handler = async function (event, context, callback) {
    const data = JSON.parse(event.body)
    const params = {
        TableName: "tasks",
        Key: {
            _id: data,
        }
    };

    try {
        // Delete task in the table
        const task = await ddbDocumentClient.delete(params).promise();
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: "Please try again later."
        }
    }
};
