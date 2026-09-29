import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "D:\\Shaan\\BISP\\BISP_Projects\\Production & Sales Planning";
const skillDir = "C:\\Users\\Shaan Dewang\\.codex\\plugins\\cache\\openai-primary-runtime\\presentations\\26.923.10815\\skills\\presentations";
const runtimePython = "C:\\Users\\Shaan Dewang\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe";
const buildDir = path.join(workspaceDir, ".ppt-build");
const outputDir = path.join(workspaceDir, "output");
const finalPath = path.join(outputDir, "90-Day-Oracle-Planning-Workshop-Introduction-Final.pptx");
const logoPath = path.join(workspaceDir, "public", "brand", "bisp-logo.png");
const dashboardPath = path.join(buildDir, "dashboard.png");
const scriptPath = path.join(workspaceDir, "docs", "90-day-workshop-introduction-video-script.md");

const { finalizePresentation } = await import(
  pathToFileURL(path.join(skillDir, "container_tools", "artifact_tool_utils.mjs")).href,
);

await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(outputDir, { recursive: true });

const logoBytes = new Uint8Array(await fs.readFile(logoPath));
const dashboardBytes = new Uint8Array(await fs.readFile(dashboardPath));
const narrationSource = await fs.readFile(scriptPath, "utf8");

