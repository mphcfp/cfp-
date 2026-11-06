'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { ArrowIcon } from '@/components/icons';

type Category = 'branding' | 'campaign' | 'digital';
type Filter = 'all' | Category;

type Project = {
  id: string;
  category: Category;
  number: string;
  name: string;
  cardTitle: string;
  cardType: string;
  cardAlt: string;
  title: string;
  type: string;
  description: string;
  image: string;
  alt: string;
};

const projects: Project[] = [
  {
    id: 'madar',
    category: 'branding',
    number: '01',
    name: 'Madar',
    cardTitle: 'Madar — The future, closer',
    cardType: 'Brand strategy / Visual identity',
    cardAlt: 'Madar technology brand identity concept in mint green',
    title: 'Madar — Beyond familiar boundaries',
    type: 'Concept / Brand strategy & identity',
    description:
      'For this conceptual technology brand, connection becomes a visual language: continuous orbits, mint light and geometric typography. This design exploration creates a cohesive identity for a forward-looking brand. It is an independent concept, not a commissioned client project.',
    image: '/assets/madar.svg',
    alt: 'Madar brand identity concept with mint orbits on a dark background',
  },
  {
    id: 'sobh',
    category: 'campaign',
    number: '02',
    name: 'Sobh',
    cardTitle: 'Sobh — A brighter beginning',
    cardType: 'Creative campaign / Packaging',
    cardAlt: 'Sobh coffee campaign concept with orange packaging',
    title: 'Sobh — A brighter start',
    type: 'Concept / Creative campaign',
    description:
      'A concept campaign celebrating the simple pleasure of a fresh start. Warm orange, playful compositions and distinctive packaging come together to tell the story of a coffee brand. It is an independent concept, not a commissioned client project.',
    image: '/assets/sobh.svg',
    alt: 'Sobh coffee campaign concept with orange and cream packaging',
  },
  {
    id: 'rooyesh',
    category: 'digital',
    number: '03',
    name: 'Rooyesh',
    cardTitle: 'Rooyesh — Closer to nature',
    cardType: 'Digital experience / Interface design',
    cardAlt:
      'Rooyesh digital design concept with botanical imagery and a natural palette',
    title: 'Rooyesh — A little closer to nature',
    type: 'Concept / Digital experience',
    description:
      'An imagined digital presence for a lifestyle brand, with quiet colors, botanical forms and room to breathe. The design focuses on clear reading, intuitive discovery and a close connection between image and story. It is an independent concept, not a commissioned client project.',
    image: '/assets/rooyesh.svg',
    alt: 'Rooyesh brand concept with botanical compositions and sage green colors',
  },
];

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'branding', label: 'Branding' },
  { value: 'campaign', label: 'Campaigns' },
  { value: 'digital', label: 'Digital' },
];

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>('all');
  const [filterChanged, setFilterChanged] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef(true);
  const visibleCount = projects.filter(
    (project) => filter === 'all' || project.category === filter,
  ).length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!activeProject || !dialog) return;

    const hadScrollLock = document.body.classList.contains('dialog-open');
    document.body.classList.add('dialog-open');
    if (!dialog.open) dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      if (dialog.open) dialog.close();
      if (!hadScrollLock) document.body.classList.remove('dialog-open');
      const trigger = triggerRef.current;
      if (restoreFocusRef.current && trigger?.isConnected) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, [activeProject]);

  function openProject(project: Project, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    restoreFocusRef.current = true;
    setActiveProject(project);
  }

  function closeProject() {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setActiveProject(null);
  }

  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      closeProject();
    }
  }

  return (
    <>
      <section id="work" className="section container work-section">
        <div className="section-caption reveal">
          <span className="section-number">03 / SELECTED WORK</span>
          <span className="section-kicker" dir="ltr">
            LESS ORDINARY. MORE AURA.
          </span>
        </div>
        <div className="section-heading reveal">
          <div>
            <h2>
              Ideas made to <span className="serif-accent">be seen.</span>
            </h2>
            <p className="concept-note">
              Concept projects exploring the AURA approach to design
            </p>
          </div>
          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`filter${filter === item.value ? ' active' : ''}`}
                data-filter={item.value}
                aria-pressed={filter === item.value}
                onClick={() => {
                  setFilter(item.value);
                  setFilterChanged(true);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <p id="filter-status" className="sr-only" aria-live="polite" aria-atomic="true">
          {filterChanged &&
            `${visibleCount} concept ${visibleCount === 1 ? 'project' : 'projects'} shown.`}
        </p>
        <div className="work-grid">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`work-card reveal${filterChanged ? ' is-visible' : ''}`}
              data-category={project.category}
              hidden={filter !== 'all' && filter !== project.category}
            >
              <button
                type="button"
                className="work-image"
                data-project={project.id}
                aria-label={`View the ${project.name} concept project`}
                aria-haspopup="dialog"
                aria-controls="project-dialog"
                onClick={(event) => openProject(project, event.currentTarget)}
              >
                <img
                  src={project.image}
                  alt={project.cardAlt}
                  width={800}
                  height={640}
                  loading="lazy"
                />
                <span className="project-tag">CONCEPT / {project.number}</span>
                <span className="work-open" aria-hidden="true">
                  <ArrowIcon direction="up-right" />
                </span>
              </button>
              <div className="work-info">
                <div>
                  <h3>{project.cardTitle}</h3>
                  <p>{project.cardType}</p>
                </div>
                <span dir="ltr">{project.name.toUpperCase()}®</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <dialog
        ref={dialogRef}
        id="project-dialog"
        className="project-dialog"
        aria-labelledby="project-title"
        aria-describedby="project-description"
        onClose={() => setActiveProject(null)}
        onCancel={(event) => {
          event.preventDefault();
          closeProject();
        }}
        onClick={closeOnBackdrop}
      >
        <button
          ref={closeButtonRef}
          id="dialog-close"
          className="dialog-close"
          type="button"
          aria-label="Close project details"
          onClick={closeProject}
        >
          ×
        </button>
        {activeProject && (
          <>
            <img
              id="project-image"
              src={activeProject.image}
              alt={activeProject.alt}
              width={800}
              height={640}
            />
            <div className="dialog-copy">
              <span className="section-number">CONCEPT PROJECT</span>
              <h2 id="project-title">{activeProject.title}</h2>
              <p id="project-type" className="accent-text">
                {activeProject.type}
              </p>
              <p id="project-description">{activeProject.description}</p>
              <a
                className="button button-primary"
                href="#contact"
                onClick={() => {
                  restoreFocusRef.current = false;
                  closeProject();
                }}
              >
                What’s your idea?
                <span aria-hidden="true">
                  <ArrowIcon direction="up-right" />
                </span>
              </a>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
