import { Component, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Barcode } from '@solid-bricks/barcode';
import {
  BarcodeGeneratorForm,
  BarcodeGeneratorFormValues,
} from './components/BarcodeGeneratorForm/BarcodeGeneratorForm';
import { BarcodeSnippet } from './components/BarcodeSnippet/BarcodeSnippet';
import { createHashSignal } from './hooks/routing';
import { TabContent, Tabs } from './components/Tabs/Tabs';

const tabs = [
  { hash: '#barcode-preview', label: 'Barcode preview' },
  { hash: '#code-snippet', label: 'Code snippet' },
];

const App: Component = () => {
  const [barcodeRenderError, setBarcodeRenderError] = createSignal<
    string | null
  >(null);
  const hash = createHashSignal(tabs[0].hash);
  const [formValues, setFormValues] = createStore<{
    values: BarcodeGeneratorFormValues;
    options: Omit<BarcodeGeneratorFormValues, 'value'>;
  }>({
    values: {
      width: 1,
      height: 100,
      fontSize: 12,
      lineColor: '#000',
      background: '#fff',
      value: 'ping-pong',
      textMargin: 2,
      text: '',
      as: 'svg',
      format: 'CODE128',
      textAlign: 'center',
      textPosition: 'bottom',
    },
    get options() {
      const { value: _, ...otherProps } = this.values;

      otherProps.text = otherProps.text || undefined;

      return otherProps;
    },
  });

  const activeTab = () => {
    const currentTab = hash().toLowerCase();

    if (tabs.some((r) => r.hash.toLowerCase() === currentTab)) {
      return currentTab;
    }

    return tabs[0].hash;
  };

  return (
    <main class="main">
      <section class="panel is-primary bg-primary">
        <header class="sticky-barcode">
          <h3 class="panel-heading">Barcode Generator</h3>
          <Tabs activeTab={activeTab()} tabs={tabs} />
          <TabContent activeTab={activeTab()} tabs={tabs} id="barcode-preview">
            <Barcode
              class="m-2"
              value={formValues.values.value}
              options={formValues.options}
              as={formValues.values.as}
              onError={(val) => setBarcodeRenderError(String(val))}
            />
          </TabContent>
          <TabContent activeTab={activeTab()} tabs={tabs} id="code-snippet">
            <BarcodeSnippet
              value={formValues.values.value}
              options={formValues.options}
              as={formValues.values.as}
              onError={(val) => setBarcodeRenderError(String(val))}
            />
          </TabContent>
        </header>
        <div class="column">
          <p>{barcodeRenderError()}</p>
        </div>
        <BarcodeGeneratorForm
          class="panel-block px-3 py-5"
          values={formValues.values}
          onInuput={(name, value) => {
            setBarcodeRenderError(null);
            setFormValues('values', name, value);
          }}
        />
      </section>
    </main>
  );
};

export default App;
