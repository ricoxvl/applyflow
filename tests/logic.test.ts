import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DEMO_PROFILE, ROLES } from '../src/catalog';
import { makeSaved, rankRoles, relevantSkills } from '../src/logic';

describe('transferable skill discovery', () => {
  it('finds evidence overlaps using only selected skills', () => {
    const role = ROLES.find(role => role.id === 'product-operations')!;
    assert.deepEqual(relevantSkills(role, { ...DEMO_PROFILE, skills: ['excel', 'process'] }), ['process', 'excel']);
  });

  it('sorts role families by shared skill areas, not eligibility predictions', () => {
    const results = rankRoles(ROLES, DEMO_PROFILE, '', 'All');
    assert.equal(results.length, ROLES.length);
    const overlaps = results.map(role => relevantSkills(role, DEMO_PROFILE).length);
    assert.deepEqual(overlaps, [...overlaps].sort((a, b) => b - a));
  });

  it('filters role titles and skill names', () => {
    assert.ok(rankRoles(ROLES, DEMO_PROFILE, 'customer', 'All').some(role => role.id === 'customer-insights'));
    assert.ok(rankRoles(ROLES, DEMO_PROFILE, 'Product Operations', 'Product & Operations').every(role => role.family === 'Product & Operations'));
  });

  it('creates a saved role without guessing a deadline', () => {
    const saved = makeSaved('product-operations');
    assert.equal(saved.roleId, 'product-operations');
    assert.equal(saved.dueDate, '');
    assert.equal(saved.nextAction, '');
    assert.equal(saved.actionDone, false);
  });
});
