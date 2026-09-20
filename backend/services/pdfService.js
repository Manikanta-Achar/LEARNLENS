import PDFParser from "pdf2json";

export const extractPdfText = async (pdfBuffer) => {
  try {
    const pdfParser = new PDFParser();

    const text = await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (error) => {
        reject(error.parserError);
      });

      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        let extractedText = "";

        pdfData.Pages.forEach((page) => {
          page.Texts.forEach((textItem) => {
            try {
              extractedText += decodeURIComponent(textItem.R[0].T) + " ";
            } catch {
              extractedText += textItem.R[0].T + " ";
            }
          });

          extractedText += "\n";
        });

        resolve(extractedText);
      });

      pdfParser.parseBuffer(pdfBuffer);
    });

    return text;
  } catch (error) {
    console.error("PDF extraction error:", error.message);
    throw new Error("Failed to extract PDF text");
  }
};
