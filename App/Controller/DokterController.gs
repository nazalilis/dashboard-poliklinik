// App/Controller/DokterController.gs
function renderDokterPage() {
  const dokters = DokterModel.getAll();     // ambil data
  const spesialisasiDetail = DokterModel.getSpesialisasiDetail(); // ambil data detail berdasarkan spesialisasi
  const spesialisasiHarian = DokterModel.getKelompokJadwalHarian(); // ambil data berdasarkan spesialisasi
  
  const template = HtmlService.createTemplateFromFile('App/Views/Pages/dokter');
  template.dokters = dokters;               // kirim data ke template
  template.spesialisasiDetail = spesialisasiDetail; // kirim data detail berdasarkan spesialisasi ke template
  template.spesialisasiHarian = spesialisasiHarian;     // kirim data berdasarkan spesialisasi ke template
  
  return template.evaluate().getContent();  // return HTML yang sudah di-parse
}
