/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSPopoverContent from '../popover/popover-content';
import styles from './tooltip.scss?lit';

/**
 * Tooltip content.
 */
@customElement(`${prefix}-tooltip-content`)
class CDSTooltipContent extends CDSPopoverContent {
  connectedCallback() {
    if (!this.hasAttribute('aria-hidden')) {
      this.setAttribute('aria-hidden', 'true');
    }
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'tooltip');
    }
    super.connectedCallback();
  }

  updated() {
    this.shadowRoot
      ?.querySelector(`.${prefix}--popover-content`)
      ?.classList.add(`${prefix}--tooltip-content`);
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}

export default CDSTooltipContent;
