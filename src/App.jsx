import { Component } from 'react';

// Data Import
import buildData from './data.js';

// CSS Imports
import './global.css';
import styles from './App.module.css'

// Components
import { Header } from './components/Header';

class App extends Component {

  constructor(props) { // constructor: called when the component is instantiated
    super(props); // calls constructor of parent class (Component) - syntax necessity
    this.state = { // initialize component state
      itemsData: [], // array of data called items (Empty Dummy Data Array)
      benchmarkResults: { // Object to store results (execution times)
        create: 0,
        read: 0,
        update: 0,
        delete: 0,
      },
    };
    this.numItems = 10; // Number of items for the algorithm benchmark.
    this.timingInterval = 1; // Milliseconds between each operation.
  }

  // Initialize the benchmark data.
  componentDidMount() { // called after component has been added to the DOM
    this.initializeData();
  }

  // Function to produce dummy data
  initializeData = () => {
    const itemsData = buildData(this.numItems); // Use the buildData function to generate data
    // Create initial dummy data
    // for (let i = 0; i < this.numItems; i++) {
    //   itemsData.push({ // Object using two properties ID, and Value
    //     id: i,
    //     value: `Item ${i}`,
    //     recentlyUpdated: false,
    //   });
    // }
    this.setState({ itemsData }); // update component's state
  };

  // Function to measure the CREATE operation
  createOperation = () => {
    // Record the start time of the operation
    const startTime = performance.now();

    // Simulate creating a new item
    const newItem = {
      id: this.numItems,
      value: buildData(1)[0].value,
      recentlyUpdated: false,
    };
    // Updating the component's state by adding the new item to the itemsData array
    this.setState((prevState) => ({
      itemsData: [...prevState.itemsData, newItem], // using spread operator add a new item to itemsData array
    }), () => {
      const endTime = performance.now(); // Record the end time of the operation
      const createDuration = endTime - startTime; // Calculate the duration of the operation
      // Method to update benchmark results with the duration of create operation
      this.updateBenchmarkResult('create', createDuration);
      // Trigger a re-render after state is updated
      this.forceUpdate();
    });

    this.numItems++; // increment counter for generating unique IDs
  };

  // Function to CREATE 1000 Rows
  createOperation1000 = () => {
    const startTime = performance.now();

    // Create an array to hold the new items
    const newItems = [];

    for (let i = 0; i < 1000; i++) {
      const newItem = {
        id: this.state.itemsData.length + i + 1,
        value: buildData(1)[0].value,
        recentlyUpdated: false,
      };
      newItems.push(newItem);
    }

    this.setState((prevState) => ({
      itemsData: [...prevState.itemsData, ...newItems],
    }), () => {
      const endTime = performance.now();
      const createDuration = endTime - startTime;
      this.updateBenchmarkResult('create', createDuration);
    });
  };

  // Function to CREATE 10000 Rows
  createOperation10000 = () => {
      const startTime = performance.now();

      // Create an array to hold the new items
      const newItems = [];

      for (let i = 0; i < 10000; i++) {
        const newItem = {
          id: this.state.itemsData.length + i + 1,
          value: buildData(1)[0].value,
          recentlyUpdated: false,
        };
        newItems.push(newItem);
      }

      this.setState((prevState) => ({
        itemsData: [...prevState.itemsData, ...newItems],
      }), () => {
        const endTime = performance.now();
        const createDuration = endTime - startTime;
        this.updateBenchmarkResult('create', createDuration);
      });
  };

  // Function to measure the READ operation
  readOperation = () => {
    const startTime = performance.now(); // Record start time of operation READ

    // Ensure there are items to Read
    if(this.state.itemsData.length > 0){
      // Iterate through all items in itemsData and access the value property
      this.state.itemsData.forEach((item) => {
        // Simulate reading an item.
        const value = item.value;
        console.log(`Item read: ${value}`)
      });
    }

    const endTime = performance.now(); // Record the end time of the operation
    const readDuration = endTime - startTime; // Calculate the duration of the operation
    // Call method to update the benchmark results object with the duration
    this.updateBenchmarkResult('read', readDuration);

    // Trigger a re-render after state is updated
    this.forceUpdate();
  };

