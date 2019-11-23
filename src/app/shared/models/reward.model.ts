export interface Reward {
    id: string;
    name: string;
    description: string;
    points: number;
}

export interface CashedReward {
    rewardId: string;
    description: string;
}
