/**
 * Optional UI add-on that localizes the main God's Eye View chrome to
 * Traditional Chinese without changing source data, provider names, or units.
 *
 * The add-on is deliberately DOM-scoped: dynamically rendered panels are
 * covered by the observer, while aircraft, place, and mission data remain in
 * their source language unless they match an explicit UI phrase.
 */

export const TRADITIONAL_CHINESE_LOCALE = 'zh-Hant-TW';

const TRANSLATIONS = Object.freeze({
  "GOD'S EYE": '上帝視角',
  VIEW: '觀測',
  'NO PLACE LEFT BEHIND': '不遺漏任何角落',
  'Initializing photorealistic world...': '正在初始化擬真地球…',
  'ACTIVE STYLE': '目前樣式',
  'VISUAL PRESETS': '視覺預設',
  'Visual Presets': '視覺預設',
  'MAP SOURCE': '地圖來源',
  Style: '樣式',
  Normal: '一般',
  NORMAL: '一般',
  Anime: '動漫',
  Noir: '黑白電影',
  Snow: '雪景',
  Celestial: '天體環',
  'Clean UI': '純淨介面',
  Bloom: '光暈',
  Sharpen: '銳化',
  Draw: '繪製',
  Shape: '形狀',
  Area: '區域',
  Line: '線段',
  Pin: '標記',
  Clear: '清除',
  Primary: '主要',
  Amber: '琥珀',
  Cyan: '青色',
  Green: '綠色',
  Red: '紅色',
  'Label (optional)': '標籤（選填）',
  'DATA LAYERS': '資料圖層',
  CCTV: '監視器',
  'CCTV OFF': '監視器關閉',
  'COVERAGE OFF': '覆蓋範圍關閉',
  'AUTO HOP OFF': '自動跳轉關閉',
  NEAREST: '最近目標',
  PREV: '上一個',
  NEXT: '下一個',
  FOCUS: '聚焦',
  'PROJECTION ON': '投影開啟',
  CALIBRATION: '校準',
  ADJUST: '調整',
  'SAVE CAL': '儲存校準',
  'RESET CAL': '重設校準',
  'SCENE SUMMARY': '場景摘要',
  'Enable CCTV to load camera intersections': '啟用監視器以載入攝影機交會點',
  'Enable CCTV to start camera-linked intelligence summaries.':
    '啟用監視器以開始攝影機關聯情報摘要。',
  SCENES: '場景',
  NEW: '新增',
  DEL: '刪除',
  'CAPTURE SHOT': '擷取鏡頭',
  'UPDATE SHOT': '更新鏡頭',
  START: '開始',
  STOP: '停止',
  'EXPORT PRESETS': '匯出預設',
  IMPORT: '匯入',
  'RUN LOG': '執行紀錄',
  'briefing page': '簡報頁面',
  Ready: '就緒',
  LOCATION: '位置',
  'RESET GLOBE': '重設地球',
  'EXIT CLEAN VIEW': '離開純淨介面',
  'POWER UP': '啟用功能',
  'GROUND STATION · PROVIDER SETTINGS': '地面站 · 供應商設定',
  'Power up the globe': '啟用地球功能',
  'SAVE KEYS': '儲存金鑰',
  'ESC to close': '按 ESC 關閉',
  "The globe already flies keyless. Every key below switches on another real feed — paste one and it's saved into this app's local configuration, then the server restarts itself. Server-side keys stay on this machine; Google Maps and Cesium ion run in the browser and must be provider-restricted. Keys you configured elsewhere are shown but never touched.":
    '地球本身即可免金鑰運作。下列每組金鑰都能啟用一項真實資料來源；貼上後會儲存至本機設定，接著伺服器會自動重啟。伺服器端金鑰只留在本機；Google Maps 與 Cesium ion 在瀏覽器中運作，必須在供應商端限制使用範圍。你在其他地方設定的金鑰只會顯示，不會被修改。',
  'The Google Maps key buys the photorealistic planet — everything else stacks on top.':
    'Google Maps 金鑰可啟用擬真地球，其餘功能都會疊加在上面。',
  'MISSION CONTROL · FIRST LAUNCH': '任務控制 · 首次啟動',
  'Choose your first view': '選擇第一個觀測視角',
  'It feels like a forbidden cockpit—then you realize the sources are public and the data is real.':
    '這看起來像不該被看見的駕駛艙——接著你會發現，來源是公開的，資料是真實的。',
  'LIVE CONTACTS': '即時目標',
  'Aircraft, vessels and nearby intelligence': '航空器、船舶與附近情報',
  'SPACE MISSIONS': '太空任務',
  'Launches, spacecraft and orbital context': '發射、太空載具與軌道情境',
  ENVIRONMENTAL: '環境監測',
  'Live earthquakes and active fires, from USGS and NASA':
    'USGS 與 NASA 的即時地震及活躍火災',
  'EXPLORE MANUALLY': '手動探索',
  'Begin with a clean globe': '從乾淨地球開始',
  "Don't show this again": '不再顯示',
  'ESC to dismiss': '按 ESC 關閉',
  'Tip: the GEV MIC button in the dock lets you talk to the map.':
    '提示：底部工具列的 GEV MIC 按鈕可讓你用語音操作地圖。',
  'FIRST PERSON': '第一人稱',
  AIRCRAFT: '航空器',
  'LIVE TRACK · COURSE ALIGNED': '即時追蹤 · 航向已對齊',
  'GROUND SPEED': '地速',
  'GROUND SPEED · KTS': '地速 · 節',
  ALTITUDE: '高度',
  'ALTITUDE · FT': '高度 · 英尺',
  'OPTICAL PLANE · 01': '光學平面 · 01',
  'VISOR LOCK · ACTIVE': '視野鎖定 · 啟用',
  LEVEL: '水平',
  CURRENT: '目前',
  'CONTACTS · 250 KM': '目標 · 250 公里',
  CONTACT: '目標',
  'CONTEXT ONLY': '僅供情境參考',
  'NEAREST OBSERVED / MAPPED': '最近觀測／地圖目標',
  'NO AVAILABLE EXAMPLE': '沒有可用範例',
  'AVAILABLE INPUTS ONLY · NOT AN ALL-CLEAR': '僅顯示可用輸入 · 不代表全面安全',
  'LIVE SIGNALS': '即時訊號',
  'OBSERVED / MAPPED PINGS': '觀測／地圖訊號',
  'ESTIMATED FLIGHT PLAN': '估計飛行計畫',
  'ROUTE DATA UNAVAILABLE': '路線資料不可用',
  'ACQUIRING REGIONAL NEWS': '正在取得區域新聞',
  'SOURCE-BACKED EVENTS · NO SYNTHETIC NEWS': '有來源支持的事件 · 無合成新聞',
  'SELECT CONTACTS TO LOAD OBSERVED / MAPPED PROXIMITY':
    '選擇目標以載入觀測／地圖鄰近資訊',
  'SELECT A MISSION TO INSPECT': '選擇任務以檢視',
  'LOADING LIVE DATA': '正在載入即時資料',
  'LOADING 30-DAY MISSION INDEX': '正在載入 30 日任務索引',
  'syncing road network': '正在同步道路網路',
  'loading frames': '正在載入影像',
  'Radio off': '無線電關閉',
  'RADIO READY': '無線電就緒',
  'DIRECTORY: RADIO BROWSER': '目錄：Radio Browser',
  RADIO: '無線電',
  'Radio section': '無線電區段',
  'Expand Radio section': '展開無線電區段',
  'Expand Radio section in Context': '展開情境中的無線電區段',
  'SEARCH NEARBY SITES': '搜尋附近站點',
  'NO STATION SELECTED': '未選擇電台',
  'SNAPS TO AVAILABLE STATIONS': '貼靠至可用電台',
  'DIRECTORY BAND': '目錄頻段',
  'ALL · DRAG THE NEEDLE': '全部 · 拖曳指針',
  'TAB PREVIEWS · ENTER / SPACE SELECTS': 'Tab 預覽 · Enter／空白鍵選取',
  'Weather data by Open-Meteo.com': '天氣資料由 Open-Meteo.com 提供',
  'Open-Meteo': 'Open-Meteo',
  OpenStreetMap: 'OpenStreetMap',
  OpenSky: 'OpenSky',
  AISStream: 'AISStream',
  'adsb.lol': 'adsb.lol',
  "GOD'S EYE VIEW": '上帝視角',
  MOVEMENT: '運動',
  Movement: '運動',
  Cameras: '攝影機',
  CAMERAS: '攝影機',
  Infrastructure: '基礎設施',
  infrastructure: '基礎設施',
  INFRASTRUCTURE: '基礎設施',
  Events: '事件',
  events: '事件',
  EVENTS: '事件',
  Utilities: '工具',
  utilities: '工具',
  UTILITIES: '工具',
  Satellites: '衛星',
  'Live Flights': '即時航班',
  'Military Flights': '軍事飛行',
  'Live Vessels': '即時船舶',
  'Street Traffic': '道路交通',
  Transit: '大眾運輸',
  'Bike Share': '共享單車',
  'Mapped ALPR Cameras': '地圖標記車牌攝影機',
  'Mapped Installations': '地圖標記設施',
  'Data Centers': '資料中心',
  'Submarine Cables': '海底電纜',
  Dams: '水壩',
  'Space Missions (30d)': '太空任務（30 天）',
  'Earthquakes (24h)': '地震（24 小時）',
  'Active Fires': '活躍火災',
  Directions: '路線',
  Radio: '無線電',
  'Other layers': '其他圖層',
  ON: '開啟',
  OFF: '關閉',
  LOADING: '載入中',
  DEGRADED: '降級',
  STALE: '過期',
  PARTIAL: '部分可用',
  FALLBACK: '備援',
  UNAVAILABLE: '無法使用',
  'just now': '剛剛',
  never: '從未',
  LIVE: '即時',
  DISPLAY: '顯示',
  HUD: '情報抬頭',
  Layout: '版面',
  Tactical: '戰術',
  Operator: '操作員',
  Minimal: '極簡',
  'Detection Overlay': '偵測覆蓋',
  'Detection Overlay (D)': '偵測覆蓋（D）',
  'Detection overlay': '偵測覆蓋',
  'Detection overlay: dense': '偵測覆蓋：高密度',
  'Intelligence HUD (H)': '情報抬頭（H）',
  'HUD layout': '情報抬頭版面',
  'Detection label density': '偵測標籤密度',
  'Detection label allocation': '偵測標籤配置',
  'Detection fade distance': '偵測淡出距離',
  'Detection opacity outside the keyhole': '觀測孔外部偵測不透明度',
  'World-overlay fade distance outside the keyhole as a percentage of its radius':
    '觀測孔外部世界覆蓋的淡出距離（佔半徑百分比）',
  'World-overlay label and card opacity beyond the fade distance':
    '淡出距離以外的世界覆蓋標籤與卡片不透明度',
  '3D model coverage': '3D 模型覆蓋範圍',
  'Scope — the circular viewport mask': '範圍——圓形視窗遮罩',
  'Scope edge feather': '範圍邊緣柔化',
  'Scope edge feather as a percentage of the keyhole radius':
    '範圍邊緣柔化（佔觀測孔半徑百分比）',
  'Draw on the world — click vertices, double-click or Enter to finish, Esc to cancel':
    '在地球上繪製——點擊頂點，雙擊或按 Enter 完成，按 Esc 取消',
  'Celestial ring — reveal the full globe': '天體環——顯示完整地球',
  'Hide UI chrome': '隱藏介面框架',
  'Bloom / Glow': '光暈／發光',
  Sharpening: '銳化',
  'Sharpen intensity': '銳化強度',
  'Clear selected data layers': '清除選取的資料圖層',
  'Turn off all selected data layers': '關閉所有選取的資料圖層',
  'Copy share link': '複製分享連結',
  'Return map to straight-down view': '返回垂直俯視',
  'Tilt map to oblique view': '將地圖傾斜為斜視',
  'Toggle straight-down and tilted map views': '切換垂直俯視與傾斜地圖視角',
  'Reset map to north up': '將地圖重設為北方朝上',
  'Reset map bearing to north': '將地圖方位重設為北方',
  'Reset to full globe view': '重設為完整地球視角',
  'Reset camera and return to full globe view': '重設鏡頭並返回完整地球視角',
  'View switcher': '視角切換',
  'Data attribution': '資料歸屬',
  'Upgrade for commercial use.': '升級至商業用途。',
  'Voice control — activate to toggle voice; hold Space to speak':
    '語音控制——啟用以切換語音；按住空白鍵說話',
  'Voice model: gpt-realtime-2 — click to switch to mini; applies next session':
    '語音模型：gpt-realtime-2——點擊切換至 mini；下一個工作階段生效',
  DETECT: '偵測',
  Density: '密度',
  Allocation: '配置',
  Elastic: '彈性',
  Weighted: '加權',
  Fade: '淡出',
  Outside: '外部',
  Models: '模型',
  Proximity: '鄰近',
  All: '全部',
  Scope: '範圍',
  Feather: '柔邊',
  PARAMETERS: '參數',
  '3D aircraft': '3D 航空器',
  'CelesTrak · just now': 'CelesTrak · 剛剛',
  'OpenSky Network · never': 'OpenSky Network · 從未',
  'adsb.lol · never': 'adsb.lol · 從未',
  'AISStream · never': 'AISStream · 從未',
  'OpenStreetMap · never': 'OpenStreetMap · 從未',
  'GTFS-RT · never': 'GTFS-RT · 從未',
  'GBFS · never': 'GBFS · 從未',
  'CCTV + Street View fallback · never': 'CCTV + Street View 備援 · 從未',
  'OpenStreetMap · community mapped · never': 'OpenStreetMap · 社群標記 · 從未',
  'OpenStreetMap + optional Google Maps Places · never':
    'OpenStreetMap + 選用 Google Maps Places · 從未',
  'Local · never': '本機 · 從未',
  'TeleGeography · never': 'TeleGeography · 從未',
  'USACE · never': 'USACE · 從未',
  'Launch Library 2 · never': 'Launch Library 2 · 從未',
  'USGS · never': 'USGS · 從未',
  'NASA FIRMS · LIVE · never': 'NASA FIRMS · 即時 · 從未',
  'OSM routing · never': 'OSM 路線服務 · 從未',
  'Radio Browser · never': 'Radio Browser · 從未',
  'OVERPASS TEMPORARILY UNAVAILABLE': 'Overpass 暫時無法使用',
  'SELECTED SPACE MISSION': '已選取的太空任務',
  'Selected Space Mission': '已選取的太空任務',
  'Deselect mission': '取消選取任務',
  'Show all missions': '顯示所有任務',
  PAYLOAD: '酬載',
  'STAGE / RE-ENTRY / RECOVERY': '級段／再入／回收',
  NAME: '名稱',
  TYPE: '類型',
  DESTINATION: '目的地',
  STAGE: '級段',
  STATUS: '狀態',
  'FINAL POSITION': '最終位置',
  'REPLAY SPEED': '重播速度',
  'Replay speed multiplier': '重播速度倍率',
  'Replay the estimated ascent with a following camera':
    '使用跟隨鏡頭重播估計升空路徑',
  FOCUS: '聚焦',
  PREV: '上一個',
  NEXT: '下一個',
  'Previous mission': '上一個任務',
  'Next mission': '下一個任務',
  'SHOW ALL / DESELECT': '顯示全部／取消選取',
  'REPLAY ASCENT': '重播升空',
  'Resume replay': '繼續重播',
  'Pause replay': '暫停重播',
  'Cancel replay': '取消重播',
  'Preparing launch site': '正在準備發射場',
  Liftoff: '升空',
  'Ascent replay': '升空重播',
  'Orbit replay': '軌道重播',
  'PAYLOAD DATA UNAVAILABLE': '酬載資料無法使用',
  'NO STAGE RE-ENTRY / RECOVERY DATA': '沒有級段／再入／回收資料',
  'ADDITIONAL PAYLOAD RECORDS': '筆其他酬載紀錄',
  'Launch Successful': '升空成功',
  'Return to Launch Site': '返回發射場',
  Recovered: '已回收',
  RECOVERED: '已回收',
  Expended: '已消耗',
  EXPENDED: '已消耗',
  CONFIRMED: '已確認',
  'POSITION UNAVAILABLE': '位置無法使用',
  'RECONSTRUCTED ESTIMATE': '重建估計',
  'CURRENT DISTANCE FROM EARTH': '目前距離地球',
  'SATELLITE SPEED': '衛星速度',
  'LAUNCH SITE': '發射場',
  'LAUNCH TIME': '升空時間',
  ORBIT: '軌道',
  'ASCENT PATH': '升空路徑',
  'FLIGHT / VESSEL': '航班／船舶',
  'Global Context navigation': '全域情境導覽',
  'observed or mapped nearby context': '附近觀測或地圖情境',
  'feed unavailable': '資料來源無法使用',
  'CURRENT VIEWPORT ONLY': '僅限目前視窗',
  'Mapped sites not loaded': '地圖標記站點尚未載入',
  'Open-source mapped/observed context. Missing broadcasts, unloaded map areas, or unmapped sites are not evidence of absence.':
    '開放來源的地圖／觀測情境。缺少廣播、尚未載入的地圖區域或未標記站點，均不代表不存在。',
  'Reclassify tracked contact as TR-3B': '將追蹤目標重新分類為 TR-3B',
  'Reclassify as TR-3B': '重新分類為 TR-3B',
  'Flying to': '正在飛往',
  'Restoring shared view...': '正在還原分享視角…',
  'Radio off': '無線電關閉',
  'Navigation, voice, and visual preset controls': '導覽、語音與視覺預設控制',
  'Context mode': '情境模式',
  'View switcher': '視角切換',
  'Map source': '地圖來源',
  'AI AGENT': 'AI 代理',
  STD: '標準',
  'ON/OFF': '開啟／關閉',
  'VOICE STANDBY': '語音待命',
  'Collapse panel': '收合面板',
  'Expand panel': '展開面板',
  'Pin visual presets': '釘選視覺預設',
  'Keep visual presets open': '保持視覺預設開啟',
  'Pin location tray': '釘選位置列',
  'Keep location tray open': '保持位置列開啟',
  'Search any location': '搜尋任意位置',
  'Search any location...': '搜尋任意位置…',
  'Search location by name or coordinates': '依名稱或座標搜尋位置',
  'Location: --': '位置：--',
  'Landmark: --': '地標：--',
  'Map source': '地圖來源',
  'Globe actions': '地球操作',
  'Visible map targets': '可見地圖目標',
  'CCTV feed frame': '監視器影像畫面',
  'CCTV camera': '監視器攝影機',
  'Shape to draw': '繪製形狀',
  'Label for the drawn shape': '繪製形狀的標籤',
  'Colour of the drawn shape': '繪製形狀的顏色',
  'Remove every mark from the board': '移除畫面上的所有標記',
  'Scene recipe': '場景配方',
  'Aircraft cockpit view': '航空器駕駛艙視角',
  'Cockpit vision style': '駕駛艙視覺樣式',
  'Current aircraft heading': '目前航空器方位',
  'Estimated destination direction': '估計目的地方向',
  'Estimated flight plan': '估計飛行計畫',
  'Nearby cohort counts': '附近群組數量',
  'Cockpit briefing carousel': '駕駛艙簡報輪播',
  'Enable cockpit weather effects': '啟用駕駛艙天氣效果',
  'Collapse Contact panel': '收合目標面板',
  'Collapse contact panel': '收合目標面板',
  'Contact Context actions': '目標情境操作',
  CONTEXT: '情境',
  CONTACTS: '目標',
  Contact: '目標',
  'Contact cockpit summary': '目標駕駛艙摘要',
  'SPACE MISSIONS': '太空任務',
  'Cycles the nearest contacts of whatever type you select — planes, vessels, installations. Satellites track independently.':
    '循環檢視所選類型的最近目標——航空器、船舶與設施。衛星獨立追蹤。',
  'SELECT CONTEXT': '選取情境',
  'CONTACTS — nearest planes · vessels · sites':
    '目標——最近的航空器、船舶與設施',
  'SPACE MISSIONS — launches & orbital assets': '太空任務——發射任務與軌道載具',
  COCKPIT: '駕駛艙',
  'SEARCH NEARBY SITES': '搜尋附近設施',
  'CONTACTS CONTEXT OFF': '目標情境關閉',
  'AVAILABLE MISSIONS': '可用任務',
  'Available Space Missions': '可用太空任務',
  'Internet radio companion': '網路無線電輔助',
  'Open compact Radio controls': '開啟精簡無線電控制',
  'Compact Radio controls': '精簡無線電控制',
  'Open detailed Radio controls': '開啟詳細無線電控制',
  'Close compact Radio controls': '關閉精簡無線電控制',
  'Filter stations by station tag': '依電台標籤篩選電台',
  'Previous filtered radio station': '上一個篩選電台',
  'Play selected radio station': '播放選取的電台',
  'Next filtered radio station': '下一個篩選電台',
  'Stop radio playback': '停止播放無線電',
  VOLUME: '音量',
  'Radio playback': '無線電播放',
  ENABLE: '啟用',
  'STATION TAG': '電台標籤',
  'NO STATION SELECTED': '未選擇電台',
  'Enable Radio, then choose a globe marker or use next.':
    '啟用無線電後，選擇地球標記或使用下一個。',
  'DRAG TO TUNE': '拖曳調頻',
  PLAY: '播放',
  'STATION SITE': '電台網站',
  'Audio connects directly to the broadcaster after you press play. Your IP is visible to that broadcaster.':
    '按下播放後，音訊會直接連線至廣播商；該廣播商可以看到你的 IP。',
  SUMMARY: '摘要',
  'TOP SECRET // SI-TK // NOFORN': '高度機密 // SI-TK // 禁止公開',
  REC: '錄製中',
  'NO SIGNAL': '無訊號',
  'BAND: PAN': '頻段：PAN',
  'BAND: MS': '頻段：MS',
  'BITS: 11': '位元：11',
  'LVL: 1A': '等級：1A',
  'NORMAL STREET': '一般街道',
  'NORMAL METRO': '一般都會區',
  'NORMAL GLOBAL': '一般全球',
  'Expand Visual Presets': '展開 視覺預設',
  'Expand LOCATION': '展開 位置',
  'Keep visual presets open': '保持視覺預設開啟',
  'Keep location tray open': '保持位置列開啟',
  'Show the globe without a visual filter.': '顯示未套用視覺濾鏡的地球。',
  'Emulate a green phosphor CRT with scanlines and screen curvature.':
    '模擬具有掃描線與螢幕曲面的綠色磷光 CRT。',
  'Simulate night-vision goggles with green intensification and a tube vignette.':
    '模擬綠色增強與管狀暈影的夜視鏡。',
  'Simulate FLIR-style thermal contrast. Turn up Ironbow for color.':
    '模擬 FLIR 風格的熱影像對比；提高 Ironbow 以顯示色彩。',
  'Apply bright cel-shaded color and illustrated outlines.':
    '套用明亮的卡通渲染色彩與插畫式輪廓。',
  'Apply high-contrast monochrome film-noir grading.':
    '套用高對比黑白電影調色。',
  'Add a cold, snowy whiteout treatment to the scene.':
    '為場景加入寒冷的暴雪白霧效果。',
  'Collapse panel': '收合面板',
  'Close key setup': '關閉金鑰設定',
  'HUD layout': '情報抬頭版面',
  'Detection overlay': '偵測覆蓋',
  'Bloom intensity': '光暈強度',
  'Sharpen intensity': '銳化強度',
  'Previous station': '上一個電台',
  'Next station': '下一個電台',
  Play: '播放',
  STOP: '停止',
  'Compact Radio volume': '精簡無線電音量',
  'Tune available internet radio stations': '調整可用網路電台',
  'No station available': '沒有可用電台',
  'Previous filtered station': '上一個篩選電台',
  'Play selected station': '播放選取的電台',
  'Next filtered station': '下一個篩選電台',
  'Internet radio companion': '網路無線電輔助',
  'RADIO READY': '無線電就緒',
  'OFF AIR': '停播',
  'STATION UNAVAILABLE': '電台無法使用',
  'Ready — playback starts only from your action':
    '就緒——播放只會在你操作後開始',
  'Connecting directly to broadcaster…': '正在直接連線至廣播商…',
  'Buffering broadcaster stream…': '正在緩衝廣播串流…',
  'Broadcaster stream unavailable': '廣播串流無法使用',
  CURRENT: '目前',
  'Previous cockpit vision style': '上一個駕駛艙視覺樣式',
  'Next cockpit vision style': '下一個駕駛艙視覺樣式',
  'Current cockpit vision style: NORMAL. Activate for next style.':
    '目前駕駛艙視覺樣式：一般。啟用以切換至下一種樣式。',
  'Current style: NORMAL — click for next':
    '目前樣式：一般——點擊切換至下一種樣式',
  'Contact navigation': '目標導覽',
  'Previous — prior visited contact in the 250 km window':
    '上一個——250 公里範圍內上一個造訪過的目標',
  'Next — nearest unvisited contact in the 250 km window':
    '下一個——250 公里範圍內最近的未造訪目標',
  'Collapse cockpit briefing panel': '收合駕駛艙簡報面板',
  'Cockpit briefing controls': '駕駛艙簡報控制',
  'Previous briefing page': '上一個簡報頁面',
  'Next briefing page': '下一個簡報頁面',
  'Show Live Signals': '顯示即時訊號',
  'Show Regional News': '顯示區域新聞',
  'Show Local Info': '顯示本地資訊',
  'Expand Cockpit display options': '展開駕駛艙顯示選項',
  'Cockpit display options': '駕駛艙顯示選項',
  'Expand Cockpit Radio controls': '展開駕駛艙無線電控制',
  'Cockpit Radio controls': '駕駛艙無線電控制',
  'Cockpit compact Radio controls': '駕駛艙精簡無線電控制',
  'Reset cockpit to full globe view': '將駕駛艙重設為完整地球視角',
  'Exit cockpit and return to full globe view': '離開駕駛艙並返回完整地球視角',
  'Exit cockpit view': '離開駕駛艙視角',
  'Exit cockpit view': '離開駕駛艙視角',
  'Enable cockpit weather effects': '啟用駕駛艙天氣效果',
  'Latest regional news': '最新區域新聞',
  'Location-based information': '依位置提供的資訊',
  'Cycle briefing pages automatically every 9 seconds (Signals → News → Local). Pauses while you hover or focus the panel. Live signal data refreshes continuously either way.':
    '每 9 秒自動輪播簡報頁面（訊號 → 新聞 → 本地）。游標停留或面板取得焦點時暫停；即時訊號資料仍會持續更新。',
  'OFF AIR': '停播',
  READY: '就緒',
  UNKNOWN: '未知',
  'RESOLVING REGION': '正在解析區域',
  'REGION UNAVAILABLE': '區域無法使用',
  'ACQUIRING REGIONAL NEWS': '正在取得區域新聞',
  'SOURCE · UNKNOWN': '來源 · 未知',
  'FRAME · LOADING': '畫面 · 載入中',
  'FRAME · UNAVAILABLE': '畫面 · 無法使用',
  'Enable CCTV to load camera intersections': '啟用監視器以載入攝影機交會點',
  'CCTV camera': '監視器攝影機',
  'ADJUST ON': '調整開啟',
  'Camera pose — click a value to type': '攝影機姿態——點擊數值以輸入',
  'Heading (compass °) — click to type': '方位（羅盤 °）——點擊以輸入',
  'Pitch (° up/down) — click to type': '俯仰（° 上／下）——點擊以輸入',
  'Horizontal FOV (°) — click to type': '水平視野角（°）——點擊以輸入',
  'Range / monitor-plane distance (m) — click to type':
    '範圍／監看平面距離（公尺）——點擊以輸入',
  'Mount height above ground (m) — click to type':
    '離地安裝高度（公尺）——點擊以輸入',
  'North offset from catalog position (m) — click to type':
    '相對目錄位置的北向偏移（公尺）——點擊以輸入',
  'East offset from catalog position (m) — click to type':
    '相對目錄位置的東向偏移（公尺）——點擊以輸入',
  'Delete scene': '刪除場景',
  'Delete shot': '刪除鏡頭',
  'Double-click to rename': '按兩下重新命名',
  'Shot name': '鏡頭名稱',
  'No shots yet. Use CAPTURE SHOT to save current look.':
    '目前尚無鏡頭；使用擷取鏡頭以儲存目前外觀。',
  LOAD: '載入',
  'Scene action failed': '場景操作失敗',
  'Current selection': '目前選取項目',
  'Ready to resume': '準備繼續',
  'Project exported': '專案已匯出',
});

