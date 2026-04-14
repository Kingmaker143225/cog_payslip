// "use client";

// export default function PayslipCard({ employee, elementId, onDownload }) {
//   const earnings = employee?.earnings || [];
//   const deductions = employee?.deductions || [];

//   return (
//     <div className="mb-10">
//       <div className="flex justify-end mb-3">
//         <button
//           onClick={() =>
//             onDownload?.(elementId, employee.employeeId, employee.payMonth)
//           }
//           style={{
//             backgroundColor: "#2563eb",
//             color: "#ffffff",
//             padding: "10px 16px",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//             fontWeight: 600,
//           }}
//         >
//           Download PDF
//         </button>
//       </div>

//       <div
//         id={elementId}
//         style={{
//           backgroundColor: "#ffffff",
//           maxWidth: "900px",
//           margin: "0 auto",
//           borderRadius: "16px",
//           boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
//           padding: "32px",
//           border: "1px solid #d1d5db",
//         }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             border: "1px solid #d1d5db",
//             borderRadius: "14px",
//             padding: "16px 20px",
//             marginBottom: "16px",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               gap: "24px",
//             }}
//           >
//             {/* Left side */}
//             <div>
//               <h2
//                 style={{
//                   fontSize: "28px",
//                   fontWeight: 800,
//                   margin: 0,
//                   color: "#4f46e5",
//                   lineHeight: 1.2,
//                 }}
//               >
//                 CognisysAI
//               </h2>

//               <p
//                 style={{
//                   fontSize: "15px",
//                   color: "#374151",
//                   marginTop: "10px",
//                   marginBottom: 0,
//                   lineHeight: 1.8,
//                 }}
//               >
//                 2nd Floor, Tech Park, Madhapur,
//                 <br />
//                 Hyderabad - 500081
//               </p>
//             </div>

//             {/* Right side */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "12px",
//                 flexShrink: 0,
//               }}
//             >
//               <img
//                 src="/logo.jpeg"
//                 alt="Company Logo"
//                 style={{
//                   height: "56px",
//                   width: "auto",
//                   objectFit: "contain",
//                 }}
//                 onError={(e) => {
//                   e.currentTarget.style.display = "none";
//                 }}
//               />

//               <span
//                 style={{
//                   fontSize: "18px",
//                   fontWeight: 700,
//                   color: "#6d28d9",
//                 }}
//               >
//                 CognisysAI
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Title */}
//         <h3
//           style={{
//             textAlign: "center",
//             fontWeight: 700,
//             fontSize: "22px",
//             marginBottom: "24px",
//             color: "#111827",
//           }}
//         >
//           Payslip for the month of {employee.payMonth}
//         </h3>

//         {/* Employee Details */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             border: "1px solid #9ca3af",
//             borderRadius: "14px",
//             overflow: "hidden",
//             marginBottom: "24px",
//             fontSize: "14px",
//           }}
//         >
//           {[
//             ["Employee ID", employee.employeeId],
//             ["Employee Name", employee.employeeName],
//             ["Designation", employee.designation],
//             ["Location", employee.location],
//             ["DOJ", employee.doj],
//             ["Department", employee.department],
//             ["Bank A/C No", employee.bankAccount],
//             ["IFSC Code", employee.ifsc],
//             ["PAN", employee.pan],
//             ["Paid Days", employee.paidDays],
//           ].map(([label, value], index) => (
//             <div
//               key={index}
//               style={{
//                 padding: "12px 14px",
//                 borderRight: index % 2 === 0 ? "1px solid #d1d5db" : "none",
//                 borderBottom: index < 8 ? "1px solid #d1d5db" : "none",
//               }}
//             >
//               <strong>{label}:</strong> {value}
//             </div>
//           ))}
//         </div>

//         {/* Earnings + Deductions */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             gap: "16px",
//             marginBottom: "24px",
//           }}
//         >
//           <div
//             style={{
//               border: "1px solid #9ca3af",
//               borderRadius: "14px",
//               overflow: "hidden",
//             }}
//           >
//             <div
//               style={{
//                 backgroundColor: "#eff6ff",
//                 color: "#1d4ed8",
//                 fontWeight: 700,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 padding: "12px 14px",
//                 borderBottom: "1px solid #d1d5db",
//               }}
//             >
//               <span>Earnings</span>
//               <span>Amount</span>
//             </div>

//             {earnings.map((item, index) => (
//               <div
//                 key={index}
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding: "10px 14px",
//                   borderBottom:
//                     index === earnings.length - 1 ? "none" : "1px solid #e5e7eb",
//                   fontSize: "14px",
//                 }}
//               >
//                 <span>{item.label}</span>
//                 <span>{Number(item.amount || 0).toFixed(2)}</span>
//               </div>
//             ))}
//           </div>

//           <div
//             style={{
//               border: "1px solid #9ca3af",
//               borderRadius: "14px",
//               overflow: "hidden",
//             }}
//           >
//             <div
//               style={{
//                 backgroundColor: "#fef2f2",
//                 color: "#b91c1c",
//                 fontWeight: 700,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 padding: "12px 14px",
//                 borderBottom: "1px solid #d1d5db",
//               }}
//             >
//               <span>Deductions</span>
//               <span>Amount</span>
//             </div>

