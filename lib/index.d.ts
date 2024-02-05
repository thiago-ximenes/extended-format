import BaseFormat from "./src/main";
declare class Format extends BaseFormat {
    cpf(value: string): string;
    secretCpf(value: string): string;
    cnpj(value: string): string;
    secretCnpj(value: string): string;
    phone(value: string): string;
    secretPhone(value: string): string;
    cep(value: string): string;
    secretCep(value: string): string;
    realCurrency(value: string): string;
    secretRealCurrency(value: string): string;
    percent(value: string): string;
    secretPercent(value: string): string;
    cardNumber(value: string): string;
    secretCardNumber(value: string): string;
    secretEmail(value: string): string;
    oab(value: string): string;
    secretOab(value: string): string;
}
export default Format;
export declare const format: Format;
