import { reducer } from './preferences';
import { SetLanguage } from '../actions/preferences';

describe('Preferences reducer', () => {
    const language = 'en';

    it('should set the language', () => {
        expect(
            reducer(undefined,
                new SetLanguage(language)
            ))
            .toEqual(
                {
                    language: language
                }
            );
    });
});
