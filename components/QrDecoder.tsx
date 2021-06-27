import { useState } from "react";
import QrReader from "react-qr-reader";
import * as b45 from "base45-ts";
import pako from "pako";
import cbor from "cbor-js";

export default function Page() {
  const [data, setData] = useState<any | null | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [showRaw, setShowRaw] = useState(false);
  const handleError = (e: any) => setError(e);
  const handleScan = (d: any) => {
    if (d) {
      if (d.split(":")?.[0] == "HC1") {
        d = d.substr(4);
        const d2 = b45.decode(d);
        const d3 = pako.inflate(d2);
        const d4 = cbor.decode(d3.buffer) as Array<Uint8Array>;
        const d4a = new Uint8Array(
          d4[2]
            .toString()
            .split(",")
            .map((n) => Number(n))
        );
        setError("OK");
        setData(cbor.decode(d4a.buffer));
      }
    }
  };

  const ma_classes: any = {
    "BHARAT-BIOTECH": "BHARAT BIOTECH",
    "GAMALEYA RESEARCH INSTITUTE": "GAMALEYA RESEARCH INSTITUTE",
    "ORG-100001417": "JANSSEN-CILAG INTERNATIONAL",
    "ORG-100001699": "ASTRAZENECA AB",
    "ORG-100006270": "CUREVAC AG",
    "ORG-100010771":
      "SINOPHARM WEIQIDA EUROPE PHARMACEUTICAL S.R.O. - PRAGUE LOCATION",
    "ORG-100013793": "CANSINO BIOLOGICS",
    "ORG-100020693": "CHINA SINOPHARM INTERNATIONAL CORP. -BEIJING LOCATION",
    "ORG-100024420":
      "SINOPHARM ZHIJUN (SHENZHEN) PHARMACEUTICAL CO. LTD. -SHENZHEN LOCATION",
    "ORG-100030215": "BIONTECH MANUFACTURING GMBH",
    "ORG-100031184": "MODERNA BIOTECH SPAIN S.L.",
    "ORG-100032020": "NOVAVAX CZ AS",
    "SINOVAC-BIOTECH": "SINOVAC BIOTECH",
    "VECTOR-INSTITUTE": "VECTOR INSTITUTE",
  };

  const mp_classes: any = {
    "BBIBP-CORV": "BBIBP-CORV",
    CONVIDECIA: "CONVIDECIA",
    CORONAVAC: "CORONAVAC",
    COVAXIN: "COVAXIN (ALSO KNOWN AS BBV152 A, B, C)",
    CVnCoV: "CVNCOV",
    EPIVACCORONA: "EPIVACCORONA",
    "EU/1/20/1507": "COVID-19 VACCINE MODERNA",
    "EU/1/20/1525": "COVID-19 VACCINE JANSSEN",
    "EU/1/20/1528": "COMIRNATY",
    "EU/1/21/1529": "VAXZEVRIA",
    "INACTIVATED-SARS-COV-2-VERO-CELL": "INACTIVATED SARS-COV-2 (VERO CELL)",
    "NVX-CoV2373": "NVX-COV2373",
    "SPUTNIK-V": "SPUTNIK V",
  };

  return (
    <div className="mt-4">
      {data && (
        <div className="md:px-32 py-8 w-full">
          <div className="shadow overflow-x-scroll rounded border-b border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                    Name
                  </th>
                  <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="w-1/3 text-left py-3 px-4">Cert Issuer</td>
                  <td className="w-1/3 text-left py-3 px-4">{data[1]}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="w-1/3 text-left py-3 px-4">Issued at</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {new Date(data[4] * 1000).toString()}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4">Valid until</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {new Date(data[6] * 1000).toString()}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="w-1/3 text-left py-3 px-4">Vaccine ID</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["v"][0]["ci"]}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4">Country</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["v"][0]["co"]}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="w-1/3 text-left py-3 px-4">Dose number</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["v"][0]["dn"]}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4">Dose date</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["v"][0]["dt"]}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="w-1/3 text-left py-3 px-4">Dose issuer</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["v"][0]["is"]}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4">Manufacturer</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["v"][0]["ma"]}
                    <div>({ma_classes[data[-260][1]["v"][0]["ma"]]})</div>
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="w-1/3 text-left py-3 px-4">Product</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["v"][0]["mp"]}
                    <div>({mp_classes[data[-260][1]["v"][0]["mp"]]})</div>
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4">Total doses</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["v"][0]["sd"]}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="w-1/3 text-left py-3 px-4">
                    Targeted disease
                  </td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["v"][0]["tg"]}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4">ATC Class</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["v"][0]["vp"]}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="w-1/3 text-left py-3 px-4">Date of Birth</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["dob"]}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4">Family Name</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["nam"]["fn"]}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="w-1/3 text-left py-3 px-4">Given Name</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["nam"]["gn"]}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4">
                    Family Name Transliterated
                  </td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["nam"]["fnt"]}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="w-1/3 text-left py-3 px-4">
                    Given Name Transliterated
                  </td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["nam"]["gnt"]}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4">Version</td>
                  <td className="w-1/3 text-left py-3 px-4">
                    {data[-260][1]["ver"]}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showRaw ? (
        <pre>{JSON.stringify(data, undefined, 2)}</pre>
      ) : (
        data && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowRaw(true)}
          >
            show raw data
          </button>
        )
      )}
      <div>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          className="QrReader"
        />
      </div>
      <div className="text-center text-gray-500 text-sm mt-2">
        <a href="https://jperelli.com.ar">
          Made with <span className="text-red-700">&#x2764;</span> by jperelli
        </a>{" "}
        | <a href="https://github.com/jperelli/eucovidcert">Source code</a>
      </div>
    </div>
  );
}
