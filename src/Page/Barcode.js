import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

function Barcode() {
    const [data, setData] = React.useState("Not Found");
    const [show, setShow] = React.useState(false);
    return (
        <div>
            <button onClick={() => setShow((st) => !st)}>Toggle</button>
            {show ? (
                <div style={{ maxWidth: 400 }}>
                    <BarcodeScannerComponent
                        width="100%"
                        height="100%"
                        onUpdate={(err, result) => {
                            if (result) setData(result.getText());
                        }}
                    />
                    {console.log("rendering")}
                    <p>{data}</p>
                </div>
            ) : null}
        </div>
    );
}

export default Barcode;
