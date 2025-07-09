import {$} from '@wdio/globals'

class MainPage {

    public get formsButton() {
        return $('~Forms');
    }

    public get dragButton() {
        return $('~Drag');
    }
}

export default new MainPage();
