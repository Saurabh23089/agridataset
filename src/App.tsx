import AggregatedCropDataTable from "./pages/averagedata";
import YearlyProductionTable from "./pages/yearlyproduction";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider>
      <div className="App">
        <YearlyProductionTable />
        <AggregatedCropDataTable />
      </div>
    </MantineProvider>
  );
}

export default App;
