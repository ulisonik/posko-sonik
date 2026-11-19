/* kat.js - panduan visual kategori POSM (dipakai index.html admin & ambil.html pengajuan). Foto di folder kat/. Arti kategori = satu-satunya sumber di sini. */
(function () {
  var st = document.createElement('style'); st.id = 'kat-css'; st.textContent = ".kat-info { flex-wrap:wrap; display:flex; gap:10px; align-items:center; background:#fff; border:1px solid var(--line); border-radius:14px; padding:10px; margin-top:8px; }\n.kat-info.hide { display:none; }\n.kat-w { flex:1 1 100%; display:flex; flex-direction:column; gap:5px; } .kat-w img { width:100%; height:auto; border-radius:6px; background:#fff; border:1px solid var(--line); }\n.kat-ph.cn img { width:76px; height:76px; object-fit:contain; background:#fff; border:1px solid var(--line); } .kat-ph.cn.one img { width:92px; height:92px; }\n.kat-ph { display:flex; gap:4px; flex:none; }\n.kat-ph img { width:72px; height:54px; object-fit:cover; border-radius:8px; background:var(--line); }\n.kat-ph.one img { width:92px; height:68px; }\n.kat-ilus { flex:none; width:60px; height:60px; border-radius:14px; background:var(--green-xl,#E4F3E8); color:var(--green); display:flex; align-items:center; justify-content:center; }\n.kat-ilus svg { width:32px; height:32px; stroke-width:1.8; }\n.kat-tx { flex:1 1 140px; min-width:0; } .kat-tx b { display:block; font-size:13px; color:var(--ink); } .kat-tx span { display:block; font-size:12px; color:var(--mute,#5E7586); line-height:1.4; margin-top:2px; }\n.kat-row { flex-wrap:wrap; display:flex; gap:10px; align-items:center; padding:11px; margin-bottom:10px; background:#F4F9F3; border:1px solid #D5E5D5; border-radius:14px; } .kat-row:last-child { margin-bottom:2px; }\n.kat-row .kat-tx b, .kat-info .kat-tx b { color:var(--green-d,#0E7A44); font-size:13px; letter-spacing:.2px; }\n.kat-w { margin-top:2px; } .kat-ph img, .kat-w img { cursor:zoom-in; }\n#katLb { position:fixed; inset:0; z-index:99999; background:rgba(10,20,15,.92); display:flex; flex-direction:column; }\n#katLb .klb-sc { flex:1; overflow:auto; display:flex; align-items:center; justify-content:center; padding:56px 10px 40px; }\n#katLb img { max-width:100%; max-height:100%; object-fit:contain; background:#fff; border-radius:6px; cursor:zoom-in; }\n#katLb.zm .klb-sc { display:block; } #katLb.zm img { max-width:none; max-height:none; cursor:zoom-out; }\n#katLb .klb-x { position:absolute; top:10px; right:10px; z-index:2; width:44px; height:44px; border-radius:14px; background:#fff; color:#17304F; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,.4); }\n#katLb .klb-x svg { width:24px; height:24px; stroke-width:2.6; }\n#katLb .klb-h { position:absolute; left:0; right:0; bottom:12px; text-align:center; color:#fff; font-size:12px; opacity:.85; pointer-events:none; }";
  st.textContent += "\n.kat-ph { flex:1 1 100%; display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }\n.kat-ph img, .kat-ph.cn img, .kat-ph.one img, .kat-ph.cn.one img { width:100%; height:auto; aspect-ratio:4/3; object-fit:contain; background:#fff; border:1px solid var(--line); border-radius:8px; cursor:zoom-in; }";
  document.head.appendChild(st);
})();
function katEsc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
/* Panduan visual kategori POSM. Foto: folder kat/ (kecil, hanya untuk thumbnail). Tanpa foto = ikon. Teks arti sudah dikonfirmasi user 14 Nov (termasuk POSTER dan PH Impra). */
var KATG = {
  'CTA BACKRACK': { f: ['cta_backrack'], c: 1, w: ['cta_s1', 'cta_s2'], t: 'Stiker panjang yang biasa ditempel di gondola / rak, berisi informasi ajakan membeli.' },
  'FSU': { f: ['fsu_1', 'fsu_2', 'fsu_3'], c: 1, t: 'Floor Standing Unit: display yang berdiri di lantai.' },
  'GIMMICK (PRODUK)': { d: 'M4 9h16v4H4zM5 13h14v8H5zM12 9v12M12 9c-2-4-6-3-5 0 .5 1.5 5 0 5 0zM12 9c2-4 6-3 5 0-.5 1.5-5 0-5 0z', t: 'Gimmick berupa produk Unilever.' },
  'GIMMICK (NON PRODUK)': { d: 'M5 8h11v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zM16 10h2a2.5 2.5 0 0 1 0 5h-2M8 3v2M12 3v2', t: 'Gimmick berupa barang bukan produk Unilever, misalnya minyak goreng, tepung, santan, dan sejenisnya.' },
  'HEADER': { f: ['hdr_3', 'hdr_1', 'hdr_2'], c: 1, t: 'Papan plastik judul di bagian atas cut case / Floor Standing Unit.' },
  'INSERTION': { w: ['ins_1', 'ins_2'], t: 'Kertas cetak yang biasa dipasang pada Product Hanger.' },
  'JHOOK': { f: ['jh_1', 'jh_2', 'jh_3'], c: 1, t: 'Gantungan berbentuk huruf J untuk menggantung kemasan produk.' },
  'POPPER': { f: ['pop_1', 'pop_2', 'pop_3'], c: 1, t: 'Kertas cetak bertali yang biasa digantung di Product Hanger.' },
  'POSTER': { f: ['poster_1'], c: 1, t: 'Poster promosi cetak yang dipasang di toko.' },
  'PRODUCT HANGER': { f: ['ph_new', 'ph_reguler', 'ph_wire', 'ph_npd'], c: 1, t: 'Gantungan produk.' },
  'PRODUCT HANGER IMPRA (PLASTIK)': { w: ['impra_1', 'impra_2'], d: 'M12 3a2 2 0 1 1 0 4M12 7v3M3 18l9-8 9 8zM3 21h18', t: 'Product Hanger berbahan plastik (Impra).' },
  'STANDING HANGER': { f: ['sh_new', 'sh_bw', 'sh_foods_1', 'sh_clear'], c: 1, t: 'Rak berdiri bertingkat yang memajang produk berderet.' },
  'TABLE TOP': { f: ['table_top', 'tt_2', 'tt_3'], c: 1, t: 'Display kecil di atas meja atau etalase kasir.' },
  'ULI CORNER': { f: ['uli_new', 'uli_corner', 'corner_5000', 'nutrition_corner'], c: 1, t: 'Sudut display khusus Unilever (Unilever Indonesia) dengan produk tertata.' },
  'LAINNYA': { d: 'M5 5h14v14H5zM8.5 12h.01M12 12h.01M15.5 12h.01', t: 'Materi visibilitas yang tidak termasuk kategori di atas.' }
};
function katVis(k, maks) {
  var g = KATG[String(k || '').toUpperCase()]; if (!g) return '';
  var im = function (x) { return '<img src="kat/' + x + '.jpg" alt="" loading="lazy" onerror="this.remove()">'; };
  var semua = (g.f || []).concat(g.w || []);
  var tx = '<div class="kat-tx"><b>' + katEsc(k) + '</b><span>' + katEsc(g.t) + '</span></div>';
  if (!semua.length) return '<div class="kat-ilus"><svg class="i" viewBox="0 0 24 24"><path d="' + g.d + '"/></svg></div>' + tx; // tanpa foto: ikon di kiri
  return tx + '<div class="kat-ph cn">' + semua.slice(0, maks || 4).map(im).join('') + '</div>'; // nama & arti di atas, gambar seragam di bawah
}
/* Perbesar gambar kategori: ketuk gambar -> layar penuh; ketuk gambar lagi = ukuran asli (geser); ketuk latar / X / Back = tutup */
function katLbTutup() { var e = document.getElementById('katLb'); if (e) e.remove(); }
function katLbBuka(src) {
  katLbTutup(); var e = document.createElement('div'); e.id = 'katLb';
  e.innerHTML = '<button type="button" class="klb-x" aria-label="Tutup"><svg class="i" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button><div class="klb-sc"><img src="' + src + '" alt=""></div><div class="klb-h">Ketuk gambar untuk ukuran asli</div>';
  e.onclick = function (ev) { var im = ev.target.closest('img'); if (im) { var z = e.classList.toggle('zm'); e.querySelector('.klb-h').textContent = z ? 'Geser untuk melihat · ketuk lagi untuk kecilkan' : 'Ketuk gambar untuk ukuran asli'; return; } katLbTutup(); };
  document.body.appendChild(e);
}
document.addEventListener('click', function (ev) { var im = ev.target.closest && ev.target.closest('.kat-ph img, .kat-w img'); if (im) { ev.preventDefault(); katLbBuka(im.getAttribute('src')); } });