const notesBySlide = new Map();
for (const section of narrationSource.split(/^## Slide /m).slice(1)) {
  const number = Number(section.match(/^(\d+)/)?.[1]);
  const time = section.match(/\*\*Time:\*\*\s*([^\n]+)/)?.[1]?.trim() ?? "";
  const narration = section.match(/\*\*Narration:\*\*\s*\n\n([\s\S]*?)(?=\n---|$)/)?.[1]?.trim() ?? "";
  if (number) notesBySlide.set(number, `${time ? `Target timing: ${time}\n\n` : ""}${narration}`);
}

const W = 1280;
const H = 720;
const FONT = "Arial";
const colors = {
  navy: "#0B2942",
  blue: "#0D67B5",
  blue2: "#2584DD",
  paleBlue: "#EAF4FD",
  orange: "#F15A2B",
  paleOrange: "#FFF1EA",
  teal: "#179AA6",
  green: "#2F9A76",
  purple: "#6F4BB8",
  yellow: "#D99A16",
  ink: "#182838",
  muted: "#617487",
  line: "#D8E2EB",
  pale: "#F5F8FB",
  white: "#FFFFFF",
};

const presentation = Presentation.create({ slideSize: { width: W, height: H } });

function rect(slide, x, y, w, h, fill, options = {}) {
  return slide.shapes.add({
    geometry: options.geometry ?? "rect",
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: options.line ?? { style: "solid", fill: options.lineColor ?? fill, width: options.lineWidth ?? 0 },
    ...(options.radius ? { borderRadius: options.radius } : {}),
    ...(options.shadow ? { shadow: options.shadow } : {}),
  });
}

function text(slide, value, x, y, w, h, size = 24, color = colors.ink, options = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  shape.text = value;
  shape.text.style = {
    typeface: FONT,
    fontSize: size,
    color,
    bold: options.bold ?? false,
    italic: options.italic ?? false,
    alignment: options.align ?? "left",
    verticalAlignment: options.valign ?? "middle",
    autoFit: "none",
  };
  return shape;
}

function line(slide, x, y, w, h, color = colors.line, width = 2) {
  return slide.shapes.add({
    geometry: "line",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { style: "solid", fill: color, width },
  });
}

function circle(slide, cx, cy, d, fill, label, labelColor = colors.white, fontSize = 22) {
  rect(slide, cx, cy, d, d, fill, { geometry: "ellipse", lineColor: fill, lineWidth: 0 });
  text(slide, label, cx, cy, d, d, fontSize, labelColor, { bold: true, align: "center" });
}

function addLogo(slide, x = 1090, y = 18, w = 150, h = 72) {
  slide.images.add({
    blob: logoBytes,
    contentType: "image/png",
    alt: "BISP logo",
    fit: "contain",
    position: { left: x, top: y, width: w, height: h },
  });
}

function addContentFrame(slide, title, section, slideNumber) {
  slide.background.fill = colors.white;
  rect(slide, 0, 0, 16, H, colors.blue);
  text(slide, section.toUpperCase(), 58, 34, 700, 24, 14, colors.orange, { bold: true });
  text(slide, title, 58, 62, 1020, 58, 34, colors.navy, { bold: true });
  addLogo(slide, 1104, 24, 118, 56);
  line(slide, 58, 124, 1164, 0, colors.line, 1);
  text(slide, String(slideNumber).padStart(2, "0"), 1170, 676, 52, 20, 13, colors.muted, { align: "right" });
  line(slide, 58, 686, 1088, 0, colors.line, 1);
}

function addNotes(slide, number) {
  slide.speakerNotes.textFrame.setText(notesBySlide.get(number) ?? "");
  slide.speakerNotes.setVisible(true);
}

function addStageDot(slide, x, y, color, short, label) {
  circle(slide, x, y, 66, colors.white, short, color, 20);
  const ring = slide.shapes.add({
    geometry: "ellipse",
    position: { left: x, top: y, width: 66, height: 66 },
    fill: "none",
    line: { style: "solid", fill: color, width: 5 },
  });
  ring.bringToFront();
  text(slide, short, x, y, 66, 66, 19, color, { bold: true, align: "center" }).bringToFront();
  text(slide, label, x - 22, y + 72, 110, 28, 15, colors.navy, { bold: true, align: "center" });
}

// Slide 1: cover inspired by the supplied reference.
{
  const slide = presentation.slides.add();
  slide.background.fill = colors.white;
  addLogo(slide, 1005, 22, 225, 105);
  rect(slide, 0, 224, W, 158, colors.blue);
  text(slide, "90-Day Oracle Planning Workshop", 90, 250, 1100, 66, 46, colors.white, { bold: true, align: "center" });
  text(slide, "Production and Sales Planning implementation", 120, 320, 1040, 34, 23, "#DCEEFF", { align: "center" });
  text(slide, "Apex Home Appliances Pvt. Ltd.", 120, 402, 1040, 38, 22, colors.ink, { bold: true, align: "center" });
  const stages = [
    [150, colors.blue, "D1", "Discover"],
    [332, colors.orange, "D2", "Design"],
    [514, colors.teal, "B", "Build"],
    [696, colors.purple, "V", "Validate"],
    [878, colors.yellow, "D3", "Deploy"],
    [1060, colors.green, "O", "Operate"],
  ];
  for (const [x, c, short, label] of stages) addStageDot(slide, x, 498, c, short, label);
  text(slide, "BISP Learning Lab", 24, 680, 240, 20, 13, colors.muted, { bold: true });
  text(slide, "Introduction and program orientation", 870, 680, 370, 20, 13, colors.muted, { align: "right" });
  addNotes(slide, 1);
}

// Slide 2: purpose.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "Why this workshop exists", "Program purpose", 2);
  text(slide, "Oracle knowledge becomes useful when learners can connect business decisions to implementation evidence.", 70, 152, 1090, 68, 28, colors.navy, { bold: true });
  const items = [
    ["01", "Understand the project lifecycle", "See how discovery, design, build, testing, deployment, and support depend on one another."],
    ["02", "Connect business needs to design", "Trace a planning decision into dimensions, data, calculations, security, workflow, and reporting."],
    ["03", "Practise with evidence", "Create reviewable artifacts instead of relying on navigation or memory."],
    ["04", "Build project confidence", "Explain decisions clearly when working with business and technical teams."],
  ];
  items.forEach(([n, h, b], i) => {
    const y = 258 + i * 93;
    text(slide, n, 78, y, 64, 46, 25, colors.blue, { bold: true });
    line(slide, 147, y + 23, 36, 0, i === 3 ? colors.orange : colors.blue2, 3);
    text(slide, h, 198, y - 2, 390, 32, 22, colors.ink, { bold: true });
    text(slide, b, 620, y - 4, 540, 54, 18, colors.muted);
  });
  addNotes(slide, 2);
}

