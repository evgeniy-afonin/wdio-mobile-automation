import DragPage from '../../../pageobjects/dragPage';
import {addStep} from "@wdio/allure-reporter";
import MainPage from "../../../pageobjects/mainPage";

describe('Drag and Drop Suite', () => {
    it('should drag all pieces into their correct slots', async () => {

        addStep('Click on the Drag button');
        await MainPage.dragButton.click();
        addStep('Drag-and-Drop Mechanics Testing');
        await DragPage.dragAllPiecesToSlots();
    });
});