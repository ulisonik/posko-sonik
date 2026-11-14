/* POSKO SONIK - server tiruan untuk PRATINJAU (?demo=1 atau API_URL kosong). Data CONTOH, bukan data nyata.
   Kode contoh POSKO SONIK: ADMIN-000000 (admin pusat, semua gudang), SORONG-111111 (Admin Sorong), NABIRE-222222 (Admin Nabire). Tidak ada peran petugas.
   Halaman pengajuan: ambil.html?demo=1&k=DEMO-SORONG-0000000 (atau DEMO-NABIRE-0000000).
   Data contoh disimpan di localStorage HP/laptop ini (kunci ms_demo_v8) agar ambil.html & index.html berbagi data.
   Hapus: localStorage.removeItem('ms_demo_v8'). */
(function () {
  var AKSES = {
    'ADMIN-000000': { nama: 'Admin Pusat', peran: 'ADMIN', gudang: 'SEMUA', gudangList: ['SORONG', 'NABIRE'] },
    'SORONG-111111': { nama: 'Admin Sorong', peran: 'ADMIN', gudang: 'SORONG', gudangList: ['SORONG'] },
    'NABIRE-222222': { nama: 'Admin Nabire', peran: 'ADMIN', gudang: 'NABIRE', gudangList: ['NABIRE'] }
  };
  var TOKEN = { 'DEMO-SORONG-0000000': 'SORONG', 'DEMO-NABIRE-0000000': 'NABIRE' };
  var TOKENG = { SORONG: 'DEMO-SORONG-0000000', NABIRE: 'DEMO-NABIRE-0000000' };
  var KATEGORI = ['CTA BACKRACK', 'FSU', 'GIMMICK (PRODUK)', 'GIMMICK (NON PRODUK)', 'HEADER', 'INSERTION', 'JHOOK', 'POPPER', 'POSTER', 'PRODUCT HANGER', 'PRODUCT HANGER IMPRA (PLASTIK)', 'STANDING HANGER', 'TABLE TOP', 'ULI CORNER', 'LAINNYA'];
  var SATUAN = ['PCS', 'LEMBAR', 'ROLL', 'SET', 'UNIT'];
  var KEMASAN = ['PACK', 'KOLI', 'KARTON / BOX', 'PETI', 'LUSIN', 'IKAT'];
  var ALASAN = ['RUSAK', 'HILANG', 'SELISIH HITUNG', 'TIDAK DIPAKAI / DIMUSNAHKAN', 'LAINNYA'];
  var JABATAN = ['DSR / Salesman', 'MD / Merchandiser', 'DSS / Supervisor', 'AASM', 'Lainnya'];
  var BATAS = 10, KEY = 'ms_demo_v8';

  function iso(daysAgo) { var d = new Date(Date.now() - daysAgo * 86400000); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function ymd(s) { return s.replace(/-/g, ''); }
  function now() { var d = new Date(); return iso(0) + 'T' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }

  function awal() {
    return {
      BARANG: [
        { kode: 'SOQ001', gudang: 'SORONG', nama: 'HEADER PEPSODENT', kategori: 'HEADER', satuan: 'PCS', kemasan: '', isi: 0, foto: '', stok: { SORONG: 80 } },
        { kode: 'SOQ002', gudang: 'SORONG', nama: 'KAOS PEPSODENT', kategori: 'GIMMICK (PRODUK)', satuan: 'PCS', kemasan: 'KOLI', isi: 20, foto: '', stok: { SORONG: 70 } },
        { kode: 'SOQ003', gudang: 'SORONG', nama: 'PH BIRU REGULER', kategori: 'PRODUCT HANGER', satuan: 'PCS', kemasan: '', isi: 0, foto: '', stok: { SORONG: 0 } },
        { kode: 'SOQ004', gudang: 'SORONG', nama: 'STANDING HANGER SUNLIGHT', kategori: 'STANDING HANGER', satuan: 'PCS', kemasan: '', isi: 0, foto: '', stok: { SORONG: 6 } },
        { kode: 'SOQ005', gudang: 'SORONG', nama: 'JHOOK RINSO', kategori: 'JHOOK', satuan: 'PCS', kemasan: 'PACK', isi: 50, foto: '', stok: { SORONG: 170 } },
        { kode: 'SOQ006', gudang: 'SORONG', nama: 'TABLE TOP ROYCO', kategori: 'TABLE TOP', satuan: 'PCS', kemasan: '', isi: 0, foto: '', stok: { SORONG: 25 } },
        { kode: 'NBX001', gudang: 'NABIRE', nama: 'KAOS PEPSODENT', kategori: 'GIMMICK (PRODUK)', satuan: 'PCS', kemasan: 'KOLI', isi: 20, foto: '', stok: { NABIRE: 950 } },
        { kode: 'NBX002', gudang: 'NABIRE', nama: 'PH BIRU REGULER', kategori: 'PRODUCT HANGER', satuan: 'PCS', kemasan: '', isi: 0, foto: '', stok: { NABIRE: 50 } },
        { kode: 'NBX003', gudang: 'NABIRE', nama: 'STANDING HANGER SUNLIGHT', kategori: 'STANDING HANGER', satuan: 'PCS', kemasan: '', isi: 0, foto: '', stok: { NABIRE: 12 } },
        { kode: 'NBX004', gudang: 'NABIRE', nama: 'JHOOK RINSO', kategori: 'JHOOK', satuan: 'PCS', kemasan: 'PACK', isi: 50, foto: '', stok: { NABIRE: 450 } },
        { kode: 'NBX005', gudang: 'NABIRE', nama: 'TABLE TOP ROYCO', kategori: 'TABLE TOP', satuan: 'PCS', kemasan: '', isi: 0, foto: '', stok: { NABIRE: 40 } }
      ],
      TRX: [
        { id: 'MSK-SOQ-' + ymd(iso(6)) + '-1', jenis: 'masuk', tanggal: iso(6), waktu: iso(6) + 'T09:12', gudang: 'SORONG', sumber: 'UNILEVER', checker: 'Gerson', oleh: 'Gerson', status: 'AKTIF', items: [{ kode: 'SOQ001', jumlah: 100 }, { kode: 'SOQ002', jumlah: 100, kms: { kemasan: 'KOLI', isi: 20, qty: 5 } }, { kode: 'SOQ005', jumlah: 200, kms: { kemasan: 'PACK', isi: 50, qty: 4 } }] },
        { id: 'SJ-SOQ-' + ymd(iso(4)) + '-1', jenis: 'keluar', tanggal: iso(4), waktu: iso(4) + 'T13:40', gudang: 'SORONG', menyerahkan: 'Gerson', menerima: 'Dorteis (DSR)', catatan: 'Untuk outlet rute Senin', oleh: 'Gerson', status: 'AKTIF', items: [{ kode: 'SOQ001', jumlah: 10, sebelum: 100, setelah: 90 }, { kode: 'SOQ002', jumlah: 20, sebelum: 100, setelah: 80 }, { kode: 'SOQ005', jumlah: 30, sebelum: 200, setelah: 170 }] },
        { id: 'SJ-SOQ-' + ymd(iso(2)) + '-2', jenis: 'keluar', tanggal: iso(2), waktu: iso(2) + 'T10:05', gudang: 'SORONG', menyerahkan: 'Gerson', menerima: 'Stefanus (DSR)', catatan: '', oleh: 'Gerson', status: 'AKTIF', items: [{ kode: 'SOQ001', jumlah: 10, sebelum: 90, setelah: 80 }, { kode: 'SOQ002', jumlah: 10, sebelum: 80, setelah: 70 }] },
        { id: 'MSK-NBX-' + ymd(iso(3)) + '-1', jenis: 'masuk', tanggal: iso(3), waktu: iso(3) + 'T08:30', gudang: 'NABIRE', sumber: 'UNILEVER', checker: 'Stevan', oleh: 'Stevan', status: 'AKTIF', items: [{ kode: 'NBX001', jumlah: 1000, kms: { kemasan: 'KOLI', isi: 20, qty: 50 } }, { kode: 'NBX002', jumlah: 50 }] }
      ],
      PMT: [
        { id: 'PMT-SOQ-' + ymd(iso(3)) + '-1', waktu: iso(3) + 'T16:20', gudang: 'SORONG', nama: 'Dorteis', jabatan: 'DSR / Salesman', hp: '081234500001', keperluan: 'Pasang di Toko Sinar Jaya', catatan: '', status: 'MENUNGGU', items: [{ kode: 'SOQ005', minta: 50, setuju: null }, { kode: 'SOQ001', minta: 5, setuju: null }] },
        { id: 'PMT-SOQ-' + ymd(iso(0)) + '-2', waktu: iso(0) + 'T08:05', gudang: 'SORONG', nama: 'Yohanis', jabatan: 'MD / Merchandiser', hp: '081234500002', keperluan: 'Display Pepsodent outlet rute Jumat', catatan: 'Ambil pagi', status: 'MENUNGGU', items: [{ kode: 'SOQ004', minta: 10, setuju: null }] },
        { id: 'PMT-SOQ-' + ymd(iso(1)) + '-3', waktu: iso(1) + 'T10:00', gudang: 'SORONG', nama: 'Glenn', jabatan: 'DSR / Salesman', hp: '081234500004', keperluan: 'Program Pepsodent pasar', catatan: '', status: 'DISETUJUI', diprosesOleh: 'Gerson', waktuProses: iso(1) + 'T11:00', items: [{ kode: 'SOQ006', minta: 10, setuju: 10 }] },
        { id: 'PMT-SOQ-' + ymd(iso(5)) + '-4', waktu: iso(5) + 'T09:00', gudang: 'SORONG', nama: 'Hendra', jabatan: 'MD / Merchandiser', hp: '081234500005', keperluan: 'Pasang hanger', catatan: '', status: 'DISETUJUI', diprosesOleh: 'Gerson', waktuProses: iso(5) + 'T10:00', items: [{ kode: 'SOQ004', minta: 2, setuju: 2 }] },
        { id: 'PMT-NBX-' + ymd(iso(0)) + '-1', waktu: iso(0) + 'T09:10', gudang: 'NABIRE', nama: 'Theo', jabatan: 'DSR / Salesman', hp: '081234500003', keperluan: 'Outlet baru Pasar Karang', catatan: '', status: 'MENUNGGU', items: [{ kode: 'NBX001', minta: 20, setuju: null }] }
      ],
      NO: { MSK: { SORONG: 1, NABIRE: 1 }, SJ: { SORONG: 2, NABIRE: 0 }, BTL: { SORONG: 0, NABIRE: 0 }, PMT: { SORONG: 4, NABIRE: 1 }, ADJ: { SORONG: 0, NABIRE: 0 }, OPN: { SORONG: 0, NABIRE: 0 } }
    };
  }
  var D;
  try { D = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { D = null; }
  if (!D || !D.BARANG) D = awal();
  function simpan() { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) { /* penuh: abaikan */ } }
  simpan();

  function bar(kode) { return D.BARANG.filter(function (x) { return x.kode === kode; })[0]; }
  function sat(b, o) { o = o || {}; o.satuan = b.satuan; o.kemasan = b.isi > 1 ? b.kemasan : ''; o.isi = b.isi > 1 ? b.isi : 0; return o; }
  function pick(gl, s) { var o = {}; gl.forEach(function (g) { o[g] = s[g] || 0; }); return o; }
  /* Master barang per gudang (user 13 Nov): SOQ001 Sorong, NBX001 Nabire. */
  function pre(g) { return g === 'SORONG' ? 'SOQ' : 'NBX'; }
  function milik(gl) { return D.BARANG.filter(function (b) { return gl.indexOf(b.gudang) >= 0; }); }
  function kodeBerikut(g) { var max = 0; D.BARANG.forEach(function (b) { if (b.gudang === g) max = Math.max(max, Number(b.kode.replace(/\D/g, ''))); }); var n = String(max + 1); while (n.length < 3) n = '0' + n; return pre(g) + n; }
  function nomor(prefix, g, tgl) { D.NO[prefix][g]++; return prefix + '-' + (g === 'SORONG' ? 'SOQ' : 'NBX') + '-' + ymd(tgl) + '-' + D.NO[prefix][g]; }
  function contohFoto(teks) { var c = document.createElement('canvas'); c.width = 640; c.height = 400; var x = c.getContext('2d'); x.fillStyle = '#DDEFF2'; x.fillRect(0, 0, 640, 400); x.fillStyle = '#0E8C99'; x.font = 'bold 28px Arial'; x.textAlign = 'center'; x.fillText(teks, 320, 210); return c.toDataURL('image/jpeg', 0.8); }
  function contohTtd(nama) { var c = document.createElement('canvas'); c.width = 600; c.height = 180; var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, 600, 180); x.strokeStyle = '#0B2328'; x.lineWidth = 3; x.beginPath(); x.moveTo(80, 120); for (var i = 0; i < 40; i++) x.lineTo(80 + i * 11, 110 - Math.sin(i / 2.5) * 35 - (i % 7) * 2); x.stroke(); x.fillStyle = '#8A979C'; x.font = '16px Arial'; x.fillText(nama, 80, 165); return c.toDataURL('image/png'); }
  function gagal(m) { return { ok: false, error: m }; }

  /* Keputusan P1: cadangan stok saat DISETUJUI, kedaluwarsa 3 hari, MENUNGGU > 2 hari = lama. */
  function umur(w) { var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(String(w || '')); return m ? (Date.now() - new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]).getTime()) / 86400000 : 0; }
  function addHari(w, n) { var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(String(w || '')); if (!m) return ''; var d = new Date(+m[1], +m[2] - 1, +m[3] + n, +m[4], +m[5]); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) + 'T' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
  var KDL = 0; /* 0 = tanpa batas ambil */
  function sweep() { var ch = false; D.PMT.forEach(function (p) { if (KDL > 0 && p.status === 'DISETUJUI' && umur(p.waktuProses) > KDL) { p.status = 'KEDALUWARSA'; ch = true; } }); if (ch) simpan(); }
  function cad(kecuali) { sweep(); var m = {}; D.PMT.forEach(function (p) { if (p.status !== 'DISETUJUI' || p.id === kecuali) return; p.items.forEach(function (i) { if (i.setuju > 0) m[i.kode + '|' + p.gudang] = (m[i.kode + '|' + p.gudang] || 0) + i.setuju; }); }); return m; }
  function tersedia(k, g, c) { return Math.max(0, (bar(k).stok[g] || 0) - ((c || cad())[k + '|' + g] || 0)); }

  /* ---------- POSKO SONIK (kode akses) ---------- */
  function beranda(me) {
    var per = {};
    me.gudangList.forEach(function (g) {
      var pg = { habis: 0, menipis: 0, menunggu: D.PMT.filter(function (p) { return p.gudang === g && p.status === 'MENUNGGU'; }).length, peringatan: [] };
      milik([g]).forEach(function (b) {
        var n = b.stok[g] || 0;
        if (n <= 0) { pg.habis++; pg.peringatan.push({ kode: b.kode, nama: b.nama, satuan: b.satuan, stok: n, level: 'habis' }); }
        else if (n <= BATAS) { pg.menipis++; pg.peringatan.push({ kode: b.kode, nama: b.nama, satuan: b.satuan, stok: n, level: 'menipis' }); }
      });
      var cc = cad(); pg.kurangCadangan = milik([g]).filter(function (b) { return !b.nonaktif && (cc[b.kode + '|' + g] || 0) > (b.stok[g] || 0); }).map(function (b) { return { kode: b.kode, nama: b.nama, satuan: b.satuan, stok: b.stok[g] || 0, dipesan: cc[b.kode + '|' + g] }; });
      pg.peringatan.sort(function (a, b) { return a.stok - b.stok; });
      per[g] = pg;
    });
    return { ok: true, jenisBarang: milik(me.gudangList).length, batasMenipis: BATAS, perGudang: per };
  }
  function barangList(me) {
    var kb = {}; me.gudangList.forEach(function (g) { kb[g] = kodeBerikut(g); });
    return { ok: true, batasMenipis: BATAS, kodeBerikut: kb, kategori: KATEGORI, satuan: SATUAN, kemasan: KEMASAN,
      nonaktif: milik(me.gudangList).filter(function (b) { return b.nonaktif; }).map(function (b) { return sat(b, { kode: b.kode, gudang: b.gudang, nama: b.nama, kategori: b.kategori, foto: b.foto }); }),
      items: milik(me.gudangList).filter(function (b) { return !b.nonaktif; }).map(function (b) { var c = cad(), dp = {}; dp[b.gudang] = c[b.kode + '|' + b.gudang] || 0; return sat(b, { kode: b.kode, gudang: b.gudang, nama: b.nama, kategori: b.kategori, foto: b.foto, stok: pick([b.gudang], b.stok), dipesan: dp }); }) };
  }
  function barangTambah(me, d) {
    var nama = String(d.nama || '').toUpperCase().replace(/\s+/g, ' ').trim();
    if (nama.length < 3) return gagal('Nama barang minimal 3 huruf.');
    if (KATEGORI.indexOf(d.kategori) < 0) return gagal('Kategori tidak dikenal.');
    if (SATUAN.indexOf(d.satuan) < 0) return gagal('Satuan tidak dikenal.');
    if (!d.foto || !d.foto.base64) return gagal('Foto barang wajib diisi.');
    if (d.kemasan && !(d.isi >= 2)) return gagal('Isi per ' + d.kemasan + ' harus angka bulat 2 atau lebih.');
    if (me.gudangList.indexOf(d.gudang) < 0) return gagal('Anda tidak punya akses ke gudang ' + d.gudang + '.');
    var g = D.BARANG.filter(function (b) { return b.gudang === d.gudang && b.nama === nama; })[0];
    if (g) return gagal('Nama ini sudah terdaftar sebagai ' + g.kode + '.');
    var b = { kode: kodeBerikut(d.gudang), gudang: d.gudang, nama: nama, kategori: d.kategori, satuan: d.satuan, kemasan: d.kemasan || '', isi: d.kemasan ? d.isi : 0, foto: 'data:' + d.foto.mime + ';base64,' + d.foto.base64, stok: {} };
    b.stok[d.gudang] = 0;
    D.BARANG.push(b); simpan();
    return { ok: true, item: sat(b, { kode: b.kode, gudang: b.gudang, nama: b.nama, kategori: b.kategori, foto: b.foto, stok: pick([b.gudang], b.stok) }) };
  }
  function trx(me, d, keluar) {
    if (me.gudangList.indexOf(d.gudang) < 0) return gagal('Anda tidak punya akses ke gudang ' + d.gudang + '.');
    if (!d.items || !d.items.length) return gagal('Tambahkan minimal satu barang.');
    var asing = d.items.filter(function (r) { var b = bar(r.kode); return !b || b.gudang !== d.gudang; });
    if (asing.length) return gagal('Barang ' + asing[0].kode + ' bukan barang gudang ' + d.gudang + '.');
    var fts = (d.fotos && d.fotos.length ? d.fotos : (d.foto ? [d.foto] : [])); if (!fts.length) return gagal('Foto wajib diisi.'); if (fts.length > 5) return gagal('Maks 5 foto.');
    if (keluar && !d.ttd) return gagal('Tanda tangan penerima wajib diisi.');
    var bad = d.items.filter(function (r) { return r.kemasan && r.qtyKemasan * r.isi !== r.jumlah; });
    if (bad.length) return gagal('Hitungan kemasan tidak cocok.');
    if (keluar) {
      var cc = cad(d.idPermintaan || '');
      var kurang = d.items.filter(function (r) { return r.jumlah > tersedia(r.kode, d.gudang, cc); });
      if (kurang.length) return gagal('Stok tidak cukup: ' + kurang.map(function (r) { var b = bar(r.kode); return b.nama + ' (tersedia ' + tersedia(r.kode, d.gudang, cc) + ', diminta ' + r.jumlah + ')'; }).join('; ') + '. Muat ulang daftar lalu coba lagi.');
    }
    var p = null;
    if (keluar && d.idPermintaan) {
      p = D.PMT.filter(function (x) { return x.id === d.idPermintaan; })[0];
      if (!p || p.status !== 'DISETUJUI') return gagal('Permintaan ' + d.idPermintaan + ' belum disetujui atau sudah selesai.');
    }
    var stok = {}, rec = [], out = [];
    d.items.forEach(function (r) {
      var b = bar(r.kode), seb = b.stok[d.gudang] || 0;
      b.stok[d.gudang] = seb + (keluar ? -r.jumlah : r.jumlah); stok[r.kode] = b.stok[d.gudang];
      var kms = r.kemasan ? { kemasan: r.kemasan, isi: r.isi, qty: r.qtyKemasan } : null;
      if (kms && !(b.isi > 1)) { b.kemasan = kms.kemasan; b.isi = kms.isi; }
      rec.push({ kode: r.kode, jumlah: r.jumlah, kms: kms, sebelum: keluar ? seb : null, setelah: keluar ? stok[r.kode] : null });
      out.push(sat(b, { kode: r.kode, nama: b.nama, jumlah: r.jumlah, kms: kms }));
    });
    var no = nomor(keluar ? 'SJ' : 'MSK', d.gudang, d.tanggal);
    var t = { id: no, jenis: keluar ? 'keluar' : 'masuk', tanggal: d.tanggal, waktu: now(), gudang: d.gudang, oleh: me.nama, status: 'AKTIF', items: rec, fotos: fts.map(function (f) { return 'data:' + f.mime + ';base64,' + f.base64; }) };
    if (keluar) { t.menyerahkan = d.menyerahkan; t.menerima = d.menerima; t.jabatanPenerima = d.jabatanPenerima || ''; t.catatan = d.catatan; t.ttd = 'data:image/png;base64,' + d.ttd.base64; t.idPermintaan = d.idPermintaan || ''; }
    else { t.sumber = d.sumber; t.checker = d.checker; }
    D.TRX.unshift(t);
    if (p) { p.status = 'DISERAHKAN'; p.idKeluar = no; p.waktuSerah = now(); }
    simpan();
    return { ok: true, nomor: no, gudang: d.gudang, stok: stok, items: out };
  }
  function adjSimpan(me, d, opname) {
    if (!boleh(me, d.gudang)) return gagal('Anda tidak punya akses ke gudang ' + d.gudang + '.');
    if (!d.items || !d.items.length) return gagal(opname ? 'Belum ada barang yang dihitung.' : 'Tambahkan minimal satu barang.');
    if (!opname && ALASAN.indexOf(d.alasan) < 0) return gagal('Pilih alasan penyesuaian.');
    var det = d.items.map(function (r) { var b = bar(r.kode), ada = b.stok[d.gudang] || 0; var sel = opname ? r.fisik - ada : r.delta; return { kode: r.kode, sistem: ada, fisik: ada + sel, jumlah: sel }; });
    var minus = det.filter(function (x) { return x.fisik < 0; });
    if (minus.length) return gagal('Stok ' + minus[0].kode + ' di ' + d.gudang + ' tidak cukup (tersisa ' + minus[0].sistem + ').');
    var stok = {};
    det.forEach(function (x) { if (x.jumlah) { bar(x.kode).stok[d.gudang] = x.fisik; } stok[x.kode] = bar(x.kode).stok[d.gudang]; });
    var no = nomor(opname ? 'OPN' : 'ADJ', d.gudang, d.tanggal);
    D.TRX.unshift({ id: no, jenis: 'adj', sub: opname ? 'OPNAME' : 'PENYESUAIAN', tanggal: d.tanggal, waktu: now(), gudang: d.gudang, alasan: opname ? 'STOCK OPNAME' : d.alasan, catatan: d.catatan || '', oleh: me.nama, status: 'AKTIF', items: det,
      foto: d.foto ? 'data:' + d.foto.mime + ';base64,' + d.foto.base64 : '' });
    simpan();
    var ubah = det.filter(function (x) { return x.jumlah !== 0; });
    return { ok: true, nomor: no, gudang: d.gudang, stok: stok, dihitung: det.length, selisih: ubah.length,
      items: (opname ? ubah : det).map(function (x) { var b = bar(x.kode); return sat(b, { kode: x.kode, nama: b.nama, sistem: x.sistem, fisik: x.fisik, selisih: x.jumlah }); }) };
  }
  function ringkas(t) {
    if (t.jenis === 'adj') return { id: t.id, jenis: 'adj', sub: t.sub, tanggal: t.tanggal, waktu: t.waktu, gudang: t.gudang, pihak: t.alasan, petugas: t.oleh, oleh: t.oleh, status: t.status,
      items: t.items.map(function (i) { var b = bar(i.kode); return sat(b, { kode: i.kode, nama: b.nama, jumlah: i.jumlah }); }) };
    return { id: t.id, jenis: t.jenis, tanggal: t.tanggal, waktu: t.waktu, gudang: t.gudang, pihak: t.jenis === 'masuk' ? (t.sumber || '') : t.menerima + (t.jabatanPenerima ? ' · ' + t.jabatanPenerima : ''),
      petugas: t.jenis === 'masuk' ? t.checker : t.menyerahkan, oleh: t.oleh, status: t.status,
      items: t.items.map(function (i) { var b = bar(i.kode); return sat(b, { kode: i.kode, nama: b.nama, jumlah: i.jumlah }); }) };
  }
  function urut(a, b) { return (b.tanggal + b.waktu) < (a.tanggal + a.waktu) ? -1 : 1; }
  function boleh(me, g) { return me.gudangList.indexOf(g) >= 0; }
  function riwayat(me) { var l = D.TRX.filter(function (t) { return boleh(me, t.gudang); }).slice().sort(urut).map(ringkas); return { ok: true, items: l, total: l.length }; }
  function riwayatBarang(me, d) {
    var out = [];
    D.TRX.filter(function (t) { return boleh(me, t.gudang); }).slice().sort(urut).forEach(function (t) {
      t.items.forEach(function (i) {
        if (i.kode !== d.kode) return;
        var j = t.jenis === 'masuk' ? i.jumlah : t.jenis === 'keluar' ? -i.jumlah : i.jumlah;
        if (t.jenis === 'adj' && !j) return;
        out.push({ id: t.id, jenis: t.jenis, sub: t.sub || '', tanggal: t.tanggal, gudang: t.gudang, pihak: t.jenis === 'masuk' ? t.sumber : t.jenis === 'keluar' ? t.menerima : t.alasan, status: t.status, jumlah: j });
      });
    });
    return { ok: true, items: out };
  }
  function cari(id) { return D.TRX.filter(function (t) { return t.id === id; })[0]; }
  function rincian(me, d) {
    var t = cari(d.id);
    if (!t) return gagal('Transaksi tidak ditemukan.');
    if (!boleh(me, t.gudang)) return gagal('Anda tidak punya akses ke gudang ' + t.gudang + '.');
    var o = JSON.parse(JSON.stringify(t));
    if (t.jenis === 'adj') {
      o.items = t.items.map(function (i) { var b = bar(i.kode); return sat(b, { kode: i.kode, nama: b.nama, jumlah: i.jumlah, sistem: i.sistem, fisik: i.fisik }); });
      o.foto = t.foto || null;
      o.idBatal = t.idBatal || ''; o.batalOleh = t.batalOleh || ''; o.batalWaktu = t.batalWaktu || ''; o.alasanBatal = t.alasanBatal || '';
      return { ok: true, trx: o };
    }
    o.items = t.items.map(function (i) { var b = bar(i.kode); return sat(b, { kode: i.kode, nama: b.nama, jumlah: i.jumlah, kms: i.kms || null, sebelum: i.sebelum == null ? null : i.sebelum, setelah: i.setelah == null ? null : i.setelah }); });
    o.fotos = t.fotos && t.fotos.length ? t.fotos : [t.foto || contohFoto('Foto contoh ' + t.id)]; o.foto = o.fotos[0];
    if (t.jenis === 'keluar') o.ttd = t.ttd || contohTtd(t.menerima);
    o.idBatal = t.idBatal || ''; o.batalOleh = t.batalOleh || ''; o.batalWaktu = t.batalWaktu || ''; o.alasanBatal = t.alasanBatal || '';
    return { ok: true, trx: o };
  }
  function batal(me, d) {
    var t = cari(d.id);
    if (!t) return gagal('Transaksi tidak ditemukan.');
    if (!boleh(me, t.gudang)) return gagal('Anda tidak punya akses ke gudang ' + t.gudang + '.');
    if (t.status !== 'AKTIF') return gagal('Transaksi ini sudah dibatalkan.');
    if (String(d.alasan || '').trim().length < 5) return gagal('Alasan pembatalan wajib diisi (minimal 5 huruf).');
    var dl = function (i) { return t.jenis === 'masuk' ? -i.jumlah : t.jenis === 'keluar' ? i.jumlah : -i.jumlah; }, kurang = [];
    t.items.forEach(function (i) { var ada = bar(i.kode).stok[t.gudang] || 0; if (ada + dl(i) < 0) kurang.push(i.kode + ' (stok ' + ada + ')'); });
    if (kurang.length) return gagal('Tidak bisa dibatalkan: sebagian barang sudah keluar. Stok sekarang tidak cukup untuk ' + kurang.join(', ') + '.');
    var stok = {};
    t.items.forEach(function (i) { var b = bar(i.kode); b.stok[t.gudang] += dl(i); stok[i.kode] = b.stok[t.gudang]; });
    if (t.jenis === 'keluar' && t.idPermintaan) { var pp = D.PMT.filter(function (x) { return x.id === t.idPermintaan; })[0]; if (pp && pp.status === 'DISERAHKAN') { pp.status = 'DISETUJUI'; pp.idKeluar = ''; pp.waktuSerah = ''; pp.waktuProses = now(); } }
    t.status = 'DIBATALKAN'; t.idBatal = nomor('BTL', t.gudang, iso(0)); t.batalOleh = me.nama; t.batalWaktu = now(); t.alasanBatal = String(d.alasan).trim();
    simpan();
    return { ok: true, id: t.id, noBatal: t.idBatal, stok: stok };
  }
  function pmtOut(p, withStok) {
    var c = withStok ? cad() : null;
    return { id: p.id, waktu: p.waktu, gudang: p.gudang, nama: p.nama, jabatan: p.jabatan, hp: p.hp, keperluan: p.keperluan, catatan: p.catatan || '', status: p.status,
      diprosesOleh: p.diprosesOleh || '', waktuProses: p.waktuProses || '', alasanTolak: p.alasanTolak || '', idKeluar: p.idKeluar || '', waktuSerah: p.waktuSerah || '',
      batasAmbil: p.status === 'DISETUJUI' && KDL > 0 ? addHari(p.waktuProses, KDL) : '', lama: (p.status === 'MENUNGGU' && umur(p.waktu) > 2) || (p.status === 'DISETUJUI' && umur(p.waktuProses) > 7),
      items: p.items.map(function (i) {
        var b = bar(i.kode), o = sat(b, { kode: i.kode, nama: b.nama, foto: b.foto, minta: i.minta, setuju: i.setuju });
        if (withStok) { o.stok = b.stok[p.gudang] || 0; o.tersedia = tersedia(i.kode, p.gudang, c) + (p.status === 'DISETUJUI' && i.setuju ? i.setuju : 0); }
        return o;
      }) };
  }
  function permintaanList(me) { sweep(); return { ok: true, token: TOKENG, items: D.PMT.filter(function (p) { return boleh(me, p.gudang); }).slice().sort(function (a, b) { return a.waktu < b.waktu ? 1 : -1; }).map(function (p) { return pmtOut(p, true); }) }; }
  function pmtCari(me, id) { var p = D.PMT.filter(function (x) { return x.id === id; })[0]; return p && boleh(me, p.gudang) ? p : null; }
  function permintaanSetujui(me, d) {
    if (me.peran !== 'ADMIN') return gagal('Hanya admin/penyetuju yang boleh menyetujui atau menolak permintaan.');
    var p = pmtCari(me, d.id); if (!p) return gagal('Permintaan tidak ditemukan.');
    if (p.status !== 'MENUNGGU') return gagal('Permintaan ini sudah ' + p.status.toLowerCase() + '.');
    var set = {}; (d.items || []).forEach(function (x) { set[x.kode] = Math.max(0, Math.floor(Number(x.jumlah) || 0)); });
    var isi = false, c = cad();
    for (var k = 0; k < p.items.length; k++) {
      var i = p.items[k], n = set[i.kode] == null ? i.minta : set[i.kode], b = bar(i.kode), ts = tersedia(i.kode, p.gudang, c);
      if (n > i.minta) return gagal('Jumlah disetujui ' + b.nama + ' melebihi yang diminta.');
      if (n > ts) return gagal('Stok tersedia ' + b.nama + ' hanya ' + ts + ' (sebagian sudah dipesan & disetujui untuk orang lain).');
      if (n > 0) isi = true;
    }
    if (!isi) return gagal('Minimal satu barang disetujui. Bila tidak ada, pakai Tolak.');
    p.items.forEach(function (i) { i.setuju = set[i.kode] == null ? i.minta : set[i.kode]; });
    p.status = 'DISETUJUI'; p.diprosesOleh = d.oleh && d.oleh !== me.nama ? d.oleh + ' (' + me.nama + ')' : me.nama; p.waktuProses = now(); simpan();
    return { ok: true, id: p.id };
  }
  function permintaanTolak(me, d) {
    if (me.peran !== 'ADMIN') return gagal('Hanya admin/penyetuju yang boleh menyetujui atau menolak permintaan.');
    var p = pmtCari(me, d.id); if (!p) return gagal('Permintaan tidak ditemukan.');
    if (p.status !== 'MENUNGGU' && p.status !== 'DISETUJUI') return gagal('Permintaan ini sudah ' + p.status.toLowerCase() + '.');
    if (String(d.alasan || '').trim().length < 5) return gagal('Alasan penolakan wajib diisi (minimal 5 huruf).');
    p.status = 'DITOLAK'; p.diprosesOleh = d.oleh && d.oleh !== me.nama ? d.oleh + ' (' + me.nama + ')' : me.nama; p.waktuProses = now(); p.alasanTolak = String(d.alasan).trim(); simpan();
    return { ok: true, id: p.id };
  }

  window.MS_DEMO = function (aksi, kode, data) {
    return new Promise(function (res) {
      setTimeout(function () {
        var me = AKSES[String(kode || '').trim().toUpperCase()];
        if (!me) return res({ ok: false, authFail: true, error: 'Kode akses salah. Hubungi admin kalau lupa kode.' });
        data = data || {};
        var f = {
          masuk: function () { return { ok: true, nama: me.nama, peran: me.peran, gudang: me.gudang, gudangList: me.gudangList, kategori: KATEGORI, satuan: SATUAN, kemasan: KEMASAN, alasanPenyesuaian: ALASAN, versi: 'v0.7 (pratinjau)' }; },
          barangUbah: function () {
            var b = bar(data.kode); if (!b) return gagal('Barang tidak ditemukan.');
            b.nama = String(data.nama || b.nama).toUpperCase(); b.kategori = data.kategori; b.satuan = data.satuan; b.kemasan = data.kemasan || ''; b.isi = data.kemasan ? data.isi : 0;
            if (data.foto) b.foto = 'data:' + data.foto.mime + ';base64,' + data.foto.base64; simpan(); return { ok: true, kode: b.kode };
          },
          barangAktif: function () {
            var b = bar(data.kode); if (!b) return gagal('Barang tidak ditemukan.');
            if (!data.aktif && (b.stok.SORONG > 0 || b.stok.NABIRE > 0)) return gagal('Masih ada stok. Kosongkan dulu lewat Stock Keluar atau Penyesuaian.');
            b.nonaktif = !data.aktif; simpan(); return { ok: true, kode: b.kode, aktif: !!data.aktif };
          },
          thumbs: function () { return { ok: true, thumbs: {} }; },
          linkPengajuan: function () { var t = {}; me.gudangList.forEach(function (g) { t[g] = TOKENG[g]; }); return { ok: true, token: t }; },
          gantiToken: function () {
            var g = String(data.gudang || '').toUpperCase(); if (me.gudangList.indexOf(g) < 0) return gagal('Gudang tidak dikenal / bukan gudang Anda.');
            delete TOKEN[TOKENG[g]]; var n = 'DEMO-' + g + '-' + Math.random().toString(36).slice(2, 9).toUpperCase(); TOKENG[g] = n; TOKEN[n] = g; return { ok: true, gudang: g, token: n };
          },
          penyesuaianSimpan: function () { return adjSimpan(me, data, false); }, opnameSimpan: function () { return adjSimpan(me, data, true); },
          beranda: function () { return beranda(me); }, barangList: function () { return barangList(me); }, barangTambah: function () { return barangTambah(me, data); },
          masukSimpan: function () { return trx(me, data, false); }, keluarSimpan: function () { return trx(me, data, true); },
          riwayat: function () { return riwayat(me); }, riwayatBarang: function () { return riwayatBarang(me, data); }, rincian: function () { return rincian(me, data); }, batal: function () { return batal(me, data); },
          permintaanList: function () { return permintaanList(me); }, permintaanSetujui: function () { return permintaanSetujui(me, data); }, permintaanTolak: function () { return permintaanTolak(me, data); }
        }[aksi];
        res(f ? f() : gagal('Aksi tidak dikenal.'));
      }, 350);
    });
  };

  /* ---------- halaman pengajuan (token gudang, tanpa login) ---------- */
  function hpB(s) { var d = String(s || '').replace(/\D/g, ''); return d.indexOf('62') === 0 ? '0' + d.slice(2) : d; }
  window.MS_DEMO_PUB = function (aksi, token, d) {
    return new Promise(function (res) {
      setTimeout(function () {
        var g = TOKEN[token];
        if (!g) return res({ ok: false, tokenFail: true, error: 'Link pengajuan tidak berlaku. Minta link/QR terbaru ke admin gudang.' });
        d = d || {};
        if (aksi === 'pubKatalog') return res({ ok: true, gudang: g, kategori: KATEGORI, jabatan: JABATAN,
          items: (function () { var c = cad(); return milik([g]).filter(function (b) { return !b.nonaktif; }).map(function (b) { return sat(b, { kode: b.kode, nama: b.nama, kategori: b.kategori, foto: b.foto, stok: tersedia(b.kode, g, c) }); }); })().sort(function (a, b) { return a.nama < b.nama ? -1 : 1; }) });
        if (aksi === 'pubAjukan') {
          if (!d.nama || !d.jabatan || hpB(d.hp).length < 9 || !d.keperluan) return res(gagal('Data pengambil belum lengkap.'));
          if (!d.items || !d.items.length) return res(gagal('Keranjang kosong.'));
          var c0 = cad();
          var kurang = d.items.filter(function (r) { var b = bar(r.kode); return !b || b.gudang !== g || r.jumlah > tersedia(r.kode, g, c0); });
          if (kurang.length) return res(gagal('Stok tidak cukup: ' + kurang.map(function (r) { var b = bar(r.kode); return (b ? b.nama : r.kode) + ' (tersedia ' + (b ? tersedia(r.kode, g, c0) : 0) + ')'; }).join('; ') + '. Kurangi jumlah di keranjang.'));
          var no = nomor('PMT', g, iso(0));
          D.PMT.unshift({ id: no, waktu: now(), gudang: g, nama: d.nama, jabatan: d.jabatan, hp: hpB(d.hp), keperluan: d.keperluan, catatan: d.catatan || '', status: 'MENUNGGU', items: d.items.map(function (r) { return { kode: r.kode, minta: r.jumlah, setuju: null }; }) });
          simpan();
          return res({ ok: true, nomor: no });
        }
        if (aksi === 'pubLacak') {
          sweep(); var out = [];
          var ada = {}, tambah = function (p, terbatas) { if (!p || ada[p.id]) return; ada[p.id] = 1; var o = pmtOut(p, false); delete o.hp; delete o.jabatan; if (terbatas) { delete o.nama; delete o.keperluan; delete o.diprosesOleh; delete o.catatan; o.terbatas = true; } out.push(o); };
          (d.list || []).forEach(function (m) {
            var id = String(m.id || '').trim().toUpperCase(), hp = hpB(m.hp), punyaHp = hp.replace(/\D/g, '').length >= 9;
            var cari = function (x) { return x.id === id && x.gudang === g; };
            if (id && punyaHp) { var p = D.PMT.filter(cari)[0]; if (p && hpB(p.hp) === hp) tambah(p, false); }
            else if (punyaHp) { D.PMT.filter(function (x) { return x.gudang === g && hpB(x.hp) === hp; }).sort(function (a, b) { return a.waktu < b.waktu ? 1 : -1; }).slice(0, 20).forEach(function (p) { tambah(p, false); }); }
            else if (id) { tambah(D.PMT.filter(cari)[0], true); }
          });
          return res({ ok: true, items: out });
        }
        if (aksi === 'pubThumbs') return res({ ok: true, thumbs: {} });
        if (aksi === 'pubBatal') {
          var p = D.PMT.filter(function (x) { return x.id === d.id && x.gudang === g; })[0];
          if (!p || hpB(p.hp) !== hpB(d.hp)) return res(gagal('Pengajuan tidak ditemukan.'));
          if (p.status !== 'MENUNGGU' && p.status !== 'DISETUJUI') return res(gagal('Pengajuan ini sudah ' + p.status.toLowerCase() + ', tidak bisa dibatalkan.'));
          p.status = 'DIBATALKAN'; p.waktuProses = now(); p.diprosesOleh = 'Pemohon'; simpan();
          return res({ ok: true, id: p.id });
        }
        res(gagal('Aksi tidak dikenal.'));
      }, 350);
    });
  };
})();