const DYNAMIC_TRANSLATIONS = Object.freeze([
  [/^Expand\s+(.+)$/i, (_, value) => `展開 ${translateValue(value)}`],
  [/^Collapse\s+(.+)$/i, (_, value) => `收合 ${translateValue(value)}`],
  [/^Close\s+(.+)$/i, (_, value) => `關閉 ${translateValue(value)}`],
  [/^Show\s+(.+)$/i, (_, value) => `顯示 ${translateValue(value)}`],
  [/^Select\s+(.+)$/i, (_, value) => `選取 ${translateValue(value)}`],
  [/^Enable\s+(.+)$/i, (_, value) => `啟用 ${translateValue(value)}`],
  [/^Disable\s+(.+)$/i, (_, value) => `停用 ${translateValue(value)}`],
  [/^Previous\s+(.+)$/i, (_, value) => `上一個 ${translateValue(value)}`],
  [/^Next\s+(.+)$/i, (_, value) => `下一個 ${translateValue(value)}`],
  [
    /^Current style:\s*(.+)$/i,
    (_, value) => `目前樣式：${translateValue(value)}`,
  ],
  [
    /^(.+)\s+·\s+(\d+)([smhd])\s+ago$/i,
    (_, provider, amount, unit) => {
      const units = { s: '秒', m: '分鐘', h: '小時', d: '天' };
      return `${provider} · ${amount} ${units[unit.toLowerCase()] || unit}前`;
    },
  ],
  [/^Retrying in (\d+)s?$/i, (_, seconds) => `${seconds} 秒後重試`],
  [/^Flying to (.+)\.\.\.$/i, (_, destination) => `正在飛往 ${destination}…`],
  [
    /^(.+)\s+ENABLING$/i,
    (_, label) => {
      const cleanLabel = label.replace(/:\s*$/, '');
      return `${translateValue(cleanLabel)}：啟用中`;
    },
  ],
  [
    /^(.+):\s+(UNAVAILABLE|ENABLING)$/i,
    (_, label, status) =>
      `${translateValue(label)}：${status.toUpperCase() === 'ENABLING' ? '啟用中' : '無法使用'}`,
  ],
  [/^T minus (\d+)(?:, paused)?$/i, (_, seconds) => `倒數 T−${seconds}`],
  [/^T−(\d+)(?:, paused)?$/i, (_, seconds) => `倒數 T−${seconds}`],
  [/^(.+), paused$/i, (_, value) => `${translateValue(value)}，已暫停`],
  [/^Location:\s+(.+)$/i, (_, value) => `位置：${value}`],
  [/^Landmark:\s+(.+)$/i, (_, value) => `地標：${value}`],
  [/^Return to\s+(.+)$/i, (_, value) => `返回 ${value}`],
  [
    /^Current cockpit vision style:\s*(.+)$/i,
    (_, value) => `目前駕駛艙視覺樣式：${translateValue(value)}`,
  ],
  [
    /^Current style:\s*(.+?)\s+—\s+click for next$/i,
    (_, value) => `目前樣式：${translateValue(value)}——點擊切換至下一種樣式`,
  ],
  [
    /^Reset map to north up(?:\. Current heading (.+) degrees)?$/i,
    (_, heading) =>
      `將地圖重設為北方朝上${heading ? `。目前方位 ${heading} 度` : ''}`,
  ],
  [
    /^Show the globe without a visual filter\.$/i,
    () => '顯示未套用視覺濾鏡的地球。',
  ],
  [
    /^CCTV\s+(ON|OFF)$/i,
    (_, value) => `監視器 ${value.toUpperCase() === 'ON' ? '開啟' : '關閉'}`,
  ],
  [
    /^COVERAGE\s+(ON|OFF)$/i,
    (_, value) => `覆蓋範圍 ${value.toUpperCase() === 'ON' ? '開啟' : '關閉'}`,
  ],
  [
    /^AUTO HOP\s+(ON|OFF)$/i,
    (_, value) => `自動跳轉 ${value.toUpperCase() === 'ON' ? '開啟' : '關閉'}`,
  ],
  [
    /^(.+):\s*(ON|OFF)$/i,
    (_, label, value) =>
      `${translateValue(label)}：${value.toUpperCase() === 'ON' ? '開啟' : '關閉'}`,
  ],
  [
    /^(.*?)(Satellites|Live Flights|Military Flights|Live Vessels|Street Traffic|Transit|Bike Share|Cameras|Mapped ALPR Cameras|Mapped Installations|Data Centers|Submarine Cables|Dams|Space Missions \(30d\)|Earthquakes \(24h\)|Active Fires|Directions|Radio)\s+(—|\d[\d.,Kk]*)$/i,
    (_, prefix, label, count) => `${prefix}${translateValue(label)} ${count}`,
  ],
  [
    /^(.+)\s+·\s+LIVE\s+·\s+never$/i,
    (_, provider) => `${provider} · 即時 · 從未`,
  ],
  [
    /^(.+)\s+·\s+community mapped\s+·\s+never$/i,
    (_, provider) => `${provider} · 社群標記 · 從未`,
  ],
  [/^(.+)\s+·\s+just now$/i, (_, provider) => `${provider} · 剛剛`],
  [/^(.+)\s+·\s+never$/i, (_, provider) => `${provider} · 從未`],
  [/^BAND:\s*(.+)$/i, (_, value) => `頻段：${value}`],
  [/^BITS:\s*(.+)$/i, (_, value) => `位元：${value}`],
  [/^LVL:\s*(.+)$/i, (_, value) => `等級：${value}`],
  [/^ORB:\s*(.+)$/i, (_, value) => `軌道：${value}`],
  [/^PASS:\s*(.+)$/i, (_, value) => `通過：${value}`],
  [/^ALT:\s*(.+)$/i, (_, value) => `高度：${value}`],
  [/^SUN:\s*(.+)$/i, (_, value) => `太陽：${value}`],
  [/^AIS:\s*(.+)$/i, (_, value) => `AIS：${value}`],
  [/^COLL:\s*(.+)$/i, (_, value) => `收集：${value}`],
  [/^ONA:\s*(.+)$/i, (_, value) => `觀測角：${value}`],
  [/^GSD:\s*(.+)$/i, (_, value) => `GSD：${value}`],
  [
    /^POWER UP\s+·\s+(\d+)\s+KEYS WAITING$/i,
    (_, count) => `啟用功能 · ${count} 組金鑰待命`,
  ],
  [/^Loading\s+(.+)$/i, (_, value) => `正在載入 ${value}`],
  [/^NORMAL\s+(.+)$/i, (_, value) => `一般 ${value}`],
]);

