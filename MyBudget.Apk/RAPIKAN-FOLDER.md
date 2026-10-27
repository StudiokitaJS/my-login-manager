# Rapikan Folder

Aturan proyek MyBudget.Apk — gunakan setiap kali diminta **“Rapikan Folder”**.

1. Semua halaman baru harus dibuat di dalam `MyBudget.Apk/pages/`, satu folder per halaman, dengan file utama `index.html`.
2. Folder halaman yang telanjur berada langsung di `MyBudget.Apk/` harus dipindahkan ke `MyBudget.Apk/pages/<nama-halaman>/`.
3. Pengecualian: `MyBudget.Apk/css/` dan `MyBudget.Apk/js/` tetap di luar `pages/`.
4. Periksa seluruh referensi menu, tautan, impor, fetch, dan aset sebelum menghapus atau memindahkan file.
5. Jika ada halaman ganda, tentukan versi yang paling baru/benar, pertahankan satu salinan kanonis di `pages/`, lalu hapus salinan lama di luar `pages/`.
6. Jangan menghapus halaman yang masih dipakai atau data pengguna. Jangan mengubah isi fitur kecuali diperlukan untuk memperbaiki jalur.
7. Setelah perubahan, periksa ulang pohon folder, jalur yang dirujuk `index.html` dan `js/app.js`, serta sintaks JavaScript. Laporkan bahwa pengujian browser nyata belum dilakukan jika memang belum dilakukan.
8. File utama `MyBudget.Apk/index.html`, `css/`, dan `js/` tetap di tempatnya. Berkas konfigurasi/dokumentasi yang bukan halaman boleh tetap di akar `MyBudget.Apk/`.
