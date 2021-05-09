import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/sass/pages/AddEstablishment.module.scss';
import { BASE_URL } from '../constants/api';
import Navbar from '../components/DashboardNavbar';
import Layout from '../components/layouts/Dashboard';
import Validation from '../components/Validation';
import Input from '../components/Input';
import Button from '../components/Button';
import { getFromStorage } from '../utils/storage';

export default function AddEstablishment() {
  const [status, setStatus] = useState(null);
  const [validation, setValidation] = useState({});
  const [token, setToken] = useState();
  const [file, setFile] = useState();

  const router = useRouter();

  // Check if JWT token exists
  useEffect(() => {
    const jwt = getFromStorage('token');

    if (jwt.length < 1) {
      router.push('/login');
    }

    setToken(jwt);
  });

  const handleChange = (event) => {
    console.log('event.target.files: ', event.target.files);

    setFile(event.target.files[0]);
  };

  useEffect(() => {
    console.log('setFile: ', file);
  }, [file]);

  // useEffect(() => {
  const submitEnquiry = async (event) => {
    event.preventDefault();

    console.log(token);

    const fileData = new FormData();
    fileData.append('files', file);

    console.log('fileData: ', fileData);

    const res = await fetch(BASE_URL + 'upload', {
      body: fileData,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
    });

    // const res = await fetch(BASE_URL + 'hotels', {
    //   body: JSON.stringify({
    //     Name: event.target.Name.value.trim(),
    //     Description: event.target.Description.value.trim(),
    //     Rating: event.target.Rating.value.trim(),
    //     Price: event.target.Price.value.trim(),
    //     Address: event.target.Address.value.trim(),
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    //   method: 'POST',
    // });

    const response = await res;
    const json = await res.json();

    setStatus(response.status);
    console.log(response.status);
    console.log(json);

    if (json.data && json.data.errors) {
      setValidation(json.data.errors);
      console.log(json.data.errors);
    }

    if (response.status === 200) {
      event.target.reset();
      setValidation({});
    }
  };
  // });

  return (
    <>
      <Navbar />
      <Layout>
        {/* <div className={styles.layout__wrapper}> */}
        <div className={styles.form_wrapper}>
          <form onSubmit={submitEnquiry} className={styles.form}>
            {/* <Input
              placeholder={'Name *'}
              name="Name"
              error={validation['Name']}
            />
            <Input
              placeholder={'Description *'}
              name="Description"
              error={validation['Description']}
              textarea={true}
            />
            <Input
              placeholder={'Rating *'}
              name="Rating"
              error={validation['Rating']}
            />
            <Input
              placeholder={'Price *'}
              name="Price"
              type="number"
              error={validation['Price']}
            />
            <Input
              placeholder={'Address *'}
              name="Address"
              error={validation['Address']}
            /> */}
            {/* Only accept a certain dimension */}
            <Input
              placeholder={'Image *'}
              name="Image"
              error={validation['Image']}
              type="file"
              onChange={handleChange}
            />
            <Button
              value="Send"
              style={['button__input_submit']}
              input={true}
            />
            <Validation status={status} />
          </form>
        </div>
        {/* </div> */}
      </Layout>
    </>
  );
}
