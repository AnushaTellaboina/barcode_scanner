import {useRef, useState} from 'react'
import Webcam from 'react-webcam'

import Quagga from 'quagga'

import './index.css'

function BarcodeScanner({onBarcodeScanned}) {
  const webcamRef = useRef(null)
  const [scanning, setScanning] = useState(false)

  const startScanning = () => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: webcamRef.current.video,
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: ['ean_reader'],
        },
      },
      err => {
        if (err) {
          console.error(err)
          return
        }
        Quagga.start()
        setScanning(true)
      },
    )

    Quagga.onDetected(data => {
      Quagga.stop()
      setScanning(false)
      onBarcodeScanned(data.codeResult.code)
    })
  }

  const stopScanning = () => {
    if (Quagga && Quagga.stop) {
      Quagga.stop()
      setScanning(false)
    }
  }

  return (
    <div className="barcode-scanner-container">
      <Webcam ref={webcamRef} className="video-element" />
      <div className="scanning-buttons">
        {scanning ? (
          <button
            type="button"
            className="stop-scan-button"
            onClick={stopScanning}
          >
            Stop Scanning
          </button>
        ) : (
          <button
            type="button"
            className="start-scan-button"
            onClick={startScanning}
          >
            Start Scanning
          </button>
        )}
      </div>
    </div>
  )
}

export default BarcodeScanner
