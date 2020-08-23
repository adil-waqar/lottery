import config from '../config';
declare enum LotteryState {
    UP = "UP",
    DOWN = "DOWN"
}
declare class Lottery {
    private draws;
    private bonds;
    private state;
    constructor(configs: config);
    run(): Promise<void>;
    checkForLottery(bond: string): Promise<void>;
    setState(state: LotteryState): void;
    getState(): string;
}
export default Lottery;
