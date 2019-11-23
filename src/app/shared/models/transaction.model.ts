import { BoughtProduct } from './product.model';
import { CashedReward } from './reward.model';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface Transaction {
    id: string;
    product?: BoughtProduct;
    reward?: CashedReward;
    name: string;
    points: number;
    timestamp: Timestamp;
}
