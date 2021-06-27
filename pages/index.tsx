import Head from "next/head";
import dynamic from "next/dynamic";
const QrDecoder = dynamic(() => import("../components/QrDecoder"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>EU covid certificate QR decoder</title>
        <meta name="description" content="EU covid certificate QR decoder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex justify-center py-1 px-1 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center">
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="sm:max-w-lg w-full p-2 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              EU covid certificate QR decoder
            </h2>
          </div>
          <div>
            {/* <p className="mt-2 text-sm text-gray-400">
              Lorem ipsum is placeholder text.
            </p> */}
            <QrDecoder />
          </div>
        </div>
      </div>
    </>
  );
}
