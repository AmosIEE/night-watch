import Collator, {PerformanceCollector} from './collector/index';
import Uploader from './uploader/index';

interface NightsWatchInit {
    projectName: string;
    debugMode?: boolean;
}

class NightsWatch {
    private collector: Collator;
    private uploader: Uploader;

    private projectName: string;
    private debugMode: boolean;

    constructor(params: NightsWatchInit) {
        this.projectName = params.projectName;
        this.debugMode = params.debugMode || false;

        this.collector = new Collator({debug: this.debugMode});
        this.uploader = new Uploader({projectName: params.projectName});
    }

    public watch(instance: PerformanceCollector) {
        const pluginType = instance.PLUGIN_TYPE;
        console.log(`Start watching ${pluginType}`);
        return this.collector.watch(instance, (data: any) => this.uploader.sendLog(instance.PLUGIN_TYPE, data));
    }

    public unwatch(watcherId: string) {
        const instance = this.collector.unwatch(watcherId);
        if (instance) {
            const pluginType = instance.PLUGIN_TYPE;
            console.log(`Stop watching ${pluginType}`);
        }
        return instance;
    }
}

export default NightsWatch;

export * from './plugins/index';
