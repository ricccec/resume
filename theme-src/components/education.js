import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import DateTimeDuration from './date-time-duration.js'
import Link from './link.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['education']} education
 * @returns {string | false}
 */
export default function Education(education = []) {
  return (
    education.length > 0 &&
    html`
      <section id="education" class="section-header">
        <h3>Education</h3>
        <hr>
        <div class="section-inner">
          <div class="timeline">
            ${education.map(
      ({ area, institution, startDate, endDate, studyType, score }) => html`
                <article class="section-item">
                  <header>
                  <div class="position-date-wrapper">
                   <div class="position-title">${[studyType, area && html`${area}`].filter(Boolean).join(' in ')}</div>
                   ${startDate && html`<div class="date-range">${DateTimeDuration(startDate, endDate)}</div>`}
                  </div>
                  <div>
                              ${institution && html`<div class="position-location">${institution}</div>`}
                            </div>
                  </header>
                  ${score && html`<div class="section-content"><p>${score}</p></div>`}
                </article>
              `,
    )}
          </div>
        </div>
      </section>
    `
  )
}
