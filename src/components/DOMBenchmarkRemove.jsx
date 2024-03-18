import { Component } from 'react';

class DOMBenchmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], // array of data called items (Dummy Data)
      benchmarkResults: {
        create: 0,
        read: 0,
        update: 0,
        delete: 0,
      },
    };
    this.numItems = 10; // Number of items for the algorithm benchmark.
    this.timingInterval = 10; // Milliseconds between each operation.
  }

  // Step 1: Initialize the benchmark data.
  componentDidMount() {
    this.initializeData();
  }
  initializeData = () => {
    const items = [];
    // Create initial dummy data
    for (let i = 0; i < this.numItems; i++) {
      items.push({
        id: i,
        value: `Item ${i}`,
      });
    }
    this.setState({ items });
  };

  // Step 2: Measure the create operation (CREATE)
  performCreateOperation = () => {
    const startTime = performance.now();
    // Simulate creating a new item
    const newItem = {
      id: this.numItems,
      value: `Item ${this.numItems}`,
    };
    this.setState((prevState) => ({
      items: [...prevState.items, newItem],
    }), () => {
      const endTime = performance.now();
      const createDuration = endTime - startTime;
      this.updateBenchmarkResult('create', createDuration);
    });
    this.numItems++;
  };

  // Step 3: Measure the read operation.
  performReadOperation = () => {
    const startTime = performance.now();
    // Simulate reading an item.
    const randomIndex = Math.floor(Math.random() * this.numItems);
    this.state.items[randomIndex];
    const endTime = performance.now();
    const readDuration = endTime - startTime;
    this.updateBenchmarkResult('read', readDuration);
  };

  // Step 4: Measure the update operation.
  performUpdateOperation = () => {
    const startTime = performance.now();
    // Simulate updating an item.
    const randomIndex = Math.floor(Math.random() * this.numItems);
    const updatedItem = {
      ...this.state.items[randomIndex],
      value: `Updated Item ${randomIndex}`,
    };
    const updatedItems = [...this.state.items];
    updatedItems[randomIndex] = updatedItem;
    this.setState({ items: updatedItems }, () => {
      const endTime = performance.now();
      const updateDuration = endTime - startTime;
      this.updateBenchmarkResult('update', updateDuration);
    });
  };

  // Step 5: Measure the delete operation.
  performDeleteOperation = () => {
    const startTime = performance.now();
    // Simulate deleting an item.
    const randomIndex = Math.floor(Math.random() * this.numItems);
    const updatedItems = [...this.state.items];
    updatedItems.splice(randomIndex, 1);
    this.setState({ items: updatedItems }, () => {
      const endTime = performance.now();
      const deleteDuration = endTime - startTime;
      this.updateBenchmarkResult('delete', deleteDuration);
    });
  };

  // Helper function to update benchmark results.
  updateBenchmarkResult = (operation, duration) => {
    this.setState((prevState) => ({
      benchmarkResults: {
        ...prevState.benchmarkResults,
        [operation]: duration.toFixed(2),
      },
    }));
  };

  // Render the benchmark results and buttons to trigger operations.
  render() {
    const { benchmarkResults, items } = this.state;

    return (
      <div>
        <h1>DOM Operations Benchmark</h1>
        <div>
          <button onClick={this.performCreateOperation}>Create</button>
          <button onClick={this.performReadOperation}>Read</button>
          <button onClick={this.performUpdateOperation}>Update</button>
          <button onClick={this.performDeleteOperation}>Delete</button>
        </div>
        <div>
          <h2>Dummy Data Table</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Benchmark Results</h2>
          <table>
            <thead>
              <tr>
                <th>Operation</th>
                <th>Duration (ms)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Create</td>
                <td>{benchmarkResults.create}</td>
              </tr>
              <tr>
                <td>Read</td>
                <td>{benchmarkResults.read}</td>
              </tr>
              <tr>
                <td>Update</td>
                <td>{benchmarkResults.update}</td>
              </tr>
              <tr>
                <td>Delete</td>
                <td>{benchmarkResults.delete}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DOMBenchmark;