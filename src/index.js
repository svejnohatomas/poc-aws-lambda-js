const fs = require('fs');
const html = fs.readFileSync('index.html', { encoding: 'utf8' });

const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

   // Insert data into DynamoDB
   if (event.queryStringParameters) {
      await dynamo.put({
         TableName: "pocAwsLambdaJsStore",
         Item: {
            university: "swansea-university",
            faculty: event.queryStringParameters.faculty,
            studentId: event.queryStringParameters.studentId,
            firstName: event.queryStringParameters.firstName,
            surname: event.queryStringParameters.surname,
         }
      }).promise();
   }

   // Query all data
   let params = {
      TableName: "pocAwsLambdaJsStore",
      KeyConditionExpression: "university = :university",
      ExpressionAttributeValues: {
        ":university": "swansea-university"
      }
   }
   const tableQuery = await dynamo.query(params, function (err, data) {
      if (err) console.log(err);
      else console.log(data);
   }).promise()

   // Construct table from DynamoDB table query result
   let modifiedHTML = dynamicTable(html, tableQuery)

   const response = {
      statusCode: 200,
      headers: {
         'Content-Type': 'text/html',
      },
      body: modifiedHTML,
   };
   return response;
};

function dynamicTable(html, tableQuery) {
   let tbody = "";
   if (tableQuery.Items.length > 0) {
      for (let i = 0; i < tableQuery.Items.length; i++) {
         let item = tableQuery.Items[i]
         tbody += `<tr><th scope=\"row\">${item.studentId}</th><td>${item.firstName}</td><td>${item.surname}</td><td>${item.faculty}</td></tr>`
      }
   }
   return html.replace("{tbody}", tbody);
}