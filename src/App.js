import React from 'react';
import './Collapsible.css';
import './App.css';
import Collapsible from './components/Collapsible';

/**
 * App component to render all components
 */
class App extends React.Component {
  /**
   * render method for the component
   */
  render() {
    return (
      <div className="App">
        <div className="first">
          <Collapsible
            dataList={[
              { foo: 'One', bar: 'Two' },
              { foo: 'Three', bar: 'Four' },
              { foo: 'Five', bar: 'Six' },
              { foo: 'Seven', bar: 'Eight' },
              { foo: 'Nine', bar: 'Ten' }
            ]}
            displayKey="foo"
            searchKey={['foo']}
            searchItem
            alignSearchItem="left"
          />
        </div>
      </div>
    );
  }
}
export default App;
