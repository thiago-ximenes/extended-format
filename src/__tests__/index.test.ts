import {format} from '../..';

describe('Format', () => {
    test('should format CPF correctly', () => {
        const cpf = '12345678909';
        expect(format.cpf(cpf)).toBe('123.456.789-09');
        expect(format.getValueBeforeFormat('cpf')).toBe(cpf);
    });

    test('should format CNPJ correctly', () => {
        const cnpj = '12345678000195';
        expect(format.cnpj(cnpj)).toBe('12.345.678/0001-95');
        expect(format.getValueBeforeFormat('cnpj')).toBe(cnpj);
    });

    test('should format phone number correctly', () => {
        const phone = '1234567890';
        expect(format.phone(phone)).toBe('(12) 3456-7890');
        expect(format.getValueBeforeFormat('phone')).toBe(phone);
    });

    test('should format CEP correctly', () => {
        const cep = '12345678';
        expect(format.cep(cep)).toBe('12345-678');
        expect(format.getValueBeforeFormat('cep')).toBe(cep);
    });

    test('should format real currency correctly', () => {
        const currency = '1234.56';
        expect(format.realCurrency(currency)).toBe('R$ 1.234,56');
        expect(format.getValueBeforeFormat('currency')).toBe(currency);
    });

    test('should format percent correctly', () => {
        const percent = '123';
        expect(format.percent(percent)).toBe('1,23%');
        expect(format.getValueBeforeFormat('percent')).toBe(percent);
    });

    test('should set locale correctly', () => {
        const newLocale = 'en-US';
        format.setLocale(newLocale);
        expect(format.percent('123')).toBe('1.23%');
    });
});