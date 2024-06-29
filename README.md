# AgriDataset Project

AgriDataset is a web application for visualizing aggregated crop data and yearly production data using Mantine UI components in React.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites] (#Prerequisites)
- [Installation](#installation)
- [Screenshots](#screenshots)


## Overview

AgriDataset provides two main features:

1. **Yearly Production Data Table:** Displays the crop with maximum and minimum production for each year.
2. **Aggregated Crop Data Table:** Displays average yield and average cultivation area of crops aggregated over the years 1950-2020.

## Features

- Fetches data using custom hooks (`useFetchData`) for dynamic data handling.
- Utilizes Mantine UI components (`Table`, `Title`, `Container`) for structured and responsive data presentation.
- Error handling with custom `Error` component for displaying fetch errors.
- Loading state handled with `Loading` component for better user experience.


### Prerequisites

- Node.js
- Yarn

## Installation

To run the project locally, follow these steps:


1. **Clone the Repository:**

   git clone https://github.com/Saurabh23089/agridataset.git
   cd agridataset

2. **Install dependencies:**

   yarn install

3.  **Run the Project:**

   yarn start

### Screenshots

!![Yearly Production Data Table]('./public/screenshots/yearlydata.png')
![Aggregated Crop Data Table]('./public/screenshots/cropdata.png')
