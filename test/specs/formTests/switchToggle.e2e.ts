import { expect } from '@wdio/globals';
import { addStep } from '@wdio/allure-reporter';
import MainPage from '../../pageobjects/mainPage';
import FormsPage from '../../pageobjects/formsPage';

describe('Testing the switch', () => {

    it('Check the change in its state and the correctness of the display of the tooltip text', async () => {
        addStep('Wait for Forms button to be visible');
        await MainPage.formsButton.waitForDisplayed({ timeout: 5000 });

        addStep('Click on the Forms button');
        await MainPage.formsButton.click();

        addStep('Wait for switch toggle to be visible');
        await FormsPage.switchToggle.waitForDisplayed({ timeout: 5000 });

        addStep('Get default switch text and assert');
        const defaultText = await FormsPage.switchToggleStatus.getText();
        expect(defaultText).toBe("Click to turn the switch ON");

        addStep('Click on the switch');
        await FormsPage.switchToggle.click();

        addStep('Get updated switch text and assert');
        const actualText = await FormsPage.switchToggleStatus.getText();
        expect(actualText).toBe("Click to turn the switch OFF");
    });
});