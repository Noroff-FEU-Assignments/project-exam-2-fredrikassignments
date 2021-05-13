import { BASE_URL } from '../constants/api';
import Navbar from '../components/DashboardNavbar';
import Layout from '../components/layouts/Dashboard';
import EnquiriesCard from '../components/cards/Enquiries';

export default function Enquiries({ hotelData }) {
  return (
    <>
      <Navbar />
      <Layout>
        <EnquiriesCard hotelData={hotelData} />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(BASE_URL + 'hotels');
  const hotelData = await res.json();

  if (!hotelData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { hotelData },
  };
}
