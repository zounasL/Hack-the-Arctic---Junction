export class Utils {
    private tick: number = 0;
    constructor(tick: number, protected data: any[]) {
        this.tick = tick;
    }
    
    public getCo2(): number {
        return this.data.length >= this.tick ? this.data[this.tick].CO2 : this.setTick(0);
    }

    public getTemperature(): number {
        return this.data.length >= this.tick ? this.data[this.tick].T : this.setTick(0);
    }

    public setTick(position: number): void {
        this.tick = position;
    }

    public getTick(): number {
        return this.tick;
    }
}