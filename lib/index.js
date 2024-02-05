"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
const main_1 = __importDefault(require("./src/main"));
class Format extends main_1.default {
    cpf(value) {
        return this.format(value, '###.###.###-##', {
            onlyNumbers: true,
        });
    }
    secretCpf(value) {
        return this.secretFor(value, { start: 3, end: 2, isVisible: false });
    }
    cnpj(value) {
        return this.format(value, '##.###.###/####-##', {
            onlyNumbers: true,
        });
    }
    secretCnpj(value) {
        return this.secretFor(value, { start: 4, end: 3 });
    }
    phone(value) {
        const pattern = value.length === 11 ? '(##) # ####-####' : '(##) ####-####';
        return this.format(value, pattern, {
            onlyNumbers: true,
        });
    }
    secretPhone(value) {
        return this.secretFor(value, { start: 0, end: 4 });
    }
    cep(value) {
        return this.format(value, '#####-###', {
            onlyNumbers: true,
        });
    }
    secretCep(value) {
        return this.secretFor(value, { start: 0, end: 3 });
    }
    realCurrency(value) {
        this.setOriginalValueBucket(value);
        return Intl.NumberFormat(this.locale, {
            style: 'currency',
            currency: 'BRL'
        }).format(Number(this.numeric(value)) / 100).replace(/\u00a0/g, ' ');
    }
    secretRealCurrency(value) {
        return this.secretFrom(value, { start: 1, escapeStart: 2, end: 3, isVisible: true });
    }
    percent(value) {
        this.setOriginalValueBucket(value);
        value = this.numeric(value);
        return Intl.NumberFormat(this.locale, {
            style: 'percent',
            minimumFractionDigits: 2
        }).format((Number(value) / 10000));
    }
    secretPercent(value) {
        return this.secretFrom(value, { start: 0, end: 3, escapeEnd: 1 });
    }
    cardNumber(value) {
        return this.format(value, '#### #### #### ####', {
            onlyNumbers: true,
        });
    }
    secretCardNumber(value) {
        return this.secretFor(value, { start: 0, end: 4 });
    }
    secretEmail(value) {
        return this.special(value, { start: [2, 1], end: 0, specialCharacter: ['@', '.'] });
    }
    oab(value) {
        return this.format(value, '###.###', {
            uppercase: true,
        });
    }
    secretOab(value) {
        return this.secretFor(value, { start: 2, end: 1 });
    }
}
exports.default = Format;
exports.format = new Format();
