export type SkillId =
  | 'excel'
  | 'analysis'
  | 'process'
  | 'coordination'
  | 'documentation'
  | 'research'
  | 'communication'
  | 'python'
  | 'sql'
  | 'programming'
  | 'automation'
  | 'design'
  | 'finance'
  | 'customer'
  | 'presentation'
  | 'planning';

export type CareerFamily =
  | 'Product & Operations'
  | 'Business & Analytics'
  | 'Customer & Growth'
  | 'Technology & Systems'
  | 'Strategy & Finance';

export interface Skill {
  id: SkillId;
  label: string;
  description: string;
}

export interface Profile {
  major: string;
  projectTitle: string;
  projectDescription: string;
  skills: SkillId[];
  interests: string[];
  isExample: boolean;
}

export interface Role {
  id: string;
  title: string;
  family: CareerFamily;
  description: string;
  dayToDay: string[];
  skills: SkillId[];
  transferExamples: Partial<Record<SkillId, string>>;
  sampleRequired: string[];
  samplePreferred: string[];
  checkBeforeApplying: string[];
  searchTerm: string;
}

export interface SavedOpportunity {
  roleId: string;
  savedAt: string;
  note: string;
  nextAction: string;
  dueDate: string;
  actionDone: boolean;
}

export interface AppState {
  profile: Profile;
  saved: SavedOpportunity[];
}
