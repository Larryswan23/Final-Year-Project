Search and Rescue (SAR) Web Application
Overview
The SAR Web Application is a cutting-edge platform designed to assist Search and Rescue operations by providing real-time, interactive mapping and data synchronization. Built with React, Firebase, and Mapbox GL JS, this tool enhances operational efficiency, ensuring rapid and informed decision-making during SAR missions.

Features
Interactive Mapping: Utilizes Mapbox GL JS to create dynamic maps, allowing users to visualize search grids and mark areas of interest.
Real-Time Data Syncing: Powered by Firebase for seamless, live updates across all user instances, crucial for coordinated efforts.
User Authentication: Ensures secure access to the platform through Firebase's robust authentication system.
User-Friendly Interface: Developed with React for a responsive and intuitive user experience, requiring minimal training for end-users.
Installation
To get started with the SAR Web Application:

Clone the repository:
bash
Copy code
git clone https://github.com/your-repository/sar-web-app.git
cd sar-web-app
Install dependencies:
bash
Copy code
npm install
Set up Firebase:
Create a new project in Firebase.
Enable the necessary authentication methods and set up your Firestore Database.
Place your Firebase configuration in a .env file at the root of your project following the .env.sample template.
Run the application:
bash
Copy code
npm start
This will start the app in development mode, open http://localhost:3000 to view it in the browser.

Usage
Sign Up/Login: Users need to create an account or log in to access the search grids and contribute to the SAR efforts.
Navigating the Map: The interactive map allows users to view different regions, with each search grid square color-coded to represent searched and unsearched areas.
Updating Search Areas: Authenticated users can click on grid squares to update their status, facilitating real-time tracking of the search progress.
Contributing
Contributions to the SAR Web Application are welcome. Please follow these steps to contribute:

Fork the repository.
Create a new branch for your feature (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a Pull Request.
