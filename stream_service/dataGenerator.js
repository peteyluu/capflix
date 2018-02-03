const faker = require('faker');
const fs = require('fs');
const elapsedTime = require('elapsed-time');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: __dirname + `/test.csv`,
  header: [
    {id: 'id', title: 'id'},
    {id: 'content_id', title: 'content_id'},
    {id: 'user_id', title: 'user_id'},
    {id: 'started', title: 'started'},
    {id: 'ended', title: 'ended'},
    {id: 'runtime', title: 'runtime'},
  ]
});

const runtimes = [20, 30, 45, 60, 120, 140];
const records = [];

for (var i = 0; i < 1000000; i++) {
  let startedDate = faker.date.past();
  let record = {
    id: faker.random.uuid(),
    content_id: faker.random.number(100),
    user_id: faker.random.number(100),
    started: startedDate.getTime(),
    ended: (faker.date.between(startedDate, faker.date.recent())).getTime(),
    runtime: runtimes[Math.floor(Math.random() * runtimes.length)]
  };
  records[i] = record;
}

const et = elapsedTime.new().start();
csvWriter.writeRecords(records)
.then(() => {
  console.log('...Done ', et.getValue());
})
.catch((err) => {
  console.error(err);
});
