import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Compass,
  Download,
  ExternalLink,
  Filter,
  GraduationCap,
  Lightbulb,
  LockKeyhole,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';
import { DEMO_PROFILE, FAMILIES, INTERESTS, ROLES, SKILLS, SKILL_BY_ID } from './catalog';
import { exportFile, getRole, makeSaved, rankRoles, readStoredState, relevantSkills, STORAGE_DESCRIPTION, writeStoredState } from './logic';
import type { AppState, CareerFamily, Profile, Role, SavedOpportunity, SkillId } from './types';

type View = 'skills' | 'discover' | 'fit' | 'saved';
const NAV_ITEMS = [
  { id: 'skills' as const, label: 'My experience', short: 'Skills', icon: GraduationCap },
  { id: 'discover' as const, label: 'Discover', short: 'Discover', icon: Compass },
  { id: 'saved' as const, label: 'Saved roles', short: 'Saved', icon: Bookmark },
];
const SAMPLE_WARNING = 'Sample career path, not an active job opening. Employer requirements vary; always verify the original listing.';

function Brand() {
  return (
    <div className="brand" aria-label="ApplyFlow">
      <span className="brand-mark">a</span>
      <span className="brand-name">applyflow<span className="brand-period">.</span></span>
    </div>
  );
}

function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'blue' | 'green' | 'amber' }) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

function SectionHead({ title, accessory }: { title: string; accessory?: ReactNode }) {
  return <div className="section-heading"><h2>{title}</h2>{accessory}</div>;
}

function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="empty-state">
      <div className="empty-icon"><Compass size={23} /></div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}

function SkillTag({ id }: { id: SkillId }) {
  return <span className="skill-tag"><Check size={13} strokeWidth={2.5} /> {SKILL_BY_ID[id].label}</span>;
}

