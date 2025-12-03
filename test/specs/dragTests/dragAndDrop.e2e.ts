import DragPage from '../../../pageobjects/dragPage';
import {addStep} from "@wdio/allure-reporter";
import MainPage from "../../../pageobjects/mainPage";
import {expect, browser} from '@wdio/globals';

describe('Drag and Drop Suite', () => {
    it('should drag all pieces into their correct slots and verify success', async () => {

        addStep('Navigate to Drag screen');
        await MainPage.dragButton.click();
        await browser.pause(1000);

        addStep('Drag all puzzle pieces to their slots');
        const {success, failedPieces} = await DragPage.dragAllPiecesToSlots();

        addStep('Verify all pieces were successfully placed');
        expect(success, `Failed to place pieces: ${failedPieces.join(', ')}`).toBe(true);

        addStep('Verify success screen is displayed');
        const isPuzzleCompleted = await DragPage.verifyPuzzleCompleted();
        expect(isPuzzleCompleted, 'Success screen did not appear').toBe(true);

        addStep('Verify success message text');
        const congratsText = await DragPage.getCongratulationsText();
        expect(congratsText).toBe('Congratulations');
    });
});