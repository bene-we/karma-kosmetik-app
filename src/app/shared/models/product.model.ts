export interface Product {
    id: string;
    name: string;
    claim: string;
    price: number;
    points: number;
    description: string;
    capacity: number;
    ingredients: string[];
    additionalIngredients: string[];
    creation?: Step[];
    application?: Step[];
    videoPath?: string;
    imagePaths?: string[];
}

interface Step {
    step: number;
    text: string;
}

export interface BoughtProduct {
    productId: string;
    batchNumber: string;
    serialNumber: string;
    price: number;
}
