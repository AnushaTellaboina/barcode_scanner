import {useState} from 'react'

import './index.css'

function CandidateDataForm({onCandidateDataSubmit}) {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [gender, setGender] = useState('')

  const handleSubmit = () => {
    const candidateData = {
      name,
      dob,
      address,
      contact,
      gender,
    }
    onCandidateDataSubmit(candidateData)
  }

  return (
    <div className="form-container">
      <input
        className="form-input"
        type="text"
        placeholder="Name"
        onChange={e => setName(e.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="DOB"
        onChange={e => setDob(e.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="Address"
        onChange={e => setAddress(e.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="Contact"
        onChange={e => setContact(e.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="Gender"
        onChange={e => setGender(e.target.value)}
      />
      <button className="submit-button" type="button" onClick={handleSubmit}>
        Submit Data
      </button>
    </div>
  )
}

export default CandidateDataForm
