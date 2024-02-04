import Format from '../../main';
import OptionsType from "../../types/options-type";

describe('Format', () => {
    let format: Format;
    let options: OptionsType;

    beforeEach(() => {
        class ExtendedFormat extends Format {}

        format = new ExtendedFormat();
        options = {
            onlyNumbers: false,
            onlyLetters: false,
            patternSeparator: '#'
        };
    });

    test('should return empty string when value is empty', () => {
        expect(format.format('', '#', options)).toBe('');
    });

    test('should return formatted string when value contains only numbers', () => {
        expect(format.format('123', '#.#.#', options)).toBe('1.2.3');
    });

    test('should return formatted string when value contains only letters', () => {
        options.onlyLetters = true;
        expect(format.format('abc', '#.#.#', options)).toBe('a.b.c');
    });

    test('should return formatted string when value contains numbers and letters', () => {
        expect(format.format('a1b2c3', '#.#.#', options)).toEqual('a.1.b');
    });

    test('should return formatted string when value contains special characters', () => {
        expect(format.format('@1$2%3', '#.#.#', options)).toBe('@.1.$');
    });

    test('should return value when pattern is empty', () => {
        expect(format.format('123', '', options)).toBe('');
    });

    test('should return formatted string when pattern contains # character', () => {
        expect(format.format('123', '#.#.#', options)).toBe('1.2.3');
    });

    test('should return formatted string when pattern contains non # characters', () => {
        expect(format.format('123', 'A.#.#', options)).toBe('A.1.2');
    });

    test('should ignore onlyNumbers and onlyLetters when onlyNumbers and onlyLetters options are true', () => {
        options.onlyNumbers = true;
        options.onlyLetters = true;
        expect(format.format('a1b2c3', '#.#.#', options)).toBe('a.1.b');
    });

    test('should return formatted string when onlyNumbers and onlyLetters options are false', () => {
        options.onlyNumbers = false;
        options.onlyLetters = false;
        expect(format.format('a1b2c3', '#.#.#', options)).toBe('a.1.b');
    });

    test('should return formatted string when onlyNumbers option is true', () => {
        options.onlyNumbers = true;
        expect(format.format('a1b2c3', '#.#.#', options)).toBe('1.2.3');
    });

    test('should return formatted string when onlyLetters option is true', () => {
        options.onlyLetters = true;
        expect(format.format('a1b2c3', '#.#.#', options)).toBe('a.b.c');
    });
});