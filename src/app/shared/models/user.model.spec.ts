import { User } from './user.model';

describe('User', () => {
    it('should create an instance', () => {
        expect(new User('u7JJsru26IcokqNwVsoGEO96dWe2', 'bene@mail.de', 'Bene')).toBeTruthy();
    });
});
