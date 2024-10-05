# export-data.js

Download/export and print of data in various formats, such as JSON, CSV, XLSX (Excel), PDF and images (using canvas).

## Installation

### NPM

```bash
npm i export-data.js
```

### CDN

```html
<script src='https://cdn.jsdelivr.net/gh/lullaby6/export-data.js/export-data.min.js'></script>
```

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

#### Download data as JSON file

```js
exportData.json(products, 'products')
```

- data: Array to objects to export (e.g ```products```).
- title: File name (optional).