const COMPOSITE_REPLACEMENTS = Object.freeze([
  [/\bMETRO NEAR\b/gi, '都會區鄰近'],
  [/\bSTREET NEAR\b/gi, '街道鄰近'],
  [/\bCITY NEAR\b/gi, '城市鄰近'],
  [/\bGLOBAL NEAR\b/gi, '全球鄰近'],
  [/\bGLOBAL SECTOR\b/gi, '全球區域'],
  [/\bNORTH AMERICA\b/gi, '北美洲'],
  [/\bSOUTH AMERICA\b/gi, '南美洲'],
  [/\bEUROPE\b/gi, '歐洲'],
  [/\bAFRICA\b/gi, '非洲'],
  [/\bASIA\b/gi, '亞洲'],
  [/\bOCEANIA\b/gi, '大洋洲'],
  [/\bANTARCTICA\b/gi, '南極洲'],
  [/\bSUMMARY\b/gi, '摘要'],
  [/\bSELECTED SPACE MISSION\b/gi, '已選取的太空任務'],
  [/\bLAUNCH SUCCESSFUL\b/gi, '升空成功'],
  [/\bSTATUS\b/gi, '狀態'],
  [/\bLAUNCH SITE\b/gi, '發射場'],
  [/\bLAUNCH TIME\b/gi, '升空時間'],
  [/\bASCENT PATH\b/gi, '升空路徑'],
  [/\bRECONSTRUCTED ESTIMATE\b/gi, '重建估計'],
  [/\bCURRENT DISTANCE FROM EARTH\b/gi, '目前距離地球'],
  [/\bSATELLITE SPEED\b/gi, '衛星速度'],
  [/\bPAYLOAD DATA UNAVAILABLE\b/gi, '酬載資料無法使用'],
  [/\bNO STAGE RE-ENTRY \/ RECOVERY DATA\b/gi, '沒有級段／再入／回收資料'],
  [/\bSTAGE \/ RE-ENTRY \/ RECOVERY\b/gi, '級段／再入／回收'],
  [/\bFINAL POSITION\b/gi, '最終位置'],
  [/\bDESTINATION\b/gi, '目的地'],
  [/\bRECOVERED\b/gi, '已回收'],
  [/\bEXPENDED\b/gi, '已消耗'],
  [/\bCONFIRMED\b/gi, '已確認'],
  [/\bPOSITION UNAVAILABLE\b/gi, '位置無法使用'],
  [/\bRETURN TO LAUNCH SITE\b/gi, '返回發射場'],
  [/\bRETURN TO\s+/gi, '返回 '],
  [/\bCURRENT VIEWPORT ONLY\b/gi, '僅限目前視窗'],
  [/\bMAPPED SITES NOT LOADED\b/gi, '地圖標記站點尚未載入'],
  [/\bOVERPASS TEMPORARILY UNAVAILABLE\b/gi, 'Overpass 暫時無法使用'],
  [/\bRETRYING IN\s+/gi, '將於 '],
  [/\bUNAVAILABLE\b/gi, '無法使用'],
  [/\bENABLING\b/gi, '啟用中'],
  [/\bNOT SET\b/gi, '未設定'],
  [/\bFEED UNAVAILABLE\b/gi, '資料來源無法使用'],
  [/\bOBSERVED OR MAPPED NEARBY CONTEXT\b/gi, '附近觀測或地圖情境'],
  [/\bAIS VESSELS\b/gi, 'AIS 船舶'],
  [/\bMAPPED INSTALLATIONS\b/gi, '地圖標記設施'],
  [/\bMILITARY FLIGHTS\b/gi, '軍事航班'],
  [/\bFLIGHTS\b/gi, '航班'],
  [/\bFLIGHT \/ VESSEL\b/gi, '航班／船舶'],
  [/\bOPEN-SOURCE MAPPED\/OBSERVED CONTEXT\./gi, '開放來源的地圖／觀測情境。'],
  [
    /\bMISSING BROADCASTS, UNLOADED MAP AREAS, OR UNMAPPED SITES ARE NOT EVIDENCE OF ABSENCE\./gi,
    '缺少廣播、尚未載入的地圖區域或未標記站點，均不代表不存在。',
  ],
  [/\bSTAGE RE-ENTRY \/ RECOVERY\b/gi, '級段再入／回收'],
  [/\bORBIT REPLAY\b/gi, '軌道重播'],
  [/\bASCENT REPLAY\b/gi, '升空重播'],
  [/\bORBIT\b/gi, '軌道'],
  [/\bREUSED\b/gi, '重複使用'],
  [/\bPREPARING LAUNCH SITE\b/gi, '正在準備發射場'],
  [/\bPAUSED\b/gi, '已暫停'],
  [/\bT−(\d+)\b/gi, (_, seconds) => `倒數 T−${seconds}`],
  [/\bCYCLE OFF\b/gi, '輪播關閉'],
  [/\bLIVE SIGNALS\b/gi, '即時訊號'],
  [/\bLATEST REGIONAL NEWS\b/gi, '最新區域新聞'],
  [/\bLOCAL INFO\b/gi, '本地資訊'],
  [/\bDISPLAY\b/gi, '顯示'],
  [/\bPARAMETERS\b/gi, '參數'],
  [/\bDENSITY\b/gi, '密度'],
  [/\bALLOCATION\b/gi, '配置'],
  [/\bFADE\b/gi, '淡出'],
  [/\bOUTSIDE\b/gi, '外部'],
  [/\bMODELS\b/gi, '模型'],
  [/\bPROXIMITY\b/gi, '鄰近'],
  [/\bFEATHER\b/gi, '柔邊'],
  [/\bSHAPE\b/gi, '形狀'],
  [/\bPRIMARY\b/gi, '主要'],
  [/\bAMBER\b/gi, '琥珀'],
  [/\bCYAN\b/gi, '青色'],
  [/\bGREEN\b/gi, '綠色'],
  [/\bRED\b/gi, '紅色'],
  [/\bNORMAL\b/gi, '一般'],
  [/\bREC\b/gi, '錄製中'],
  [/\bWINDOW\b/gi, '視窗'],
  [/\bALT\s+/gi, '高度 '],
  [/\bSUN\s+/gi, '太陽 '],
  [/\bONA\s+/gi, '觀測角 '],
  [/\bORB:\s*/gi, '軌道：'],
  [/\bPASS:\s*/gi, '通過：'],
  [/\bGSD:\s*/gi, 'GSD：'],
  [/\bNIIRS:\s*/gi, 'NIIRS：'],
  [/\bALT:\s*/gi, '高度：'],
  [/\bSUN:\s*/gi, '太陽：'],
  [/\bEL\b/gi, '仰角'],
  [/\bAIS:\s*/gi, 'AIS：'],
  [/\bCOLL:\s*/gi, '收集：'],
  [/\bONA:\s*/gi, '觀測角：'],
  [/\bBAND:\s*/gi, '頻段：'],
  [/\bBITS:\s*/gi, '位元：'],
  [/\bLVL:\s*/gi, '等級：'],
]);

