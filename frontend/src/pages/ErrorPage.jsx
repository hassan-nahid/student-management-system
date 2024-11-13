import errorImg from '../assets/error.webp';

const ErrorPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="max-w-screen-xl text-center p-8 bg-white rounded-lg shadow-xl">
        <img
          src={errorImg} // Replace with the actual image URL you generated
          alt="Error Image"
          className="w-full h-auto max-w-md mx-auto rounded-lg mb-6"
        />
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">Oops! Something Went Wrong.</h1>
        <p className="text-lg text-gray-700 mb-6">
          We can&apos;t seem to find the page you&apos;re looking for. Please check the URL or try again later.
        </p>
        <a href="/" className="btn text-white btn-primary">Go Back Home</a>
      </div>
    </div>
  );
};

export default ErrorPage;
