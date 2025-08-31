import ComplaintForm from '@/components/ComplaintForm';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="home-container">
        <div className="home-content">
          <ComplaintForm />
        </div>
      </div>
    </Layout>
  );
}