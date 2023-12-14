## Script dalam package.json

- `start-prod`: Menjalankan aplikasi dalam mode produksi dengan perintah `node index.js`.
- `start-dev`: Menjalankan aplikasi dalam mode pengembangan dengan menggunakan `nodemon index.js`.
- `db:migrate`: Melakukan migrasi pada database dengan menggunakan Sequelize.
- `db:seed`: Melakukan seeding data pada database dengan menggunakan Sequelize.
- `db:undo`: Mengembalikan migrasi database ke kondisi sebelumnya.
- `db:fresh`: Mengembalikan migrasi database ke kondisi awal (seperti fresh install) dengan melakukan rollback semua migrasi lalu menjalankan migrasi dari awal.

install `npm install -g sequelize-cli` dulu kalo belum diinstall
