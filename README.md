# astek-gic-cafe
Astek Fullstack assessment

Required Softwares

1.MySQL
2.Node Js

Project Setup

--> DB Setup

1. Create Schema using this command "CREATE SCHEMA astek_gic;"
2. Run this command to use the DB "USE astek_gic;"
3. Please find the JSON files in this path "Scripts/sql".
4. Import them in this following order to the newly created "astek_gic" database for the Tables with seeded data.
       1. cafe.json
       2. employee.json
       3. employee_id_counter.json
       4.employeecafe.json
5. Now "astek_gic" database is ready with sample seeded values.

--> Backend Setup

1. Navigate to "src/cafe-be".
2. Open the command prompt/ terminal and navigate to above path, then run "npm install".
3. Open the .env file and update the "DB_USER" & "DB_PASSWORD" with your MySql credentials.
4. Now run the "npm start" command to start the backend application.
5. Please ensure the backend is running in the Port "3001". If any changes in port update the port details in the "src/cafe-fe/src/Utilities/Services/serviceConfig.js" file.


--> Frontend Setup

1. Navigate to "src/cafe-fe".
2. Open the command prompt/ terminal and navigate to above path, then run "npm install".
3. Now run the "npm start" command to start the frontend application.
4. Once started, application will directly open in browser.


