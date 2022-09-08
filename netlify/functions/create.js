const { v4: uuidv4 } = require('uuid');
const ddbDocumentClient = require("./config")

exports.handler = async function (event, context, callback) {
    const data = JSON.parse(event.body)
    data._id = uuidv4()
    const params = {
        TableName: "tasks",
        Item: {
            _id: data._id,
            description: data.description,
            status: data.status,
        }
    };

    try {
        // Create new task in the table
        const task = await ddbDocumentClient.put(params).promise();
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
