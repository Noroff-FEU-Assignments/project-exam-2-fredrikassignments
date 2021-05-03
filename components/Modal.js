import { useState } from 'react';
import styles from '../styles/sass/components/Modal.module.scss';
import Input from '../components/Input';
import Button from '../components/Button';
import Validation from '../components/Validation';
import { CLOSE } from '../constants/assets';
import { BASE_URL } from '../constants/api';

export default function Modal({ open, onClose, name, email, number, id }) {
  if (!open) return null;

  const [status, setStatus] = useState(null);

  const [validation, setValidation] = useState({});

  const submitEnquiry = async (event) => {
    event.preventDefault();

    const res = await fetch(BASE_URL + 'enquiries', {
      body: JSON.stringify({
        Name: event.target.Name.value,
        Email: event.target.Email.value,
        Phone_number: event.target.Phone_number.value,
        Hotel_id: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const response = await res;
    const json = await res.json();

    setStatus(response.status);

    if (json.data && json.data.errors) {
      setValidation(json.data.errors);
      console.log(json.data.errors);
    }

    if (response.status === 200) {
      event.target.reset();
      setValidation({});
    }
  };

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.modal}>
        <img src={CLOSE} className={styles.close_button} onClick={onClose} />
        <form onSubmit={submitEnquiry} className={styles.form}>
          {name === true ? (
            <Input
              placeholder={'Name *'}
              name="Name"
              error={validation['Name']}
            />
          ) : null}
          {email === true ? (
            <Input
              placeholder={'Email *'}
              name="Email"
              type="email"
              error={validation['Email']}
            />
          ) : null}
          {number === true ? (
            <Input
              placeholder={'Phone number'}
              name="Phone_number"
              type="number"
            />
          ) : null}
          <Button
            value="Enquire"
            style={['button__input_submit']}
            input={true}
          />
          {<Validation status={status} />}
        </form>
      </div>
    </>
  );
}
