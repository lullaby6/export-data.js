# export-data.js

Download/export and print data in various formats, such as JSON, CSV, XLSX (Excel), PDF and images (using canvas).

## Installation

#### NPM

Install the library using NPM:


```bash
npm i export-data.js
```

Import it into your project:

#### CommonJS

```js
import exportData from 'export-data.cjs.js';
```

#### ES Modules

```js
import exportData from 'export-data.esm.js';
```

#### CDN

Add the library directly to your HTML via CDN:

```html
<script src='https://cdn.jsdelivr.net/gh/lullaby6/export-data.js/export-data.cdn.min.js'></script>
```

#### Direct Download

Download the minified version:
- <a href="https://cdn.jsdelivr.net/gh/lullaby6/export-data.js/export-data.cdn.min.js" target="_blank">export-data.cdn.min.js</a>

Include the downloaded file in your project:

```js
<script src="/path/to/export-data.min.js"></script>
```

## Dependencies

The dependencies loaded automatically if not included.

- ```jsPDF``` for PDF generation (v1.5.3).
- ```jsPDF AutoTable``` for table rendering in PDFs (v3.5.6).

## Usage

#### Example data:

```js
const products = [
    { id: 1, name: "Laptop", price: 1200, category: "Electronics", stock: 15 },
    { id: 2, name: "Smartphone", price: 800, category: "Electronics", stock: 25 },
    { id: 3, name: "Headphones", price: 100, category: "Accessory", stock: 50 },
    { id: 4, name: "Mouse", price: 25, category: "Accessory", stock: 100 },
    { id: 5, name: "Keyboard", price: 50, category: "Accessory", stock: 80 },
    // ...
]
```

### Downloading data

#### Download data as JSON file

```js
exportData.json(products, 'products')
```

- **data**: Array to objects to export (e.g ```products```).
- **title**: File name (optional).

#### Download data as CSV file

```js
exportData.csv(products, 'products')
```

- **data**: Array to objects to export (e.g ```products```).
- **title**: File name (optional).

#### Download data as XLSX/Excel file

```js
exportData.xlsx(products, 'products')
```

- **data**: Array to objects to export (e.g ```products```).
- **title**: File name (optional).

#### Download data as PDF file

```js
exportData.pdf(products, 'products', true)
```

- **data**: Array to objects to export (e.g ```products```).
- **title**: Title of the PDF (optional).
- **date**: Boolean to include the current date in the title (optional).

#### Download data as Image (using canvas)

```js
exportData.pdf(products, 'products', true)
```

- **data**: Array to objects to export (e.g ```products```).
- **title**: Title of the PDF (optional).
- **cellWidth**: Width of each cell in the canvas (default: 300px).

### Printing data

The module also allows printing data in HTML, PDF or as a canvas-generated image.

#### Print as HTML Table

```js
exportData.print(products, 'Product List', true)
```

- **data**: Array to objects to export (e.g ```products```).
- **title**: Title in the printed table (optional).
- **date**: Boolean to include the current date in the title (optional).

#### Print as PDF Table

```js
exportData.printPDF(products, 'Product List', true)
```

- **data**: Array to objects to export (e.g ```products```).
- **title**: Title of the PDF table (optional).
- **date**: Boolean to include the current date in the title (optional).
- **theme**: Table style theme (default: 'grid', themes: 'grid', 'striped', 'plain').

#### Print as Image (using canvas)

```js
exportData.printImage(products, 'Product List', true)
```

- **data**: Array to objects to export (e.g ```products```).
- **title**: Title of the printed image (optional).
- **date**: Boolean to include the current date in the title (optional).
- **cellWidth**: Width of each cell in the canvas (default: 300px).