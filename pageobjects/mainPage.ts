import {$} from '@wdio/globals'

class MainPage {

    public get formsButton() {
        return $('~Forms');
    }
}

export default new MainPage();
