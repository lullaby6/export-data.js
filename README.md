# export-data.js

## Installation

### NPM

```
npm i export-data.js
```

### CDN

```html
<script src='https://cdn.jsdelivr.net/gh/lullaby6/export-data.js/export-data.min.js'></script>
```

## Usage

### Download file

```js
const products = [
    { id: 1, name: "Laptop", price: 1200, category: "Electronics", stock: 15 },
    { id: 2, name: "Smartphone", price: 800, category: "Electronics", stock: 25 },
    { id: 3, name: "Headphones", price: 100, category: "Accessory", stock: 50 },
    { id: 4, name: "Mouse", price: 25, category: "Accessory", stock: 100 },
    { id: 5, name: "Keyboard", price: 50, category: "Accessory", stock: 80 },
    // ...
]

// download products as json file
exportData.json(products)

// download products as csv file
exportData.csv(products)

// download products as xlsx/excel file
exportData.xlsx(products)

// download products as pdf file
exportData.pdf(products)

// download products as image file (using canvas)
exportData.image(products)
```

### Print

```js
const products = [
    { id: 1, name: "Laptop", price: 1200, category: "Electronics", stock: 15 },
    { id: 2, name: "Smartphone", price: 800, category: "Electronics", stock: 25 },
    { id: 3, name: "Headphones", price: 100, category: "Accessory", stock: 50 },
    { id: 4, name: "Mouse", price: 25, category: "Accessory", stock: 100 },
    { id: 5, name: "Keyboard", price: 50, category: "Accessory", stock: 80 },
    // ...
]

// print products as html table
exportData.print(products)

// print products as pdf table
exportData.printPDF(products)

// print products as canvas image table
exportData.printImage(products)
```