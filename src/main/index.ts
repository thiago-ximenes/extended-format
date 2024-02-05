import OptionsType from "../types/options-type";
import SecretOptionsType from "../types/secret-options-type";
import OriginalValueBucket from "../types/original-value-bucket-type";
import Locale from "../types/locales-type";
import SpecialSecretOptionsType from "../types/special-secret-options-type";

export default abstract class BaseFormat {
    protected options: OptionsType = {};
    protected isSecret: boolean = false;
    protected value: string
    protected locale: Locale = 'pt-BR';
    protected originalValueBucket: Record<OriginalValueBucket, string> = {} as Record<OriginalValueBucket, string>;

    /**
     * Returns the original value before formatting.
     * @param {OriginalValueBucket} key - The key of the original value.
     * @returns {string} The original value before formatting.
     */
    getValueBeforeFormat(key: OriginalValueBucket): string {
        const value = this.originalValueBucket[key];

        if (!value) return '';

        return value;
    }

    /**
     * Sets the locale for formatting.
     * @param {Locale} locale - The locale for formatting.
     * @returns {this} The instance of the class to allow method chaining.
     */
    setLocale(locale: Locale) {
        this.locale = locale;
        return this
    }

    /**
     * Sets the original value before formatting.
     * @param {string} value - The original value.
     * @param {string} [key] - The key to store the original value.
     */
    setOriginalValueBucket(value: string, key?: string) {
        if (!key) {
            const caller = this.callerMethodName();
            key = this.removeSecretNameFromMethodName(caller);
        }

        this.originalValueBucket[key] = value;
    }

    /**
     * Sets the options for formatting.
     * @param {OptionsType} options - The options for formatting.
     * @returns {this} The instance of the class to allow method chaining.
     */
    protected setOptions(options: OptionsType) {
        this.options = options;

        return this
    }

    /**
     * Sets whether the formatting should be secret.
     * @param {boolean} isSecret - Whether the formatting should be secret.
     * @returns {this} The instance of the class to allow method chaining.
     */
    protected setIsSecret(isSecret: boolean) {
        this.isSecret = isSecret;

        return this
    }

    /**
     * Toggles whether the formatting should be secret.
     * @returns {this} The instance of the class to allow method chaining.
     */
    protected toggleIsSecret() {
        this.isSecret = !this.isSecret;

        return this
    }

    /**
     * Clears the formatting options.
     * @returns {this} The instance of the class to allow method chaining.
     */
    protected clearOptions() {
        this.options = {};

        return this
    }

    /**
     * Sets the value for formatting.
     * @param {string} value - The value for formatting.
     * @returns {this} The instance of the class to allow method chaining.
     */
    protected setValue(value: string) {
        this.value = value;

        return this
    }

