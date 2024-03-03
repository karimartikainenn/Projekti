# Library Opening Hours Tracker

#### Video Demo: 

#### Description:

This project consists of an opening hour calculator designed for the library statistics team, leveraging the open API of Kirjastot.fi.
The calculator is specifically designed to meet the needs of Espoo City Library, enabling the automatic retrieval and storage of library opening hours.
Implemented with React, the application provides the library with an efficient tool for collecting opening hour data for monthly statistics.
This increases the library's efficiency and accuracy in managing opening hours, enabling better planning and resource management.

## Project Structure:

- **App.js:** This file contains the main React component for the application. It includes the logic for fetching data from the API, managing state using useState and useEffect hooks, rendering the user interface, and handling user interactions.

- **Footer.js:** This component renders the footer section of the application, providing additional information or links if needed.

- **styles.scss:** This file contains custom SCSS styles for styling the components and improving the overall visual appeal of the application.

- **App.css:** This file contains additional CSS styles for the main application layout and structure.

## Design Choices:

- **API Integration:** The application integrates with an external API to retrieve library opening hours data. This approach ensures that the application always displays up-to-date information without the need for manual updates.

- **CSV Download:** Providing the option to download opening hours data in CSV format enhances the usability of the application, allowing users to export and analyze the data using external tools or software.

- **Responsive Design:** The application is designed to be responsive and accessible across different devices and screen sizes, ensuring a consistent user experience for all users.

- **Localization:** The application supports localization by using the `date-fns` library to display date pickers and formatting dates according to the Finnish locale (`fi`).

## Usage:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server using `npm start`.
5. Open your web browser and navigate to `http://localhost:3000` to view the application.

## Future Enhancements:

- Implement user authentication to allow users to save and manage their favorite libraries or custom time ranges.
- Add additional features such as filtering libraries by location or category.
- Improve error handling and provide meaningful error messages to users in case of API failures or other issues.

