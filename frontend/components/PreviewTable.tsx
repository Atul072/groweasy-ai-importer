"use client";

import { useMemo, useState } from "react";

type PreviewTableProps = {
  data: any[];
};

export default function PreviewTable({ data }: PreviewTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  if (!data || data.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
        No Records Found
      </div>
    );
  }

  const headers = Object.keys(data[0]);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const rowsPerPage = 10;

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const start = (page - 1) * rowsPerPage;

  const end = Math.min(start + rowsPerPage, filteredData.length);

  const paginatedData = filteredData.slice(start, end);

  return (
    <div className="w-full">

      {/* Search */}

      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <input
          type="text"
          placeholder="🔍 Search records..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 md:w-80"
        />

        <div className="text-sm font-medium text-gray-600">
          Showing <b>{filteredData.length === 0 ? 0 : start + 1}</b> -{" "}
          <b>{end}</b> of <b>{filteredData.length}</b> Records
        </div>

      </div>

      {/* Table */}

      <div className="max-h-[500px] overflow-auto rounded-xl border border-gray-300 shadow-sm">

        <table className="min-w-full border-collapse">

          <thead className="sticky top-0 z-10 bg-blue-600 text-white">

            <tr>

              {headers.map((header) => (

                <th
                  key={header}
                  className="border border-blue-500 px-5 py-3 text-left text-sm font-semibold uppercase whitespace-nowrap"
                >
                  {header.replaceAll("_", " ")}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {paginatedData.length === 0 ? (

              <tr>

                <td
                  colSpan={headers.length}
                  className="py-8 text-center text-gray-500"
                >
                  No matching records found.
                </td>

              </tr>

            ) : (

              paginatedData.map((row, index) => (

                <tr
                  key={index}
                  className={`transition hover:bg-blue-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >

                  {headers.map((header) => (

                    <td
                      key={header}
                      className="border px-5 py-3 whitespace-nowrap text-sm"
                    >
                      {String(row[header] ?? "")}
                    </td>

                  ))}

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      {totalPages > 1 && (

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded-lg bg-gray-200 px-5 py-2 font-medium transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ⬅ Previous
          </button>

          <span className="rounded-lg bg-blue-100 px-4 py-2 font-semibold text-blue-700">
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next ➜
          </button>

        </div>

      )}

    </div>
  );
}