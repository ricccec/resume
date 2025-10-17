import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import DateTimeDuration from './date-time-duration.js'
import { formatURL } from './link.js'

/**
 * @param {string[]} roles
 * @returns {string}
 */
const formatRoles = roles => (Intl.ListFormat ? new Intl.ListFormat('en').format(roles) : roles.join(', '))

/**
 * @param {import('../schema.d.ts').ResumeSchema['projects']} projects
 * @returns {string | false}
 */
export default function Projects(projects = []) {
  return (
    projects.length > 0 &&
    html`
      <section id="projects" class="section-header">
        <h3>Projects</h3>
        <hr>

        <div class="section-inner">
        <div class="timeline">
          ${projects.map(
      ({
        description,
        entity,
        highlights = [],
        keywords = [],
        name,
        startDate,
        endDate,
        roles = [],
        type,
        url,
      }) => html`
              <article class="section-item">
                <header>
                <div class="position-date-wrapper">
                  <div class="position-title">${name}</div>
                  </div>
                  ${url && html`<div class="position-location">${formatURL(url)}</div>`}
                </header>
                ${description && html`<div class="section-content">${markdown(description)}</div>`}
                ${highlights.length > 0 &&
        html`
                  <ul class="tag-list">
                    ${highlights.map(highlight => html`<li>${markdown(highlight)}</li>`)}
                  </ul>
                `}
                ${keywords.length > 0 &&
        html`
                  <ul class="tag-list">
                    ${keywords.map(keyword => html`<li>${keyword}</li>`)}
                  </ul>
                `}
              </article>
            `,
    )}
        </div>
        </div>
      </section>
    `
  )
}
