const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User deletes an item', () => {
  describe('after deleting an item', () => {
    it('should not be able to find it in the index', () => {
      const itemToCreate = buildItemObject({
        'title': 'Just an item to delete'
      });

      browser.url('/items/create');
      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
      browser.click('#submit-button');
      browser.submitForm(`//p[contains(text(), "${itemToCreate.title}")]/parent::*/parent::*//form[contains(@class, "delete-form")]`);

      assert.notInclude(browser.getText('body'), itemToCreate.title);
    });
  });
});

