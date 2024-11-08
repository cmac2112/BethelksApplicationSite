import Layout from "../layout";

const Success = () => {
  return (
    <Layout>
      <div className="container max-w-full bg-maroon" id="job-page">
        <h2 className="text-center text-2xl text-white p-2">Success</h2>
      </div>
      <div id="bg" className="bg-gray-100 flex justify-center p-1 md:p-5">
        <p>Job application has been successfully recieved</p>
        
      </div>
    </Layout>
  );
};

export default Success;
