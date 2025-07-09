import {browser} from '@wdio/globals';
import type {ChainablePromiseElement} from 'webdriverio';

export class TouchActions {
    public static async dragAndDrop(
        source: ChainablePromiseElement,
        destination: ChainablePromiseElement,
        retries = 2
    ) {
        for (let attempt = 0; attempt <= retries; attempt++) {
            const start = await source.getLocation();
            const end = await destination.getLocation();

            try {
                await browser.performActions([
                    {
                        type: 'pointer',
                        id: 'finger1',
                        parameters: {pointerType: 'touch'},
                        actions: [
                            {type: 'pointerMove', duration: 200, x: start.x + 5, y: start.y + 5},
                            {type: 'pointerDown', button: 0},
                            {type: 'pause', duration: 500},
                            {type: 'pointerMove', duration: 1500, x: end.x + 5, y: end.y + 5},
                            {type: 'pointerUp', button: 0},
                            {type: 'pause', duration: 500},
                        ],
                    },
                ]);
                await browser.releaseActions();
                return;
            } catch (error) {
                if (attempt === retries) throw error;
                await browser.pause(1000);
            }
        }
    }
}