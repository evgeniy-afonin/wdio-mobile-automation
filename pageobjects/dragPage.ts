import {TouchActions} from '../utils/TouchActions';
import {$, browser} from '@wdio/globals';

class DragPage {
    public get piece1() {
        return $('~drag-l2');
    }

    public get piece2() {
        return $('~drag-r3');
    }

    public get piece3() {
        return $('~drag-r1');
    }

    public get piece4() {
        return $('~drag-c1');
    }

    public get piece5() {
        return $('~drag-c3');
    }

    public get piece6() {
        return $('~drag-r2');
    }

    public get piece7() {
        return $('~drag-c2');
    }

    public get piece8() {
        return $('~drag-l1');
    }

    public get piece9() {
        return $('~drag-l3');
    }

    public get slot1() {
        return $('~drop-l1');
    }

    public get slot2() {
        return $('~drop-c1');
    }

    public get slot3() {
        return $('~drop-r1');
    }

    public get slot4() {
        return $('~drop-l2');
    }

    public get slot5() {
        return $('~drop-c2');
    }

    public get slot6() {
        return $('~drop-r2');
    }

    public get slot7() {
        return $('~drop-l3');
    }

    public get slot8() {
        return $('~drop-c3');
    }

    public get slot9() {
        return $('~drop-r3');
    }

    /**
     * Елементи success екрану
     */

    congratsXPath = '//android.widget.TextView[@text="Congratulations"]';
    descriptionXPath = '//android.widget.TextView[@text="You made it, click retry if you want to try it again."]';

    public get congratulationsText() {
        return $(this.congratsXPath);
    }

    public get successDescriptionText() {
        return $(this.descriptionXPath);
    }

    public get retryButton() {
        return $('~button-Retry');
    }

    /**
     * Перевіряє чи piece більше не видимий на оригінальному місці
     */
    private async isPieceMoved(pieceAccessibilityId: string): Promise<boolean> {
        try {
            const pieceElement = await $(`~ ${pieceAccessibilityId}`);
            await pieceElement.waitForDisplayed({timeout: 1000, reverse: true});
            return true;
        } catch (error) {
            try {
                const pieceElement = await $(`~ ${pieceAccessibilityId}`);
                const isDisplayed = await pieceElement.isDisplayed();
                return !isDisplayed;
            } catch {
                return true;
            }
        }
    }

    /**
     * Перетягує всі пазли на свої місця з верифікацією
     */
    public async dragAllPiecesToSlots(): Promise<{ success: boolean, failedPieces: string[] }> {
        const mapping = [
            {piece: this.piece1, slot: this.slot4, pieceId: 'drag-l2', slotId: 'drop-l2'},
            {piece: this.piece2, slot: this.slot9, pieceId: 'drag-r3', slotId: 'drop-r3'},
            {piece: this.piece3, slot: this.slot3, pieceId: 'drag-r1', slotId: 'drop-r1'},
            {piece: this.piece4, slot: this.slot2, pieceId: 'drag-c1', slotId: 'drop-c1'},
            {piece: this.piece5, slot: this.slot8, pieceId: 'drag-c3', slotId: 'drop-c3'},
            {piece: this.piece6, slot: this.slot6, pieceId: 'drag-r2', slotId: 'drop-r2'},
            {piece: this.piece7, slot: this.slot5, pieceId: 'drag-c2', slotId: 'drop-c2'},
            {piece: this.piece8, slot: this.slot1, pieceId: 'drag-l1', slotId: 'drop-l1'},
            {piece: this.piece9, slot: this.slot7, pieceId: 'drag-l3', slotId: 'drop-l3'},
        ];

        const failedPieces: string[] = [];

        for (const {piece, slot, pieceId, slotId} of mapping) {
            console.log(`\n--- Processing piece: ${pieceId} -> ${slotId} ---`);

            const dragSuccess = await TouchActions.dragAndDrop(await piece, await slot);

            if (!dragSuccess) {
                console.error(`Failed to drag ${pieceId}`);
                failedPieces.push(pieceId);
                continue;
            }

            const isMoved = await this.isPieceMoved(pieceId);

            if (!isMoved) {
                console.error(`Piece ${pieceId} was not moved successfully`);
                failedPieces.push(pieceId);
            } else {
                console.log(`✓ Piece ${pieceId} successfully placed in ${slotId}`);
            }
        }

        return {
            success: failedPieces.length === 0,
            failedPieces
        };
    }

    /**
     * Перевіряє що пазл зібраний успішно через success екран
     */
    public async verifyPuzzleCompleted(): Promise<boolean> {
        try {
            console.log('Verifying puzzle completion...');
            const congratsText = await this.congratulationsText;
            await congratsText.waitForDisplayed({timeout: 5000});

            const congratsDisplayed = await congratsText.isDisplayed();
            console.log(`✓ Congratulations text displayed: ${congratsDisplayed}`);

            if (!congratsDisplayed) {
                console.error('✗ Congratulations text is not displayed');
                return false;
            }

            const descriptionText = await this.successDescriptionText;
            const descriptionDisplayed = await descriptionText.isDisplayed();
            console.log(`✓ Description text displayed: ${descriptionDisplayed}`);

            if (!descriptionDisplayed) {
                console.error('✗ Description text is not displayed');
                return false;
            }

            const retryBtn = await this.retryButton;
            const retryDisplayed = await retryBtn.isDisplayed();
            console.log(`✓ Retry button displayed: ${retryDisplayed}`);

            if (!retryDisplayed) {
                console.error('✗ Retry button is not displayed');
                return false;
            }

            console.log('✓ Puzzle completed successfully - all success elements verified');
            return true;

        } catch (error) {
            console.error('✗ Failed to verify puzzle completion:', error);
            return false;
        }
    }

    /**
     * Перевіряє текст "Congratulations"
     */
    public async getCongratulationsText(): Promise<string> {
        const congratsText = await this.congratulationsText;
        return await congratsText.getText();
    }

    /**
     * Перевіряє чи можна натиснути Retry
     */
    public async isRetryButtonEnabled(): Promise<boolean> {
        const retryBtn = await this.retryButton;
        return await retryBtn.isEnabled();
    }

    /**
     * Отримує screenshot для debugging
     */
    public async takeDebugScreenshot(name: string): Promise<void> {
        try {
            await browser.saveScreenshot(`./screenshots/debug_${name}_${Date.now()}.png`);
        } catch (error) {
            console.error('Failed to take screenshot:', error);
        }
    }
}

export default new DragPage();