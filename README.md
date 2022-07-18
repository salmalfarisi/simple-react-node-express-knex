# simple-react-node-express-knex
Stack Technology : 
Front-end : 
  - Bootstrap
  - Datatable
  - React.js
Back-end :
  - Node.js
  - Express.js
  - Sequelize/knex
Database : 
  - MySQL
Testing API : 
  - Postman
  
Tata cara penginstalan :
1. import terlebih dahulu database ke dalam phpmyadmin secara manual
2. pastikan file knexfile.js dan file databaseconfig.js (posisi folder berada dalam root backend) sudah sesuai namanya dengan database yang tersimpan dalam phpmyadmin 
3. buka command line dan masuklah ke dalam folder backend 
4. untuk seeding data apabila data yang tersimpan bermasalah, lakukan proses seeding dengan membuat command berikut ini : knex seed:run --specific=dummydata.js
5. jalankan program backend dengan menggunakan command berikut ini : nodemon index.js (install nodemon terlebih dahulu apabila program gagal dijalankann) 
6. buka command line dan masuklah ke dalam folder frontend
7. jalankan program frontend dengan menggunakan command berikut ini : npm start
8. program siap untuk digunakan
