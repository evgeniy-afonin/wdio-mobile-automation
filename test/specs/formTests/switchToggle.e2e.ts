import {expect} from '@wdio/globals';
import MainPage from '../../pageobjects/mainPage';
import FormsPage from "../../pageobjects/formsPage";

describe('Testing the switch', () => {
    it('Check the change in its state and the correctness of the display of the tooltip text', async () => {
        await MainPage.formsButton.waitForDisplayed({timeout: 5000});
        await MainPage.formsButton.click();

        await FormsPage.switchToggle.waitForDisplayed({timeout: 5000});
        const defaultText = await FormsPage.switchToggleStatus.getText();
        expect(defaultText).toBe("Click to turn the switch ON");

        await FormsPage.switchToggle.click();
        const actualText = await FormsPage.switchToggleStatus.getText();
        expect(actualText).toBe("Click to turn the switch OFF");
    });
});