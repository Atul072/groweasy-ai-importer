"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Papa from "papaparse";

import UploadBox from "@/components/UploadBox";
import PreviewTable from "@/components/PreviewTable";


export default function Home() {
  const [rows, setRows] = useState<any[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImport = async () => {
    if (!csvFile) {
      toast.error("Please upload a CSV file first.");
      return;
    }
const API_URL = process.env.NEXT_PUBLIC_API_URL;

try {
  setLoading(true);

  const formData = new FormData();
  formData.append("file", csvFile);

  const response = await axios.post(
    `${API_URL}/api/import`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

      setResult(response.data);
      console.log("API Response:", response.data);

      toast.success(response.data.message);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Import Failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadJSON = () => {
    if (!result?.mappedData) {
      toast.error("No mapped data available.");
      return;
    }
    

    const blob = new Blob(
      [JSON.stringify(result.mappedData, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "crm-mapped-data.json";
    a.click();

    URL.revokeObjectURL(url);

    toast.success("JSON Downloaded Successfully");
  };
const handleDownloadCSV = () => {
  if (!result?.mappedData?.length) {
    toast.error("No mapped data available.");
    return;
  }

  const csv = Papa.unparse(result.mappedData);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "crm-mapped-data.csv";
  link.click();

  URL.revokeObjectURL(url);

  toast.success("CSV Downloaded Successfully");
};
  const handleReset = () => {
    setRows([]);
    setCsvFile(null);
    setResult(null);

    toast.success("Importer Reset Successfully");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-center text-5xl font-bold text-blue-700">
          GrowEasy AI CSV Importer
        </h1>

        <p className="mt-4 text-center text-lg text-gray-600">
          Upload any CSV and let AI convert it into CRM format.
        </p>

        <div className="mt-10 flex justify-center">
          <UploadBox
            onFileParsed={(data, file) => {
              setRows(data);
              setCsvFile(file);
              setResult(null);
            }}
          />
        </div>

        {rows.length > 0 && (
          <div className="mt-10 rounded-xl bg-white p-6 shadow-lg">

            <h2 className="mb-5 text-2xl font-bold">
              CSV Preview
            </h2>

            <PreviewTable data={rows} />

            <button
              onClick={handleImport}
              disabled={loading}
              className="mt-6 flex items-center gap-3 rounded-lg bg-green-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading && (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              )}

              {loading ? "Importing..." : "Confirm Import"}
            </button>

          </div>
        )}

        {result && (
          <div className="mt-10 rounded-xl bg-white p-6 shadow-lg">

            <h2 className="mb-6 text-3xl font-bold text-green-700">
              ✅ Import Summary
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

              <div className="rounded-xl bg-blue-100 p-5 text-center">
                <p className="text-gray-500">
                  Total Records
                </p>

                <h3 className="mt-2 text-4xl font-bold text-blue-700">
                  {result.totalRecords}
                </h3>
              </div>

              <div className="rounded-xl bg-green-100 p-5 text-center">
                <p className="text-gray-500">
                  Imported Records
                </p>

                <h3 className="mt-2 text-4xl font-bold text-green-700">
                  {result.importedRecords}
                </h3>
              </div>

              <div className="rounded-xl bg-red-100 p-5 text-center">
                <p className="text-gray-500">
                  Skipped Records
                </p>

                <h3 className="mt-2 text-4xl font-bold text-red-700">
                  {result.totalRecords - result.importedRecords}
                </h3>
              </div>

            </div>

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={handleDownloadJSON}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                📥 Download JSON
              </button>
              <button
                onClick={handleDownloadCSV}
                className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                  >
                📄 Download CSV
                  </button>

              <button
                onClick={handleReset}
                className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                🔄 Reset Import
              </button>

            </div>

            {result.mappedData?.length > 0 && (
              <div className="mt-10">

                <h2 className="mb-4 text-2xl font-bold">
                  CRM Mapped Data
                </h2>

                <PreviewTable data={result.mappedData} />

              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}