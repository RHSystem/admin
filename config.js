/* Pengaturan ZUI ADMIN (admin.zuisystem.com)
   Satu aplikasi admin untuk semua aplikasi Zui. Setiap aplikasi = satu blok di daftar "apps".

   jenis:
     "zuisystem" = pola Zui System   (perusahaan/{id}.langganan, bantuan, sistem/bayar)
     "standar"   = pola ZUI KONTRAKTOR (companies/{id} plan/until/free, subreqs, zconfig/pay)
   Aplikasi Zui baru sebaiknya memakai pola "standar" agar cukup menambah satu blok di bawah.

   Aplikasi PERTAMA di daftar dipakai untuk tombol "Masuk dengan Google". */
window.ZUI_ADMIN = {
  adminEmail: "admin.zuisystem@gmail.com",

  apps: [
    {
      id: "sys",
      nama: "Zui System",
      jenis: "zuisystem",
      warna: "#2FA8D8",
      url: "https://zuisystem.com",
      firebase: {
        apiKey: "AIzaSyAR-TIaq1VH0OOD2XGx_IhedaH7mwKpW30",
        authDomain: "zuisystem.firebaseapp.com",
        projectId: "zuisystem",
        storageBucket: "zuisystem.firebasestorage.app",
        messagingSenderId: "55666230248",
        appId: "1:55666230248:web:783df0dc060a1d7ce3da5d"
      }
    },
    {
      id: "kon",
      nama: "ZUI KONTRAKTOR",
      jenis: "standar",
      warna: "#F2B01E",
      url: "https://kontraktor.zuisystem.com",
      // samakan dengan aturan percobaan di firestore.rules aplikasinya
      percobaanHari: 14,
      tenggangHari: 3,
      mulaiPercobaan: "2026-10-15",
      firebase: {
        apiKey: "AIzaSyCmDBwFbquqMpdadgukA7Ti1Kq3E_loLgM",
        authDomain: "kontraktor-zui.firebaseapp.com",
        projectId: "kontraktor-zui",
        storageBucket: "kontraktor-zui.firebasestorage.app",
        messagingSenderId: "520179011046",
        appId: "1:520179011046:web:aa8a77761c008138e91a27"
      }
    }

    /* Contoh aplikasi baru (pola standar):
    ,{
      id: "xyz",
      nama: "ZUI XYZ",
      jenis: "standar",
      warna: "#7A86F0",
      url: "https://xyz.zuisystem.com",
      percobaanHari: 14, tenggangHari: 3, mulaiPercobaan: "2026-11-01",
      firebase: { apiKey: "...", authDomain: "...", projectId: "...", storageBucket: "...", messagingSenderId: "...", appId: "..." }
    }
    */
  ]
};