function normalized(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();
}

function translateValue(value) {
  const source = normalized(value);
  if (!source) return value;
  if (Object.prototype.hasOwnProperty.call(TRANSLATIONS, source)) {
    return TRANSLATIONS[source];
  }
  for (const [pattern, replacement] of DYNAMIC_TRANSLATIONS) {
    const match = source.match(pattern);
    if (match)
      return applyCompositeReplacements(source.replace(pattern, replacement));
  }
  const composite = applyCompositeReplacements(source);
  if (composite !== source) return composite;
  return value;
}

function applyCompositeReplacements(value) {
  return COMPOSITE_REPLACEMENTS.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    value,
  );
}

function withWhitespace(original, translated) {
  if (translated === original) return original;
  const leading = String(original).match(/^\s*/)?.[0] ?? '';
  const trailing = String(original).match(/\s*$/)?.[0] ?? '';
  return `${leading}${translated}${trailing}`;
}

function isLanguageControl(element) {
  return Boolean(element?.closest?.('[data-gev-language-control]'));
}

function desiredText(original, locale) {
  return locale === 'zh'
    ? withWhitespace(original, translateValue(original))
    : original;
}

function rememberAttribute(state, element, attribute) {
  let originals = state.attributeOriginals.get(element);
  if (!originals) {
    originals = new Map();
    state.attributeOriginals.set(element, originals);
  }
  if (!originals.has(attribute))
    originals.set(attribute, element.getAttribute(attribute));
  return originals.get(attribute);
}

