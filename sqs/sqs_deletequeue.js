const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const params = {
  QueueUrl: 'https://sqs.us-east-2.amazonaws.com/022104241385/SQS_QUEUE_URL',
};

sqs.deleteQueue(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});
