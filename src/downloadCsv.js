function downloadCsv(csvData, nombreArchivo) {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.setAttribute('href', url);
    enlace.setAttribute('download', nombreArchivo || 'datos.csv');
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
  }
export default downloadCsv