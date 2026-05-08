export const downloadPdf = async (url, fileName) => {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to download ${fileName}`);
  }

  const blob = await response.blob();
  if (blob.type.includes("text/html")) {
    throw new Error(`${url} returned HTML instead of a PDF`);
  }

  const objectUrl = window.URL.createObjectURL(
    new Blob([blob], { type: "application/pdf" })
  );
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(objectUrl);
};
