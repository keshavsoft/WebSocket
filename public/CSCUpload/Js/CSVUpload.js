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
            const jsonArray = convertCsvToJsonFunction(csvData);

            let JsonStrfey = JSON.stringify(jsonArray);
            let CsvintoJson = await LocalFetchFunc({ inBody: JsonStrfey });
            console.log("CsvintoJson:", CsvintoJson);
        };

        reader.readAsText(file);
    } else {
        alert('Please select a CSV file.');
    };



}

let convertCsvToJsonFunction = (csvData) => {
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