import { For, JSX, splitProps } from 'solid-js';
import styles from './styles.module.scss';

export interface BaseTabsProps {
  activeTab: string;
  tabs: { hash: string; label: string }[];
}

export type TabsProps = Omit<JSX.IntrinsicElements['nav'], 'children'> &
  BaseTabsProps;

export function Tabs(props: TabsProps): JSX.Element {
  const [local, otherProps] = splitProps(props, [
    'activeTab',
    'tabs',
    'classList',
  ]);

  return (
    <nav
      classList={{ ...local.classList, ['tabs is-boxed']: true }}
      {...otherProps}
    >
      <ul>
        <For each={local.tabs}>
          {(tab) => {
            const isActive = () => local.activeTab === tab.hash;

            return (
              <li classList={{ 'is-active': isActive() }}>
                <a
                  href={tab.hash}
                  aria-current={isActive() ? 'page' : undefined}
                >
                  {tab.label}
                </a>
              </li>
            );
          }}
        </For>
      </ul>
    </nav>
  );
}

export type TabContentProps = Omit<BaseTabsProps, 'tabs'> &
  Omit<JSX.IntrinsicElements['div'], 'id'> & { id: string };

export function TabContent(props: TabContentProps): JSX.Element {
  const [local, otherProps] = splitProps(props, [
    'children',
    'classList',
    'class',
    'id',
    'activeTab',
  ]);

  return (
    <div
      id={local.id}
      class={styles.tabContent}
      classList={{
        ...local.classList,
        [local.class]: !!local.class,
        'is-hidden': local.activeTab !== `#${local.id}`,
      }}
      {...otherProps}
    >
      {local.children}
    </div>
  );
}
