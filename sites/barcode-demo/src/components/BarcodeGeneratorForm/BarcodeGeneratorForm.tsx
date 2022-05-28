import { BarcodeOtions, BarcodeElement } from '@solid-bricks/barcode';
import { For, JSX } from 'solid-js';
import styles from './styles.module.scss';

export type BarcodeGeneratorFormValues = Required<
  Pick<
    BarcodeOtions,
    | 'background'
    | 'lineColor'
    | 'width'
    | 'height'
    | 'fontSize'
    | 'textMargin'
    | 'text'
    | 'format'
    | 'textAlign'
    | 'textPosition'
  >
> & {
  value: string;
  as: BarcodeElement;
};

const formats: string[] = [
  'CODE39',
  'CODE128',
  'CODE128A',
  'CODE128B',
  'CODE128C',
  'EAN13',
  'EAN8',
  'EAN5',
  'EAN2',
  'UPC',
  'UPCE',
  'ITF14',
  'ITF',
  'MSI',
  'MSI10',
  'MSI11',
  'MSI1010',
  'MSI1110',
  'pharmacode',
  'codabar',
];

interface FormInput<Name extends string> {
  type: HTMLInputElement['type'];
  label: string;
  id: string;
  name: Name;
  otherProps?: Partial<
    Omit<JSX.IntrinsicElements['input'], 'id' | 'name' | 'type'>
  >;
}

interface SelectInput<Name extends string> {
  label: string;
  id: string;
  name: Name;
  options: (string | { value: string; label?: string })[];
  otherProps?: Partial<
    Omit<JSX.IntrinsicElements['select'], 'id' | 'name' | 'type'>
  >;
}

export interface BarcodeGeneratorFormProps {
  values: BarcodeGeneratorFormValues;
  class?: string | undefined;
  onInuput(
    name: keyof BarcodeGeneratorFormValues,
    value: string | number
  ): void;
}

const inputFormList: (
  | SelectInput<keyof BarcodeGeneratorFormValues>
  | FormInput<keyof BarcodeGeneratorFormValues>
)[] = [
  {
    type: 'text',
    label: 'barcode value',
    name: 'value',
    id: 'bar-value',
  },
  { type: 'text', label: 'text override', name: 'text', id: 'bar-text' },
  {
    name: 'textAlign',
    id: 'bar-text-align',
    label: 'text align',
    options: ['left', 'center', 'right'],
  },
  {
    name: 'textPosition',
    id: 'bar-text-pos',
    label: 'text position',
    options: ['top', 'bottom'],
  },
  {
    type: 'range',
    label: 'Text margin',
    name: 'textMargin',
    id: 'bar-text-margin',
    otherProps: {
      min: '-10',
      step: '1',
      max: '30',
    },
  },
  {
    id: 'bar-format',
    label: 'barcode format',
    name: 'format',
    options: formats,
  },
  {
    id: 'bar-as',
    label: 'renderer',
    name: 'as',
    options: ['svg', 'img', 'canvas'],
  },
  {
    type: 'range',
    label: 'Font size',
    name: 'fontSize',
    id: 'bar-font-size',
    otherProps: {
      min: '0',
      step: '1',
      max: '50',
    },
  },
  {
    type: 'range',
    label: 'Bar Width',
    name: 'width',
    id: 'bar-width',
    otherProps: {
      min: '0',
      step: '1',
      max: '5',
    },
  },
  {
    type: 'range',
    label: 'height',
    name: 'height',
    id: 'bar-height',
    otherProps: {
      min: '10',
      step: '1',
      max: '200',
    },
  },
  {
    type: 'color',
    label: 'background',
    name: 'background',
    id: 'bar-background',
  },
  {
    type: 'color',
    label: 'Line color',
    name: 'lineColor',
    id: 'bar-line-color',
  },
];

export function BarcodeGeneratorForm(
  props: BarcodeGeneratorFormProps
): JSX.Element {
  const handleInput: JSX.EventHandlerUnion<HTMLFormElement, InputEvent> = (
    evt
  ) => {
    if (evt.defaultPrevented) {
      return;
    }

    let value: string | number = (evt.target as HTMLInputElement).value ?? '';

    if (evt.target.getAttribute('type')?.toLowerCase() === 'range') {
      value = Number(value);
    }

    props.onInuput(
      evt.target.getAttribute('name') as keyof BarcodeGeneratorFormValues,
      value
    );
  };

  return (
    <form
      classList={{ [styles.form]: true, [props.class]: !!props.class }}
      onInput={handleInput}
    >
      <For each={inputFormList}>
        {(item) => {
          if ('options' in item) {
            return (
              <div class="field" data-field-type="select">
                <label class="label" for={item.id}>
                  {item.label}
                </label>
                <div class="select">
                  <select value={props.values[item.name]} name={item.name}>
                    <For each={item.options}>
                      {(option) => {
                        const value =
                          typeof option === 'string' ? option : option.value;
                        const label =
                          typeof option === 'string'
                            ? option
                            : option?.label ?? value;

                        return <option value={value}>{label}</option>;
                      }}
                    </For>
                  </select>
                </div>
              </div>
            );
          }

          return (
            <div class="field" data-field-type={item.type}>
              <label class="label" for={item.id}>
                {item.label} {item.type === 'range' && props.values[item.name]}
              </label>
              <div class="control">
                <input
                  class="input"
                  type={item.type}
                  id={item.id}
                  name={item.name}
                  value={props.values[item.name]}
                  {...item.otherProps}
                />
              </div>
            </div>
          );
        }}
      </For>
    </form>
  );
}
