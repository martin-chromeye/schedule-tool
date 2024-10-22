export function export_csv(fileName: string) {
  let tablesRender = "";
  const tables = document.querySelectorAll(`table.exportable`);

  tables.forEach((table) => {
    tablesRender += table.outerHTML.replace(`colspan="100"`, "colspan='1'");
  });

  const html = `<html><head><meta charset='utf-8' />
    <style>
      td {
        mso-number-format:"\\@"; /* Forces text format */
      }
    </style>
  </head><body>
    ${tablesRender}
    </body></html>`;

  const blob = new Blob([html], { type: "application/vnd.ms-excel" });
  const filename = `${fileName}.xls`;
  const link = document.createElement("a");
  link.style.display = "none";
  link.setAttribute("target", "_blank");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
