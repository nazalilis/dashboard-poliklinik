// App/Controller/DokterController.gs
function renderDoktorsSchedule() {
  const dokters = DokterModel.getAll();     // take all data dokter
  const spesialisasiDetail = DokterModel.getSpesialisasiDetail(); // take detail data based on specialization
  const spesialisasiHarian = DokterModel.getKelompokJadwalHarian(); // take data based on specialization
  const spesialisasiHariIni = DokterModel.getJadwalHariIni(); // take data for today only

  const template = HtmlService.createTemplateFromFile('App/Views/Pages/doctorsSchedule');
  template.dokters = dokters;               // send data to template
  template.spesialisasiDetail = spesialisasiDetail; // send detailed data based on specialization to the template
  template.spesialisasiHarian = spesialisasiHarian;     // send data based on specialization to the template
  template.spesialisasiHariIni = spesialisasiHariIni;     // send data for today only to the template

  return template.evaluate().getContent();  // return parsed HTML
}
