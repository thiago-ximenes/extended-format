# Extended Format

# Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
  - [CPF](#cpf)
  - [Secret CPF](#secret-cpf)
  - [CNPJ](#cnpj)
  - [Secret CNPJ](#secret-cnpj)
  - [Phone Number](#phone-number)
  - [Secret Phone Number](#secret-phone-number)
  - [CEP](#cep)
  - [Secret CEP](#secret-cep)
  - [BRL Currency](#brl-currency)
  - [Secret BRL Currency](#secret-brl-currency)
  - [Percentage](#percentage)
  - [Secret Percentage](#secret-percentage)
  - [Card Number](#card-number)
  - [Secret Card Number](#secret-card-number)
  - [Secret Email](#secret-email)
- [Creating Custom Formats](#creating-custom-formats)
  - [Options](#options)
- [Creating Custom Secret Formats](#creating-custom-secret-formats)
- [Creating Custom Special Secret Formats](#creating-custom-special-secret-formats)
- [Getting the Original Value](#getting-the-original-value)
- [Extending Formats](#extending-formats)
- [Protected Methods](#protected-methods)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This package provides a set of formatting utilities for various types of data, such as CPF, CNPJ, phone numbers, CEP,
currency, percentages, credit card numbers, and emails. It also includes methods for creating secret versions of these
formats.

## Installation

You can install this package using npm or yarn:

```bash
npm install extended-format
```

or

```bash
yarn add extended-format
```

## Usage

First, import the format object from the package:

```javascript
import {format} from 'extended-format';
```

Then, you can use the methods provided by the package to format your data:

### CPF

```javascript
const cpf = format.cpf('12345678909');
console.log(cpf); // Outputs: 123.456.789-09
console.log(format.getValueBeforeFormat('cpf')); // Outputs: 12345678909
```

### Secret CPF

```javascript
const secretCpf = format.secretCpf('12345678909');
console.log(secretCpf); // Outputs: ***.456.789-**
```

### CNPJ

```javascript
const cnpj = format.cnpj('12345678901234');
console.log(cnpj); // Outputs: 12.345.678/9012-34
```

### Secret CNPJ

```javascript
const secretCnpj = format.secretCnpj('12345678000195');
console.log(secretCnpj); // Outputs: ****.5678/0001-***
```

### Phone Number

```javascript
const phone = format.phone('11999999999');
console.log(phone); // Outputs: (11) 99999-9999
```

### Secret Phone Number

```javascript
const secretPhone = format.secretPhone('1234567890');
console.log(secretPhone); // Outputs: (**) ****-7890
```

### CEP

```javascript
const cep = format.cep('12345678');
console.log(cep); // Outputs: 12345-678
```

### Secret CEP

```javascript
const secretCep = format.secretCep('12345678');
console.log(secretCep); // Outputs: *****-678
```

### BRL Currency

```javascript
const realCurrency = format.realCurrency('123456');
console.log(realCurrency); // Outputs: R$ 1.234,56
```

### Secret BRL Currency

```javascript
const secretRealCurrency = format.secret
RealCurrency('123456');
console.log(secretRealCurrency); // Outputs: R$ ***,56 
```

### Percentage

```javascript
const percent = format.percent('123456');
console.log(percent); // Outputs: 1234,56%
```

### Secret Percentage

```javascript
const secretPercent = format.secretPercent('123456');
console.log(secretPercent); // Outputs: **,56%
```

### Card Number

```javascript
const cardNumber = format.cardNumber('1234567812345678');
console.log(cardNumber); // Outputs: 1234 5678 1234 5678
```

### Secret Card Number

```javascript
const secretCardNumber = format.secretCardNumber('1234567812345678');
console.log(secretCardNumber); // Outputs: **** **** **** 5678
```

### Secret Email

```javascript
const secretEmail = format.secretEmail('example@example.com');
console.log(secretEmail); // Outputs: ex*****@e******.com
```

### OAB

```javascript
const oab = format.oab('123456');
console.log(oab); // Outputs: 123456
```

### Secret OAB

```javascript
const secret = format.secretOab('123456');
console.log(secret); // Outputs: ******
```

## Creating Custom Formats

You can create custom formats by using the `format` method. This method receives a string with the pattern and returns a
formatted string.

```javascript
const customFormat = format.format('12345678901', '###.###.###-##');
console.log(customFormat); // Outputs: 123.456.789-01
```

### Options

The third parameter of the `format` method is an object with options. The following options are available:

- onlyNumbers: If set to true, only numbers will be considered for formatting. Default is false.
- patternSeparator: Defines the character used to separate the pattern. Default is #.
- onlyLetters: If set to true, only letters will be considered for formatting. Default is false.
- uppercase: If set to true, the letters will be converted to uppercase. Default is false.
- lowercase: If set to true, the letters will be converted to lowercase. Default is false.

```javascript
const customFormat = format.format('12345asd678dasd901', '###.###.###-##', {onlyNumbers: true});
console.log(customFormat); // Outputs: 123.456.789-01
```

```javascript
const customFormat = format.format('12345678901', '@@@.@@@.@@@-@@', {patternSeparator: '@'});
console.log(customFormat); // Outputs: 123.456.789-01
```

```javascript
const customFormat = format.format('12345asd678dasd901', '###.###.#', {onlyLetters: true});
console.log(customFormat); // Outputs: asd.das.d
```

As the last parameter is a key name, it sets the name of the key of original value in the bucket.

```javascript
const customFormat = format.format('12345678901', '###.###.###-##', 'cpf');
console.log(customFormat); // Outputs: 123.456.789-01
console.log(format.getValueBeforeFormat('cpf')); // Outputs: 12345678901
```

## Creating Custom Secret Formats

The method `secret` is used to format a string in a way that part of it is replaced by asterisks (*), making it "
secret".
It accepts three parameters: value, secretOptions, and key. The secretOptions parameter is an object that can have the
following properties:

- start: The number of characters at the start of the string that should not be replaced by asterisks.
- isVisible: If set to true, the characters between the start and end will be replaced by asterisks. If set to false,
  the characters at the start and end will be replaced by asterisks. Default is true.
- end: The number of characters at the end of the string that should not be replaced by asterisks.
- escapeStart: The number of additional characters at the start of the string that should be replaced by asterisks.
- escapeEnd: The number of additional characters at the end of the string that should be replaced by asterisks.
- specialCharacter: An array of special characters that should be replaced by asterisks.

```javascript
const secret = format.secret('1234567890', {start: 2, end: 2});
console.log(secret); // Outputs: "**345678**"
```

```javascript
const secret = format.secret('1234567890', {start: 2, end: 2, isVisible: true});
console.log(secret); // Outputs: "12******90" 
```

```javascript
const secret = format.secret('123-456-7890', {start: 2, end: 2, specialCharacter: ['-']});
console.log(secret); // Outputs: "**3-456-78**"
```

## Creating Custom Special Secret Formats

The `specialSecret` method is used to format a string in a way that part of it is replaced by asterisks (*), making it "
secret". This method accepts three parameters: value, secretOptions, and key. The value is the string that you want to
format. The secretOptions is an object that can have the following properties:  
start: An array or a single number indicating the number of characters at the start of each segment that should not be
replaced by asterisks.
end: An array or a single number indicating the number of characters at the end of each segment that should not be
replaced by asterisks.
specialCharacter: An array of special characters that should be preserved and used to split the string into segments.
The method works by first splitting the value into segments based on the specialCharacter. Then, for each segment, it
replaces the middle part with asterisks, preserving the start and end characters. Finally, it joins the segments back
together, inserting the specialCharacter between them. The key parameter is optional and is used to store the original
value before formatting.

```javascript
const secret = format.special('example@example.com', {start: [2, 1], end: 0, specialCharacter: ['@', '.']});
console.log(secret); // Outputs: "ex****@e****.com"
```

## Getting the Original Value

The `getValueBeforeFormat` method is used to get the original value before formatting. It accepts a key parameter that
is the name of the key of the original value in the bucket.

```javascript
format.format('12345678901', '###.###.###-##', 'cpf');
console.log(format.getValueBeforeFormat('cpf')); // Outputs: 12345678901
```

For default, the key is the name of the method used to format the value if you use the method of the class custom or
not.

```javascript
// For method of class

const cpf = format.cpf('12345678901');
console.log(cpf); // Outputs: 123.456.789-01
console.log(format.getValueBeforeFormat('cpf')); // Outputs: 12345678901
```

## Extending Formats

You can extend the formats provided by the package by adding new methods to the format object. For example, you can add
a method to format a passport number:

```javascript
import Format from 'extended-format';

class MyFormat extends Format {
    passport(value) {
        return this.format(value, '####-####');
    }
}

const format = new MyFormat();
const passport = format.passport('AB123456');
console.log(passport); // Outputs: AB12-3456
```

## Protected Methods

The recommended way to extend the formats provided by the package is to create a new class that extends the Format
class. Local custom methods are good for asap solutions, but if you want to use the same method in different places, it
is better to create a new class.

For it, you can use the protected methods of the class Format to facilitate the creation of new methods.

You also can override the protected methods to change the behavior of the class.

The protected methods are:

- secretFor: Formats a string in a way that part of it is replaced by asterisks (*), making it "secret". This method get
  an already existing method with the same name and add the secret options to it.

```javascript
import Format from 'extended-format';

class MyFormat extends Format {
    secretCpf(value) {
        return this.secretFor(value, {start: 3, end: 2});
    }
}

const format = new MyFormat();
const secret = format.secretCpf('12345678901');

console.log(secret); // Outputs: ***.456.789-**
```

Because of format.cpf already exists, the method cpfSecret use it behind the scenes and add the secret options to it.
To use this approach, you need to create the new method starting with the word secret and the name of the method that
you want to use behind the scenes.

Important to say that the method `secretFor` is for methods that use `format` method behind the scenes.

- secretFrom: Formats a string in a way that part of it is replaced by asterisks (*), making it "secret". This method
  get an already existing method with the same name and add the secret options to it. The difference between `secretFor`
  and `secretFrom` is that `secretFrom` is for methods that don't use `format` method behind the scenes like Intl
  methods for example. We don't need to reinvent the wheel, we just need to add the secret options to it.

```javascript
import Format from 'extended-format';

class MyFormat extends Format {

  secretCurrency(value) {
    return this.secretFrom(value, {start: 1, escapeStart: 2, end: 3, isVisible: true});
  }
}

const format = new MyFormat();

const secret = format.secretCurrency('123456');

console.log(secret); // Outputs: R$ ***,56
```


## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This package is licensed under the MIT license.