function translateElement(element, state) {
  if (!element || element.nodeType !== 1 || isLanguageControl(element)) return;
  for (const attribute of ['aria-label', 'title', 'placeholder', 'alt']) {
    if (!element.hasAttribute?.(attribute)) continue;
    const current = element.getAttribute(attribute);
    const original = rememberAttribute(state, element, attribute);
    const expected = desiredText(original, state.locale);
    if (!state.applying && current !== expected && current !== original) {
      state.attributeOriginals.get(element).set(attribute, current);
    }
    const source = state.attributeOriginals.get(element).get(attribute);
    const translated = desiredText(source, state.locale);
    if (element.getAttribute(attribute) !== translated)
      element.setAttribute(attribute, translated);
  }
}

function translateTree(root, doc, state) {
  if (!root) return;
  state.applying = true;
  translateElement(root, state);
  const walker = doc.createTreeWalker?.(root, 4);
  if (walker) {
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (
        (parent && /^(SCRIPT|STYLE|CODE|PRE)$/i.test(parent.tagName)) ||
        isLanguageControl(parent)
      )
        continue;
      if (!state.textOriginals.has(node))
        state.textOriginals.set(node, node.nodeValue);
      const original = state.textOriginals.get(node);
      const translated = desiredText(original, state.locale);
      if (node.nodeValue !== translated) node.nodeValue = translated;
    }
  }
  root
    .querySelectorAll?.('*')
    .forEach((element) => translateElement(element, state));
  state.applying = false;
}