// Slide 3: business scenario.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "Apex business scenario", "Connected case study", 3);
  text(slide, "Apex Home Appliances Pvt. Ltd.", 68, 150, 530, 45, 27, colors.navy, { bold: true });
  text(slide, "A custom Oracle Planning application for home and kitchen appliance planning across markets, channels, and manufacturing plants.", 68, 198, 520, 80, 19, colors.muted);
  const facts = [
    ["Plants", "Pune and Noida"],
    ["Currencies", "INR local planning, USD reporting"],
    ["Cubes", "Plan1 BSO input and ApexPlan ASO reporting"],
  ];
  facts.forEach(([k, v], i) => {
    const y = 315 + i * 78;
    text(slide, k.toUpperCase(), 68, y, 155, 22, 13, colors.orange, { bold: true });
    text(slide, v, 68, y + 22, 495, 39, 19, colors.ink, { bold: true });
    line(slide, 68, y + 65, 495, 0, colors.line, 1);
  });
  const flow = [
    ["Sales", colors.blue],
    ["Inventory", colors.teal],
    ["Production", colors.orange],
    ["Cost", colors.purple],
    ["Finance", colors.green],
  ];
  flow.forEach(([label, c], i) => {
    const x = 635 + (i % 2) * 250;
    const y = 174 + Math.floor(i / 2) * 140;
    circle(slide, x, y, 58, c, String(i + 1), colors.white, 19);
    text(slide, label, x + 74, y + 4, 145, 28, 21, colors.ink, { bold: true });
    text(slide, i === 0 ? "Demand, price, revenue" : i === 1 ? "Targets and balances" : i === 2 ? "Plant plan and capacity" : i === 3 ? "COGS and margin" : "P&L, balance sheet, cash", x + 74, y + 32, 175, 42, 15, colors.muted);
  });
  addNotes(slide, 3);
}

// Slide 4: Day 90 outcomes.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "Day 90 capability", "Learning outcomes", 4);
  text(slide, "90", 70, 162, 230, 160, 112, colors.blue, { bold: true });
  text(slide, "days to build and defend one connected implementation", 78, 315, 260, 92, 24, colors.navy, { bold: true });
  line(slide, 372, 158, 0, 458, colors.line, 2);
  const outcomes = [
    "Explain the full implementation lifecycle",
    "Design a connected Planning solution",
    "Validate calculations, access, and workflow",
    "Produce traceable project evidence",
    "Defend business and technical decisions",
  ];
  outcomes.forEach((item, i) => {
    const y = 165 + i * 88;
    circle(slide, 430, y, 42, i === 4 ? colors.orange : colors.paleBlue, String(i + 1), i === 4 ? colors.white : colors.blue, 17);
    text(slide, item, 492, y - 2, 650, 46, 24, colors.ink, { bold: i === 4 });
  });
  addNotes(slide, 4);
}

// Slide 5: six-stage timeline.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "The 90-day journey", "Program structure", 5);
  text(slide, "Six stages organize 27 implementation phases. The sequence protects the dependencies between business decisions, build work, and release evidence.", 70, 148, 1100, 58, 20, colors.muted);
  const stages = [
    ["Discover", "Days 1–12", "2 phases", 12, colors.blue],
    ["Design", "Days 13–30", "4 phases", 18, colors.orange],
    ["Build", "Days 31–75", "12 phases", 45, colors.teal],
    ["Validate", "Days 76–84", "4 phases", 9, colors.purple],
    ["Deploy", "Days 85–88", "3 phases", 4, colors.yellow],
    ["Operate", "Days 89–90", "2 phases", 2, colors.green],
  ];
  const totalWidth = 1135;
  let x = 70;
  const widths = [145, 190, 402, 130, 140, 128];
  stages.forEach(([name, days, count, duration, c], i) => {
    const w = widths[i];
    rect(slide, x, 258, w - 8, 86, c, { radius: 12 });
    text(slide, name, x + 10, 271, w - 28, 28, i >= 4 ? 17 : 20, colors.white, { bold: true });
    text(slide, String(duration), x + 10, 302, w - 28, 26, 16, "#EAF5FA", { bold: true });
    text(slide, "days", x + 10, 326, w - 28, 18, 12, "#EAF5FA");
    text(slide, days, x, 368, w - 8, 25, 15, colors.navy, { bold: true, align: "center" });
    text(slide, count, x, 396, w - 8, 22, 14, colors.muted, { align: "center" });
    x += w;
  });
  line(slide, 70, 474, 1135, 0, colors.line, 2);
  text(slide, "Business understanding", 70, 493, 270, 28, 18, colors.blue, { bold: true });
  text(slide, "Solution and operating model", 405, 493, 385, 28, 18, colors.teal, { bold: true, align: "center" });
  text(slide, "Release and ownership", 905, 493, 300, 28, 18, colors.green, { bold: true, align: "right" });
  text(slide, "The calendar controls order, while the learner's pace may vary by topic and Oracle environment access.", 70, 566, 1135, 34, 18, colors.muted, { italic: true, align: "center" });
  addNotes(slide, 5);
}

