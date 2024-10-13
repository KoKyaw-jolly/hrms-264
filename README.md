
# Human Resources Management System (HRMS)

This is the front-end of the **Human Resources Management System (HRMS)**, developed using **Angular 18** and the **Ant Design System** (ng-zorro) for UI components. **NgRx** is used for state management. This project focuses solely on the front-end, so it requires **Mockoon** to simulate the back-end.

---

## Technologies Used:
- **Angular** (v18)
- **Ant Design System** (ng-zorro)
- **NgRx** for state management
- **Mockoon** for back-end API simulation

---

## Setup and Installation:

To run and test this project, follow the steps below:

1. **Clone the Repository**:
   ```
   git clone <repository-link>
   cd hrms-project
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Set Up Mockoon**:
   - Download and install **Mockoon** (if not installed).
   - Use the `database.json` file located under `src/assets/data/database.json`.
   - Create a **Mockoon** environment using this file, and set the server port to `3200`.

4. **Run the Project**:
   ```
   npm start
   ```

5. **Login Credentials**:
   - **Staff role**:  
     - **Username**: `user`  
     - **Password**: `user123`
   - **Super Admin role**:  
     - **Username**: `superadmin`  
     - **Password**: `superadmin123`

---

## Live Demo:

You can test the system using the provided credentials. The application includes features like employee management, leave tracking, and payroll setup.

---

## Note:

- Make sure **Mockoon** is running with the correct configuration to simulate the back-end environment.
- This project is for front-end testing and development only.
