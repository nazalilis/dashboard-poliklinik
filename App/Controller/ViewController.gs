// App/Controller/ViewController.gs
function renderPage(page) {
  try {
    let template;

    if (page === 'dashboard') {
      template = HtmlService.createTemplateFromFile('App/Views/Pages/dashboard');
      template.data = {}; // bisa dikirim data kalau perlu
      return template.evaluate().getContent();
    }

    if (page === 'dokter')    return renderDokterPage(); // panggil fungsi khusus untuk dokter

    // Tambah halaman lain di sini nanti
    return `<div class="alert alert-error">Halaman ${page} belum dibuat</div>`;

  } catch (error) {
    console.error(error);
    return `<div class="alert alert-error shadow-lg">Error: ${error.message}</div>`;
  }
}