// Slide 6: learning rhythm.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "The learning rhythm", "How each block works", 6);
  const steps = [
    ["1", "Learn", "Understand the decision and control", colors.blue],
    ["2", "Apply", "Complete the Apex task", colors.orange],
    ["3", "Validate", "Check results and exceptions", colors.teal],
    ["4", "Evidence", "Save the artifact and review state", colors.purple],
    ["5", "Reflect", "Explain the result and handoff", colors.green],
  ];
  steps.forEach(([n, h, b, c], i) => {
    const x = 65 + i * 238;
    circle(slide, x + 58, 210, 72, c, n, colors.white, 26);
    if (i < steps.length - 1) {
      line(slide, x + 137, 246, 94, 0, colors.line, 3);
      rect(slide, x + 220, 240, 17, 13, colors.line, { geometry: "rightArrow", lineColor: colors.line, lineWidth: 0 });
    }
    text(slide, h, x, 304, 188, 34, 23, colors.navy, { bold: true, align: "center" });
    text(slide, b, x + 5, 347, 178, 72, 17, colors.muted, { align: "center" });
  });
  rect(slide, 128, 483, 1024, 104, colors.paleBlue, { radius: 18, lineColor: "#C3DFF4", lineWidth: 1 });
  text(slide, "Completion means the next role can understand, verify, and use the work.", 180, 502, 920, 38, 25, colors.navy, { bold: true, align: "center" });
  text(slide, "Navigation progress supports the process, but the evidence proves the capability.", 180, 544, 920, 28, 17, colors.muted, { align: "center" });
  addNotes(slide, 6);
}

// Slide 7: Discover.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "Discover", "Days 1–12", 7);
  text(slide, "The implementation begins with business evidence, not application configuration.", 68, 148, 1095, 52, 27, colors.navy, { bold: true });
  const rows = [
    ["Days 1–3", "Business case", "Outcomes, scope, constraints, and discovery hypotheses"],
    ["Days 4–6", "Stakeholders", "Decision owners, workshop plan, RACI, and evidence requests"],
    ["Days 7–9", "Requirements", "Questions, facts, assumptions, decisions, and acceptance criteria"],
    ["Days 10–12", "Current state", "Process, data handoffs, controls, pain points, and root causes"],
  ];
  rows.forEach(([days, h, b], i) => {
    const y = 232 + i * 86;
    text(slide, days, 75, y, 120, 28, 16, colors.blue, { bold: true });
    text(slide, h, 210, y - 2, 255, 31, 22, colors.ink, { bold: true });
    text(slide, b, 480, y - 3, 650, 44, 18, colors.muted);
    line(slide, 75, y + 55, 1055, 0, colors.line, 1);
  });
  rect(slide, 75, 590, 1055, 54, colors.navy, { radius: 10 });
  text(slide, "A1", 92, 601, 46, 30, 18, "#74BDF8", { bold: true });
  text(slide, "Discovery and current-state pack", 152, 600, 410, 30, 20, colors.white, { bold: true });
  text(slide, "Due Day 12", 930, 601, 170, 28, 16, "#D7E7F3", { bold: true, align: "right" });
  addNotes(slide, 7);
}

