import { PluginFunction } from 'vue';

declare class Visibility {
    public install: PluginFunction<never>;
    public change(callback: (evt: Event, hidden: boolean) => void): number;
    public unbind(id: number): void;
    public isSupported(): boolean;
    public hidden(): boolean;
}

declare const visibility: Visibility;
export default visibility;
