import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import DateTimeDuration from './date-time-duration.js'
import Duration from './duration.js'
import Link from './link.js'

/** @typedef {NonNullable<import('../schema.d.ts').ResumeSchema['work']>[number]} Work */
/** @typedef {Pick<Work, 'highlights' | 'location' | 'position' | 'startDate' | 'endDate' | 'summary'>} NestedWorkItem */
/** @typedef {Pick<Work, 'description' | 'name' | 'url'> & { items: NestedWorkItem[] }} NestedWork */

/**
 * @param {import('../schema.d.ts').ResumeSchema['work']} work
 * @returns {string | false}
 */
export default function Work(work = []) {
  const nestedWork = work.reduce((acc, { description, name, url, ...rest }) => {
    const prev = acc[acc.length - 1]
    if (prev && prev.name === name && prev.description === description && prev.url === url) prev.items.push(rest)
    else acc.push({ description, name, url, items: [rest] })
    return acc
  }, /** @type {NestedWork[]} */ ([]))

  return (
    work.length > 0 &&
    html`
      <section id="work" class="section-header">
        <h3>Work</h3>
        <hr>
        <div class="section-inner">
          ${nestedWork.map(({ description, name, url, items = [] }) => {
            const singleItem = items.length === 1 ? items[0] : undefined
            return html`
                  ${items.map(
                    ({ highlights = [], location, position, startDate, endDate, summary }) => html`
                      <article class="section-item">
                        ${!singleItem &&
                        html`
                          <header>
                            <div class="position-date-wrapper">
                              <div class="position-title">${position}</div>
                              ${startDate && html`<div class="date-range">${DateTimeDuration(startDate, endDate)}</div>`}
                            </div>
                            <div>
                              ${location && html`<div class="position-location">${location}</div>`}
                            </div>
                          </header>
                        `}
                        ${summary && html`<div class="section-content">${markdown(summary)}</div>`}
                        ${highlights.length > 0 &&
                        html`
                          <ul class="tag-list">
                            ${highlights.map(highlight => html`<li>${markdown(highlight, true)}</li>`)}
                          </ul>
                        `}
                      </article>
                    `,
                  )}
            `
          })}
        </div>
      </section>
    `
  )
}