  // Function to measure the UPDATE operation
  updateOperation = () => {
    const startTime = performance.now();

    // Ensure there are items to Update
    if (this.state.itemsData.length > 0){
      // Create an array of available, non-updated indices
      const availableIndices = this.state.itemsData
        .map((item, index) => ({ index, recentlyUpdated: item.recentlyUpdated }))
        .filter((item) => !item.recentlyUpdated)
        .map((item) => item.index);

      if (availableIndices.length > 0) {
        // Randomly select an index from the available indices
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

        // Mark the item at the random index as recently updated
        const updatedItems = [...this.state.itemsData];
        updatedItems[randomIndex].recentlyUpdated = true;

        // Create an updatedItem object by copying the original item located at random index and changing its value
        const updatedItem = {
          ...updatedItems[randomIndex],
          value: `Updated Item ${randomIndex}`,
        };
        updatedItems[randomIndex] = updatedItem;

        console.log(`Updated item:`, updatedItem);

        // Update the component's state with the updated itemsData array
        this.setState({ itemsData: updatedItems }, () => {
          const endTime = performance.now();
          const updateDuration = endTime - startTime;
          this.updateBenchmarkResult('update', updateDuration);

          console.log(`Updated duration: ${updateDuration} ms`);

          // Trigger a re-render after state is updated
          this.forceUpdate();
        });
      }
      else{
        console.log('All items have been updated. Please refresh.');
      }
    }
  };

  // Function to DELETE ONE ITEM
  deleteOneItem = () => {
    const startTime = performance.now();
    // Ensure there are items to Delete
    if(this.state.itemsData.length > 0 ){
      // Generating a random index within the valid range
      const randomIndex = Math.floor(Math.random() * this.state.itemsData.length);
      // Create a copy of the itemsData array with the item at randomIndex removed
      const updatedItems = [...this.state.itemsData];
      updatedItems.splice(randomIndex, 1); // removes one element from the item at random index using splice
      // Update the component's state with the updated itemsData array
      this.setState({ itemsData: updatedItems }, () => {
        const endTime = performance.now();
        const deleteDuration = endTime - startTime;
        this.updateBenchmarkResult('delete', deleteDuration);
        // Trigger a re-render after state is updated
        this.forceUpdate();
      });
    }
  }

  // Function to measure the DELETE operation
  deleteOperation = () => {
    const startTime = performance.now();
    // Ensure there are items to Delete
    if(this.state.itemsData.length > 0 ){
      // Set the itemsData to an empty array, effectively deleting all items
      this.setState({ itemsData: [], }, () => {
        const endTime = performance.now();
        const deleteDuration = endTime - startTime;
        this.updateBenchmarkResult('delete', deleteDuration);
        // Trigger a re-render after state is updated
        this.forceUpdate();
      });
    }
  };

  // Helper function to update benchmark results.
  updateBenchmarkResult = (operation, duration) => {
    this.setState((prevState) => ({
      // Create a new benchmarkResults Object using spread operator to dynamically set the value
      benchmarkResults: {
        ...prevState.benchmarkResults,
        // dynamically set the value of operation (create, read, update and delete)
        [operation]: duration.toFixed(4), // rounded to four decimal places
      },
    }));
  };

  // Function = handle button click
  handleButtonClick = (operation) => {
    switch (operation) {
      case 'Create':
        this.createOperation();
        break;
      case 'Create1000':
        this.createOperation1000();
        break;
      case 'Create10000':
        this.createOperation10000();
        break;
      case 'Read':
        this.readOperation();
        break;
      case 'Update':
        this.updateOperation();
        break;
      case 'Delete':
        this.deleteOperation();
        break;
      default:
        console.error('Invalid operation:', operation);
    }
  }

  // Render the results, buttons to trigger operations and display data
  render() {
    const { benchmarkResults, itemsData } = this.state;
    return (
      <>
        {/* Render the Header component and pass a callback to handle button clicks */}
        <Header onButtonClick={this.handleButtonClick}/>
        <main>
          <div className={styles.content}>
            {/* Data Used */}
            <div className={styles.sectionData}>
              <h2>Data Table</h2>
              <table className={styles.tableData}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Algorithm Benchmark Results */}
            <div className={styles.sectionResults}>
              <h2>Algorithm Benchmark Results</h2>
              <table className={styles.tableData}>
                <thead>
                  <tr>
                    <th>Operation</th>
                    <th>Duration (millisecond)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Create</td>
                    <td>{benchmarkResults.create} ms</td>
                  </tr>
                  <tr>
                    <td>Read</td>
                    <td>{benchmarkResults.read} ms</td>
                  </tr>
                  <tr>
                    <td>Update</td>
                    <td>{benchmarkResults.update} ms</td>
                  </tr>
                  <tr>
                    <td>Delete</td>
                    <td>{benchmarkResults.delete} ms</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </>
    )
  }
}
export default App;