    /**
     * Formats the value according to the provided pattern and options.
     * @param {string} value - The value to be formatted.
     * @param {string} pattern - The formatting pattern.
     * @param {OptionsType} options - The formatting options.
     * @param {string} [key] - The key to store the original value.
     * @returns {string} The formatted value.
     */
    public format(value: string, pattern: string, options: OptionsType, key?: string): string {
        this.mergeOptions(options);
        this.value = value;

        if (!this.isSecret) {
            this.setOriginalValueBucket(value, key)
        }


        let result = '';
        let valueIndex = 0;

        if (!this.value) return this.value;

        this.handleNumeric().handleLetters();

        const patternSeparator = this.options.patternSeparator || '#';

        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] === patternSeparator) {
                if (valueIndex < this.value.length) {
                    result += this.value[valueIndex];
                    valueIndex++;
                }
            } else {
                result += pattern[i];
            }
        }

        this.clearOptions();

        return result;
    }

    /**
     * Formats the value as a secret string.
     * @param {string} value - The value to be formatted.
     * @param {SecretOptionsType} secretOptions - The secret formatting options.
     * @param {string} [key] - The key to store the original value.
     * @returns {string} The value formatted as a secret string.
     */
    public secret(value: string, secretOptions: SecretOptionsType, key?: string): string {
        this.setOriginalValueBucket(value, key);
        let {start, isVisible = true, end, escapeStart, escapeEnd, specialCharacter} = secretOptions;

        if (escapeStart !== undefined) {
            start += escapeStart;
        }
        if (escapeEnd !== undefined) {
            end += escapeEnd;
        }

        let specialCharacterIndexes = [];
        if (specialCharacter !== undefined) {
            specialCharacter.forEach((char) => {
                let regex = new RegExp(`\\${char}`, 'g');
                let match;
                while ((match = regex.exec(value)) != null) {
                    specialCharacterIndexes.push(match.index);
                }
            });
        }

        if (isVisible) {
            const regex = new RegExp(`(.{${start}})(.*)(?=.{${end}})`);
            return value.replace(regex, (_, a, b) => {
                let secretPart = '';
                for (let i = 0; i < b.length; i++) {
                    if (specialCharacterIndexes.includes(i + start)) {
                        secretPart += b[i];
                    } else {
                        secretPart += '*';
                    }
                }
                return a + secretPart;
            });
        } else {
            const visibleMiddle = value.slice(start, -end);
            const secretStartPart = '*'.repeat(start);
            const secretEndPart = '*'.repeat(end);
            return secretStartPart + visibleMiddle + secretEndPart;
        }
    }

    /**
     * Formats the value as a special secret string.
     * @param {string} value - The value to be formatted.
     * @param {SpecialSecretOptionsType} secretOptions - The special secret formatting options.
     * @param {string} [key] - The key to store the original value.
     * @returns {string} The value formatted as a special secret string.
     */
    public special(value: string, secretOptions: SpecialSecretOptionsType, key?: string): string {
        this.setOriginalValueBucket(value, key);
        let {start, end, specialCharacter} = secretOptions;

        // Converta start e end para arrays se eles não forem
        if (!Array.isArray(start)) {
            start = [start];
        }
        if (!Array.isArray(end)) {
            end = [end];
        }

        // Divida a string em segmentos com base nos caracteres especiais
        let segments = [value];
        if (specialCharacter !== undefined) {
            segments = value.split(new RegExp(`[${specialCharacter.join('')}]`));
        }

        // Aplique a lógica de ocultação a cada segmento
        segments = segments.map((segment, index) => {
            if (index === segments.length - 1) {
                return segment;
            }
            const startValue = start[index] !== undefined ? start[index] : start[(start as Array<number>).length - 1];
            const endValue = end[index] !== undefined ? end[index] : end[(end as Array<number>).length - 1];
            const visibleStart = startValue > 0 ? segment.slice(0, startValue) : '';
            const visibleEnd = endValue > 0 ? segment.slice(-endValue) : '';
            const secretMiddle = '*'.repeat(segment.length - visibleStart.length - visibleEnd.length);
            return visibleStart + secretMiddle + visibleEnd;
        });

        // Junte os segmentos novamente, inserindo os caracteres especiais entre eles
        if (specialCharacter !== undefined) {
            value = '';
            for (let i = 0; i < segments.length; i++) {
                value += segments[i];
                if (i < segments.length - 1) {
                    value += specialCharacter[i % specialCharacter.length];
                }
            }
        }

        return value;
    }

    /**
     * Formats the value as a numeric string.
     * @param {string} value - The value to be formatted.
     * @returns {string} The value formatted as a numeric string.
     */
    public numeric(value: string): string {
        const searchValue = this.isSecret ? /[^\d*]/g : /\D/g;
        return value.replace(searchValue, '');
    }

    /**
     * Formats the value as a letters string.
     * @param {string} value - The value to be formatted.
     * @returns {string} The value formatted as a letters string.
     */
    public letters(value: string): string {
        const searchValue = this.isSecret ? /[^a-zA-Z*]/g : /[^a-zA-Z]/g;
        return value.replace(searchValue, '');
    }

    /**
     * Merges the provided options with the current options.
     * @param {OptionsType} options - The options to be merged.
     * @returns {this} The instance of the class to allow method chaining.
     */
    private mergeOptions(options: OptionsType) {
        this.options = {
            ...this.options,
            ...options
        }

        return this
    }

    /**
     * Handles the numeric formatting of the value.
     * @returns {this} The instance of the class to allow method chaining.
     */
    private handleNumeric() {
        if (this.options.onlyNumbers && !this.options.onlyLetters) {
            this.value = this.numeric(this.value);
        }

        return this
    }

    /**
     * Handles the letter formatting of the value.
     * @returns {this} The instance of the class to allow method chaining.
     */
    private handleLetters() {
        if (this.options.onlyLetters && !this.options.onlyNumbers) {
            this.value = this.letters(this.value);
        }

        return this
    }

    /**
     * Formats the value as a secret string for a specific method.
     * The difference between this method and the secretFrom method is that this method
     * will call the specific method to format the value AFTER applying the secret formatting.
     * @param {string} value - The value to be formatted.
     * @param {SecretOptionsType} options - The secret formatting options.
     * @returns {string} The value formatted as a secret string.
     */
    protected secretFor(value: string, options: SecretOptionsType): string {
        const secretMethodName = this.callerMethodName();
        const secret = this.secret(value, options);
        const methodName = this.removeSecretNameFromMethodName(secretMethodName);
        const method = this[methodName];

        if (!method) return secret;

        this.setIsSecret(true);

        const formattedSecret = this[this.removeSecretNameFromMethodName(secretMethodName)](secret);

        this.setIsSecret(false);
        return formattedSecret;
    }

    /**
     * Formats the value as a secret string from a specific method.
     * The difference between this method and the secretFrom method is that this method
     * will call the specific method to format the value BEFORE applying the secret formatting.
     * @param {string} value - The value to be formatted.
     * @param {SecretOptionsType} options - The secret formatting options.
     * @returns {string} The value formatted as a secret string.
     */
    protected secretFrom(value: string, options: SecretOptionsType): string {
        const secretMethodName = this.callerMethodName();
        const methodName = this.removeSecretNameFromMethodName(secretMethodName);
        const method = this[methodName];

        if (!method) return value;

        const formattedSecret = this[methodName](value);


        const secret = this.secret(formattedSecret, options);

        this.setOriginalValueBucket(value);

        return secret;
    }

    /**
     * Gets the name of the method that called the current method.
     * @returns {string} The name of the method that called the current method.
     */
    private callerMethodName() {
        const stackList = new Error().stack.split('at ')
            .filter((stack) => stack.includes('Format.'));
        const lastValue = stackList[stackList.length - 1];


        return lastValue.split(' ')[0].split('.').pop();
    }

    /**
     * Removes the word 'secret' from the method name.
     * @param {string} methodName - The name of the method.
     * @returns {string} The method name without the word 'secret'.
     */
    private removeSecretNameFromMethodName(methodName: string) {
        const nameWithoutSecret = methodName.replace('secret', '');
        return nameWithoutSecret.charAt(0).toLowerCase() + nameWithoutSecret.slice(1);
    }
}