const AWS = require('aws-sdk');
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const REGION = process.env.REGION;

// Set a region to interact with (make sure it's the same as the region of your table)
AWS.config.update({ region: REGION, accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY });

// Create the Document Client interface for DynamoDB
var ddbDocumentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async function (event, context, callback) {
    const data = JSON.parse(event.body)
    const params = {
        TableName: "tasks",
        Item: {
            _id: data._id,
            description: data.description,
            status: data.status,
        }
    };

    try {
        // Update task in the table
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
