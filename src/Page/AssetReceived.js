import { Fragment, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import DateTimePicker from 'react-datetime-picker';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
//import QR from '../img/qr.jpg'

function AssetReceived() {
    const { user } = useSelector((store) => store.auth);

    const [validated, setValidated] = useState(false);

    const [successShow, setSuccessShow] = useState(false);

    const handleSuccessClose = () => setSuccessShow(false);
    const handleSuccessShow = () => setSuccessShow(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showBarcode, setShowBarcode] = useState(false);

    const barcodeHandleClose = () => setShowBarcode(false);
    const barcodeHandleShow = () => setShowBarcode(true);

    const [barcodeData, setBarcodeData] = useState(null);

    const name = user?.displayName || 'ABC XYZ';
    const initData = {
        employeeId: user.uid || 'EMP0001',
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        laptopIdCheckbox: false,
        laptopId: '',
        desktopIdCheckbox: false,
        desktopId: '',
        hotspotIdCheckbox: false,
        hotspotId: '',
        confirmCheckbox: false,
        confirmCheckboxDisabled: true,
    };
    const [data, setData] = useState(initData);

    const {
        employeeId,
        firstName,
        lastName,
        laptopIdCheckbox,
        laptopId,
        desktopIdCheckbox,
        desktopId,
        hotspotIdCheckbox,
        hotspotId,
        // dateReceived,
        confirmCheckbox,
        confirmCheckboxDisabled,
    } = data;

    const [date, setDate] = useState(new Date());

    console.log(date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDay()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2))

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        console.log(date)
        if (event.currentTarget.checkValidity() !== false) {
            axios.post('http://76460a4c166740e580e04ca6aa327ce1-135032738.us-east-1.elb.amazonaws.com/asset/asset', {
                "empID": data.employeeId,
                "firstName": data.firstName,
                "lastName": data.lastName,
                "laptopID": data.laptopId,
                "desktopID": data.desktopId,
                "hotspotID": data.hotspotId,
                "Datereceived": date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDay()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2),
            })
                .then(function (response) {
                    handleSuccessShow();
                    setDate(new Date());
                    setData(initData);
                    console.log(response);
                })
                .catch(function (error) {
                    handleShow();
                    console.log(error);
                });
        }
    };

    return (
        <Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Asset Shipment Failed</Modal.Title>
                </Modal.Header>
                <Modal.Body>Try after some time or Contact system administrator</Modal.Body>
            </Modal>
            <Modal show={successShow} onHide={handleSuccessClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Asset shipment posted successfully</Modal.Body>
            </Modal>
            <Row className='justify-content-center m-5'>
                <Col md={5}>
                    <h1 className="text-center mb-4 text-white">Asset Shipment</h1>
                    <Card className="pop-size">
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="employeeId">
                                        <Form.Label>Employee ID</Form.Label>
                                        <Form.Control
                                            name="employeeId"
                                            type="text"
                                            placeholder="Employee ID"
                                            defaultValue={employeeId}
                                            readOnly
                                            disabled
                                        />
                                    </Form.Group>
                                </Row>
                                <Form.Label>Employee Name</Form.Label>
                                <Row>
                                    <Form.Group as={Col} md="6" controlId="firstName" className="mb-3">
                                        <Form.Control
                                            name="firstName"
                                            type="text"
                                            placeholder="First name"
                                            defaultValue={firstName}
                                            readOnly
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="lastName" className="mb-3">
                                        <Form.Control
                                            name="lastName"
                                            type="text"
                                            placeholder="Last name"
                                            defaultValue={lastName}
                                            readOnly
                                            disabled
                                        />
                                    </Form.Group>
                                </Row>
                                <Form.Label>Asset Received</Form.Label>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="3" controlId="laptopCheckbox" className="mb-2 check-box">
                                        <Form.Check
                                            name="laptopCheckbox"
                                            type="checkbox"
                                            id="laptop"
                                            label="Laptop"
                                            checked={laptopIdCheckbox}
                                            onChange={(event) => {
                                                setData({
                                                    ...data,
                                                    laptopIdCheckbox: !laptopIdCheckbox,
                                                    laptopId: '',
                                                    confirmCheckbox: false,
                                                    confirmCheckboxDisabled: true,
                                                });
                                            }}
                                        />
                                    </Form.Group>
                                    <InputGroup as={Col} md="9" controlId="laptopId" className="mb-2">
                                        <Form.Control
                                            name="laptopId"
                                            type="text"
                                            placeholder="Laptop ID"
                                            required={laptopIdCheckbox}
                                            readOnly={!laptopIdCheckbox}
                                            disabled={!laptopIdCheckbox}
                                            value={laptopId}
                                            onChange={(event) => setData({ ...data, laptopId: event.target.value, confirmCheckboxDisabled: event.target.value === '' })}
                                        />
                                        <button required={laptopIdCheckbox}
                                            readOnly={!laptopIdCheckbox}
                                            disabled={!laptopIdCheckbox} className="input-group-text" onClick={barcodeHandleShow}><img src="https://icon-library.com/images/qr-code-icon/qr-code-icon-18.jpg" alt="Altimetrik" width="30px" /></button>
                                        <Form.Control.Feedback type="invalid">
                                            Enter Laptop ID or Scan
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    <Form.Group as={Col} md="3" controlId="desktopCheckbox" className="mb-2 check-box">
                                        <Form.Check
                                            name="desktopCheckbox"
                                            type="checkbox"
                                            id="desktop"
                                            label="Desktop"
                                            checked={desktopIdCheckbox}
                                            onChange={(event) => {
                                                console.log(laptopId, laptopIdCheckbox);
                                                setData({
                                                    ...data,
                                                    desktopIdCheckbox: !desktopIdCheckbox,
                                                    desktopId: '',
                                                    confirmCheckbox: false,
                                                    confirmCheckboxDisabled: true,
                                                });
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="9" controlId="desktopId" className="mb-2">
                                        <Form.Control
                                            name="desktopId"
                                            type="text"
                                            placeholder="Desktop ID"
                                            required={desktopIdCheckbox}
                                            readOnly={!desktopIdCheckbox}
                                            disabled={!desktopIdCheckbox}
                                            value={desktopId}
                                            onChange={(event) => setData({ ...data, desktopId: event.target.value, confirmCheckboxDisabled: event.target.value === '' })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Enter Desktop ID
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="hotspotCheckbox" className="mb-2 check-box">
                                        <Form.Check
                                            name="hotspotCheckbox"
                                            type="checkbox"
                                            id="hotspot"
                                            label="Hotspot"
                                            checked={hotspotIdCheckbox}
                                            onChange={(event) => setData({
                                                ...data,
                                                hotspotIdCheckbox: !hotspotIdCheckbox,
                                                hotspotId: '',
                                                confirmCheckbox: false,
                                                confirmCheckboxDisabled: true,
                                            })}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="9" controlId="hotspotId" className="mb-2">
                                        <Form.Control
                                            name="hotspotId"
                                            type="text"
                                            placeholder="Hotspot ID"
                                            required={hotspotIdCheckbox}
                                            readOnly={!hotspotIdCheckbox}
                                            disabled={!hotspotIdCheckbox}
                                            value={hotspotId}
                                            onChange={(event) => setData({ ...data, hotspotId: event.target.value, confirmCheckboxDisabled: event.target.value === '' })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Enter Hotspot ID
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="receivedDate">
                                        <Form.Label>Date Received</Form.Label>
                                        <DateTimePicker
                                            onChange={setDate}
                                            value={date}
                                            className="form-control"
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="confirmCheckbox">
                                        <Form.Check
                                            name="confirmCheckbox"
                                            type="checkbox"
                                            id="confirm"
                                            label="I confirm product delivered in good condition"
                                            checked={confirmCheckbox}
                                            // readOnly={!laptopIdCheckbox && !desktopIdCheckbox && !hotspotIdCheckbox}
                                            disabled={confirmCheckboxDisabled}
                                            onChange={(event) => setData({ ...data, confirmCheckbox: !confirmCheckbox })}
                                        />
                                    </Form.Group>
                                </Row>
                                <div className="d-flex justify-content-between form-button">
                                    <Button type="button" onClick={() => {
                                        setData(initData);
                                        setDate(new Date());
                                    }}>Reset</Button>      
                                    <Button type="submit" disabled={!confirmCheckbox}>Submit</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={showBarcode} onHide={barcodeHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Scan code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BarcodeScannerComponent
                        width="100%"
                        height="100%"
                        onUpdate={(err, result) => {
                            if (result) { setBarcodeData(result.getText()); }
                        }}
                    />
                    <h1 className="mt-3">{barcodeData}</h1>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={barcodeHandleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        setData({ ...data, laptopId: barcodeData, confirmCheckboxDisabled: !barcodeData });
                        setBarcodeData(null);
                        barcodeHandleClose();
                    }}>
                        Done
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default AssetReceived;