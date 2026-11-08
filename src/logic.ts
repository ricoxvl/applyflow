import { ROLES, SKILL_BY_ID } from './catalog';
import type { AppState, CareerFamily, Profile, Role, SavedOpportunity, SkillId } from './types';

const STORAGE_KEY = 'applyflow_v02_mvp_state';

export function relevantSkills(role: Role, profile: Profile): SkillId[] {
  return role.skills.filter((skill) => profile.skills.includes(skill));
}

export function rankRoles(roles: Role[], profile: Profile, query: string, family: CareerFamily | 'All'): Role[] {
  const normalized = query.trim().toLowerCase();
  return roles
    .filter((role) => family === 'All' || role.family === family)
    .filter((role) => !normalized || `${role.title} ${role.family} ${role.description} ${role.skills.map(id => SKILL_BY_ID[id].label).join(' ')}`.toLowerCase().includes(normalized))
    .sort((a, b) => relevantSkills(b, profile).length - relevantSkills(a, profile).length || a.title.localeCompare(b.title));
}

export function makeSaved(roleId: string): SavedOpportunity {
  return { roleId, savedAt: new Date().toISOString(), note: '', nextAction: '', dueDate: '', actionDone: false };
}

export function getRole(roleId: string): Role | undefined {
  return ROLES.find((role) => role.id === roleId);
}

function isValidState(value: unknown): value is AppState {
  if (!value || typeof value !== 'object') return false;
  const state = value as Partial<AppState>;
  return Boolean(
    state.profile &&
    typeof state.profile.major === 'string' &&
    typeof state.profile.projectTitle === 'string' &&
    typeof state.profile.projectDescription === 'string' &&
    Array.isArray(state.profile.skills) &&
    Array.isArray(state.profile.interests) &&
    Array.isArray(state.saved),
  );
}

export function readStoredState(defaultProfile: Profile): AppState {
  const fallback = { profile: { ...defaultProfile, skills: [...defaultProfile.skills], interests: [...defaultProfile.interests] }, saved: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (!isValidState(parsed)) return fallback;
    const validSkills = parsed.profile.skills.filter((id): id is SkillId => typeof id === 'string' && id in SKILL_BY_ID);
    return {
      profile: {
        major: parsed.profile.major,
        projectTitle: parsed.profile.projectTitle,
        projectDescription: parsed.profile.projectDescription,
        skills: validSkills,
        interests: parsed.profile.interests.filter((interest): interest is string => typeof interest === 'string'),
        isExample: parsed.profile.isExample === true,
      },
      saved: parsed.saved
        .filter((entry): entry is SavedOpportunity => Boolean(entry && typeof entry.roleId === 'string' && ROLES.some(role => role.id === entry.roleId)))
        .map(entry => ({
          roleId: entry.roleId,
          savedAt: typeof entry.savedAt === 'string' ? entry.savedAt : new Date().toISOString(),
          note: typeof entry.note === 'string' ? entry.note : '',
          nextAction: typeof entry.nextAction === 'string' ? entry.nextAction : '',
          dueDate: typeof entry.dueDate === 'string' ? entry.dueDate : '',
          actionDone: entry.actionDone === true,
        })),
    };
  } catch {
    return fallback;
  }
}

export function writeStoredState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // App remains usable even when storage is disabled or full.
  }
}

export function exportFile(state: AppState): void {
  const payload = JSON.stringify({ exportedAt: new Date().toISOString(), app: 'ApplyFlow', state }, null, 2);
  const url = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'applyflow-your-data.json';
  anchor.click();
  URL.revokeObjectURL(url);
}

export const STORAGE_DESCRIPTION = 'Your profile and saved roles are stored on this device only. They do not sync across devices.';
