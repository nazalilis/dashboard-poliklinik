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
      
      console.log(data); // Debug: view raw data

      // Skip header row
      return data.slice(1).map(row => ({
        spesialisasi: row[0] || '',
        nama: row[1] || '',
        hari: row[2] || '',
        waktu: row[3] || '',
        jam: row[4] || ''
      })).filter(row => row.nama); // empty line filter

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
      
      console.log(data); // Debug: view raw data

      function kelompokkanJadwal(rawData) {
        const daftarHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

        // STEP 1: Group by Poly -> Doctor -> Shift + Hours
        const grouped = rawData.reduce((acc, [poli, nama, hari, shift, jam]) => {
          if (!acc[poli]) acc[poli] = {};
          if (!acc[poli][nama]) acc[poli][nama] = {};

          // We combine Shift and Hour as a unique key
          const keyShift = ` (${jam})`;
          if (!acc[poli][nama][keyShift]) acc[poli][nama][keyShift] = [];
          
          acc[poli][nama][keyShift].push(hari);
          return acc;
        }, {});

        // STEP 2: Day Format (Logic "-" or ",")
        const formatHari = (hariTerpilih) => {
          if (hariTerpilih.length === 1) return hariTerpilih[0];

          // Sort days by calendar order
          const sortedHari = hariTerpilih.sort((a, b) => daftarHari.indexOf(a) - daftarHari.indexOf(b));
          const indices = sortedHari.map(h => daftarHari.indexOf(h));
          
          // Check if it is sequential (eg: 0, 1, 2)
          const isSequential = indices.every((val, i) => i === 0 || val === indices[i - 1] + 1);

          if (isSequential && indices.length > 1) {
            return `${sortedHari[0]} - ${sortedHari[sortedHari.length - 1]}`;
          } else {
            return sortedHari.join(', ');
          }
        };

        // STEP 3: Rearrange into Array for Template
        return Object.entries(grouped).map(([namaPoli, dokters]) => ({
          poli: namaPoli,
          listDokter: Object.entries(dokters).map(([namaDokter, shifts]) => ({
            nama: namaDokter,
            jadwalDetail: Object.entries(shifts).map(([infoShift, hariArray]) => 
              `${formatHari(hariArray)} ${infoShift}`
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

  static getKelompokJadwalHarian() {
    try {
      const ss = SpreadsheetApp.openById(SHEET_ID);
      const sheet = ss.getSheetByName(SHEET_Jadwal_Dokter);
      
      if (!sheet) {
        throw new Error(`Sheet dengan nama "${SHEET_Jadwal_Dokter}" tidak ditemukan!`);
      }

      const data = sheet.getDataRange().getValues();
      
      console.log(data); // Debug: view raw data

      function kelompokkanJadwalHarian(rawData) {
        // Standard order so that the display is not random
        const urutanHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
        const urutanShift = ['Pagi', 'Siang', 'Sore', 'Malam'];

        // Step 1: Group data into Objects
        const grouped = rawData.reduce((acc, [poli, nama, hari, shift, jam]) => {
          if (!acc[hari]) acc[hari] = {};
          if (!acc[hari][shift]) acc[hari][shift] = [];
          
          acc[hari][shift].push({
            poli: poli,
            nama: nama,
            jam: jam
          });
          return acc;
        }, {});

        // Step 2: Rearrange based on the correct order of days and shifts
        const hasilFinal = [];
        
        urutanHari.forEach(h => {
          if (grouped[h]) {
            const shiftsDitemukan = [];
            
            urutanShift.forEach(s => {
              if (grouped[h][s]) {
                shiftsDitemukan.push({
                  namaShift: s,
                  listJadwal: grouped[h][s]
                });
              }
            });

            hasilFinal.push({
              hari: h,
              shifts: shiftsDitemukan
            });
          }
        });

        return hasilFinal;
      }

      return kelompokkanJadwalHarian(data.slice(1)); // Skip headers

    } catch (error) {
      console.error('Error di DokterModel:', error);
      throw new Error('Gagal mengambil data dokter: ' + error.message);
    }
  }

}