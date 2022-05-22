const AWS = require("aws-sdk");
async function getPortfolio(params) {
  const scanResults = [];
  var docClient = new AWS.DynamoDB.DocumentClient();
  docClient.get(params);

  items = await docClient.scan(params).promise();
  items.Items.forEach((item) => scanResults.push(item));
  params.ExclusiveStartKey = items.LastEvaluatedKey;
  return scanResults[0];
}

async function updatePortfolio(params) {
  var docClient = new AWS.DynamoDB.DocumentClient();
  docClient.update(params);

  items = await docClient.update(params).promise();

  return;
}

module.exports = { updatePortfolio, getPortfolio };
