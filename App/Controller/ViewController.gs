// App/Controller/ViewController.gs
function renderPage(page) {
  try {
    let template;

    if (page === 'dashboard') {
      template = HtmlService.createTemplateFromFile('App/Views/Pages/dashboard');
      template.data = {}; // data can be sent if necessary
      return template.evaluate().getContent();
    }

    
    if (page === 'dokter')    return renderDokterPage(); // call a special function for doctors

    // Tambah halaman lain di sini nanti
    return `<div class="alert alert-error">Halaman ${page} belum dibuat</div>`;

  } catch (error) {
    console.error(error);
    return `<div class="alert alert-error shadow-lg">Error: ${error.message}</div>`;
  }
}