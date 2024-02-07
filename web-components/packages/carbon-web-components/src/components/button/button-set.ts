/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BUTTON_KIND } from './defs';
import styles from './button.scss?lit';
import { prefix } from '../../globals/settings';

/**
 * Button set.
 *
 * @element cds-button-set
 */
@customElement(`${prefix}-button-set`)
class CDSButtonSet extends LitElement {
  /**
   * Handler for @slotchange, set the first cds-button to kind secondary and primary for the remaining ones
   *
   * @private
   */
  private _handleSlotChange(event: Event) {
    const childItems = (event.target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSButtonSet).selectorItem
            )
          : false
      );

    childItems.forEach((elem, index) => {
      (elem as HTMLElement).setAttribute(
        'kind',
        index === 0 ? BUTTON_KIND.SECONDARY : BUTTON_KIND.PRIMARY
      );
    });

    const update = new CustomEvent(`${prefix}-btn-set-update`, {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.dispatchEvent(update);
  }

  render() {
    return html` <slot @slotchange="${this._handleSlotChange}"></slot> `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'list');
  }

  /**
   * A selector that will return the child items.
   */
  static get selectorItem() {
    return `${prefix}-button`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default CDSButtonSet;
