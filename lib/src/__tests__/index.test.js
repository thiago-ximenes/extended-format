"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
describe('Format', () => {
    test('should format CPF correctly', () => {
        const cpf = '12345678909';
        expect(__1.format.cpf(cpf)).toBe('123.456.789-09');
        expect(__1.format.getValueBeforeFormat('cpf')).toBe(cpf);
    });
    test('should format secret CPF correctly', () => {
        const cpf = '12345678909';
        expect(__1.format.secretCpf(cpf)).toBe('***.456.789-**');
        expect(__1.format.getValueBeforeFormat('cpf')).toBe(cpf);
    });
    test('should format CNPJ correctly', () => {
        const cnpj = '12345678000195';
        expect(__1.format.cnpj(cnpj)).toBe('12.345.678/0001-95');
        expect(__1.format.getValueBeforeFormat('cnpj')).toBe(cnpj);
    });
    test('should format phone number correctly', () => {
        const phone = '1234567890';
        expect(__1.format.phone(phone)).toBe('(12) 3456-7890');
        expect(__1.format.getValueBeforeFormat('phone')).toBe(phone);
    });
    test('should format secret phone number correctly', () => {
        const phone = '12934567890';
        expect(__1.format.secretPhone(phone)).toBe('(**) * ****-7890');
        expect(__1.format.getValueBeforeFormat('phone')).toBe(phone);
    });
    test('should format CEP correctly', () => {
        const cep = '12345678';
        expect(__1.format.cep(cep)).toBe('12345-678');
        expect(__1.format.getValueBeforeFormat('cep')).toBe(cep);
    });
    test('should format secret CEP correctly', () => {
        const cep = '12345678';
        expect(__1.format.secretCep(cep)).toBe('*****-678');
        expect(__1.format.getValueBeforeFormat('cep')).toBe(cep);
    });
    test('should format real currency correctly', () => {
        const currency = '123456';
        expect(__1.format.realCurrency(currency)).toBe('R$ 1.234,56');
        expect(__1.format.getValueBeforeFormat('realCurrency')).toBe(currency);
    });
    test('should format secret real currency correctly', () => {
        const currency = '123456';
        expect(__1.format.secretRealCurrency(currency)).toBe('R$ *****,56');
        expect(__1.format.getValueBeforeFormat('realCurrency')).toBe(currency);
    });
    test('should format percent correctly', () => {
        const percent = '123';
        expect(__1.format.percent(percent)).toBe('1,23%');
        expect(__1.format.getValueBeforeFormat('percent')).toBe(percent);
    });
    test('should format secret percent correctly', () => {
        const percent = '123';
        expect(__1.format.secretPercent(percent)).toBe('*,23%');
        expect(__1.format.getValueBeforeFormat('percent')).toBe(percent);
    });
    test('should set locale correctly', () => {
        const newLocale = 'en-US';
        __1.format.setLocale(newLocale);
        expect(__1.format.percent('123')).toBe('1.23%');
    });
    test('should format card number correctly', () => {
        const cardNumber = '1234567812345678';
        expect(__1.format.cardNumber(cardNumber)).toBe('1234 5678 1234 5678');
        expect(__1.format.getValueBeforeFormat('cardNumber')).toBe(cardNumber);
    });
    test('should format secret card number correctly', () => {
        const cardNumber = '1234567812345678';
        expect(__1.format.secretCardNumber(cardNumber)).toBe('**** **** **** 5678');
        expect(__1.format.getValueBeforeFormat('cardNumber')).toBe(cardNumber);
    });
    test('should format secret email correctly', () => {
        const email = 'example@example.com';
        expect(__1.format.secretEmail(email)).toBe('ex*****@e******.com');
        expect(__1.format.getValueBeforeFormat('email')).toBe(email);
    });
    test('should format OAB correctly', () => {
        const oab = '123456';
        expect(__1.format.oab(oab)).toBe('123.456');
        expect(__1.format.getValueBeforeFormat('oab')).toBe(oab);
    });
    test('should format secret OAB correctly', () => {
        const oab = '123456';
        expect(__1.format.secretOab(oab)).toBe('12*.**6');
        expect(__1.format.getValueBeforeFormat('oab')).toBe(oab);
    });
});
