const StartFunc = () => {
    let ButtonClickId = "ButtonClickId";
    let JVarLocalButtonClickId = document.getElementById(ButtonClickId);

    JVarLocalButtonClickId.addEventListener("click", LocalFunc)

};

const LocalFunc = () => {
    const input = document.getElementById('csvFileInput');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = async function (e) {
            const csvData = e.target.result;

            // Assuming you have a function convertCsvToJson defined
            const jsonArray = convertCsvToJsonFunction(csvData);

            let JsonStrfey = JSON.stringify(jsonArray);
            let CsvintoJson = await LocalFetchFunc({ inBody: JsonStrfey });
            console.log("CsvintoJson:", CsvintoJson);
            let Showdiv = document.getElementById("ShowId");
            Showdiv.innerHTML = JsonStrfey;

            // You can then use the jsonArray as needed (e.g., display, send to server, etc.)
        };

        reader.readAsText(file);
    } else {
        alert('Please select a CSV file.');
    };



}

let convertCsvToJsonFunction = (csvData) => {
    // Use your preferred CSV to JSON conversion method here
    // Example: Using papaparse
    const parsedData = Papa.parse(csvData, { header: true });
    return parsedData.data;
}

const LocalFetchFunc = async ({ inBody }) => {
    let jVarLocalFetchUrl = `/Csv`;
    let jVarLocalFetchHeaders = {
        "method": "post",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        "body": inBody
    }
    let response = await fetch(jVarLocalFetchUrl, jVarLocalFetchHeaders);
    let data = await response.json();

    return await data;
};




StartFunc();