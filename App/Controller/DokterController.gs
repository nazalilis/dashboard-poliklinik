// App/Controller/DokterController.gs
function renderDokterPage() {
  const dokters = DokterModel.getAll();     // ambil data
  const spesialisasi = DokterModel.getSpesialisasi(); // ambil data berdasarkan spesialisasi
  const spesialisasiDetail = DokterModel.getSpesialisasiDetail(); // ambil data detail berdasarkan spesialisasi
  
  const template = HtmlService.createTemplateFromFile('App/Views/Pages/dokter');
  template.dokters = dokters;               // kirim data ke template
  template.spesialisasi = spesialisasi;     // kirim data berdasarkan spesialisasi ke template
  template.spesialisasiDetail = spesialisasiDetail; // kirim data detail berdasarkan spesialisasi ke template
  
  return template.evaluate().getContent();  // return HTML yang sudah di-parse
}
