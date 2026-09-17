import test from 'node:test';
import assert from 'node:assert/strict';

import {
  isTraditionalChineseEnabled,
  translateValue,
} from './traditionalChinese.js';

test('Traditional Chinese add-on translates primary navigation labels', () => {
  assert.equal(translateValue('VISUAL PRESETS'), '視覺預設');
  assert.equal(translateValue('LIVE CONTACTS'), '即時目標');
  assert.equal(translateValue('Power up the globe'), '啟用地球功能');
  assert.equal(translateValue('MOVEMENT'), '運動');
  assert.equal(translateValue('Satellites'), '衛星');
  assert.equal(translateValue('Satellites: OFF'), '衛星：關閉');
  assert.equal(translateValue('Expand DISPLAY'), '展開 顯示');
  assert.equal(translateValue('CONTEXT'), '情境');
  assert.equal(translateValue('SELECTED SPACE MISSION'), '已選取的太空任務');
  assert.equal(translateValue('REPLAY ASCENT'), '重播升空');
  assert.equal(translateValue('REPLAY SPEED'), '重播速度');
  assert.equal(translateValue('STAGE / RE-ENTRY / RECOVERY'), '級段／再入／回收');
});

test('Traditional Chinese add-on translates dynamic accessibility phrases', () => {
  assert.equal(translateValue('Expand Visual Presets'), '展開 視覺預設');
  assert.equal(translateValue('Next briefing page'), '下一個簡報頁面');
  assert.equal(translateValue('Current style: NORMAL'), '目前樣式：一般');
  assert.equal(translateValue('CCTV ON'), '監視器 開啟');
  assert.equal(translateValue('🛰️ Satellites —'), '🛰️ 衛星 —');
  assert.equal(translateValue('BAND: PAN'), '頻段：PAN');
  assert.equal(translateValue('CelesTrak · never'), 'CelesTrak · 從未');
  assert.equal(translateValue('OpenSky Network · 54s ago'), 'OpenSky Network · 54 秒前');
  assert.equal(translateValue('Space Missions (30d): ENABLING'), '太空任務（30 天）：啟用中');
  assert.equal(translateValue('Flying to Austin, TX...'), '正在飛往 Austin, TX…');
  assert.equal(translateValue('Expand Radio section in Context'), '展開情境中的無線電區段');
});

test('English remains available as an explicit opt-out', () => {
  assert.equal(isTraditionalChineseEnabled({ search: '?lang=en' }), false);
  assert.equal(isTraditionalChineseEnabled({ search: '?lang=zh-Hant' }), true);
  assert.equal(isTraditionalChineseEnabled({ search: '' }), true);
});
