import BaseFormat from "./src/main";

class Format extends BaseFormat {
    protected locale: string = 'pt-BR';

    protected originalValueBucket: Record<string, string> = {}

    setLocale(locale: string): void {
        this.locale = locale;
    }

    getValueBeforeFormat(key: string): string {
        const value = this.originalValueBucket[key];

        if (!value) return '';

        return value;
    }

    cpf(value: string): string {
        this.originalValueBucket['cpf'] = value;
        return this.format(value, '###.###.###-##', {
            onlyNumbers: true,
        });
    }

    cnpj(value: string): string {
        this.originalValueBucket['cnpj'] = value;
        return this.format(value, '##.###.###/####-##', {
            onlyNumbers: true,
        });
    }

    phone(value: string): string {
        this.originalValueBucket['phone'] = value;
        return this.format(value, '(##) ####-####', {
            onlyNumbers: true,
        });
    }

    cep(value: string): string {
        this.originalValueBucket['cep'] = value;
        return this.format(value, '#####-###', {
            onlyNumbers: true,
        });
    }

    realCurrency(value: string): string {
        this.originalValueBucket['currency'] = value;
        return Intl.NumberFormat(this.locale, {style: 'currency', currency: 'BRL'}).format(Number(value)).replace(/\u00a0/g, ' ');
    }

    percent(value: string): string {
        this.originalValueBucket['percent'] = value;
        value = this.numeric(value);
        return Intl.NumberFormat(this.locale, {style: 'percent',  minimumFractionDigits: 2}).format((Number(value) / 100 / 100));
    }
}

export default Format;

export const format = new Format();