//             {deductions.map((item, index) => (
//               <div
//                 key={index}
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding: "10px 14px",
//                   borderBottom:
//                     index === deductions.length - 1 ? "none" : "1px solid #e5e7eb",
//                   fontSize: "14px",
//                 }}
//               >
//                 <span>{item.label}</span>
//                 <span>{Number(item.amount || 0).toFixed(2)}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Totals */}
//         <div
//           style={{
//             border: "1px solid #9ca3af",
//             borderRadius: "14px",
//             padding: "16px",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               padding: "8px 0",
//               borderBottom: "1px solid #d1d5db",
//             }}
//           >
//             <span style={{ fontWeight: 600 }}>Total Earnings</span>
//             <span>{Number(employee.totalEarnings || 0).toFixed(2)}</span>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               padding: "8px 0",
//               borderBottom: "1px solid #d1d5db",
//             }}
//           >
//             <span style={{ fontWeight: 600 }}>Total Deductions</span>
//             <span>{Number(employee.totalDeductions || 0).toFixed(2)}</span>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               paddingTop: "16px",
//               fontSize: "28px",
//               fontWeight: 700,
//               color: "#16a34a",
//             }}
//           >
//             <span>Net Pay</span>
//             <span>{Number(employee.netPay || 0).toFixed(2)}</span>
//           </div>
//         </div>

//         {/* Footer */}
//         <div style={{ marginTop: "32px", textAlign: "right" }}>
//           <p
//             style={{
//               fontSize: "14px",
//               color: "#374151",
//               fontWeight: 500,
//               margin: 0,
//             }}
//           >
//             Authorized Signatory
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

export default function PayslipCard({ employee, elementId, onDownload }) {
  const earnings = employee?.earnings || [];
  const deductions = employee?.deductions || [];

  return (
    <div className="mb-10">
      <div className="flex justify-end mb-3">
        <button
          onClick={() =>
            onDownload?.(elementId, employee.employeeId, employee.payMonth)
          }
          style={{
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Download PDF
        </button>
      </div>

      <div
        id={elementId}
        style={{
          backgroundColor: "#ffffff",
          maxWidth: "900px",
          margin: "0 auto",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          padding: "32px",
          border: "1px solid #d1d5db",
        }}
      >
        <div
          style={{
            border: "1px solid #d1d5db",
            borderRadius: "14px",
            padding: "16px 20px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  margin: 0,
                  color: "#4f46e5",
                  lineHeight: 1.2,
                }}
              >
                {employee.companyName}
              </h2>

              <p
                style={{
                  fontSize: "15px",
                  color: "#374151",
                  marginTop: "10px",
                  marginBottom: 0,
                  lineHeight: 1.8,
                }}
              >
                {employee.companyAddress}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexShrink: 0,
              }}
            >
              <img
                src="/logo.jpeg"
                alt="Company Logo"
                style={{
                  height: "56px",
                  width: "auto",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#6d28d9",
                }}
              >
                {employee.companyName}
              </span>
            </div>
          </div>
        </div>

        <h3
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "22px",
            marginBottom: "24px",
            color: "#111827",
          }}
        >
          Payslip for the month of {employee.payMonth}
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            border: "1px solid #9ca3af",
            borderRadius: "14px",
            overflow: "hidden",
            marginBottom: "24px",
            fontSize: "14px",
          }}
        >
          {[
            ["Name", employee.employeeName],
            ["Employee No", employee.employeeId],
            ["Joining Date", employee.doj],
            ["Designation", employee.designation],
            ["Department", employee.department],
            ["Effective Work Days", employee.paidDays],
            ["LOP", employee.lop],
            ["Bank Name", employee.bankName],
            ["Bank Account No", employee.bankAccount],
            ["PAN Number", employee.pan],
            ["PF No", employee.pfNo],
            ["PF UAN", employee.pfUan],
          ].map(([label, value], index) => (
            <div
              key={index}
              style={{
                padding: "12px 14px",
                borderRight: index % 2 === 0 ? "1px solid #d1d5db" : "none",
                borderBottom: index < 10 ? "1px solid #d1d5db" : "none",
              }}
            >
              <strong>{label}:</strong> {value}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              border: "1px solid #9ca3af",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "#eff6ff",
                color: "#1d4ed8",
                fontWeight: 700,
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 14px",
                borderBottom: "1px solid #d1d5db",
              }}
            >
              <span>Earnings</span>
              <span>Amount</span>
            </div>

            {earnings.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderBottom:
                    index === earnings.length - 1 ? "none" : "1px solid #e5e7eb",
                  fontSize: "14px",
                }}
              >
                <span>{item.label}</span>
                <span>{Number(item.amount || 0).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              border: "1px solid #9ca3af",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "#fef2f2",
                color: "#b91c1c",
                fontWeight: 700,
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 14px",
                borderBottom: "1px solid #d1d5db",
              }}
            >
              <span>Deductions</span>
              <span>Amount</span>
            </div>

            {deductions.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderBottom:
                    index === deductions.length - 1 ? "none" : "1px solid #e5e7eb",
                  fontSize: "14px",
                }}
              >
                <span>{item.label}</span>
                <span>{Number(item.amount || 0).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            border: "1px solid #9ca3af",
            borderRadius: "14px",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #d1d5db",
            }}
          >
            <span style={{ fontWeight: 600 }}>Total Earnings</span>
            <span>{Number(employee.totalEarnings || 0).toFixed(2)}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #d1d5db",
            }}
          >
            <span style={{ fontWeight: 600 }}>Total Deductions</span>
            <span>{Number(employee.totalDeductions || 0).toFixed(2)}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "16px",
              fontSize: "28px",
              fontWeight: 700,
              color: "#16a34a",
            }}
          >
            <span>Net Pay for the Month</span>
            <span>{Number(employee.netPay || 0).toFixed(2)}</span>
          </div>

          <div
            style={{
              marginTop: "10px",
              fontSize: "14px",
              color: "#374151",
              fontStyle: "italic",
            }}
          >
            (Rupees {employee.netPayWords})
          </div>
        </div>

        <div style={{ marginTop: "24px", fontSize: "13px", color: "#4b5563" }}>
          This is a system generated payslip and does not require signature.
        </div>
      </div>
    </div>
  );
}