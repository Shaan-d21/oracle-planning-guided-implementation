import fs from "node:fs";
import path from "node:path";

const metadataPath = path.resolve(
  "public/training/oracle-planning/phase-07/source-account-clean.csv",
);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  return rows;
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function serializeCsv(rows) {
  return `${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}\r\n`;
}

const currencyAccounts = new Set([
  "List_Price",
  "Returns_Provision_Per_Unit",
  "Credits_Provision_Per_Unit",
  "Invoice_Price",
  "Net_Price",
  "Gross_Revenue",
  "Material_Unit_Cost",
  "Direct_Labor_Rate",
  "Direct_Labor_Unit_Cost",
  "Variable_Overhead_Rate",
  "Variable_Overhead_Unit_Cost",
  "Fixed_Overhead_Pool",
  "Fixed_Overhead_Unit_Cost",
  "Manufacturing_Unit_Cost",
  "Beginning_FG_Value",
  "Production_Value",
  "Goods_Available_Value",
  "Ending_Inventory_Value",
  "Overtime_Rate",
  "Overtime_Cost",
  "Monthly_FTE_Cost",
  "Asset_Cost",
  "Residual_Value",
  "Capital_Investment",
  "Capital_Cash_Payment",
  "Capital_Additions",
  "Net_Revenue",
  "Cost_of_Goods_Sold",
  "Gross_Margin",
  "Other_Operating_Expense",
  "Depreciation_Expense",
  "Operating_Profit",
  "Interest_Expense",
  "Profit_Before_Tax",
  "Tax_Expense",
  "Net_Income",
  "Cash",
  "Trade_Receivables",
  "Finished_Goods_Inventory_Value",
  "Gross_PPE",
  "Accumulated_Depreciation",
  "Net_PPE",
  "Total_Assets",
  "Trade_Payables",
  "Debt",
  "Other_Liabilities",
  "Total_Liabilities",
  "Equity",
  "Retained_Earnings",
  "Total_Equity",
  "Total_Liabilities_And_Equity",
  "Balance_Check",
  "Opening_Cash",
  "Depreciation_Addback",
  "Change_In_Receivables",
  "Change_In_Inventory",
  "Change_In_Payables",
  "Operating_Cash_Flow",
  "Purchase_Of_PPE",
  "Investing_Cash_Flow",
  "New_Debt_Financing",
  "Dividends",
  "Financing_Cash_Flow",
  "Net_Change_In_Cash",
  "Closing_Cash",
]);

const averageAccounts = new Set([
  "Average_3M_Demand",
  "Average_6M_Demand",
  "Average_12M_Demand",
  "Weighted_Average_Demand",
  "Growth_Rate",
  "Seasonality_Index",
  "Promotion_Uplift_Percent",
  "Price_Change_Percent",
  "Price_Elasticity",
  "Price_Elasticity_Effect",
  "List_Price",
  "Contract_Discount_Percent",
  "Promotion_Discount_Percent",
  "Volume_Discount_Percent",
  "Channel_Discount_Percent",
  "Returns_Provision_Per_Unit",
  "Credits_Provision_Per_Unit",
  "Invoice_Price",
  "Net_Price",
  "Demand_Horizon_Days",
  "Target_Days_Cover",
  "Daily_Demand_StdDev",
  "Replenishment_Lead_Days",
  "Service_Factor",
  "Pack_Multiple",
  "Projected_Days_Cover",
  "Yield_Percent",
  "Lot_Size",
  "Available_Productive_Hours",
  "Production_Rate",
  "Capacity_Utilization_Percent",
  "Material_Unit_Cost",
  "Direct_Labor_Hours_Per_Unit",
  "Direct_Labor_Rate",
  "Direct_Labor_Unit_Cost",
  "Machine_Hours_Per_Unit",
  "Variable_Overhead_Rate",
  "Variable_Overhead_Unit_Cost",
  "Fixed_Overhead_Unit_Cost",
  "Manufacturing_Unit_Cost",
  "Paid_Hours_Per_FTE",
  "Productive_Availability_Percent",
  "Productive_Hours_Per_FTE",
  "Current_FTE",
  "Exact_Required_FTE",
  "Roster_Required_FTE",
  "Overtime_Limit_Hours",
  "Overtime_Rate",
  "Monthly_FTE_Cost",
  "Hiring_Lead_Months",
  "Asset_Cost",
  "Useful_Life_Months",
  "Residual_Value",
  "Asset_Lead_Time_Months",
  "Gross_Margin_Percent",
]);

