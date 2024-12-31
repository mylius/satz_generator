import { describe, it, expect } from 'vitest';
import { canMakeWord } from '../app/utils/wordUtils';

describe('canMakeWord', () => {
  describe('basic functionality', () => {
    it('should return false for empty Anlaute set', () => {
      expect(canMakeWord('Mama', new Set())).toBe(false);
    });

    it('should handle simple words with basic Anlaute', () => {
      const anlaute = new Set(['M', 'A']);
      expect(canMakeWord('Mama', anlaute)).toBe(true);
      expect(canMakeWord('Mann', anlaute)).toBe(false);
    });
  });

  describe('special combinations', () => {
    it('should not allow "ei" words when only "e" and "i" are selected', () => {
      const anlaute = new Set(['E', 'I', 'N']);
      expect(canMakeWord('ein', anlaute)).toBe(false);
    });

    it('should handle "ei" correctly', () => {
      const anlauteWithEI = new Set(['EI', 'N']);
      const anlauteWithoutEI = new Set(['I', 'N']);
      expect(canMakeWord('ein', anlauteWithEI)).toBe(true);
      expect(canMakeWord('ein', anlauteWithoutEI)).toBe(false);
    });

    it('should handle "ie" correctly', () => {
      const anlauteWithoutIE = new Set(['I', 'E', 'L', 'B']);
      const anlauteWithIE = new Set(['IE', 'L', 'B', 'E']);
      
      expect(canMakeWord('Liebe', anlauteWithoutIE)).toBe(false);
      expect(canMakeWord('Liebe', anlauteWithIE)).toBe(true);
    });

    it('should handle "sch" correctly', () => {
      const anlauteWithoutSCH = new Set(['S', 'C', 'H', 'U', 'L', 'E']);
      const anlauteWithSCH = new Set(['SCH', 'U', 'L', 'E']);
      
      expect(canMakeWord('Schule', anlauteWithoutSCH)).toBe(false);
      expect(canMakeWord('Schule', anlauteWithSCH)).toBe(true);
    });
  });

  describe('case sensitivity', () => {
    it('should be case insensitive', () => {
      const anlaute = new Set(['M', 'A']);
      expect(canMakeWord('MAMA', anlaute)).toBe(true);
      expect(canMakeWord('mama', anlaute)).toBe(true);
      expect(canMakeWord('MaMa', anlaute)).toBe(true);
    });

    it('should handle special combinations case insensitively', () => {
      const anlaute = new Set(['Ei', 'N']);
      expect(canMakeWord('EIN', anlaute)).toBe(true);
      expect(canMakeWord('ein', anlaute)).toBe(true);
    });
  });

  describe('articles and spaces', () => {
    it('should handle articles and spaces correctly', () => {
      const anlaute = new Set(['D', 'IE', 'K', 'A', 'T', 'Z', 'E']);
      expect(canMakeWord('Die Katze', anlaute)).toBe(true);
    });

    it('should handle punctuation correctly', () => {
      const anlaute = new Set(['D', 'IE', 'K', 'A', 'T', 'Z', 'E']);
      expect(canMakeWord('Die Katze.', anlaute)).toBe(true);
    });
  });

  describe('multiple special combinations', () => {
    it('should handle words with multiple special combinations', () => {
      const anlaute = new Set(['SCH', 'EI', 'B', 'N','E']);
      expect(canMakeWord('scheiben', anlaute)).toBe(true);
    });

    it('should reject if any special combination is missing', () => {
      const anlaute = new Set(['SCH', 'B', 'N', 'E', 'I']);
      expect(canMakeWord('scheiben', anlaute)).toBe(false); // missing 'EI'
    });
  });
});
