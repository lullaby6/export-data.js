const exportData = {
    title: (title = '', date = false) => `${title ? `${title} ` : ''}${(title && date) ? ' - ' : ''} ${date ? (new Date()).toLocaleDateString() : ''}`,
    file: (title = '') => `${title ? `${title} - ` : ''}${(new Date()).toLocaleDateString()}`,
    dataToCSV: data => {
        const headers = Object.keys(data[0]);
        const row = data.map(row =>
            Object.values(row).join(",")
        );
        return [headers.join(","), ...row].join("\n");
    },
    printHTML : (html, title, date) => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow || iframe.contentDocument;

        doc.document.open();
        doc.document.write(`
            <html>
            <head>
                ${title ? `<title>${title}</title>` : ''}
                <style>
                    body {
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }
                    th, td {
                        padding: 8px;
                        text-align: left;
                        border: 1px solid #000;
                    }
                    h1 {
                        text-align: center;
                        font-size: 24px;
                        font-weight: 400;
                    }
                    img {
                        width: 100%;
                    }
                </style>
            </head>
            <body onload="this.focus(); this.print();">
                ${(title || date) ? `<h1>${exportData.title(title, date)}</h1>` : ''}
                ${html}
            </body>
            </html>
        `);
        doc.document.close();

        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    },
    download: (data, title) => {
        const a = document.createElement('a');

        a.href = data;
        a.download = exportData.file(title);

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },
    xlsx: (data, title) => exportData.download(`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8,${encodeURIComponent(exportData.dataToCSV(data))}`, title),
    excel: (data, title) => exportData.xlsx(data, title),
    csv: (data, title) => exportData.download(`data:text/csv;charset=utf-8,${encodeURIComponent(exportData.dataToCSV(data))}`, title),
    json: (data, title) => exportData.download(`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`, title),
    print: (data, title, date) => {
        exportData.printHTML(`
            <table>
                <thead>
                    <tr>
                        ${Object.keys(data[0]).map(header => `<th>${header}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => `
                        <tr>
                            ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `, title, date);
    },
    loadPDF: (data, title, date, theme = 'grid', callback = () => {}) => {
        if (typeof window.jsPDF === 'undefined') {
            try {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js';
                document.head.appendChild(script);

                script.onload = () => {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.min.js';
                    document.head.appendChild(script);

                    script.onload = () => {
                        exportData.loadPDF(data, title, date, theme, callback);
                    }
                };
            } catch (error) {
                console.error(error);
            }

            return;
        }

        const doc = new jsPDF();

        doc.setLineWidth(2);
        doc.setFontSize(16);

        if (title || date) {
            const text = exportData.title(title, date);
            const pageWidth = doc.internal.pageSize.getWidth();
            const titleWidth = doc.getTextWidth(text);
            const x = (pageWidth - titleWidth) / 2;
            doc.text(text, x, 12.5);
        }

        const headers = Object.keys(data[0]);
        const tableData = data.map(row => Object.values(row));

        doc.autoTable({
            head: [headers],
            body: tableData,
            theme: theme,
            startY: (title || date) ? 20 : 10,
        });

        callback(doc);

        return doc
    },
    pdf: (data, title, date, theme = 'grid') => exportData.loadPDF(data, title, date, theme, doc => doc.save(`${exportData.file(title, date)}.pdf`)),
    printPDF: (data, title, date, theme = 'grid') => exportData.loadPDF(data, title, date, theme, doc => {
        const blob = doc.output('blob')
        const url = URL.createObjectURL(blob);

        const pop = window.open(url);

        if (pop) pop.onload = () => {
            pop.print();
            pop.onafterprint = () => {
                pop.close();
                URL.revokeObjectURL(url);
            };

            pop.onbeforeunload = () => {
                pop.close();
                URL.revokeObjectURL(url);
            };

            setTimeout(() => {
                if (!pop.closed) {
                    pop.close();
                    URL.revokeObjectURL(url);
                }
            }, 5000);
        };
    }),
    loadImage: (data, cellWidth = 300) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const cellPadding = 8;
        const cellHeight = 20;
        const totalWidth = cellWidth * Object.keys(data[0]).length;
        const totalHeight = cellHeight * (data.length + 1) + cellPadding * 2;

        canvas.width = totalWidth;
        canvas.height = totalHeight;

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, totalWidth, totalHeight);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(0, 0, totalWidth, totalHeight);

        ctx.font = '14px Arial';
        ctx.fillStyle = '#000';

        const headers = Object.keys(data[0]);
        headers.forEach((header, index) => {
            ctx.fillText(header, cellPadding + index * cellWidth, cellPadding + cellHeight - 12.5);
            ctx.strokeRect(index * cellWidth, 0, cellWidth, cellHeight);
        });

        data.forEach((row, rowIndex) => {
            headers.forEach((header, colIndex) => {
                ctx.fillText(row[header], cellPadding + colIndex * cellWidth, cellPadding + (rowIndex + 2) * cellHeight - 12.5);
                ctx.strokeRect(colIndex * cellWidth, (rowIndex + 1) * cellHeight, cellWidth, cellHeight);
            });
        });

        return canvas.toDataURL('image/png')
    },
    image: (data, title, cellWidth = 300) => exportData.download(exportData.loadImage(data, cellWidth), title),
    printImage: (data, title, date, cellWidth = 300) => {
        const image = exportData.loadImage(data, cellWidth);

        exportData.printHTML(`<img src="${image}">`, title, date);
    },
}

export default exportData