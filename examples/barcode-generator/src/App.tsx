import { Component, createSignal, createMemo } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';
import { Barcode } from '@solid-bricks/barcode';
import {
  BarcodeGeneratorForm,
  BarcodeGeneratorFormValues,
} from './components/BarcodeGeneratorForm/BarcodeGeneratorForm';
import JsBarcode from 'jsbarcode';
import { BarcodeSnippet } from './components/BarcodeSnippet/BarcodeSnippet';
import { createHashSignal } from './hooks/routing';
import { TabContent, Tabs } from './components/Tabs/Tabs';
import { CodeSnippet } from './components/CodeSnippet/CodeSnippet';
import {
  MaterialFileDownload,
  MaterialReset,
} from './components/SvgIcons/SvgIcons';

const tabs = [{ hash: '#barcode-preview', label: 'Barcode preview' }];

const initialFormValues: BarcodeGeneratorFormValues = {
  width: 1,
  height: 100,
  fontSize: 12,
  lineColor: '#000',
  background: '#fff',
  value: 'ping-pong',
  textMargin: 2,
  text: '',
  as: 'svg',
  displayValue: true,
  format: 'CODE128',
  textAlign: 'center',
  textPosition: 'bottom',
  font: 'monospace',
};

const App: Component = () => {
  const [barcodeRenderError, setBarcodeRenderError] = createSignal<
    string | null
  >(null);
  const hash = createHashSignal();
  const [formValues, setFormValues] = createStore<{
    values: BarcodeGeneratorFormValues;
  }>({
    values: Object.assign({}, initialFormValues),
  });

  const computedFormValuesProps = createMemo(() => {
    const { value: _, as, ...otherProps } = formValues.values;

    otherProps.text = otherProps.text || undefined;

    const options = otherProps;

    return {
      options,
      barcodeProps: {
        value: formValues.values.value,
        options,
        as: formValues.values.as,
      },
    };
  });

  const handleReset = () => {
    setFormValues('values', reconcile(initialFormValues));
  };

  const handleDownloadBarcode = () => {
    const link = document.createElement('a');
    const image = document.createElement('img');

    JsBarcode(image, formValues.values.value, {
      ...computedFormValuesProps().options,
    });

    link.href = image.src;
    link.download = 'barcode.jpg';
    link.click();
  };

  const activeTab = () => {
    const currentTab = hash().toLowerCase();

    if (tabs.some((r) => r.hash.toLowerCase() === currentTab)) {
      return currentTab;
    }

    return tabs[0].hash;
  };

  return (
    <main class="main">
      <header class="is-flex is-flex-direction-row is-align-items-center mb-5 px-3">
        <h1 class="h1">@solid-bricks/barcode</h1>
        <Barcode
          value="p"
          as="svg"
          class="barcode-logo"
          elemProps={{ 'aria-hidden': true }}
          options={{
            displayValue: false,
            width: 1,
            height: 32,
            fontSize: 12,
            lineColor: '#bb3c6a',
            background: 'transparent',
            textMargin: 0,
            format: 'CODE128',
            textAlign: 'center',
            textPosition: 'bottom',
          }}
        />
      </header>
      <article class="panel is-primary bg-primary">
        <header>
          <h2 class="panel-heading">Installation</h2>
        </header>
        <div class="panel-block px-3 py-5 is-flex is-flex-direction-column is-align-items-flex-start">
          <CodeSnippet class="w-100 p-5">
            {'npm i @solid-bricks/barcode'}
          </CodeSnippet>
        </div>
      </article>
      <article class="panel is-primary bg-primary">
        <header class="sticky-barcode">
          <div class="control-btns">
            <button
              type="button"
              class="icon-btn has-text-light"
              title="download barcode"
              onClick={handleDownloadBarcode}
            >
              <span class="visually-hidden">download barcode</span>
              <MaterialFileDownload aria-hidden="true" />
            </button>
            <button
              type="button"
              class="icon-btn has-text-light"
              onClick={handleReset}
              title="reset barcode"
            >
              <span class="visually-hidden">reset barcode</span>
              <MaterialReset aria-hidden="true" />
            </button>
          </div>
          <h2 class="panel-heading">Barcode Generator</h2>
          <Tabs class="mb-1" activeTab={activeTab()} tabs={tabs} />
          <TabContent class="px-3" activeTab={activeTab()} id="barcode-preview">
            <Barcode
              {...computedFormValuesProps().barcodeProps}
              onError={(val) => setBarcodeRenderError(String(val))}
            />
          </TabContent>
        </header>
        <section class="p-3">
          <h3 class="has-text-primary has-text-weight-medium mb-2">Code</h3>
          <BarcodeSnippet
            barcodeProps={computedFormValuesProps().barcodeProps}
          />
        </section>
        <div>
          <p>{barcodeRenderError()}</p>
        </div>
        <section class="px-2 py-5 is-flex is-flex-direction-column">
          <h3 class="has-text-primary has-text-weight-medium mb-2">
            Edit barcode
          </h3>
          <BarcodeGeneratorForm
            class="panel-block"
            values={formValues.values}
            onInuput={(name, value) => {
              setBarcodeRenderError(null);
              setFormValues('values', name, value);
            }}
          />
        </section>
      </article>
      <a
        href="https://github.com/FaberVitale/solid-bricks"
        class="github-corner"
        aria-label="View source on GitHub"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 250 250"
          style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;"
          aria-hidden="true"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style="transform-origin: 130px 106px;"
            class="octo-arm"
          ></path>
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            class="octo-body"
          ></path>
        </svg>
      </a>
    </main>
  );
};

export default App;
