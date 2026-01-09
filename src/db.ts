import Dexie, {type Table} from 'dexie';

export interface BonusCard{
    id?: number;
    name:string;
    barcode: string;
    frontImage?: Blob;
    backImage?: Blob;
    createdAt: number;    
}

export class CheapMarketDB extends Dexie {
    bonusCards!: Table<BonusCard>;

    constructor(){
        super('CheapMarketDB'); //db name

        // this identifies we ll use these variables for searching
        this.version(1).stores({
            bonusCards: '++id, name, barcode'
        })
    }
}

export const db = new CheapMarketDB();