function OpportunityCard({ role, shared, isSaved, onOpen, onSave }: {
  role: Role;
  shared: SkillId[];
  isSaved: boolean;
  onOpen: () => void;
  onSave: () => void;
}) {
  return (
    <article className="opportunity-card">
      <div className="opportunity-header">
        <div>
          <div className="card-eyebrow">{role.family}</div>
          <button className="role-title-button" onClick={onOpen}>{role.title}<ChevronRight aria-hidden="true" size={17} /></button>
        </div>
        <button className={`icon-button bookmark-button ${isSaved ? 'is-saved' : ''}`} aria-label={isSaved ? `Remove ${role.title} from saved` : `Save ${role.title}`} onClick={onSave} title={isSaved ? 'Remove saved role' : 'Save role'}>
          {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
        </button>
      </div>
      <p>{role.description}</p>
      <div className="card-evidence-label">{shared.length ? 'Skills you selected that relate' : 'Explore this career path'}</div>
      <div className="tag-row">
        {shared.length ? shared.slice(0, 3).map(id => <SkillTag id={id} key={id} />) : <Pill>New direction to explore</Pill>}
      </div>
      <div className="card-footer">
        <span><ShieldCheck size={14} /> Requirements are examples</span>
        <button className="text-link" onClick={onOpen}>See the reasoning <ArrowRight size={15} /></button>
      </div>
    </article>
  );
}

function ProfilePage({ profile, onUpdate, onContinue }: {
  profile: Profile;
  onUpdate: (next: Partial<Profile>) => void;
  onContinue: () => void;
}) {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const selectedSkills = SKILLS.filter(skill => profile.skills.includes(skill.id));
  const unselectedSkills = SKILLS.filter(skill => !profile.skills.includes(skill.id));
  function toggleSkill(id: SkillId) {
    onUpdate({ skills: profile.skills.includes(id) ? profile.skills.filter(value => value !== id) : [...profile.skills, id] });
  }
  function toggleInterest(value: string) {
    onUpdate({ interests: profile.interests.includes(value) ? profile.interests.filter(item => item !== value) : [...profile.interests, value] });
  }
  return (
    <div className="page-content profile-page">
      <div className="eyebrow"><GraduationCap size={15} /> START WITH YOUR EXPERIENCE</div>
      <div className="page-hero compact-hero">
        <h1>Your experience is more than your major.</h1>
        <p>Tell us what you've actually done. Explore career paths that use those skills—even if the titles are unfamiliar.</p>
      </div>
      {profile.isExample && (
        <div className="inline-note note-blue"><Lightbulb size={19} /><div><strong>You're viewing a sample student profile.</strong><span>Change anything below to make the role explanations yours. No account required.</span></div></div>
      )}
      <div className="profile-grid">
        <section className="surface-card form-card">
          <SectionHead title="Your background" />
          <label className="form-field">Major or field of study
            <input type="text" maxLength={90} value={profile.major} onChange={e => onUpdate({ major: e.target.value })} placeholder="e.g. Mechanical Engineering" />
          </label>
          <label className="form-field">Project, activity, or work example
            <input type="text" maxLength={100} value={profile.projectTitle} onChange={e => onUpdate({ projectTitle: e.target.value })} placeholder="e.g. Club survey analysis" />
          </label>
          <label className="form-field">What did you actually do?
            <textarea maxLength={800} value={profile.projectDescription} rows={4} onChange={e => onUpdate({ projectDescription: e.target.value })} placeholder="Describe the work, tools, and outcomes in your own words." />
          </label>
          <p className="form-helper">Be specific and accurate. We never rewrite your experience as something you didn't do.</p>
        </section>
        <section className="surface-card skill-card">
          <SectionHead title="Skills you've used" accessory={<span className="count-label">{profile.skills.length} selected</span>} />
          <p className="section-support">Only choose skills you can support with a class, project, job, or activity.</p>
          <div className="selectable-chips">
            {selectedSkills.map(skill => (
              <button className="choice-chip selected" key={skill.id} aria-pressed="true" onClick={() => toggleSkill(skill.id)}><Check size={14} />{skill.label}<X size={13} /></button>
            ))}
            {!selectedSkills.length && <p className="inline-muted">Choose at least one skill to personalize discovery.</p>}
          </div>
          <button className="small-link" onClick={() => setShowAllSkills(value => !value)}>{showAllSkills ? <X size={15} /> : <Plus size={15} />}{showAllSkills ? 'Hide available skills' : 'Add another skill'}</button>
          {showAllSkills && (
            <div className="skills-picker" aria-label="Available skills">
              {unselectedSkills.length ? unselectedSkills.map(skill => <button key={skill.id} className="choice-chip" aria-pressed="false" title={skill.description} onClick={() => toggleSkill(skill.id)}><Plus size={13} />{skill.label}</button>) : <span className="inline-muted">All available skills selected.</span>}
            </div>
          )}
          <div className="subsection-divider" />
          <SectionHead title="Work that interests you" />
          <p className="section-support">Optional. These interests help you think beyond familiar job titles.</p>
          <div className="selectable-chips">
            {INTERESTS.map(item => <button className={`choice-chip ${profile.interests.includes(item) ? 'selected' : ''}`} key={item} aria-pressed={profile.interests.includes(item)} onClick={() => toggleInterest(item)}>{profile.interests.includes(item) && <Check size={14} />}{item}</button>)}
          </div>
        </section>
      </div>
      <div className="profile-bottom">
        <div className="privacy-message"><LockKeyhole size={18} /><span>No resume upload. No sign-in. Your details stay in this browser.</span></div>
        <button className="button button-primary" onClick={onContinue}>Explore career paths <ArrowRight size={18} /></button>
      </div>
    </div>
  );
}

function DiscoverPage({ state, onOpen, onSave, onEdit }: {
  state: AppState;
  onOpen: (role: Role) => void;
  onSave: (roleId: string) => void;
  onEdit: () => void;
}) {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<CareerFamily | 'All'>('All');
  const results = useMemo(() => rankRoles(ROLES, state.profile, query, family), [state.profile, query, family]);
  return (
    <div className="page-content discover-page">
      <div className="eyebrow"><Compass size={15} /> EXPLORE CAREER PATHS</div>
      <div className="discover-hero">
        <div><h1>You have more options than you think.</h1><p>Discover internship roles that use skills you've already practiced—not just titles you'd normally search.</p></div>
        <button className="button button-outline edit-experience" onClick={onEdit}><GraduationCap size={17} /> Edit my experience</button>
      </div>
      <div className="context-banner"><div><span className="mini-eyebrow">BASED ON YOUR SKILLS</span><p>{state.profile.skills.length ? state.profile.skills.slice(0, 5).map(id => SKILL_BY_ID[id].label).join('  ·  ') : 'Add some skills to explore connections to new roles.'}</p></div><button className="text-link" onClick={onEdit}>Edit <ArrowRight size={15} /></button></div>
      <div className="explorer-controls">
        <label className="search-control"><Search size={19} /><span className="sr-only">Search role titles and descriptions</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search roles, skills, or career fields" /></label>
        <div className="select-filter"><Filter size={16} /><label className="sr-only" htmlFor="family-filter">Career family</label><select id="family-filter" value={family} onChange={e => setFamily(e.target.value as CareerFamily | 'All')}><option value="All">All career paths</option>{FAMILIES.map(value => <option key={value} value={value}>{value}</option>)}</select></div>
      </div>
      <div className="results-title"><SectionHead title="Paths to explore" accessory={<span className="count-label">{results.length} role examples</span>} /><p>Sorted by shared skill areas—not an eligibility or hiring prediction.</p></div>
      {results.length ? (
        <div className="opportunity-grid">{results.map(role => <OpportunityCard key={role.id} role={role} shared={relevantSkills(role, state.profile)} isSaved={state.saved.some(item => item.roleId === role.id)} onOpen={() => onOpen(role)} onSave={() => onSave(role.id)} />)}</div>
      ) : (
        <EmptyState title="No paths found" description="Try a different role keyword or career family." action={<button className="button button-secondary" onClick={() => { setQuery(''); setFamily('All'); }}>Clear filters</button>} />
      )}
      <div className="source-note"><CircleHelp size={18} /><p><strong>Prototype catalog:</strong> These are educational role archetypes, not current job postings. We don't claim any employer is hiring or that you're eligible. Always verify real listings independently.</p></div>
    </div>
  );
}

function FitPage({ role, profile, isSaved, onBack, onSave }: {
  role: Role;
  profile: Profile;
  isSaved: boolean;
  onBack: () => void;
  onSave: () => void;
}) {
  const matched = relevantSkills(role, profile);
  const openSearch = () => {
    const term = `${role.searchTerm} internship 2027`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(term)}`, '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="page-content fit-page">
      <button className="back-link" onClick={onBack}><ArrowLeft size={17} /> Back to discovery</button>
      <div className="fit-hero"><div className="eyebrow">UNDERSTAND THIS CAREER PATH</div><h1>{role.title}</h1><p>{role.family}</p><div className="tag-row"><Pill tone="blue">Explore beyond your major</Pill><Pill>Sample role · Not a listing</Pill></div></div>
      <div className="inline-note note-green"><ShieldCheck size={22} /><div><strong>Evidence, not a prediction.</strong><span>We explain where your selected skills connect. We cannot determine whether any employer would consider or hire you.</span></div></div>
      <div className="fit-layout">
        <div className="fit-main">
          <section className="surface-card details-section">
            <SectionHead title="What you'd typically work on" />
            <p className="section-support">These describe a general career path, not a particular company's internship.</p>
            <div className="typical-tasks">{role.dayToDay.map(item => <div className="task-line" key={item}><CheckCircle2 size={18} />{item}</div>)}</div>
          </section>
          <section className="surface-card details-section">
            <SectionHead title="Where your experience connects" />
            <p className="section-support">Based on skills you selected—not automatically verified from a resume.</p>
            {matched.length ? (
              <div className="evidence-list">{matched.map(id => <div className="evidence-row" key={id}><span className="evidence-from"><Check size={15} /> {SKILL_BY_ID[id].label}</span><p>{role.transferExamples[id] || 'This skill may relate to responsibilities in this career path.'}</p></div>)}</div>
            ) : (
              <div className="missing-evidence"><CircleHelp size={20} /><span>No shared skills selected yet. This doesn't mean you're unqualified—add skills you can demonstrate to see relevant connections.</span></div>
            )}
            {profile.projectTitle && <div className="your-project"><span className="mini-eyebrow">YOUR PROJECT CONTEXT</span><strong>{profile.projectTitle}</strong><p>{profile.projectDescription || 'Add details on the My Experience page to explain what you did.'}</p></div>}
          </section>
        </div>
        <aside className="fit-aside">
          <section className="surface-card requirements-card">
            <SectionHead title="Understand requirements" />
            <div className="eligibility-disclaimer"><CircleHelp size={18} /><span>Illustrative requirements below—not taken from a real employer posting.</span></div>
            <div className="requirement-category"><div className="requirement-label">EXAMPLE REQUIRED</div>{role.sampleRequired.map(item => <div className="requirement-row" key={item}><Check size={15} />{item}</div>)}</div>
            <div className="requirement-category"><div className="requirement-label">EXAMPLE PREFERRED</div>{role.samplePreferred.map(item => <div className="requirement-row" key={item}><Plus size={15} />{item}</div>)}</div>
            <div className="requirement-category"><div className="requirement-label">VERIFY ON AN ACTUAL POSTING</div>{role.checkBeforeApplying.map(item => <div className="requirement-row check-first" key={item}><CircleHelp size={15} />{item}</div>)}</div>
            <p className="requirements-footnote">A preferred major isn't necessarily required. A true hard requirement may still make a specific listing ineligible.</p>
          </section>
          <div className="fit-actions"><button className="button button-primary" onClick={onSave}>{isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}{isSaved ? 'Remove from saved' : 'Save this career path'}</button><button className="button button-outline" onClick={openSearch}>Search web for live roles <ExternalLink size={17} /></button><p>External search opens Google; results aren't checked by ApplyFlow.</p></div>
        </aside>
      </div>
      <p className="footnote-space">{SAMPLE_WARNING}</p>
    </div>
  );
}

function SavedCard({ entry, role, onOpen, onUpdate, onRemove }: {
  entry: SavedOpportunity;
  role: Role;
  onOpen: () => void;
  onUpdate: (change: Partial<SavedOpportunity>) => void;
  onRemove: () => void;
}) {
  return (
    <article className="saved-card surface-card">
      <div className="saved-card-top"><div><Pill tone="green"><Check size={13} /> Saved</Pill><div className="card-eyebrow">{role.family}</div><button className="role-title-button" onClick={onOpen}>{role.title}<ArrowRight size={17} /></button></div><button className="icon-button remove-button" aria-label={`Remove ${role.title}`} onClick={onRemove}><Trash2 size={19} /></button></div>
      <p className="saved-description">{role.description}</p>
      <div className="saved-editor"><label className="form-field">Your next action <span>(optional)</span><input value={entry.nextAction} maxLength={130} onChange={e => onUpdate({ nextAction: e.target.value, actionDone: false })} placeholder="e.g. Verify eligibility on employer site" /></label><label className="form-field">Reminder date <span>(you choose)</span><input type="date" value={entry.dueDate} onChange={e => onUpdate({ dueDate: e.target.value })} /></label></div>
      {entry.nextAction && <label className="action-complete"><input type="checkbox" checked={entry.actionDone} onChange={e => onUpdate({ actionDone: e.target.checked })} /> Mark next action complete</label>}
      <label className="form-field notes-field">Notes <span>(optional)</span><textarea rows={2} value={entry.note} maxLength={1000} onChange={e => onUpdate({ note: e.target.value })} placeholder="Questions, skills to demonstrate, or a link you found..." /></label>
      <div className="saved-footer"><span>Saved {new Date(entry.savedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span><button className="text-link" onClick={onOpen}>Review the role <ArrowRight size={16} /></button></div>
    </article>
  );
}

function SavedPage({ state, onDiscover, onOpen, onUpdate, onRemove, onExport }: {
  state: AppState;
  onDiscover: () => void;
  onOpen: (role: Role) => void;
  onUpdate: (roleId: string, change: Partial<SavedOpportunity>) => void;
  onRemove: (roleId: string) => void;
  onExport: () => void;
}) {
  const savedRoles = state.saved.map(entry => ({ entry, role: getRole(entry.roleId) })).filter((item): item is { entry: SavedOpportunity; role: Role } => Boolean(item.role));
  return (
    <div className="page-content saved-page">
      <div className="eyebrow"><Bookmark size={15} /> YOUR SHORTLIST</div>
      <div className="saved-hero"><div><h1>Good opportunities, kept in one place.</h1><p>Keep what interests you. Choose your own next step—without migrating your spreadsheet.</p></div><button className="button button-outline" onClick={onExport}><Download size={17} /> Export my data</button></div>
      {savedRoles.length ? <><div className="saved-section-title"><SectionHead title="Saved career paths" accessory={<span className="count-label">{savedRoles.length} saved</span>} /><p>Changes save automatically on this device.</p></div><div className="saved-grid">{savedRoles.map(({ entry, role }) => <SavedCard key={role.id} role={role} entry={entry} onOpen={() => onOpen(role)} onUpdate={change => onUpdate(role.id, change)} onRemove={() => onRemove(role.id)} />)}</div></> : <EmptyState title="Nothing saved yet" description="When a career path looks worth exploring, save it here and choose a next action." action={<button className="button button-primary" onClick={onDiscover}>Explore career paths <ArrowRight size={16} /></button>} />}
      <div className="source-note"><LockKeyhole size={18} /><p><strong>Your data stays yours.</strong> {STORAGE_DESCRIPTION} Use Export to make a backup. This isn't a synced account.</p></div>
    </div>
  );
}

export default function App() {
  const [state, setState] = useState<AppState>(() => readStoredState(DEMO_PROFILE));
  const [view, setView] = useState<View>('skills');
  const [activeRoleId, setActiveRoleId] = useState('product-operations');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeRole = getRole(activeRoleId) || ROLES[0];

  useEffect(() => { writeStoredState(state); }, [state]);
  useEffect(() => { document.title = `${view === 'fit' ? activeRole.title : view === 'skills' ? 'My experience' : view === 'discover' ? 'Discover' : 'Saved roles'} · ApplyFlow`; }, [view, activeRole.title]);

  function navigate(target: View) { setView(target); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: 'auto' }); }
  function openRole(role: Role) { setActiveRoleId(role.id); navigate('fit'); }
  function updateProfile(next: Partial<Profile>) { setState(current => ({ ...current, profile: { ...current.profile, ...next, isExample: false } })); }
  function toggleSaved(roleId: string) {
    setState(current => ({ ...current, saved: current.saved.some(item => item.roleId === roleId) ? current.saved.filter(item => item.roleId !== roleId) : [makeSaved(roleId), ...current.saved] }));
  }
  function updateSaved(roleId: string, change: Partial<SavedOpportunity>) {
    setState(current => ({ ...current, saved: current.saved.map(item => item.roleId === roleId ? { ...item, ...change } : item) }));
  }
  function removeSaved(roleId: string) { setState(current => ({ ...current, saved: current.saved.filter(item => item.roleId !== roleId) })); }
  const isSaved = state.saved.some(item => item.roleId === activeRole.id);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`} aria-label="Main navigation">
        <div className="sidebar-brand"><Brand /><button aria-label="Close menu" className="icon-button close-sidebar" onClick={() => setSidebarOpen(false)}><X size={21} /></button></div>
        <p className="sidebar-caption">YOUR WORKSPACE</p>
        <nav className="side-nav">{NAV_ITEMS.map(({ id, label, icon: Icon }) => <button key={id} className={`side-nav-link ${view === id || view === 'fit' && id === 'discover' ? 'active' : ''}`} aria-current={view === id ? 'page' : undefined} onClick={() => navigate(id)}><Icon size={19} /> {label}</button>)}</nav>
        <div className="sidebar-profile"><div className="sidebar-profile-label">YOUR PROFILE</div><strong>{state.profile.major || 'Add your major'}</strong><span>{state.profile.skills.length} skills · {state.profile.projectTitle ? '1 experience' : 'No project yet'}</span><div className="side-skill-list">{state.profile.skills.slice(0, 3).map(id => <span key={id}>{SKILL_BY_ID[id]?.label}</span>)}</div><button className="small-link" onClick={() => navigate('skills')}>Edit experience <ArrowRight size={14} /></button></div>
        <div className="sidebar-bottom"><span className="privacy-dot" /><span>Private by default<br /><small>Stored on this device</small></span></div>
      </aside>
      {sidebarOpen && <button className="mobile-overlay" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      <div className="app-main">
        <header className="topbar"><button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Menu size={23} /></button><div className="mobile-brand"><Brand /></div><div className="topbar-right"><span className="preview-label"><span className="preview-dot" /> MVP PREVIEW</span><span className="topbar-divider" /><span className="topbar-subtle">No account needed</span></div></header>
        <main id="main-content">
          {view === 'skills' && <ProfilePage profile={state.profile} onUpdate={updateProfile} onContinue={() => navigate('discover')} />}
          {view === 'discover' && <DiscoverPage state={state} onOpen={openRole} onSave={toggleSaved} onEdit={() => navigate('skills')} />}
          {view === 'fit' && <FitPage role={activeRole} profile={state.profile} isSaved={isSaved} onBack={() => navigate('discover')} onSave={() => toggleSaved(activeRole.id)} />}
          {view === 'saved' && <SavedPage state={state} onDiscover={() => navigate('discover')} onOpen={openRole} onUpdate={updateSaved} onRemove={removeSaved} onExport={() => exportFile(state)} />}
        </main>
        <footer className="app-footer"><span>ApplyFlow v0.2 · Skills-first exploration</span><span>Built to help you explore—not predict hiring decisions.</span></footer>
      </div>
      <nav className="bottom-nav" aria-label="Mobile navigation">{NAV_ITEMS.map(({ id, short, icon: Icon }) => <button key={id} className={`bottom-nav-item ${view === id || view === 'fit' && id === 'discover' ? 'active' : ''}`} aria-current={view === id ? 'page' : undefined} onClick={() => navigate(id)}><Icon size={22} /><span>{short}</span></button>)}</nav>
    </div>
  );
}
