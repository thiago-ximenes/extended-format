import BaseFormat from "./src/main";

class Format extends BaseFormat {
    cpf(value: string): string {
        return this.format(value, '###.###.###-##', {
            onlyNumbers: true,
        });
    }

    secretCpf(value: string): string {
        return this.secretFor(value, {start: 3, end: 2, isVisible: false});
    }

    cnpj(value: string): string {
        return this.format(value, '##.###.###/####-##', {
            onlyNumbers: true,
        });
    }

    secretCnpj(value: string): string {
        return this.secretFor(value, {start: 4, end: 3});
    }

    phone(value: string): string {
        const pattern = value.length === 11 ? '(##) # ####-####' : '(##) ####-####';

        return this.format(value, pattern, {
            onlyNumbers: true,
        });
    }

    secretPhone(value: string): string {
        return this.secretFor(value, {start: 0, end: 4});
    }

    cep(value: string): string {
        return this.format(value, '#####-###', {
            onlyNumbers: true,
        });
    }

    secretCep(value: string): string {
        return this.secretFor(value, {start: 0, end: 3});
    }

    realCurrency(value: string): string {
        this.setOriginalValueBucket(value);
        return Intl.NumberFormat(this.locale, {
            style: 'currency',
            currency: 'BRL'
        }).format(Number(this.numeric(value)) / 100).replace(/\u00a0/g, ' ');
    }

    secretRealCurrency(value: string): string {
        return this.secretFrom(value, {start: 1, escapeStart: 2, end: 3, isVisible: true})
    }

    percent(value: string): string {
        this.setOriginalValueBucket(value);
        value = this.numeric(value);
        return Intl.NumberFormat(this.locale, {
            style: 'percent',
            minimumFractionDigits: 2
        }).format((Number(value) / 10000));
    }

    secretPercent(value: string): string {
        return this.secretFrom(value, {start: 0, end: 3, escapeEnd: 1});
    }

    cardNumber(value: string): string {
        return this.format(value, '#### #### #### ####', {
            onlyNumbers: true,
        });
    }

    secretCardNumber(value: string): string {
        return this.secretFor(value, {start: 4, end: 4, isVisible: false});
    }

    secretEmail(value: string): string {
        return this.specialSecret(value, {start: [2, 1], end: 0, specialCharacter: ['@', '.']});
    }
}

export default Format;

export const format = new Format();