function katGaleri() { return Object.keys(KATG).map(function (k) { return '<div class="kat-row">' + katVis(k, 6) + '</div>'; }).join(''); }


/* FOTO BARANG: ketuk untuk perbesar (katalog & keranjang pemohon, rincian barang & bukti admin). Memakai penampil katLbBuka di atas.
   Hanya foto yang BENAR-BENAR ada (bukan ikon pengganti). Foto kecil diberi ikon kaca pembesar. */
(function () {
  var SEL = '.pc .img, .cr .th, .det-img, .foto-th, .bk-img, .bk-ttd';
  var st = document.createElement('style'); st.id = 'foto-zoom-css';
  st.textContent = '.pc .img.fz, .cr .th.fz, .det-img.fz, .foto-th.fz { cursor:zoom-in; position:relative; }' +
    '.pc .img.fz::after, .det-img.fz::after { content:""; position:absolute; right:8px; bottom:8px; width:30px; height:30px; border-radius:50%; background:rgba(12,27,44,.62) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2.4\' stroke-linecap=\'round\'%3E%3Ccircle cx=\'10.5\' cy=\'10.5\' r=\'6\'/%3E%3Cpath d=\'M15 15l5 5M10.5 8v5M8 10.5h5\'/%3E%3C/svg%3E") center/18px no-repeat; pointer-events:none; }' +
    '.cr .th.fz::after, .foto-th.fz::after { content:""; position:absolute; right:2px; bottom:2px; width:16px; height:16px; border-radius:50%; background:rgba(12,27,44,.62) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'3\' stroke-linecap=\'round\'%3E%3Ccircle cx=\'10.5\' cy=\'10.5\' r=\'6\'/%3E%3Cpath d=\'M15 15l5 5\'/%3E%3C/svg%3E") center/11px no-repeat; pointer-events:none; }' +
    '.bk-img, .bk-ttd { cursor:zoom-in; }';
  document.head.appendChild(st);
  function urlDari(el) {
    if (el.tagName === 'IMG') return el.getAttribute('src');
    var bg = (el.style && el.style.backgroundImage) || '';
    var m = /url\(["']?(.*?)["']?\)/.exec(bg);
    return m ? m[1] : '';
  }
  function tandai(root) { [].forEach.call((root || document).querySelectorAll(SEL), function (e) { if (e.tagName !== 'IMG' && !e.classList.contains('fz') && urlDari(e)) e.classList.add('fz'); }); }
  var tmr; new MutationObserver(function () { clearTimeout(tmr); tmr = setTimeout(function () { tandai(); }, 60); }).observe(document.documentElement, { childList: true, subtree: true });
  tandai();
  // fase tangkap: mendahului penangan lain (mis. baris keranjang) agar ketukan foto = perbesar saja
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest && ev.target.closest(SEL); if (!el) return;
    var u = urlDari(el); if (!u) return;
    ev.preventDefault(); ev.stopPropagation(); katLbBuka(u);
  }, true);
})();
