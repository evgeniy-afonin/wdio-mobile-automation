import { expect } from '@wdio/globals';
import { addStep } from '@wdio/allure-reporter';
import MainPage from '../../../pageobjects/mainPage';
import FormsPage from '../../../pageobjects/formsPage';

describe('Checking the operation of the Forms button', () => {

    it('Enter text in the field and verify that it appears in the "You have typed" section', async () => {
        addStep('Wait for Forms button to be visible');
        await MainPage.formsButton.waitForDisplayed({ timeout: 5000 });

        addStep('Click on the Forms button');
        await MainPage.formsButton.click();

        addStep('Wait for input field to be visible');
        await FormsPage.inputField.waitForDisplayed({ timeout: 5000 });

        addStep('Enter text "Some text" in the input field');
        await FormsPage.inputField.setValue("Some text");

        addStep('Wait for result text to be visible');
        await FormsPage.inputTextResult.waitForDisplayed({ timeout: 5000 });

        addStep('Get actual text and assert');
        const actualText = await FormsPage.inputTextResult.getText();
        expect(actualText).toBe("Some text");
    });
});