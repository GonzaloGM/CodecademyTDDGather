const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('should render the item\s title and description', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app)
        .get(`/items/${item._id}`);

      assert.include(parseTextFromHTML(response.text, '#item-title'), item.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'), item.description);
    });

    it('should show an error for a non-existent item', async () => {
      const nonExistentItemId = '1234';

      const response = await request(app)
        .get(`/items/${nonExistentItemId}`);

      assert.include(parseTextFromHTML(response.text, '#item-title'), 'Item not found');
      assert.include(parseTextFromHTML(response.text, '#item-description'), `We're sorry, but the item couldn't be found.`);
    });
  });
});
