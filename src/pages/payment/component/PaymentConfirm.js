import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button, Col, Modal, Row, Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import PaymentInstruction from './PaymentInstruction';
import { useNavigate } from 'react-router-dom';
import '../styles/paymentconfirm.css'
import '../styles/dropzone.css'

import { Button, Col, Row, Nav, Tab, Tabs } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'

export const PaymentConfirm = (props) => {
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState(null);
    const [inputValue, setInputValue] = useState(0);

    const [inputBankType, setInputBankType] = useState('')
    const [inputNoRek, setInputNoRek] = useState('')
    const [inputTitleBank, setInputTitleBank] = useState('')
    const [changeColor, setChangeColor]=useState(false)

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    };

    const inputRefRekNumber = useRef(null);
    const inputRefTotalPrice = useRef(null);

    const handleCopyText = (inputRef) => {
        if (inputRef.current) {
            inputRef.current.select();
            navigator.clipboard
                .writeText(inputRef.current.value)
                .then(() => {
                    console.log('Text copied to clipboard');
                })
                .catch((error) => {
                    console.error('Failed to copy text:', error);
                });
        }
    };

    const handleCopyRekNumber = () => {
        handleCopyText(inputRefRekNumber);
    };

    const handleCopyTotalPrice = () => {
        handleCopyText(inputRefTotalPrice);
    };


    useEffect(() => {
        const getOrderData = localStorage.getItem('order_detail');
        if (!getOrderData) {
            handleShow();
            return;
        }

        const getOrderDataJson = JSON.parse(getOrderData);
        const bankType = getOrderDataJson.bankType;

        if (bankType === 'BCA') {
            setInputBankType('BCA');
            setInputNoRek('14122331');
            setInputTitleBank('BCA');
        } else if (bankType === 'BNI') {
            setInputBankType('BNI');
            setInputNoRek('1244112323231');
            setInputTitleBank('BNI');
        } else {
            setInputBankType('Mandiri');
            setInputNoRek('52311112');
            setInputTitleBank('MANDIRI');
        }
    }, [navigate]);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setPreviewImage(URL.createObjectURL(file));
        setImage(file);
    }, []);

    const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop });

    const handleClickConfirmation = (e) => {
        e.preventDefault();
        props.handleClick(image);
    };

    const dropzoneStyle = {
        border: '2px dashed #ccc',
        borderRadius: '5px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
    };

    const activeStyle = {
        border: '2px dashed #007bff',
    };

    const acceptStyle = {
        border: '2px dashed #00e676',
    };

    const rejectStyle = {
        border: '2px dashed #ff1744',
    };

    let dropzoneStyleDynamic = { ...dropzoneStyle };
    if (isDragActive) {
        dropzoneStyleDynamic = { ...dropzoneStyleDynamic, ...activeStyle };
    }
    if (isDragAccept) {
        dropzoneStyleDynamic = { ...dropzoneStyleDynamic, ...acceptStyle };
    }
    if (isDragReject) {
        dropzoneStyleDynamic = { ...dropzoneStyleDynamic, ...rejectStyle };
    }


    const [tabKey, initTabKey] = useState(
        'atmbca',
        'mbca',
        'bcaklik',
        'internetbanking'
    )

    return (


    const [bcaTransfer, setBCATransfer] = useState(false);
    const [bniTransfer, setBNITransfer] = useState(false);
    const [mandiriTransfer, setMandiriTransfer] = useState(false);


    const handleBCAClick = (e) => {
        e.preventDefault();
        setBCATransfer(true);
        setBNITransfer(false);
        setMandiriTransfer(false)
        setInputBankType('BCA');
        setInputNoRek('14122331');
        setInputTitleBank('BCA');

    };

    const handleBNIClick = (e) => {
        e.preventDefault();
        setBNITransfer(true);
        setBCATransfer(false);
        setMandiriTransfer(false)
        setInputNoRek('1244112323231');
        setInputTitleBank('BNI');
    };

    const handleMandiriClick = (e) => {
        e.preventDefault();
        setMandiriTransfer(true)
        setBNITransfer(false);
        setBCATransfer(false);
        setInputNoRek('52311112');
        setInputTitleBank('MANDIRI');
    };


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="image_service">
                            <div className="left-content-paymnet">
                                <div className="payment-section reminder-payment">{props.children}</div>
                                <div className="payment-section">
                                    <h5>lakukan transfer ke</h5>
                                    <div className="payment-section-bank">
                                        <Row>
                                            <Col>
                                                <Button variant="light">{inputTitleBank}</Button>
                                            </Col>
                                            <Col>
                                                <p>
                                                    {inputBankType} Transfer
                                                </p>
                                                <p>a.n Binar Car Rental</p>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="coloumn-copy-rek">
                                        <h5>no rekening</h5>
                                        <input ref={inputRefRekNumber} type="text" value={inputNoRek} readOnly />
                                        <button onClick={handleCopyRekNumber}>
                                            <p>copy</p>
                                        </button>
                                    </div>
                                    <div className="coloumn-copy-totalpay">
                                        <h5>total bayar</h5>
                                        <input
                                            ref={inputRefTotalPrice}
                                            type="text"
                                            value={props.data?.total_price}
                                            onChange={handleChange}
                                        />
                                        <button onClick={handleCopyTotalPrice}>
                                            <p>copy</p>
                                        </button>
                                    </div>
                                </div>
                                <div className="payment-section">
                                    <div className="payment-info">
                                        <PaymentInstruction />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='payment-section'>
                            <div className='payment-info'>
                                <h5 >Intruksi Pembayaran</h5>
                                <Nav className='payment-option d-flex gap-5 '>
                                    <Tabs activeKey={tabKey} onSelect={(e) => initTabKey(e)} >
                                        <Tab eventKey="atmbca" title="ATM BCA" >
                                            <div className='payment-detail '>
                                                <ul>
                                                    <li>Masukkan kartu ATM, lalu PIN</li>
                                                    <li>Pilih menu “Transaksi Lainnya” – ‘Transfer” – “Ke Rek BCA Virtual Account”</li>
                                                    <li>Masukkan nomor BCA Virtual Account: 70020+Order ID Contoh: No. Peserta: 12345678, maka ditulis 7002012345678</li>
                                                    <li>Layar ATM akan menampilkan konfirmasi, ikuti instruksi untuk menyelesaikan transaksi</li>
                                                    <li>Ambil dan simpanlah bukti transaksi tersebut</li>
                                                </ul>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="mbca" title="M-BCA">
                                        <div className='payment-detail '>
                                                <ul>
                                                    <li>Masukkan kartu ATM, lalu PIN</li>
                                                    <li>Pilih menu “Transaksi Lainnya” – ‘Transfer” – “Ke Rek BCA Virtual Account”</li>
                                                    <li>Masukkan nomor BCA Virtual Account: 70020+Order ID Contoh: No. Peserta: 12345678, maka ditulis 7002012345678</li>
                                                    <li>Layar ATM akan menampilkan konfirmasi, ikuti instruksi untuk menyelesaikan transaksi</li>
                                                    <li>Ambil dan simpanlah bukti transaksi tersebut</li>
                                                </ul>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="bcaklik" title="BCA Klik">
                                        <div className='payment-detail '>
                                                <ul>
                                                    <li>Masukkan kartu ATM, lalu PIN</li>
                                                    <li>Pilih menu “Transaksi Lainnya” – ‘Transfer” – “Ke Rek BCA Virtual Account”</li>
                                                    <li>Masukkan nomor BCA Virtual Account: 70020+Order ID Contoh: No. Peserta: 12345678, maka ditulis 7002012345678</li>
                                                    <li>Layar ATM akan menampilkan konfirmasi, ikuti instruksi untuk menyelesaikan transaksi</li>
                                                    <li>Ambil dan simpanlah bukti transaksi tersebut</li>
                                                </ul>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="internetbanking" title="Internet Banking">
                                        <div className='payment-detail '>
                                                <ul>
                                                    <li>Masukkan kartu ATM, lalu PIN</li>
                                                    <li>Pilih menu “Transaksi Lainnya” – ‘Transfer” – “Ke Rek BCA Virtual Account”</li>
                                                    <li>Masukkan nomor BCA Virtual Account: 70020+Order ID Contoh: No. Peserta: 12345678, maka ditulis 7002012345678</li>
                                                    <li>Layar ATM akan menampilkan konfirmasi, ikuti instruksi untuk menyelesaikan transaksi</li>
                                                    <li>Ambil dan simpanlah bukti transaksi tersebut</li>
                                                </ul>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </Nav>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show}>
                <Modal.Header >
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="bank-option">
                        <div>
                            <Row>
                                <Col>
                                    <Button
                                        variant="light"
                                        onClick={handleBCAClick}

                                    >BCA</Button>
                                </Col>
                                <Col>
                                    <p>BCA Transfer</p>
                                </Col>
                                <Col> {bcaTransfer ? <span>&#10003;</span> : null}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        variant="light"
                                        onClick={handleBNIClick}

                                    >BNI</Button>
                                </Col>
                                <Col>
                                    <p>BNI Transfer</p>
                                </Col>
                                <Col> {bniTransfer ? <span>&#10003;</span> : null}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        variant="light"
                                        onClick={handleMandiriClick}

                                    >MANDIRI</Button>
                                </Col>
                                <Col>
                                    <p>Mandiri Transfer</p>
                                </Col>
                                <Col> {mandiriTransfer ? <span>&#10003;</span> : null}</Col>
                            </Row>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button 
                    variant="primary" 
                    onClick={handleClose}
                    disabled = {!inputTitleBank}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

PaymentConfirm.defaultProps = {
    handleClick: () => { },
};

export default PaymentConfirm;
