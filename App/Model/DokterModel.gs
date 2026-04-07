// App/Model/DokterModel.gs
class DokterModel {
  
  static getAll() {
    try {
      const ss = SpreadsheetApp.openById(SHEET_ID);
      const sheet = ss.getSheetByName(SHEET_Jadwal_Dokter);
      
      if (!sheet) {
        throw new Error(`Sheet dengan nama "${SHEET_Jadwal_Dokter}" tidak ditemukan!`);
      }

      const data = sheet.getDataRange().getValues();
      
      console.log(data); // Debug: lihat data mentah

      // Skip header row
      return data.slice(1).map(row => ({
        spesialisasi: row[0] || '',
        nama: row[1] || '',
        hari: row[2] || '',
        waktu: row[3] || '',
        jam: row[4] || ''
      })).filter(row => row.nama); // filter baris kosong

    } catch (error) {
      console.error('Error di DokterModel:', error);
      throw new Error('Gagal mengambil data dokter: ' + error.message);
    }
  }

  static getSpesialisasi() {
    try {
      const ss = SpreadsheetApp.openById(SHEET_ID);
      const sheet = ss.getSheetByName(SHEET_Jadwal_Dokter);
      
      if (!sheet) {
        throw new Error(`Sheet dengan nama "${SHEET_Jadwal_Dokter}" tidak ditemukan!`);
      }

      const data = sheet.getDataRange().getValues();
      
      console.log(data); // Debug: lihat data mentah

      const grouped = data.reduce((acc, curr) => {
        const poli = curr[0];
        if (!acc[poli]) acc[poli] = [];
      
        acc[poli].push({
          nama: curr[1],
          hari: curr[2],
          shift: curr[3],
          jam: curr[4]
        });
        return acc;
      }, {});

      console.log(grouped); // Debug: lihat data yang sudah dikelompokkan

      return grouped;

    } catch (error) {
      console.error('Error di DokterModel:', error);
      throw new Error('Gagal mengambil data dokter: ' + error.message);
    }
  }
  
  static getSpesialisasiDetail() {
    try {
      const ss = SpreadsheetApp.openById(SHEET_ID);
      const sheet = ss.getSheetByName(SHEET_Jadwal_Dokter);
      
      if (!sheet) {
        throw new Error(`Sheet dengan nama "${SHEET_Jadwal_Dokter}" tidak ditemukan!`);
      }

      const data = sheet.getDataRange().getValues();
      
      console.log(data); // Debug: lihat data mentah

      function kelompokkanJadwal(rawData) {
        const daftarHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

        // STEP 1: Kelompokkan berdasarkan Poli -> Dokter -> Shift + Jam
        const grouped = rawData.reduce((acc, [poli, nama, hari, shift, jam]) => {
          if (!acc[poli]) acc[poli] = {};
          if (!acc[poli][nama]) acc[poli][nama] = {};

          // Kita gabungkan Shift dan Jam sebagai kunci unik
          const keyShift = `${shift} (${jam})`;
          if (!acc[poli][nama][keyShift]) acc[poli][nama][keyShift] = [];
          
          acc[poli][nama][keyShift].push(hari);
          return acc;
        }, {});

        // STEP 2: Format Hari (Logika "-" atau ",")
        const formatHari = (hariTerpilih) => {
          if (hariTerpilih.length === 1) return hariTerpilih[0];

          // Urutkan hari berdasarkan urutan kalender
          const sortedHari = hariTerpilih.sort((a, b) => daftarHari.indexOf(a) - daftarHari.indexOf(b));
          const indices = sortedHari.map(h => daftarHari.indexOf(h));
          
          // Cek apakah berurutan (misal: 0, 1, 2)
          const isSequential = indices.every((val, i) => i === 0 || val === indices[i - 1] + 1);

          if (isSequential && indices.length > 1) {
            return `${sortedHari[0]} - ${sortedHari[sortedHari.length - 1]}`;
          } else {
            return sortedHari.join(', ');
          }
        };

        // STEP 3: Susun ulang menjadi Array untuk Template
        return Object.entries(grouped).map(([namaPoli, dokters]) => ({
          poli: namaPoli,
          listDokter: Object.entries(dokters).map(([namaDokter, shifts]) => ({
            nama: namaDokter,
            jadwalDetail: Object.entries(shifts).map(([infoShift, hariArray]) => 
              `${formatHari(hariArray)} | ${infoShift}`
            )
          }))
        }));
      }

      return kelompokkanJadwal(data.slice(1)); // Skip header

    } catch (error) {
      console.error('Error di DokterModel:', error);
      throw new Error('Gagal mengambil data dokter: ' + error.message);
    }
  }

}