// Slide 8: Design.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "Design", "Days 13–30", 8);
  text(slide, "Validated needs become a future process and a buildable Oracle blueprint.", 68, 148, 1100, 50, 27, colors.navy, { bold: true });
  const blocks = [
    ["Future process", "Roles, calendar, decision grain, workflow", colors.blue],
    ["Traceability", "Requirements linked to design and tests", colors.orange],
    ["Architecture", "Environments, integrations, calculations, security", colors.teal],
    ["Application", "Custom Planning, currencies, BSO and ASO cubes", colors.purple],
    ["Dimensions", "Account, Entity, Product, Market, Channel and POV", colors.green],
  ];
  blocks.forEach(([h, b, c], i) => {
    const x = 68 + i * 226;
    rect(slide, x, 253, 198, 8, c);
    text(slide, String(i + 1).padStart(2, "0"), x, 278, 42, 28, 15, c, { bold: true });
    text(slide, h, x, 311, 195, 35, 21, colors.ink, { bold: true });
    text(slide, b, x, 354, 195, 78, 16, colors.muted);
  });
  line(slide, 68, 466, 1100, 0, colors.line, 2);
  text(slide, "Design gate", 68, 493, 205, 28, 17, colors.orange, { bold: true });
  text(slide, "The build team can proceed without inventing requirements or guessing at data grain.", 276, 486, 760, 44, 23, colors.navy, { bold: true });
  rect(slide, 68, 568, 1100, 60, colors.paleOrange, { radius: 10, lineColor: "#F3C4B1", lineWidth: 1 });
  text(slide, "A2", 88, 582, 45, 30, 18, colors.orange, { bold: true });
  text(slide, "Approved solution blueprint", 148, 581, 380, 30, 20, colors.ink, { bold: true });
  text(slide, "Due Day 30", 940, 582, 195, 28, 16, colors.orange, { bold: true, align: "right" });
  addNotes(slide, 8);
}

// Slide 9: Build part 1.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "Build, Part 1", "Days 31–54", 9);
  text(slide, "The operational plan develops from governed structures and reconciled data.", 68, 148, 1100, 50, 26, colors.navy, { bold: true });
  const items = [
    ["31–33", "Metadata", "Members, properties, hierarchies, aliases, and currency assignments", colors.blue],
    ["34–36", "Actuals integration", "Mappings, periods, rejects, reruns, and reconciliation", colors.teal],
    ["37–42", "Sales planning", "Baseline, overrides, consensus demand, and approval", colors.orange],
    ["43–45", "Inventory", "Opening stock, targets, closing balances, shortage, and excess", colors.purple],
    ["46–51", "Production and capacity", "Net requirement, yield, lots, plant allocation, and feasibility", colors.green],
    ["52–54", "Materials", "Component demand, on-hand supply, lead time, and procurement response", colors.yellow],
  ];
  items.forEach(([days, h, b, c], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 70 + col * 570;
    const y = 230 + row * 132;
    circle(slide, x, y, 54, c, String(i + 1), colors.white, 19);
    text(slide, days, x + 72, y - 3, 88, 22, 14, c, { bold: true });
    text(slide, h, x + 72, y + 20, 420, 31, 21, colors.ink, { bold: true });
    text(slide, b, x + 72, y + 53, 430, 55, 16, colors.muted);
  });
  rect(slide, 70, 619, 1100, 38, colors.navy, { radius: 7 });
  text(slide, "Day 54 outcome: one balanced demand, inventory, production, capacity, and material plan", 92, 625, 1056, 24, 17, colors.white, { bold: true, align: "center" });
  addNotes(slide, 9);
}

// Slide 10: Build part 2.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "Build, Part 2", "Days 55–75", 10);
  text(slide, "Operational decisions become financial outcomes and a controlled planner experience.", 68, 148, 1100, 48, 26, colors.navy, { bold: true });
  text(slide, "OPERATIONAL AND FINANCIAL MODEL", 70, 218, 510, 24, 13, colors.orange, { bold: true });
  const left = [
    ["55–57", "Manufacturing cost, COGS, and margin"],
    ["58–60", "Workforce and CapEx dependencies"],
    ["61–63", "Integrated financial statements"],
    ["64–66", "Business rules and Groovy"],
  ];
  left.forEach(([d, h], i) => {
    const y = 258 + i * 75;
    text(slide, d, 72, y, 75, 28, 15, colors.blue, { bold: true });
    text(slide, h, 165, y - 2, 405, 34, 20, colors.ink, { bold: true });
    line(slide, 72, y + 49, 498, 0, colors.line, 1);
  });
  line(slide, 617, 220, 0, 355, colors.line, 2);
  text(slide, "PLANNER EXPERIENCE AND CONTROL", 662, 218, 500, 24, 13, colors.orange, { bold: true });
  const right = [
    ["67–69", "Forms, dashboards, and Smart View", "A planner can enter, review, and explain the plan"],
    ["70–72", "Security and workflow", "Access, submission, approval, rejection, and audit"],
    ["73–75", "Scenario planning", "Controlled alternatives with quantified trade-offs"],
  ];
  right.forEach(([d, h, b], i) => {
    const y = 264 + i * 108;
    circle(slide, 664, y, 46, i === 2 ? colors.orange : colors.paleBlue, String(i + 1), i === 2 ? colors.white : colors.blue, 17);
    text(slide, d, 726, y - 4, 82, 24, 14, colors.blue, { bold: true });
    text(slide, h, 817, y - 5, 345, 31, 20, colors.ink, { bold: true });
    text(slide, b, 726, y + 30, 430, 48, 16, colors.muted);
  });
  rect(slide, 662, 576, 500, 70, colors.paleBlue, { radius: 10, lineColor: "#C3DFF4", lineWidth: 1 });
  text(slide, "Build milestone", 680, 584, 152, 21, 13, colors.blue, { bold: true });
  text(slide, "Usable, reconciled, controlled, and ready for end-to-end testing", 680, 606, 460, 36, 16, colors.navy, { bold: true });
  addNotes(slide, 10);
}

