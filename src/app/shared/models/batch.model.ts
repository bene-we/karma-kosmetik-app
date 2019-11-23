export interface Batch {
    batchNumber: string;
    quantity: number;
    timestamp: Date;
}

export interface SerialNumber {
    serialNumber: string;
    scanned: boolean;
    qrCode: string;
}
