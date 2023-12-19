const StartFunc = () => {

        let csvData = [];

        function handleFileSelect(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const csv = e.target.result;
                    csvData = CSVToArray(csv);
                    displayCSV();
                };
                reader.readAsText(file);
            }
        }

        function CSVToArray(strData, strDelimiter) {
            strDelimiter = strDelimiter || ',';

            const objPattern = new RegExp(
                (
                    // Delimiters.
                    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                    // Quoted fields.
                    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                    // Standard fields.
                    "([^\"\\" + strDelimiter + "\\r\\n]*))"
                ),
                "gi"
            );

            const arrData = [[]];
            let arrMatches = null;

            while (arrMatches = objPattern.exec(strData)) {
                const strMatchedDelimiter = arrMatches[1];
                if (strMatchedDelimiter.length && (strMatchedDelimiter !== strDelimiter)) {
                    arrData.push([]);
                }

                let strMatchedValue;
                if (arrMatches[2]) {
                    strMatchedValue = arrMatches[2].replace(
                        new RegExp("\"\"", "g"),
                        "\""
                    );
                } else {
                    strMatchedValue = arrMatches[3];
                }

                arrData[arrData.length - 1].push(strMatchedValue);
            }

            return arrData;
        }

        function displayCSV() {
            const table = document.getElementById('csvTable');
            table.innerHTML = '';

            for (let i = 0; i < csvData.length; i++) {
                const row = table.insertRow();
                for (let j = 0; j < csvData[i].length; j++) {
                    const cell = row.insertCell();
                    cell.textContent = csvData[i][j];
                }
            }
        }

        function downloadXLSM() {
            const xlsContent = generateXLSM();
            const blob = new Blob([xlsContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'output.xlsm';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function generateXLSM() {
            // You need to implement the XLSM generation logic here
            // You can use libraries like SheetJS (https://sheetjs.com/) for this purpose
            // This example does not include the XLSM generation logic
            alert('XLSM generation logic is not implemented in this example.');
            return '';
        }
};

export { StartFunc }