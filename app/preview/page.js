// "use client";

// import { useEffect, useState } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import JSZip from "jszip";
// import PayslipCard from "../../components/PayslipCard";
// import { buildPayslipData } from "../../lib/payroll";

// export default function PreviewPage() {
//   const [employees, setEmployees] = useState([]);
//   const [downloadingAll, setDownloadingAll] = useState(false);
//   const [payMonth, setPayMonth] = useState("January");
//   const [payYear, setPayYear] = useState("2026");
//   const [isValidAccess, setIsValidAccess] = useState(false);

//   useEffect(() => {
//     const validated = localStorage.getItem("payrollValidated");
//     const data = JSON.parse(localStorage.getItem("employees") || "[]");
//     const storedMonth = localStorage.getItem("payrollMonth") || "January";
//     const storedYear = localStorage.getItem("payrollYear") || "2026";

//     if (validated !== "true" || data.length === 0) {
//       setIsValidAccess(false);
//       return;
//     }

//     setEmployees(data);
//     setPayMonth(storedMonth);
//     setPayYear(storedYear);
//     setIsValidAccess(true);
//   }, []);

//   const generatePdfBlob = async (elementId) => {
//     const input = document.getElementById(elementId);
//     if (!input) {
//       throw new Error(`Element not found: ${elementId}`);
//     }

//     const canvas = await html2canvas(input, {
//       scale: 2,
//       useCORS: true,
//       backgroundColor: "#ffffff",
//     });

//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");

//     const pdfWidth = 210;
//     const pdfHeight = 297;
//     const imgWidth = pdfWidth - 20;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let finalHeight = imgHeight;
//     let finalWidth = imgWidth;

//     if (finalHeight > pdfHeight - 20) {
//       finalHeight = pdfHeight - 20;
//       finalWidth = (canvas.width * finalHeight) / canvas.height;
//     }

//     const x = (pdfWidth - finalWidth) / 2;
//     const y = 10;

//     pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);

//     return pdf.output("blob");
//   };

//   const downloadSinglePdf = async (elementId, employeeId, finalPayMonth) => {
//     try {
//       const blob = await generatePdfBlob(elementId);
//       const url = URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `${employeeId}_${String(finalPayMonth).replace(/\s+/g, "_")}.pdf`;
//       a.click();

//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("PDF download failed:", error);
//       alert("Failed to download PDF.");
//     }
//   };

//   const downloadAllZip = async () => {
//     if (employees.length === 0) {
//       alert("No payslips available.");
//       return;
//     }

//     try {
//       setDownloadingAll(true);
//       const zip = new JSZip();

//       for (let i = 0; i < employees.length; i++) {
//         const emp = employees[i];
//         const payslip = buildPayslipData(emp, i + 1, payMonth, payYear);
//         const elementId = `payslip-${i}`;
//         const blob = await generatePdfBlob(elementId);

//         const fileName = `${payslip.employeeId}_${String(payslip.payMonth).replace(/\s+/g, "_")}.pdf`;
//         zip.file(fileName, blob);
//       }

//       const zipBlob = await zip.generateAsync({ type: "blob" });
//       const url = URL.createObjectURL(zipBlob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `all-payslips-${payMonth}-${payYear}.zip`;
//       a.click();

//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("ZIP download failed:", error);
//       alert("Failed to download ZIP.");
//     } finally {
//       setDownloadingAll(false);
//     }
//   };

//   if (!isValidAccess) {
//     return (
//       <main className="min-h-screen bg-gray-100 p-6">
//         <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
//           <h1 className="text-2xl font-bold mb-3">Invalid access</h1>
//           <p className="text-gray-700">
//             Please go back, upload the Excel file, and complete month validation first.
//           </p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-5xl mx-auto">
//         <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
//           <h1 className="text-3xl font-bold">
//             Payslip Preview - {payMonth} {payYear}
//           </h1>

//           <button
//             onClick={downloadAllZip}
//             disabled={downloadingAll}
//             className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
//           >
//             {downloadingAll ? "Preparing ZIP..." : "Download All ZIP"}
//           </button>
//         </div>

//         {employees.map((emp, index) => {
//           const payslip = buildPayslipData(emp, index + 1, payMonth, payYear);
//           const elementId = `payslip-${index}`;

//           return (
//             <PayslipCard
//               key={index}
//               employee={payslip}
//               elementId={elementId}
//               onDownload={downloadSinglePdf}
//             />
//           );
//         })}
//       </div>
//     </main>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import JSZip from "jszip";
import PayslipCard from "../../components/PayslipCard";
import { buildPayslipData } from "../../lib/payroll";