// Slide 11: Validate.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "Validate", "Days 76–84", 11);
  text(slide, "Testing proves the connected business journey and supports a release decision.", 68, 148, 1100, 48, 26, colors.navy, { bold: true });
  const tests = [
    ["76–78", "System Integration Testing", "Business scenarios across data, calculations, forms, workflow, security, and reporting", colors.blue],
    ["79–81", "Performance Testing", "Repeatable interactive and batch workloads with controlled tuning", colors.teal],
    ["82–84", "User Acceptance Testing", "Business-owned journeys against agreed acceptance criteria", colors.orange],
    ["82–84", "Defect Management", "Reproduction, priority, ownership, retest, closure, or approved residual risk", colors.purple],
  ];
  tests.forEach(([d, h, b, c], i) => {
    const y = 235 + i * 88;
    rect(slide, 70, y, 122, 60, c, { radius: 10 });
    text(slide, d, 78, y + 13, 106, 30, 17, colors.white, { bold: true, align: "center" });
    text(slide, h, 225, y - 2, 330, 30, 21, colors.ink, { bold: true });
    text(slide, b, 570, y - 5, 570, 54, 17, colors.muted);
  });
  rect(slide, 70, 606, 1070, 46, colors.navy, { radius: 8 });
  text(slide, "Release candidate accepted or every residual risk has an authorized owner and disposition", 92, 614, 1026, 26, 17, colors.white, { bold: true, align: "center" });
  addNotes(slide, 11);
}

// Slide 12: Deploy and Operate.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "Deploy and Operate", "Days 85–90", 12);
  const timeline = [
    ["85–86", "Cutover", "Rehearsal, sequencing, validation, rollback", colors.blue],
    ["87", "Go / No-Go", "Readiness evidence and decision authority", colors.orange],
    ["88", "Go-Live", "Activation, smoke tests, reconciliation, communication", colors.teal],
    ["89", "Hypercare", "Monitoring, triage, knowledge transfer, exit criteria", colors.purple],
    ["90", "BAU and capstone", "Monthly-cycle defense, ownership, value, roadmap", colors.green],
  ];
  line(slide, 110, 286, 1010, 0, colors.line, 5);
  timeline.forEach(([d, h, b, c], i) => {
    const x = 85 + i * 220;
    circle(slide, x, 249, 74, c, d, colors.white, d.length > 2 ? 15 : 20);
    text(slide, h, x - 28, 345, 130, 34, 21, colors.navy, { bold: true, align: "center" });
    text(slide, b, x - 40, 389, 155, 88, 15, colors.muted, { align: "center" });
  });
  rect(slide, 110, 540, 1010, 82, colors.paleOrange, { radius: 14, lineColor: "#F3C4B1", lineWidth: 1 });
  text(slide, "Day 90 decision", 137, 553, 180, 24, 14, colors.orange, { bold: true });
  text(slide, "The learner can explain the implementation, operate the planning cycle, and hand over an owned service.", 137, 578, 940, 31, 21, colors.navy, { bold: true });
  addNotes(slide, 12);
}

