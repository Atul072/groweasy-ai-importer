"use client";

import { useRef } from "react";
import Papa from "papaparse";

type UploadBoxProps = {
  onFileParsed: (data: any[], file: File) => void;
};

export default function UploadBox({ onFileParsed }: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFile = (file: File) => {
    if (!file) {
      alert("No file selected.");
      return;
    }

    if (
      !file.name.toLowerCase().endsWith(".csv") &&
      file.type !== "text/csv"
    ) {
      alert("Please upload a valid CSV file.");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (result) => {
        console.log("Parsed Data:", result.data);

        onFileParsed(result.data as any[], file);
      },

      error: (error) => {
        console.error(error);
        alert("Unable to parse CSV.");
      },
    });
  };

  return (
    <div
      className="mt-8 w-full max-w-4xl rounded-2xl border-2 border-dashed border-blue-500 bg-white p-12 shadow-lg transition hover:border-blue-700"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        if (file) {
          handleFile(file);
        }
      }}
    >
      <div className="flex flex-col items-center">
        <div className="text-6xl">📂</div>

        <h2 className="mt-5 text-3xl font-bold">
          Drag & Drop CSV Here
        </h2>

        <p className="mt-2 text-gray-500">or</p>

        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              handleFile(file);
            }
          }}
        />

        <button
          onClick={openFilePicker}
          className="mt-5 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Choose File
        </button>

        <p className="mt-5 text-sm text-gray-400">
          Supported Format: CSV
        </p>
      </div>
    </div>
  );
}