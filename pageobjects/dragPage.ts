import {TouchActions} from '../utils/TouchActions';
import {$} from '@wdio/globals';

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

    // Масиви для зручності
    public get pieces() {
        return [
            this.piece1,
            this.piece2,
            this.piece3,
            this.piece4,
            this.piece5,
            this.piece6,
            this.piece7,
            this.piece8,
            this.piece9,
        ];
    }

    public get slots() {
        return [
            this.slot1,
            this.slot2,
            this.slot3,
            this.slot4,
            this.slot5,
            this.slot6,
            this.slot7,
            this.slot8,
            this.slot9,
        ];
    }

    public async dragAllPiecesToSlots() {
        const mapping = [
            {piece: this.piece1, slot: this.slot4},
            {piece: this.piece2, slot: this.slot9},
            {piece: this.piece3, slot: this.slot3},
            {piece: this.piece4, slot: this.slot2},
            {piece: this.piece5, slot: this.slot8},
            {piece: this.piece6, slot: this.slot6},
            {piece: this.piece7, slot: this.slot5},
            {piece: this.piece8, slot: this.slot1},
            {piece: this.piece9, slot: this.slot7},
        ];

        for (const {piece, slot} of mapping) {
            await TouchActions.dragAndDrop(await piece, await slot);
        }
    }
}

export default new DragPage();