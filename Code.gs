// Code.gs
function doGet() {
  const template = HtmlService.createTemplateFromFile('App/Views/index');
  
  return template
    .evaluate()
    .setTitle('Dashboard Poliklinik')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);  // tambahan biar lebih stabil
}

// Helper include (kalau kamu butuh partial nanti)
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
