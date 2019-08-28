import {PerformanceCollector} from '../collector/index';

interface DataElement {
    timestamp: number;
    fps: number;
    duration: number;
}

export interface FpsConfig {
    warningCount: number;
    warningThreshold: number;
}

const DEFAULT_WARNING_COUNT = 5;
const DEFAULT_WARNING_THRESHOLD = 30;

const defaultConfig = {
    warningCount: DEFAULT_WARNING_COUNT,
    warningThreshold: DEFAULT_WARNING_THRESHOLD,
};

class Fps implements PerformanceCollector {
    public readonly PLUGIN_TYPE: string;

    private config: FpsConfig;
    private uploadMethod: any;
    // Count how many times loop was called
    private frame: number;
    // Record the time start calculate fps
    private lastTime: number;

    private recordArray: DataElement[];

    private allFrameCount: number;
    private lastFrameTime: number;

    private timer: number;

    private constructor(config?: FpsConfig) {
        this.PLUGIN_TYPE = 'FPS';
        this.config = {...defaultConfig, ...config};
        this.frame = 0;
        this.allFrameCount = 0;
        this.timer = 0;
        this.lastTime = Date.now();
        this.lastFrameTime = Date.now();
        this.recordArray = [];
        this.loop = this.loop.bind(this);
    }

    public start(uploadMethod: any) {
        this.uploadMethod = uploadMethod;
        this.loop();
    }

    public end() {
        if (this.timer) {
            window.cancelAnimationFrame(this.timer);
        }
    }

    private loop(): void {
        const now = Date.now();
        const duration = now - this.lastFrameTime;
        let fps = Math.round(1000 / duration);

        this.lastFrameTime = now;
        this.allFrameCount++;
        this.frame++;

        if (now - this.lastTime > 1000) {
            fps = Math.round((this.frame * 1000) / (now - this.lastTime));
            if (fps <= this.config.warningThreshold) {
                this.recordArray.push({
                    duration, fps, timestamp: now,
                });
            }

            if (this.recordArray.length >= this.config.warningCount) {
                this.uploadMethod(this.recordArray);
                this.recordArray = [];
            }
            this.frame = 0;
            this.lastTime = now;
        }

        this.timer = window.requestAnimationFrame(this.loop);
    }
}

export default Fps;
