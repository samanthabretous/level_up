// run this line to seed the test database.
// comment it out to seed the development database
process.env.NODE_ENV = 'test';

const models = require('../models/index');

const seedFunction = () => {
  models.sequelize.sync({ force: true })
  .then(() => {
    return models.company.bulkCreate([
      { name: 'Google' },
      { name: 'Slack' },
      { name: 'Bitly' },
      { name: 'Tumblr' },
      { name: 'Vimeo' },
      { name: 'Major League Soccer' },
      { name: 'ESPN' },
      { name: 'mongoDB' },
      { name: 'BuzzFeed' },
      { name: 'Betterment' },
    ]);
  })
  .then(() => {
    return models.source.bulkCreate([{ type: 'job-board' }, { type: 'company-site' }, { type: 'referred' }, { type: 'C4Q' }]);
  })
  .then(() => {
    return models.position.bulkCreate([
      { type: 'Software Engineer' },
      { type: 'Full Stack Developer' },
      { type: 'Front-End Engineer' },
      { type: 'UI Engineer' },
      { type: 'API Engineer' },
      { type: 'Junior Engineer' },
      { type: 'Senior Front End Engineer' },
      { type: 'Apprenticeship' },
      { type: 'HR' },
      { type: 'Technical manager' },
      { type: 'Technical team lead' },
      { type: 'Technical team member - senior' },
      { type: 'Technical team member - junior' },
      { type: 'Non-Technical' },
      { type: 'Talent Acquisition' },
    ]);
  })
  .then(() => {
    return models.user.create({ email: 'sam@samanthabretous.com', password: 'password1' })
  })
  .then(() => {
    return models.application.bulkCreate([
      { postURL: 'https://test-application', rank: 2, companyId: 1, positionId: 5, sourceId: 1, userId: 1 },
      // Bitly
      { postURL: 'https://boards.greenhouse.io/bitly/jobs/582670#.WM9UwuErLow', rank: 2, companyId: 3, positionId: 5, sourceId: 1, userId: 1 },
      // mongodb
      { postURL: 'https://www.mongodb.com/careers/job/590713?gh_jid=590713', rank: 2, companyId: 8, positionId: 4, sourceId: 2, userId: 1 },
      // BuzzFeed
      { postURL: 'https://www.upscored.com/job_opening/131594', rank: 2, companyId: 9, positionId: 3, sourceId: 1, userId: 1, dateApplied: '3/18/17' },
      // slack
      { rank: 5, companyId: 2, positionId: 6, sourceId: 3, userId: 1 },
      // betterment
      { rank: 4, companyId: 10, positionId: 8, sourceId: 3, userId: 1, dateApplied: '3/1/17' },
    ]);
  })
  .then(() => {
    models.interview.bulkCreate([
      { phrase: 1, when: '3/22/17', codeChallenge: true, type: 'phone', reminder: '3/23/17', reminderNotes: 'send thank you note', applicationId: 1, content: 'Behavioral' },
      { phrase: 1, when: '3/22/17', time: '10:30', codeChallenge: true, type: 'phone', reminder: '3/23/17', reminderNotes: 'send thank you note', applicationId: 6, content: 'Behavioral' },
    ]);
  })
  .then(() => {
    models.contact.bulkCreate([
      { name: 'test contact', email: 'test@test.com', phone: '888-909-9876', positionId: 1 },
      { name: 'Drew Schuster', email: 'dschuster@slack-corp.com', positionId: 7, applicationId: 5, companyId: 2 },
      { name: 'Hayden Hunter', email: 'hayden.hunter@betterment.com', positionId: 15, applicationId: 6, phone: 'O: 212.228.1328', companyId: 10 },
    ]);
  });
};

seedFunction();
module.exports = seedFunction;