function initialLocale(
  location = globalThis.location,
  storage = globalThis.localStorage,
) {
  const lang = new URLSearchParams(location?.search ?? '').get('lang');
  if (/^(en|英文)$/i.test(lang ?? '')) return 'en';
  if (/^(zh|zh-hant|zh-tw|繁中)$/i.test(lang ?? '')) return 'zh';
  try {
    return storage?.getItem('gev-language') === 'en' ? 'en' : 'zh';
  } catch {
    return 'zh';
  }
}

export function isTraditionalChineseEnabled(location = globalThis.location) {
  return initialLocale(location) === 'zh';
}

function updateLanguageControl(button, locale) {
  if (!button) return;
  const isChinese = locale === 'zh';
  button.textContent = isChinese
    ? '切換至英文介面'
    : 'Switch to Traditional Chinese';
  button.setAttribute(
    'aria-label',
    isChinese ? '切換至英文介面' : 'Switch to Traditional Chinese',
  );
  button.title = isChinese ? '切換至英文介面' : 'Switch to Traditional Chinese';
}

function installLanguageControl(doc, state, setLocale) {
  let button = doc.querySelector?.('[data-gev-language-toggle]');
  if (!button) {
    button = doc.createElement('button');
    button.type = 'button';
    button.className = 'gev-language-toggle';
    button.dataset.gevLanguageToggle = 'true';
    button.dataset.gevLanguageControl = 'true';
    button.addEventListener('click', () => {
      setLocale(state.locale === 'zh' ? 'en' : 'zh');
      // The application creates and rewrites a large amount of live map UI.
      // Rebuilding it from the English source after a toggle guarantees that
      // late-created labels cannot retain the previous locale.
      doc.defaultView?.location?.reload?.();
    });
    doc.body?.append(button);
  }
  updateLanguageControl(button, state.locale);
  return button;
}

