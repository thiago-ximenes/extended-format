import OptionsType from "../types/options-type";

export default abstract class Format {
    public format(value: string, pattern: string, options: OptionsType): string {
        let result = '';
        let valueIndex = 0;

        if (!value) return value;

        if (options.onlyNumbers && !options.onlyLetters) {
            value = this.numeric(value)
        }

        if (options.onlyLetters && !options.onlyNumbers) {
            value = this.letters(value)
        }

        const patternSeparator = options.patternSeparator || '#';

        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] === patternSeparator) {
                if (valueIndex < value.length) {
                    result += value[valueIndex];
                    valueIndex++;
                }
            } else {
                result += pattern[i];
            }
        }

        return result;
    }

    public numeric(value: string): string {
        return value.replace(/\D/g, '');
    }

    public letters(value: string): string {
        return value.replace(/[^a-zA-Z]/g, '');
    }
}