// Slide 13: monthly planning flow.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "The planning process", "Operational thread", 13);
  text(slide, "The implementation phases progressively assemble the recurring monthly planning cycle.", 68, 148, 1100, 48, 26, colors.navy, { bold: true });
  const flow = [
    ["1", "Data readiness", colors.blue],
    ["2", "Demand baseline", colors.blue2],
    ["3", "Consensus demand", colors.orange],
    ["4", "Inventory", colors.teal],
    ["5", "Production", colors.green],
    ["6", "Capacity and materials", colors.yellow],
    ["7", "Cost and finance", colors.purple],
    ["8", "Approve, publish, reconcile", colors.navy],
  ];
  flow.forEach(([n, h, c], i) => {
    const row = Math.floor(i / 4);
    const col = i % 4;
    const x = 72 + col * 285;
    const y = 242 + row * 173;
    circle(slide, x, y, 58, c, n, colors.white, 19);
    text(slide, h, x + 75, y - 1, 185, 52, 19, colors.ink, { bold: true });
    if (col < 3) {
      line(slide, x + 248, y + 29, 22, 0, colors.line, 3);
      rect(slide, x + 264, y + 23, 15, 13, colors.line, { geometry: "rightArrow", lineColor: colors.line, lineWidth: 0 });
    }
  });
  line(slide, 70, 574, 1100, 0, colors.line, 1);
  text(slide, "Implementation journey", 70, 592, 230, 24, 15, colors.orange, { bold: true });
  text(slide, "How and why the solution is built", 70, 619, 410, 25, 19, colors.navy, { bold: true });
  text(slide, "Monthly planning cycle", 680, 592, 230, 24, 15, colors.blue, { bold: true });
  text(slide, "How planners operate the solution after go-live", 680, 619, 490, 25, 19, colors.navy, { bold: true });
  addNotes(slide, 13);
}

// Slide 14: assignments and gates.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "Assignments and milestones", "Evidence standard", 14);
  text(slide, "Nine submissions combine lesson work into reviewable implementation packages.", 68, 148, 1100, 44, 25, colors.navy, { bold: true });
  const labels = ["A1\nDay 12", "A2\nDay 30", "A3\nDay 36", "A4\nDay 54", "A5\nDay 66", "A6\nDay 75", "A7\nDay 84", "A8\nDay 89", "A9\nDay 90"];
  line(slide, 108, 286, 1040, 0, colors.line, 4);
  labels.forEach((label, i) => {
    const x = 74 + i * 128;
    const isFinal = i === 8;
    circle(slide, x, 252, 68, isFinal ? colors.orange : colors.white, label, isFinal ? colors.white : colors.blue, 14);
    if (!isFinal) {
      slide.shapes.add({ geometry: "ellipse", position: { left: x, top: 252, width: 68, height: 68 }, fill: "none", line: { style: "solid", fill: colors.blue, width: 3 } });
    }
  });
  text(slide, "Stage gates", 72, 389, 190, 28, 18, colors.orange, { bold: true });
  const gateText = ["Lessons and checks complete", "Figures reconcile", "Assumptions are explicit", "Evidence shows review state", "Open items have owners", "Next stage can use the output"];
  gateText.forEach((g, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 75 + col * 550;
    const y = 437 + row * 64;
    circle(slide, x, y, 30, colors.paleBlue, "✓", colors.blue, 16);
    text(slide, g, x + 45, y - 3, 450, 35, 18, colors.ink, { bold: true });
  });
  addNotes(slide, 14);
}

// Slide 15: starting sequence.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "How to begin", "Learner workflow", 15);
  const steps = [
    ["01", "Review the program plan", "Understand the calendar, assignments, and stage gates."],
    ["02", "Open Phase 01", "Begin with Discovery even if you already know the Oracle interface."],
    ["03", "Work through lessons in order", "Complete the task, knowledge check, deliverable, and exit validation."],
    ["04", "Maintain an evidence folder", "Keep source, working, final, validation, and feedback versions together."],
    ["05", "Resolve gaps before moving on", "Record open questions and avoid silent assumptions."],
  ];
  steps.forEach(([n, h, b], i) => {
    const y = 159 + i * 99;
    text(slide, n, 72, y, 72, 45, 27, i === 4 ? colors.orange : colors.blue, { bold: true });
    text(slide, h, 161, y - 1, 408, 34, 22, colors.ink, { bold: true });
    text(slide, b, 591, y - 2, 545, 50, 17, colors.muted);
    line(slide, 72, y + 64, 1064, 0, colors.line, 1);
  });
  addNotes(slide, 15);
}