const balanceAccounts = new Set([
  "Beginning_FG_Inventory",
  "Book_FG_Inventory",
  "Quality_Hold_Inventory",
  "Obsolete_Blocked_Inventory",
  "Available_Opening_Inventory",
  "Cycle_Stock_Target",
  "Safety_Stock",
  "Provisional_Target_Ending_FG",
  "Target_Ending_Inventory",
  "Projected_Ending_FG",
  "Beginning_FG_Value",
  "Goods_Available_Value",
  "Ending_Inventory_Value",
  "Cash",
  "Trade_Receivables",
  "Finished_Goods_Inventory_Value",
  "Gross_PPE",
  "Accumulated_Depreciation",
  "Net_PPE",
  "Total_Assets",
  "Trade_Payables",
  "Debt",
  "Other_Liabilities",
  "Total_Liabilities",
  "Equity",
  "Retained_Earnings",
  "Total_Equity",
  "Total_Liabilities_And_Equity",
  "Balance_Check",
  "Opening_Cash",
  "Closing_Cash",
]);

const revenueAccounts = new Set([
  "Net_Revenue",
  "Gross_Margin",
  "Operating_Profit",
  "Profit_Before_Tax",
  "Net_Income",
]);

const expenseAccounts = new Set([
  "Cost_of_Goods_Sold",
  "Other_Operating_Expense",
  "Depreciation_Expense",
  "Interest_Expense",
  "Tax_Expense",
]);

const assetAccounts = new Set([
  "Cash",
  "Trade_Receivables",
  "Finished_Goods_Inventory_Value",
  "Gross_PPE",
  "Accumulated_Depreciation",
  "Net_PPE",
  "Total_Assets",
  "Opening_Cash",
  "Closing_Cash",
]);

const liabilityAccounts = new Set([
  "Trade_Payables",
  "Debt",
  "Other_Liabilities",
  "Total_Liabilities",
]);

const equityAccounts = new Set([
  "Equity",
  "Retained_Earnings",
  "Total_Equity",
  "Total_Liabilities_And_Equity",
]);

const rows = parseCsv(fs.readFileSync(metadataPath, "utf8"));
const headers = rows[0].map((header) => header.trim());
const headerIndex = new Map(headers.map((header, index) => [header, index]));

function get(row, header) {
  return row[headerIndex.get(header)] ?? "";
}

function set(row, header, value) {
  row[headerIndex.get(header)] = value;
}

const parentMembers = new Set(
  rows
    .slice(1)
    .map((row) => get(row, "Parent"))
    .filter((parent) => parent && parent !== "Account"),
);

for (const row of rows.slice(1)) {
  const member = get(row, "Account");
  const isCurrency = currencyAccounts.has(member);
  const isBalance = balanceAccounts.has(member);
  const isAverage = averageAccounts.has(member);
  const isParent = parentMembers.has(member);

  const dataStorage = get(row, "Data Storage")
    .trim()
    .split(" ")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(" ");

  let accountType = "Saved Assumption";
  if (revenueAccounts.has(member)) accountType = "Revenue";
  if (expenseAccounts.has(member)) accountType = "Expense";
  if (assetAccounts.has(member)) accountType = "Asset";
  if (liabilityAccounts.has(member)) accountType = "Liability";
  if (equityAccounts.has(member)) accountType = "Equity";

  let timeBalance = "Flow";
  if (isBalance) timeBalance = "Balance";
  else if (isAverage) timeBalance = "Average";

  const skipValue = timeBalance === "Flow" ? "None" : "Missing";
  const exchangeRateType = isCurrency
    ? timeBalance === "Balance"
      ? "Ending"
      : "Average"
    : "None";

  set(row, "Data Storage", dataStorage);
  set(row, "Data Type", isCurrency ? "Currency" : "Unspecified");
  set(row, "Hierarchy Type", "None");
  set(row, "Account Type", accountType);
  set(row, "Time Balance", timeBalance);
  set(row, "Skip Value", skipValue);
  set(row, "Exchange Rate Type", exchangeRateType);
  set(row, "Variance Reporting", accountType === "Expense" ? "Expense" : "Non-Expense");
  set(row, "Data Storage (Plan1)", dataStorage);
  set(row, "Data Storage (ApexPlan)", isParent ? "Label Only" : dataStorage);
}

