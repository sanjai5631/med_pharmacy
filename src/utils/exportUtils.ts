import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ExportColumn {
  id: string;
  label: string;
}

export const exportToExcel = (data: any[], columns: ExportColumn[], filename: string = 'export') => {
  const filteredData = data.map((item) => {
    const row: any = {};
    columns.forEach((col) => {
      if (col.id !== 'actions') {
        row[col.label] = item[col.id];
      }
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToPDF = (data: any[], columns: ExportColumn[], filename: string = 'export') => {
  const doc = new jsPDF();
  const tableColumn = columns.filter(c => c.id !== 'actions').map(c => c.label);
  const tableRows = data.map((item) => {
    return columns.filter(c => c.id !== 'actions').map(c => item[c.id]);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [99, 102, 241] } // Using primary color
  });

  doc.text(filename, 14, 15);
  doc.save(`${filename}.pdf`);
};

export const printData = (data: any[], columns: ExportColumn[], title: string = 'Report') => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const headerHtml = columns.filter(c => c.id !== 'actions').map(c => `<th>${c.label}</th>`).join('');
  const bodyHtml = data.map(item => `
    <tr>
      ${columns.filter(c => c.id !== 'actions').map(c => `<td>${item[c.id]}</td>`).join('')}
    </tr>
  `).join('');

  printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-family: sans-serif; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          h1 { font-family: sans-serif; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <table>
          <thead><tr>${headerHtml}</tr></thead>
          <tbody>${bodyHtml}</tbody>
        </table>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};