/** Install the default Traditional Chinese UI add-on with a one-button language toggle. */
export function installTraditionalChinesePlugin({
  document: doc = globalThis.document,
  root = doc?.body,
  observe = true,
} = {}) {
  if (!doc || !root)
    return {
      locale: 'en',
      setLocale: () => {},
      toggle: () => {},
      translate: () => {},
      destroy: () => {},
    };

  const state = {
    locale: initialLocale(
      doc.defaultView?.location ?? globalThis.location,
      doc.defaultView?.localStorage ?? globalThis.localStorage,
    ),
    applying: false,
    textOriginals: new WeakMap(),
    attributeOriginals: new WeakMap(),
  };
  let button;

  const setLocale = (locale, { persist = true, updateUrl = true } = {}) => {
    state.locale = locale === 'en' ? 'en' : 'zh';
    state.applying = true;
    doc.documentElement?.setAttribute(
      'lang',
      state.locale === 'zh' ? TRADITIONAL_CHINESE_LOCALE : 'en',
    );
    if (doc.title === "God's Eye View" || doc.title === '上帝視角') {
      doc.title = state.locale === 'zh' ? '上帝視角' : "God's Eye View";
    }
    doc.body?.classList.toggle('gev-zh-hant', state.locale === 'zh');
    state.applying = false;
    translateTree(root, doc, state);
    updateLanguageControl(button, state.locale);
    if (persist) {
      try {
        doc.defaultView?.localStorage?.setItem('gev-language', state.locale);
      } catch {}
    }
    if (
      updateUrl &&
      doc.defaultView?.history &&
      doc.defaultView?.location?.href
    ) {
      const url = new URL(doc.defaultView.location.href);
      if (state.locale === 'en') url.searchParams.set('lang', 'en');
      else url.searchParams.delete('lang');
      doc.defaultView.history.replaceState(null, '', url.toString());
    }
  };

  button = installLanguageControl(doc, state, setLocale);
  setLocale(state.locale, { persist: false, updateUrl: false });

  const observer =
    observe &&
    (doc.defaultView?.MutationObserver ?? globalThis.MutationObserver)
      ? new (doc.defaultView?.MutationObserver ?? globalThis.MutationObserver)(
          (records) => {
            if (state.applying) return;
            for (const record of records) {
              if (record.type === 'attributes')
                translateElement(record.target, state);
              if (
                record.type === 'characterData' &&
                record.target.parentElement &&
                !isLanguageControl(record.target.parentElement)
              ) {
                const node = record.target;
                const current = node.nodeValue;
                const original = state.textOriginals.get(node);
                if (
                  original !== undefined &&
                  current !== desiredText(original, state.locale)
                )
                  state.textOriginals.set(node, current);
                translateTree(node.parentElement, doc, state);
              }
              for (const node of record.addedNodes ?? []) {
                if (node.nodeType === 1) translateTree(node, doc, state);
                else if (
                  node.nodeType === 3 &&
                  !isLanguageControl(node.parentElement)
                ) {
                  state.textOriginals.set(node, node.nodeValue);
                  state.applying = true;
                  node.nodeValue = desiredText(node.nodeValue, state.locale);
                  state.applying = false;
                }
              }
            }
          },
        )
      : null;
  observer?.observe(root, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['aria-label', 'title', 'placeholder', 'alt'],
  });

  return {
    get locale() {
      return state.locale === 'zh' ? TRADITIONAL_CHINESE_LOCALE : 'en';
    },
    setLocale,
    toggle: () => setLocale(state.locale === 'zh' ? 'en' : 'zh'),
    translate: () => translateTree(root, doc, state),
    destroy: () => observer?.disconnect(),
  };
}

export { TRANSLATIONS, translateValue };
