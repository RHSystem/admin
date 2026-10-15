# ZUI ADMIN — panduan pasang (admin.zuisystem.com)

Satu aplikasi admin untuk semua aplikasi Zui: Zui System dan ZUI KONTRAKTOR sekarang, aplikasi baru nanti.

## Isi folder

| File | Fungsi |
|---|---|
| `index.html` | Aplikasinya |
| `config.js` | Daftar aplikasi Zui + kunci Firebase masing-masing. Aplikasi baru cukup ditambah satu blok di sini |
| `sw.js`, `manifest.webmanifest`, `icon-*.png` | Supaya bisa dipasang di HP/komputer |
| `CNAME` | Alamat `admin.zuisystem.com` untuk GitHub Pages |

## Firestore Rules

- **Zui System**: tidak perlu diubah. Fungsi `sa()` sudah mengizinkan `admin.zuisystem@gmail.com`.
- **ZUI KONTRAKTOR**: pakai `firestore.rules` dari ZUI KONTRAKTOR versi 13 (chat Langganan dan mata uang di permintaan bayar). Salin seluruh isinya ke Firebase Console project **kontraktor-zui** → Firestore Database → Rules → Publish. Fungsi `superAdmin()` tetap dipakai Zui Admin.

Zui Admin lama dan halaman "Admin langganan" di ZUI KONTRAKTOR tetap jalan berdampingan selama uji coba.

## Langkah pasang

### 1. Unggah ke GitHub Pages
1. Buat repo baru, misalnya `RHSystem/admin`.
2. Unggah semua file di folder ini (termasuk `CNAME`).
3. Repo → Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)` → Save.
4. Custom domain akan terisi `admin.zuisystem.com` dari file CNAME. Centang **Enforce HTTPS** setelah tersedia.

### 2. DNS di Rumahweb
Tambahkan record:
- Tipe: `CNAME`
- Nama/host: `admin`
- Nilai: `rhsystem.github.io`

Tunggu beberapa menit sampai beberapa jam.

### 3. Izinkan domain di KEDUA project Firebase
Lakukan di project **zuisystem** dan **kontraktor-zui**:
Firebase Console → Authentication → Settings → **Authorized domains** → Add domain → `admin.zuisystem.com`.

Tanpa langkah ini login Google ditolak dengan pesan "Domain ini belum diizinkan".

### 4. (Opsional) Login sekali untuk semua project
Saat masuk, Zui Admin login ke Zui System lalu mencoba memakai login Google yang sama untuk ZUI KONTRAKTOR.
Bila project kontraktor menolaknya, Ringkasan menampilkan kartu **"ZUI KONTRAKTOR belum tersambung"**. Tekan **Sambungkan**, pilih akun admin. Ini cukup **sekali per perangkat**.

Supaya tidak perlu menekan Sambungkan sama sekali:
1. Buka Google Cloud Console project **zuisystem** → APIs & Services → Credentials → salin **Client ID** "Web client (auto created by Google Service)".
2. Firebase Console project **kontraktor-zui** → Authentication → Sign-in method → Google → **Safelist client IDs from external projects** → tempel Client ID tadi → Save.

### 5. Uji
1. Buka `https://admin.zuisystem.com`, masuk dengan Google (`admin.zuisystem@gmail.com`).
2. Pengaturan → Aplikasi tersambung: keduanya **tersambung**.
3. Pengaturan → Atur PIN, lalu Aktifkan notifikasi.
4. Dari akun pelanggan percobaan, kirim permintaan bayar di ZUI KONTRAKTOR dan pengajuan langganan di Zui System. Keduanya harus muncul di **Antrean** dengan bunyi dan angka di lonceng.
5. Aktifkan satu, tolak satu. Cek di aplikasi pelanggan bahwa masa aktif berubah / alasan penolakan tampil.

## Isi aplikasi

- **Ringkasan**: pemasukan bulan ini dan 6 bulan terakhir (per aplikasi), jumlah pelanggan per status, daftar yang berakhir ≤ 7 hari.
- **Antrean**: semua permintaan bayar dari semua aplikasi. *Aktifkan* (tekan dua kali), *Tolak* dengan alasan. Untuk Zui System ada *Periksa resit & chat* (pembacaan resit otomatis seperti Zui Admin lama).
- **Pelanggan**: saring per aplikasi dan status, cari nama/email. Buka satu untuk perpanjang (+1/+6/+12 bulan), atur tanggal manual, gratis selamanya, hentikan, atau kembali ke percobaan.
- **Pesan**: chat pelanggan Zui System dan ZUI KONTRAKTOR (termasuk foto bukti bayar). Dari chat Kontraktor bisa langsung Aktifkan/Tolak permintaan bayar perusahaan itu.
- **Harga**: harga dan cara bayar per aplikasi. ZUI KONTRAKTOR punya dua set: Rupiah + QRIS dan Ringgit + DuitNow (perusahaan bermata uang Ringgit melihat harga Ringgit).
- **Pengaturan**: status sambungan per project, notifikasi, PIN, tema, keluar.

### Catatan
- **Pemasukan** dihitung dari pembayaran yang diaktifkan lewat antrean. Angka utama dan grafik dalam Rupiah; Ringgit ditampilkan terpisah. Perpanjangan manual dari halaman pelanggan tidak tercatat sebagai pemasukan.
- **Gratis selamanya** di Zui System disimpan sebagai paket "Gratis selamanya" sampai 31 Des 2099 (aturan Zui System hanya mengenal paket + tanggal). Di ZUI KONTRAKTOR memakai tanda `free`.
- **Pemberitahuan** muncul selama Zui Admin terbuka, termasuk di tab latar belakang. Notifikasi saat aplikasi tertutup penuh butuh server (Cloud Functions, paket Blaze); belum dipakai karena masih di paket gratis Spark.
- **Batas sesi**: 30 hari untuk aplikasi terpasang, 1 hari di peramban biasa.

## Menambah aplikasi Zui baru

Pakai pola yang sama dengan ZUI KONTRAKTOR (`companies/{id}` dengan `plan`, `until`, `free`, `created_at`; koleksi `subreqs`; dokumen `zconfig/pay`; fungsi `superAdmin()` di rules). Lalu:
1. Tambah satu blok `jenis: "standar"` di `config.js` (contohnya ada di file itu).
2. Tambahkan `admin.zuisystem.com` ke Authorized domains project barunya.
3. (Opsional) Safelist Client ID seperti langkah 4.

## Setelah admin baru selesai diuji

1. **Zui System**: hapus folder `admin/` dari situs Zui System.
2. **ZUI KONTRAKTOR**: hapus halaman "Admin langganan" (menu `#zadmin`).
3. **JANGAN hapus** fungsi `sa()` di rules Zui System maupun `superAdmin()` di rules ZUI KONTRAKTOR. Zui Admin baru bergantung pada keduanya.
