import {PerformanceCollector} from '../collector/index';
import {PerformancePaintTiming} from './index';

class FirstPaint implements PerformanceCollector {
    public readonly PLUGIN_TYPE: string;
    private uploadMethod: any;
    private handler: number;

    constructor() {
        this.PLUGIN_TYPE = 'FirstPaint';
        this.handler = 0;
        this.onIdle = this.onIdle.bind(this);
    }
    public start(uploadMethod: any) {
        this.uploadMethod = uploadMethod;
        this.calcTime();
    }

    public end() {
        if (this.handler) {
            // @ts-ignore
            window.cancelIdleCallback(this.handler);
        }
    }

    private calcTime(): void {
        // @ts-ignore
        this.handler = window.requestIdleCallback(this.onIdle);
    }

    private onIdle(): void {
        const performanceData: PerformancePaintTiming[] = window.performance.getEntriesByType('paint');
        if (performanceData.length !== 0) {
            this.uploadMethod(performanceData[0]);
        } else {
            this.calcTime();
        }
    }
}

export default FirstPaint;
