import {useState} from 'react'

import BarcodeScanner from './components/BarcodeScanner'

import CandidateDataForm from './components/CandidateDataForm'

import './App.css'

function App() {
  const [scannedBarcode, setScannedBarcode] = useState('')

  const handleBarcodeScanned = barcodeData => {
    setScannedBarcode(barcodeData)
  }

  const handleCandidateDataSubmit = async data => {
    try {
      const apiUrl = 'http://localhost:3001/api/storeData'

      const requestData = {
        barcode: scannedBarcode,
        ...data,
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (response.ok) {
        console.log('Data stored successfully')
      } else {
        console.error('Error storing data')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Barcode Scanner App</h1>
      <div className="barcode-scanner">
        <BarcodeScanner onBarcodeScanned={handleBarcodeScanned} />
      </div>
      <div className="candidate-data-form">
        <CandidateDataForm onCandidateDataSubmit={handleCandidateDataSubmit} />
      </div>
    </div>
  )
}

export default App
