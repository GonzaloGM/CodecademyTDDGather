const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits the update item page', () => {
  describe('after updating an item', () => {
    it('should display the new item description', () => {
      const itemToCreate = buildItemObject();
      const newDescription = 'the new description';

      browser.url('/items/create');
      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
      browser.click('#submit-button');
      // find paragraph that contains the title of the newly-created item, go up two
      // times, then find the view button div and click the anchor within it
      browser.click(`//p[contains(text(), "${itemToCreate.title}")]/parent::*/parent::*//div[contains(@class, "view-button")]//a`);
      // click the update link
      browser.click(`//a[contains(@href, "update")]`);
      browser.setValue('#description-input', newDescription);
      browser.click('#submit-button');

      assert.include(browser.getText('body'), newDescription);
    });
  });
});
