// App/Controller/DokterController.gs
function renderDokterPage() {
  const dokters = DokterModel.getAll();     // take all data dokter
  const spesialisasiDetail = DokterModel.getSpesialisasiDetail(); // take detail data based on specialization
  const spesialisasiHarian = DokterModel.getKelompokJadwalHarian(); // take data based on specialization
  
  
  const template = HtmlService.createTemplateFromFile('App/Views/Pages/dokter');
  template.dokters = dokters;               // send data to template
  template.spesialisasiDetail = spesialisasiDetail; // send detailed data based on specialization to the template
  template.spesialisasiHarian = spesialisasiHarian;     // send data based on specialization to the template
  
  return template.evaluate().getContent();  // return parsed HTML
}