rows[0] = headers;

const members = new Set(rows.slice(1).map((row) => get(row, "Account")));
const errors = [];

for (const [offset, row] of rows.slice(1).entries()) {
  const line = offset + 2;
  const member = get(row, "Account");
  const parent = get(row, "Parent");
  const accountType = get(row, "Account Type");
  const skipValue = get(row, "Skip Value");
  const dataType = get(row, "Data Type");
  const exchangeRateType = get(row, "Exchange Rate Type");

  if (!member) errors.push(`Line ${line}: missing Account`);
  if (parent !== "Account" && !members.has(parent)) {
    errors.push(`Line ${line}: parent ${parent} is not present`);
  }
  if (["Revenue", "Expense"].includes(accountType) && skipValue !== "None") {
    errors.push(`Line ${line}: ${accountType} account ${member} must use Skip Value None`);
  }
  if (dataType !== "Currency" && exchangeRateType !== "None") {
    errors.push(`Line ${line}: non-currency account ${member} must use Exchange Rate Type None`);
  }
  if (get(row, "Data Storage") !== get(row, "Data Storage (Plan1)")) {
    errors.push(`Line ${line}: Plan1 storage does not match source storage for ${member}`);
  }
}

const consolidatingOperators = new Set(["+", "-", "*", "/", "%"]);
for (const parent of parentMembers) {
  const parentRow = rows.slice(1).find((row) => get(row, "Account") === parent);
  const childRows = rows.slice(1).filter((row) => get(row, "Parent") === parent);
  const isLabelOnly = get(parentRow, "Data Storage (ApexPlan)") === "Label Only";
  const hasFormula = !["", "<none>"].includes(get(parentRow, "Formula (ApexPlan)"));
  const hasConsolidatingChild = childRows.some((row) =>
    consolidatingOperators.has(get(row, "Aggregation (ApexPlan)")),
  );

  if (!isLabelOnly && !hasFormula && !hasConsolidatingChild) {
    errors.push(
      `ApexPlan parent ${parent} must be Label Only, have a formula, or have a consolidating child`,
    );
  }
}

if (errors.length > 0) {
  throw new Error(errors.join("\n"));
}

let outputPath = metadataPath;
try {
  fs.writeFileSync(outputPath, serializeCsv(rows), "utf8");
} catch (error) {
  if (error?.code !== "EBUSY") throw error;
  outputPath = metadataPath.replace(/\.csv$/i, ".fixed.csv");
  fs.writeFileSync(outputPath, serializeCsv(rows), "utf8");
  console.warn(`Source CSV is locked; wrote the corrected file to ${outputPath}`);
}

const counts = rows.slice(1).reduce(
  (summary, row) => {
    summary.members += 1;
    summary.accountTypes[get(row, "Account Type")] =
      (summary.accountTypes[get(row, "Account Type")] ?? 0) + 1;
    summary.dataTypes[get(row, "Data Type")] =
      (summary.dataTypes[get(row, "Data Type")] ?? 0) + 1;
    return summary;
  },
  { members: 0, accountTypes: {}, dataTypes: {} },
);

console.log(JSON.stringify({ outputPath, ...counts }, null, 2));