// Slide 16: participation standard.
{
  const slide = presentation.slides.add();
  addContentFrame(slide, "Participation standard", "What good work looks like", 16);
  text(slide, "Strong implementation work remains understandable after it leaves the learner's hands.", 68, 148, 1100, 52, 27, colors.navy, { bold: true });
  const behaviors = [
    ["Be evidence-led", "Test the result and retain what supports the conclusion.", colors.blue],
    ["Explain assumptions", "Record what remains uncertain and who owns the answer.", colors.orange],
    ["Reconcile before approval", "Trace totals, drivers, and exceptions across the process.", colors.teal],
    ["Think about the next role", "Prepare work that developers, testers, planners, and support teams can use.", colors.purple],
  ];
  behaviors.forEach(([h, b, c], i) => {
    const y = 247 + i * 91;
    rect(slide, 72, y, 10, 60, c);
    text(slide, h, 105, y - 2, 360, 32, 22, colors.ink, { bold: true });
    text(slide, b, 486, y - 5, 650, 55, 18, colors.muted);
  });
  rect(slide, 72, 617, 1064, 42, colors.paleBlue, { radius: 8 });
  text(slide, "Oracle knowledge matters. Clear decisions, controlled handoffs, and ownership make the implementation usable.", 90, 624, 1028, 26, 16, colors.navy, { bold: true, align: "center" });
  addNotes(slide, 16);
}

// Slide 17: dashboard reveal.
{
  const slide = presentation.slides.add();
  slide.background.fill = colors.navy;
  slide.images.add({
    blob: dashboardBytes,
    contentType: "image/png",
    alt: "BISP Learning Lab dashboard for the 90-Day Oracle Planning Workshop",
    fit: "contain",
    position: { left: 16, top: 16, width: 1248, height: 688 },
    geometry: "roundRect",
    borderRadius: 12,
  });
  addNotes(slide, 17);
}

// Slide 18: dashboard remains on screen for the close.
{
  const slide = presentation.slides.add();
  slide.background.fill = colors.navy;
  slide.images.add({
    blob: dashboardBytes,
    contentType: "image/png",
    alt: "BISP Learning Lab dashboard",
    fit: "contain",
    position: { left: 16, top: 0, width: 1248, height: 688 },
  });
  rect(slide, 0, 602, W, 118, colors.navy);
  text(slide, "Next video", 68, 620, 180, 22, 14, "#76BCFA", { bold: true });
  text(slide, "Learning Lab UI walkthrough", 68, 646, 660, 42, 29, colors.white, { bold: true });
  text(slide, "Then begin Phase 01", 915, 646, 290, 32, 18, "#D7E7F3", { bold: true, align: "right" });
  addNotes(slide, 18);
}

// Draft preview artifacts.
const montage = await presentation.export({ format: "webp", montage: true, scale: 0.55 });
await fs.writeFile(path.join(buildDir, "deck-montage.webp"), new Uint8Array(await montage.arrayBuffer()));

for (let i = 0; i < presentation.slides.items.length; i += 1) {
  const blob = await presentation.export({ slide: presentation.slides.items[i], format: "png", scale: 1 });
  await fs.writeFile(path.join(buildDir, `slide-${String(i + 1).padStart(2, "0")}.png`), new Uint8Array(await blob.arrayBuffer()));
}

const requirements = {
  explicitTotalSlideCount: 18,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
};
const fontPolicy = { basis: "design", families: [FONT] };
const stagingDir = path.join(workspaceDir, ".codex-finalizer");
await fs.mkdir(stagingDir, { recursive: true });
const candidatePath = path.join(stagingDir, "90-day-workshop-introduction-candidate-v2.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

await finalizePresentation({
  ...requirements,
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable: runtimePython,
  integrityValidatorPath: path.join(skillDir, "container_tools", "inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(skillDir, "container_tools", "inspect_presentation_layout_geometry.py"),
  layoutArgs: [
    "--expected-slide-size-emu", "12192000,6858000",
    "--validate-heading-fit",
  ],
  fontPolicy,
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, "90-Day-Oracle-Planning-Workshop-Introduction-Final.validation.json"),
});

console.log(finalPath);
