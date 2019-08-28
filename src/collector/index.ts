import {getUniqueId} from './getUniqueId';

export declare interface PerformanceCollector {
    PLUGIN_TYPE: string;
    start(uploadMethod: any): void;
    end(): void;
}

interface Plugins {
    id: string;
    instance: PerformanceCollector;
}

export interface CollectorInterFace {
    watch(instance: PerformanceCollector, uploadMethod: any): string;
    unwatch(id: string): PerformanceCollector | null;
}

export class Collector implements CollectorInterFace {
    private collectors: Plugins[];
    private id: string;

    private debugMode: boolean;
    constructor(params: {debug: boolean}) {
        this.collectors = [];
        this.id = getUniqueId();
        this.debugMode = params.debug || false;
    }

    public watch(instance: PerformanceCollector, uploadMethod: any) {
        const collector = instance;
        const prevId = this.id;
        collector.start(uploadMethod);
        this.collectors.push({
            id: prevId,
            instance: collector,
        });
        this.id = getUniqueId();
        return prevId;
    }

    public unwatch(watcherId: string) {
        // @ts-ignore
        const idx = this.collectors.findIndex((plugin: Plugins) => {
            return plugin.id === watcherId;
        });
        if (idx === -1) {
            return null;
        }
        const collector = this.collectors[idx].instance;
        collector.end();
        this.collectors.splice(idx, 1);
        return collector;
    }
}

export default Collector;
