import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import DateTime from './date-time.js'
import { formatURL } from './link.js'
// @ts-expect-error ellipsize types not properly exported
import ellipsize from 'ellipsize'

/**
 * @param {import('../schema.d.ts').ResumeSchema['publications']} publications
 * @returns {string | false}
 */
export default function Publications(publications = []) {
  return (
    publications.length > 0 &&
    html`
      <section id="publications" class="section-header">
        <h3>Publications</h3>
        <hr>
        <div class="section-inner">
          ${publications.map(
            ({ name, publisher, releaseDate, summary, url }) => html`
              <article class="section-item">
                <header>
                  <div class="position-date-wrapper">
                    <div class="position-title">${ellipsize(name, 60)}</div>
                  </div>
                  ${url && html`<div class="position-location">${formatURL(url)}</div>`}
                  
                </header>
                <div class="section-content"><p>Full title: "<i>${name}</i>"</p></div>
                 ${publisher && html`<div class="section-content"><p>Published by <strong>${publisher}</strong></p></div>`}
              </article>
            `,
          )}
        </div>
      </section>
    `
  )
}
