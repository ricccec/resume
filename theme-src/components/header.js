import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import Icon from './icon.js'
import Link, { formatURL } from './link.js'

/**
 * @param {string} countryCode
 * @returns {string | undefined}
 */
const formatCountry = countryCode =>
  Intl.DisplayNames ? new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) : countryCode

/**
 * @param {import('../schema.d.ts').ResumeSchema['basics']} basics
 * @returns {string}
 */
export default function Header(basics = {}) {
  const { email, image, label, location, name, phone, profiles = [], summary, url } = basics

  return html`
    <header class="section-header">
      <div class="section-inner">
        ${name && html`<div class="name-header">${name}</div>`}
        ${label && html`<div class="label-header">${label}</div>`}
        <div class="icon-list">
          ${location?.city &&
          html`
            <div>
              ${Icon('map-pin')} ${location.city}${location.countryCode && html`, ${formatCountry(location.countryCode)}`}
            </div>
          `}
          ${email &&
          html`
            <div>
              ${Icon('mail')}
              ${email}
            </div>
          `}
          ${phone &&
          html`
            <div>
              ${Icon('phone')}
              ${phone}
            </div>
          `}
          ${url && html`<div>${Icon('link')} ${formatURL(url)}</div>`}
          ${profiles.map(
            ({ network, url, username }) => html`
              <div>
                ${network && Icon(network, 'user')} ${Link(url, username)}
                ${network && html`<span class="network">(${network})</span>`}
              </div>
            `,
          )}
        </div>
      </div>
    </header>
    ${summary &&
    html`
      <section class="section-header">
        <div class="section-inner">
          <article>${markdown(summary)}</article>
        </div>
      </section>
    `}
  `
}
