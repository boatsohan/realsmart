# realsmart
ระบบรันโดย NodeJs และใช้ database Mongodb
## Getting Started 
  ติดตั้ง [NodeJs](https://nodejs.org/en/) และ [Mongodb](https://www.mongodb.com/try/download)
  
  สร้าง ฐานข้อมูลชื่อ realsmart ,collectionชื่อ employee
  
  ไฟล์ employee.json เป็นไฟล์ mockup data สำหรับ Import ข้อมูล Mongodb
```
$ git clone https://github.com/boatsohan/realsmart.git
$ cd realsmart
$ npm install mongodb
$ npm install express
$ node index.js
```
# index.js แก้ไขค่าสำหรับเชื่อมต่อ database

  let url = "mongodb://localhost:27017/";
  
  let db_name = "realsmart";
  
  let collection_name = "employee";
