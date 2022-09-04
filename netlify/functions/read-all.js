const AWS = require('aws-sdk');
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const REGION = process.env.AWS_REGION;

// Set a region to interact with (make sure it's the same as the region of your table)
AWS.config.update({ region: REGION, accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY });

// Create the Document Client interface for DynamoDB
var ddbDocumentClient = new AWS.DynamoDB.DocumentClient();

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
