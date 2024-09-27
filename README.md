# Cryptocurrency

Developed a comprehensive cryptocurrency platform that provides real-time data on 100 cryptocurrency exchanges and 1320 different types of cryptocurrencies, leveraging the CoinGecko API for accurate data retrieval. The platform features detailed graphs for each cryptocurrency, visualizing value changes over time, with the y-axis representing the value and the x-axis showing the time. A unique feature allows users to adjust the x-axis scale, enabling more customized data views.

To enhance user experience, I implemented dynamic routing for seamless navigation between pages. The application includes a loader component (loader.jsx) that is displayed while fetching data, ensuring smooth transitions, and an error page that is triggered if any issues arise during data retrieval or loading.

The project utilizes Chart.js and react-chartjs-2 for rendering highly interactive and responsive graphs, alongside @chakra-ui/react for a sleek and modern UI design. React-router-dom powers the dynamic routing, and react-icons/fa is used for intuitive iconography. I also integrated framer-motion to create smooth animations and improve overall user engagement.

By combining dynamic routing, real-time charting, customizable views, and error handling, this application delivers a seamless user experience while handling large amounts of data effectively.

