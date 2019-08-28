import Fps from './fps';
import FirstPaint from './fp';

export interface PerformancePaintTiming {
    duration: number;
    entryType: string;
    name: string;
    startTime: number;
}

export {Fps, FirstPaint};
