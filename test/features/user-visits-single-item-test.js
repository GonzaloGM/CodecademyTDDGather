const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits the single item page', () => {
  describe('visiting a newly-created item', () => {
    it('should display the item description', () => {
      const itemToCreate = buildItemObject();

      browser.url('/items/create');
      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
      browser.click('#submit-button');
      // find paragraph that contains the title of the newly-created item, go up two
      // times, then find the view button div and click the anchor within it
      browser.click(`//p[contains(text(), "${itemToCreate.title}")]/parent::*/parent::*//div[contains(@class, "view-button")]//a`);

      assert.include(browser.getText('body'), itemToCreate.description);
    });
  });
});
