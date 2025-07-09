import {expect} from '@wdio/globals';
import MainPage from '../../pageobjects/mainPage';
import FormsPage from "../../pageobjects/formsPage";

describe('Checking the operation of the Forms button', () => {

    it('Enter text in the field and verify that it appears in the "You have typed" section', async () => {
        await MainPage.formsButton.waitForDisplayed({timeout: 5000});
        await MainPage.formsButton.click();

        await FormsPage.inputField.waitForDisplayed({timeout: 5000});
        await FormsPage.inputField.setValue("Some text");

        await FormsPage.inputTextResult.waitForDisplayed({timeout: 5000});
        const actualText = await FormsPage.inputTextResult.getText();

        expect(actualText).toBe("Some text");
    });
});