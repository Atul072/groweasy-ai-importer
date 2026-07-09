function cleanCSV(rows) {

    return rows
        .map((row) => {

            const cleaned = {};

            Object.keys(row).forEach((key) => {

                if (key === "__parsed_extra") return;

                cleaned[key.trim()] =
                    typeof row[key] === "string"
                        ? row[key].replace(/\n/g, " ").trim()
                        : row[key] ?? "";

            });

            return cleaned;

        })
        .filter((row) =>
            Object.values(row).some(
                (value) => String(value).trim() !== ""
            )
        );

}

module.exports = cleanCSV;