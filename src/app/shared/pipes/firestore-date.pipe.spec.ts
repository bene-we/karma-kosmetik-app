import { FirestoreDatePipe } from './firestore-date.pipe';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

describe('FirestoreDatePipe', () => {
    it('create an instance', () => {
        const pipe = new FirestoreDatePipe(Timestamp.now().seconds.toString());
        expect(pipe).toBeTruthy();
    });
});
