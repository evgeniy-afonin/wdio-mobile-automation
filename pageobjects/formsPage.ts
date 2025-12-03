import {$} from '@wdio/globals'

class FormsPage {

    public get inputField() {
        return $('~text-input');
    }

    public get inputTextResult() {
        return $('~input-text-result');
    }

    public get switchToggle() {
        return $('~switch');
    }

    public get switchToggleStatus() {
        return $('~switch-text');
    }
}

export default new FormsPage();
