// Code.gs
function doGet() {
  const template = HtmlService.createTemplateFromFile('Public/index');
  
  return template
    .evaluate()
    .setTitle('Polyclinic Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);  // tambahan biar lebih stabil
}

// Helper include (kalau kamu butuh partial nanti)
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
