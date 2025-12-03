import {browser} from '@wdio/globals';
import type {ChainablePromiseElement} from 'webdriverio';

export class TouchActions {
    /**
     * Отримує центральні координати елемента
     */
    private static async getElementCenter(element: ChainablePromiseElement): Promise<{x: number, y: number}> {
        const location = await element.getLocation();
        const size = await element.getSize();

        return {
            x: Math.round(location.x + size.width / 2),
            y: Math.round(location.y + size.height / 2)
        };
    }

    /**
     * Покращений drag and drop з кращими координатами та логуванням
     */
    public static async dragAndDrop(
        source: ChainablePromiseElement,
        destination: ChainablePromiseElement,
        retries = 2
    ): Promise<boolean> {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                await source.waitForDisplayed({timeout: 5000});
                await destination.waitForDisplayed({timeout: 5000});

                const start = await this.getElementCenter(source);
                const end = await this.getElementCenter(destination);

                console.log(`Drag attempt ${attempt + 1}: from (${start.x}, ${start.y}) to (${end.x}, ${end.y})`);

                await browser.performActions([
                    {
                        type: 'pointer',
                        id: 'finger1',
                        parameters: {pointerType: 'touch'},
                        actions: [
                            {type: 'pointerMove', duration: 0, x: start.x, y: start.y},
                            {type: 'pointerDown', button: 0},
                            {type: 'pause', duration: 500},
                            {type: 'pointerMove', duration: 1500, x: end.x, y: end.y},
                            {type: 'pause', duration: 300},
                            {type: 'pointerUp', button: 0},
                        ],
                    },
                ]);

                await browser.releaseActions();
                await browser.pause(500);

                console.log(`✓ Drag action completed (attempt ${attempt + 1})`);
                return true;

            } catch (error) {
                console.error(`✗ Drag attempt ${attempt + 1} failed:`, error);

                await browser.releaseActions().catch(() => {});

                if (attempt === retries) {
                    console.error(`Failed after ${retries + 1} attempts`);
                    return false;
                }

                await browser.pause(1000);
            }
        }

        return false;
    }

    /**
     * Альтернативний метод drag and drop через gestures (для iOS/Android)
     * Використовуйте цей метод якщо performActions не працює стабільно
     */
    public static async dragAndDropWithGesture(
        source: ChainablePromiseElement,
        destination: ChainablePromiseElement
    ): Promise<void> {
        await source.waitForDisplayed({timeout: 5000});
        await destination.waitForDisplayed({timeout: 5000});

        const start = await this.getElementCenter(source);
        const end = await this.getElementCenter(destination);

        const capabilities = await browser.capabilities;
        const platformName = capabilities.platformName?.toLowerCase();

        if (platformName === 'android') {
            await browser.execute('mobile: dragGesture', {
                elementId: await source.elementId,
                endX: end.x,
                endY: end.y
            });
        }

        else if (platformName === 'ios') {
            await browser.execute('mobile: dragFromToForDuration', {
                duration: 1.5,
                fromX: start.x,
                fromY: start.y,
                toX: end.x,
                toY: end.y
            });
        } else {
            console.warn('Unknown platform, using performActions as fallback');
            await this.dragAndDrop(source, destination);
        }

        await browser.pause(500);
    }

    /**
     * Перевіряє на якій платформі виконується тест
     */
    public static async isAndroid(): Promise<boolean> {
        const capabilities = await browser.capabilities;
        return capabilities.platformName?.toLowerCase() === 'android';
    }

    /**
     * Перевіряє на якій платформі виконується тест
     */
    public static async isIOS(): Promise<boolean> {
        const capabilities = await browser.capabilities;
        return capabilities.platformName?.toLowerCase() === 'ios';
    }
}