function waitForImages(container) {
  const images = Array.from(container.querySelectorAll("img"));

  if (images.length === 0) return Promise.resolve();

  return Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();

      return new Promise((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    })
  );
}

export default function PreviewPage() {
  const [employees, setEmployees] = useState([]);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [payMonth, setPayMonth] = useState("January");
  const [payYear, setPayYear] = useState("2026");
  const [isValidAccess, setIsValidAccess] = useState(false);

  useEffect(() => {
    const validated = localStorage.getItem("payrollValidated");
    const data = JSON.parse(localStorage.getItem("employees") || "[]");
    const storedMonth = localStorage.getItem("payrollMonth") || "January";
    const storedYear = localStorage.getItem("payrollYear") || "2026";

    if (validated !== "true" || data.length === 0) {
      setIsValidAccess(false);
      return;
    }

    setEmployees(data);
    setPayMonth(storedMonth);
    setPayYear(storedYear);
    setIsValidAccess(true);
  }, []);

  const generatePdfBlob = async (elementId) => {
    const input = document.getElementById(elementId);

    if (!input) {
      throw new Error(`Payslip element not found: ${elementId}`);
    }

    await waitForImages(input);

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      scrollX: 0,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = 297;
    const margin = 10;

    const usableWidth = pdfWidth - margin * 2;
    const usableHeight = pdfHeight - margin * 2;

    const imgWidth = usableWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight <= usableHeight) {
      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
    } else {
      // Multi-page support
      const pageCanvas = document.createElement("canvas");
      const pageCtx = pageCanvas.getContext("2d");

      const pageHeightPx = Math.floor((usableHeight * canvas.width) / usableWidth);

      pageCanvas.width = canvas.width;
      pageCanvas.height = pageHeightPx;

      let renderedHeight = 0;

      while (renderedHeight < canvas.height) {
        pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageCtx.fillStyle = "#ffffff";
        pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        pageCtx.drawImage(
          canvas,
          0,
          renderedHeight,
          canvas.width,
          pageHeightPx,
          0,
          0,
          canvas.width,
          pageHeightPx
        );

        const pageImgData = pageCanvas.toDataURL("image/png");
        const pageImgHeight = (pageCanvas.height * usableWidth) / pageCanvas.width;

        if (renderedHeight > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          pageImgData,
          "PNG",
          margin,
          margin,
          usableWidth,
          pageImgHeight
        );

        renderedHeight += pageHeightPx;
      }
    }

    return pdf.output("blob");
  };

  const downloadSinglePdf = async (elementId, employeeId, finalPayMonth) => {
    try {
      const blob = await generatePdfBlob(elementId);
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${employeeId}_${String(finalPayMonth).replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed:", error);
      alert(`Failed to download PDF: ${error.message}`);
    }
  };

  const downloadAllZip = async () => {
    if (employees.length === 0) {
      alert("No payslips available.");
      return;
    }

    try {
      setDownloadingAll(true);
      const zip = new JSZip();

      for (let i = 0; i < employees.length; i++) {
        const emp = employees[i];
        const payslip = buildPayslipData(emp, i + 1, payMonth, payYear);
        const elementId = `payslip-${i}`;
        const blob = await generatePdfBlob(elementId);

        const fileName = `${payslip.employeeId}_${String(payslip.payMonth).replace(/\s+/g, "_")}.pdf`;
        zip.file(fileName, blob);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `all-payslips-${payMonth}-${payYear}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("ZIP download failed:", error);
      alert(`Failed to download ZIP: ${error.message}`);
    } finally {
      setDownloadingAll(false);
    }
  };

  if (!isValidAccess) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
          <h1 className="text-2xl font-bold mb-3">Invalid access</h1>
          <p className="text-gray-700">
            Please go back, upload the Excel file, and complete month validation first.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
          <h1 className="text-3xl font-bold">
            Payslip Preview - {payMonth} {payYear}
          </h1>

          <button
            onClick={downloadAllZip}
            disabled={downloadingAll}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {downloadingAll ? "Preparing ZIP..." : "Download All ZIP"}
          </button>
        </div>

        {employees.map((emp, index) => {
          const payslip = buildPayslipData(emp, index + 1, payMonth, payYear);
          const elementId = `payslip-${index}`;

          return (
            <PayslipCard
              key={index}
              employee={payslip}
              elementId={elementId}
              onDownload={downloadSinglePdf}
            />
          );
        })}
      </div>
    </main>
  );
}