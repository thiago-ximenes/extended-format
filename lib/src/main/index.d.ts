import OptionsType from "../types/options-type";
import SecretOptionsType from "../types/secret-options-type";
import OriginalValueBucket from "../types/original-value-bucket-type";
import Locale from "../types/locales-type";
import SpecialSecretOptionsType from "../types/special-secret-options-type";
export default abstract class BaseFormat {
    protected options: OptionsType;
    protected isSecret: boolean;
    protected value: string;
    protected locale: Locale;
    protected originalValueBucket: Record<OriginalValueBucket, string>;
    /**
     * Returns the original value before formatting.
     * @param {OriginalValueBucket} key - The key of the original value.
     * @returns {string} The original value before formatting.
     */
    getValueBeforeFormat(key: OriginalValueBucket): string;
    /**
     * Sets the locale for formatting.
     * @param {Locale} locale - The locale for formatting.
     * @returns {this} The instance of the class to allow method chaining.
     */
    setLocale(locale: Locale): this;
    /**
     * Sets the original value before formatting.
     * @param {string} value - The original value.
     * @param {string} [key] - The key to store the original value.
     */
    setOriginalValueBucket(value: string, key?: string): void;
    /**
     * Sets the options for formatting.
     * @param {OptionsType} options - The options for formatting.
     * @returns {this} The instance of the class to allow method chaining.
     */
    protected setOptions(options: OptionsType): this;
    /**
     * Sets whether the formatting should be secret.
     * @param {boolean} isSecret - Whether the formatting should be secret.
     * @returns {this} The instance of the class to allow method chaining.
     */
    protected setIsSecret(isSecret: boolean): this;
    /**
     * Toggles whether the formatting should be secret.
     * @returns {this} The instance of the class to allow method chaining.
     */
    protected toggleIsSecret(): this;
    /**
     * Clears the formatting options.
     * @returns {this} The instance of the class to allow method chaining.
     */
    protected clearOptions(): this;
    /**
     * Sets the value for formatting.
     * @param {string} value - The value for formatting.
     * @returns {this} The instance of the class to allow method chaining.
     */
    protected setValue(value: string): this;
    /**
     * Formats the value according to the provided pattern and options.
     * @param {string} value - The value to be formatted.
     * @param {string} pattern - The formatting pattern.
     * @param {OptionsType} options - The formatting options.
     * @param {string} [key] - The key to store the original value.
     * @returns {string} The formatted value.
     */
    format(value: string, pattern: string, options: OptionsType, key?: string): string;
    /**
     * Formats the value as a secret string.
     * @param {string} value - The value to be formatted.
     * @param {SecretOptionsType} secretOptions - The secret formatting options.
     * @param {string} [key] - The key to store the original value.
     * @returns {string} The value formatted as a secret string.
     */
    secret(value: string, secretOptions: SecretOptionsType, key?: string): string;
    /**
     * Formats the value as a special secret string.
     * @param {string} value - The value to be formatted.
     * @param {SpecialSecretOptionsType} secretOptions - The special secret formatting options.
     * @param {string} [key] - The key to store the original value.
     * @returns {string} The value formatted as a special secret string.
     */
    special(value: string, secretOptions: SpecialSecretOptionsType, key?: string): string;
    /**
     * Formats the value as a numeric string.
     * @param {string} value - The value to be formatted.
     * @returns {string} The value formatted as a numeric string.
     */
    numeric(value: string): string;
    /**
     * Formats the value as a letters string.
     * @param {string} value - The value to be formatted.
     * @returns {string} The value formatted as a letters string.
     */
    letters(value: string): string;
    /**
     * Formats the value as an uppercase string.
     * @param {string} value - The value to be formatted.
     * @returns {string} The value formatted as an uppercase string.
     */
    uppercase(value: string): string;
    /**
     * Formats the value as a lowercase string.
     * @param {string} value - The value to be formatted.
     * @returns {string} The value formatted as a lowercase string.
     */
    lowercase(value: string): string;
    /**
     * Merges the provided options with the current options.
     * @param {OptionsType} options - The options to be merged.
     * @returns {this} The instance of the class to allow method chaining.
     */
    private mergeOptions;
    /**
     * Handles the numeric formatting of the value.
     * @returns {this} The instance of the class to allow method chaining.
     */
    private handleNumeric;
    /**
     * Handles the letter formatting of the value.
     * @returns {this} The instance of the class to allow method chaining.
     */
    private handleLetters;
    /**
     * Handles the uppercase formatting of the value.
     * @returns {this} The instance of the class to allow method chaining.
     * @private
     */
    private handleUppercase;
    /**
     * Handles the lowercase formatting of the value.
     * @returns {this} The instance of the class to allow method chaining.
     * @private
     */
    private handleLowercase;
    /**
     * Formats the value as a secret string for a specific method.
     * The difference between this method and the secretFrom method is that this method
     * will call the specific method to format the value AFTER applying the secret formatting.
     * @param {string} value - The value to be formatted.
     * @param {SecretOptionsType} options - The secret formatting options.
     * @returns {string} The value formatted as a secret string.
     */
    protected secretFor(value: string, options: SecretOptionsType): string;
    /**
     * Formats the value as a secret string from a specific method.
     * The difference between this method and the secretFrom method is that this method
     * will call the specific method to format the value BEFORE applying the secret formatting.
     * @param {string} value - The value to be formatted.
     * @param {SecretOptionsType} options - The secret formatting options.
     * @returns {string} The value formatted as a secret string.
     */
    protected secretFrom(value: string, options: SecretOptionsType): string;
    /**
     * Gets the name of the method that called the current method.
     * @returns {string} The name of the method that called the current method.
     */
    private callerMethodName;
    /**
     * Removes the word 'secret' from the method name.
     * @param {string} methodName - The name of the method.
     * @returns {string} The method name without the word 'secret'.
     */
    private removeSecretNameFromMethodName;
}
