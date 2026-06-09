const bpmValue = document.getElementById("bpmValue");
const statusText = document.getElementById("statusText");
const stage = document.getElementById("stage");
const pulseRing = document.getElementById("pulseRing");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const fullscreenButton = document.getElementById("fullscreenButton");
const orientationSelect = document.getElementById("orientationSelect");
const portraitFillSelect = document.getElementById("portraitFillSelect");
const tapButton = document.getElementById("tapButton");
const levelMeter = document.getElementById("levelMeter");
const levelReadout = document.getElementById("levelReadout");
const thresholdReadout = document.getElementById("thresholdReadout");
const sensitivitySlider = document.getElementById("sensitivitySlider");
const confidenceSlider = document.getElementById("confidenceSlider");
const noiseFloorSlider = document.getElementById("noiseFloorSlider");
const refractorySlider = document.getElementById("refractorySlider");
const tempoFeelSelect = document.getElementById("tempoFeelSelect");
const rangePresetSelect = document.getElementById("rangePresetSelect");
const targetBpmInput = document.getElementById("targetBpmInput");
const lockSpeedSelect = document.getElementById("lockSpeedSelect");
const onsetCounter = document.getElementById("peakCounter");
const rawOnsetCounter = document.getElementById("rawOnsetCounter");
const groupedBeatCounter = document.getElementById("groupedBeatCounter");
const ignoredDoubleHitCounter = document.getElementById("ignoredDoubleHitCounter");
const refractoryReadout = document.getElementById("refractoryReadout");
const streamStatus = document.getElementById("streamStatus");
const detectionModeReadout = document.getElementById("detectionModeReadout");
const screenLog = document.getElementById("screenLog");
const minBpmInput = document.getElementById("minBpmInput");
const maxBpmInput = document.getElementById("maxBpmInput");
const lockButton = document.getElementById("lockButton");
const calibrateButton = document.getElementById("calibrateButton");
const clapModeButton = document.getElementById("clapModeButton");
const rawBpmReadout = document.getElementById("rawBpmReadout");
const correctedBpmReadout = document.getElementById("correctedBpmReadout");
const bestCandidateReadout = document.getElementById("bestCandidateReadout");
const halfCandidateReadout = document.getElementById("halfCandidateReadout");
const doubleCandidateReadout = document.getElementById("doubleCandidateReadout");
const finalBpmReadout = document.getElementById("finalBpmReadout");
const selectedBpmReadout = document.getElementById("selectedBpmReadout");
const selectionReasonReadout = document.getElementById("selectionReasonReadout");
const targetErrorReadout = document.getElementById("targetErrorReadout");
const topCandidatesReadout = document.getElementById("topCandidatesReadout");
const multiBandBpmReadout = document.getElementById("multiBandBpmReadout");
const spectralBpmReadout = document.getElementById("spectralBpmReadout");
const targetAnchorBpmReadout = document.getElementById("targetAnchorBpmReadout");
const consensusReadout = document.getElementById("consensusReadout");
const fastEstimateReadout = document.getElementById("fastEstimateReadout");
const stableCandidateReadout = document.getElementById("stableCandidateReadout");
const displaySourceReadout = document.getElementById("displaySourceReadout");
const mixDensityReadout = document.getElementById("mixDensityReadout");
const kickConfidenceReadout = document.getElementById("kickConfidenceReadout");
const snareConfidenceReadout = document.getElementById("snareConfidenceReadout");
const rejectionReadout = document.getElementById("rejectionReadout");
const holdTimeReadout = document.getElementById("holdTimeReadout");
const firstEstimateReadout = document.getElementById("firstEstimateReadout");
const stableLockReadout = document.getElementById("stableLockReadout");
const switchReasonReadout = document.getElementById("switchReasonReadout");
const tempoStateReadout = document.getElementById("tempoStateReadout");
const confidenceReadout = document.getElementById("confidenceReadout");
const openSetlistButton = document.getElementById("openSetlistButton");
const closeSetlistButton = document.getElementById("closeSetlistButton");
const openSettingsButton = document.getElementById("openSettingsButton");
const closeSettingsButton = document.getElementById("closeSettingsButton");
const setlistView = document.getElementById("setlistView");
const settingsView = document.getElementById("settingsView");
const performanceTapZone = document.getElementById("performanceTapZone");
const previousSongButton = document.getElementById("previousSongButton");
const nextSongButton = document.getElementById("nextSongButton");
const songTitleReadout = document.getElementById("songTitleReadout");
const songArtistReadout = document.getElementById("songArtistReadout");
const songNotesReadout = document.getElementById("songNotesReadout");
const songPositionReadout = document.getElementById("songPositionReadout");
const targetBpmLine = document.getElementById("targetBpmLine");
const tempoDiffReadout = document.getElementById("tempoDiffReadout");
const micStateDot = document.getElementById("micStateDot");
const micStateText = document.getElementById("micStateText");
const songForm = document.getElementById("songForm");
const songTitleInput = document.getElementById("songTitleInput");
const songArtistInput = document.getElementById("songArtistInput");
const songBpmInput = document.getElementById("songBpmInput");
const songNotesInput = document.getElementById("songNotesInput");
const setlistItems = document.getElementById("setlistItems");
const importCsvButton = document.getElementById("importCsvButton");
const importCsvInput = document.getElementById("importCsvInput");
const importSummaryReadout = document.getElementById("importSummaryReadout");
const setlistHeading = document.getElementById("setlistHeading");
const setlistMetadataReadout = document.getElementById("setlistMetadataReadout");
const tempoToleranceInput = document.getElementById("tempoToleranceInput");
const debugModeSelect = document.getElementById("debugModeSelect");
const targetAnchoringSelect = document.getElementById("targetAnchoringSelect");
const debugPanel = document.getElementById("debugPanel");

const ORIENTATION_KEY = "bpm-prompter-orientation";
const PORTRAIT_FILL_KEY = "bpm-prompter-portrait-fill";
const SETLIST_KEY = "bpm-prompter-setlist";
const SETLIST_META_KEY = "bpm-prompter-setlist-meta";
const CURRENT_SONG_KEY = "bpm-prompter-current-song";
const DEBUG_MODE_KEY = "bpm-prompter-debug-mode";
const TEMPO_TOLERANCE_KEY = "bpm-prompter-tempo-tolerance";
const TARGET_ANCHORING_KEY = "bpm-prompter-target-anchoring";
const WINDOW_MS = 14000;
const FRAME_SIZE = 1024;
const DEFAULT_MIN_BPM = 60;
const DEFAULT_MAX_BPM = 180;
const SMOOTHING = 0.16;

let audioContext;
let mediaStream;
let sourceNode;
let processorNode;
let rafId;
let listening = false;
let useAudioWorklet = false;
let startTime = 0;
let framesProcessed = 0;
let smoothedBpm = null;
let expectedBpm = null;
let locked = false;
let clapMode = false;
let pulseTimer;
let flashTimer;
let tapTimes = [];
let calibrateTapTimes = [];

let avgLevel = 0;
let currentPeak = 0;
let previousRms = 0;
let previousPeak = 0;
let previousBandEnergies = [0, 0, 0];
let bandFluxHistory = [[], [], []];
let spectralFluxHistory = [];
let onsetStrength = 0;
let currentThreshold = 0;
let lastGroupedBeatTime = 0;
let beatCount = 0;
let rawOnsetCount = 0;
let ignoredDoubleHitCount = 0;
let beatHistory = [];
let kickBeatHistory = [];
let midBeatHistory = [];
let strengthHistory = [];
let levelHistory = [];
let kickStrengthHistory = [];
let midStrengthHistory = [];
let pendingCluster = null;
let screenLogTimer = 0;
let autoThresholdMultiplier = 1;
let mode = "no signal";
let fallbackActive = false;
let tempoState = "waiting";
let lastStableBpm = null;
let lastTempoConfidence = 0;
let candidateHistory = [];
let fastCandidate = null;
let fastConfidence = 0;
let firstEstimateTime = null;
let stableLockTime = null;
let predictedBeat = null;
let predictionHits = 0;
let predictionMisses = 0;
let lastKickBeatTime = 0;
let lastMidBeatTime = 0;
let kickConfidence = 0;
let currentStableCandidate = null;
let snareConfidence = 0;
let mixDensity = 0;
let rejectedHighNoiseCount = 0;
let onsetEventHistory = [];
let stableAnchorBpm = null;
let stableAnchorTime = null;
let holdStartTime = null;
let disagreementBeats = 0;
let lockReason = "--";
let setlist = [];
let setlistMeta = {};
let currentSongIndex = 0;
let lastStatusMessage = "Tap to start listening";
let pointerStartX = 0;
let pointerStartY = 0;
let swipePointerId = null;
let swipeStartedOnNav = false;
let performanceTapTimer = null;
let lastNavTime = 0;
let lastNavPointerTime = 0;

function setStatus(message) {
  lastStatusMessage = message;
  statusText.textContent = message;
  updatePerformanceDisplay();
  updateMicStateIndicator();
}

function screen(message) {
  const lines = screenLog.textContent === "Waiting to start..." ? [] : screenLog.textContent.split("\n");
  lines.push(message);
  screenLog.textContent = lines.slice(-9).join("\n");
}

function renderBpm(value) {
  bpmValue.textContent = value && !Number.isNaN(value) ? String(Math.round(value)) : "--";
  updatePerformanceDisplay();
}

function getMicState() {
  if (!listening) {
    return { key: "stopped", label: "Stopped" };
  }
  if (tempoState === "holding" || lastStatusMessage === "Holding BPM") {
    return { key: "holding", label: "Holding BPM" };
  }
  if (["acquiring", "estimating", "stabilizing", "reacquiring", "waiting"].includes(tempoState)) {
    return { key: "acquiring", label: "Acquiring BPM" };
  }
  return { key: "listening", label: "Listening" };
}

function updateMicStateIndicator() {
  if (!micStateDot || !micStateText) {
    return;
  }
  const state = getMicState();
  micStateDot.className = `mic-dot ${state.key}`;
  micStateText.textContent = state.label;
}

function toggleListeningFromPerformance() {
  if (listening) {
    stopListening();
  } else {
    startListening();
  }
}

function debugNav(message) {
  if (debugModeSelect.value === "on") {
    screen(message);
    console.log(message);
  }
}

function flashNavButton(button) {
  button.classList.add("pressed");
  window.setTimeout(() => button.classList.remove("pressed"), 120);
}

function navigateSong(direction, label, button) {
  const now = performance.now();
  if (now - lastNavTime < 250) {
    return;
  }

  const before = currentSongIndex;
  lastNavTime = now;
  flashNavButton(button);
  selectSong(currentSongIndex + direction);
  debugNav(`${label} button tapped: ${before} -> ${currentSongIndex}`);
}

function handleNavPointer(event, direction, label, button) {
  event.preventDefault();
  event.stopPropagation();
  lastNavPointerTime = performance.now();
  navigateSong(direction, label, button);
}

function handleNavClick(event, direction, label, button) {
  event.preventDefault();
  event.stopPropagation();
  if (performance.now() - lastNavPointerTime < 350) {
    return;
  }
  navigateSong(direction, label, button);
}

function getCurrentSong() {
  return setlist[currentSongIndex] || null;
}

function getSongTargetBpm() {
  const target = Number(getCurrentSong()?.targetBpm);
  return target >= 40 && target <= 240 ? target : null;
}

function getTargetAnchoringMode() {
  return targetAnchoringSelect.value || "strong";
}

function getTargetAnchorBpm() {
  if (getTargetAnchoringMode() === "off") {
    return null;
  }
  return getSongTargetBpm();
}

function isNearTarget(bpm, target = getTargetAnchorBpm(), range = 15) {
  return target && bpm ? Math.abs(bpm - target) <= range : false;
}

function targetAnchorStrength() {
  const mode = getTargetAnchoringMode();
  if (mode === "strong") {
    return { range: 15, boost: 0.5, outsidePenalty: 0.38, jumpConfidence: 88, jumpScoreRatio: 1.6 };
  }
  if (mode === "light") {
    return { range: 18, boost: 0.24, outsidePenalty: 0.72, jumpConfidence: 76, jumpScoreRatio: 1.3 };
  }
  return { range: 0, boost: 0, outsidePenalty: 1, jumpConfidence: 0, jumpScoreRatio: 1 };
}

function getTempoTolerance() {
  const value = Number(tempoToleranceInput.value);
  return Number.isFinite(value) ? Math.max(0.5, Math.min(12, value)) : 2;
}

function updatePerformanceDisplay() {
  if (!songTitleReadout) {
    return;
  }

  const song = getCurrentSong();
  songTitleReadout.textContent = song ? song.title : "Add songs in Setlist";
  songArtistReadout.textContent = song?.artist || "";
  songNotesReadout.textContent = song?.notes || "";
  songPositionReadout.textContent = setlist.length ? `${currentSongIndex + 1} of ${setlist.length}` : "0 of 0";
  targetBpmLine.textContent = song ? (song.targetBpm ? `TARGET ${song.targetBpm}` : "TARGET --") : "NO TARGET";

  stage.classList.remove("tempo-on", "tempo-near", "tempo-fast", "tempo-slow", "tempo-far");

  if (!song?.targetBpm || !smoothedBpm) {
    tempoDiffReadout.textContent = song ? (song.targetBpm ? "Listening" : "No target BPM") : "--";
    if (lastStatusMessage === "Holding BPM") {
      stage.classList.add("tempo-near");
    }
    return;
  }

  const diff = smoothedBpm - song.targetBpm;
  const absDiff = Math.abs(diff);
  const tolerance = getTempoTolerance();
  const direction = diff >= 0 ? "fast" : "slow";
  tempoDiffReadout.textContent = `${diff >= 0 ? "+" : ""}${diff.toFixed(1)} ${direction}`;

  if (lastStatusMessage === "Holding BPM") {
    statusText.textContent = "Holding BPM";
    stage.classList.add("tempo-near");
  } else if (absDiff <= tolerance) {
    statusText.textContent = "On Tempo";
    stage.classList.add("tempo-on");
  } else if (absDiff <= tolerance * 2) {
    statusText.textContent = diff < 0 ? "Too Slow" : "Too Fast";
    stage.classList.add(diff < 0 ? "tempo-slow" : "tempo-fast");
  } else {
    statusText.textContent = diff < 0 ? "Too Slow" : "Too Fast";
    stage.classList.add("tempo-far");
  }
}

function saveSetlist() {
  try {
    localStorage.setItem(SETLIST_KEY, JSON.stringify(setlist));
    localStorage.setItem(SETLIST_META_KEY, JSON.stringify(setlistMeta));
    localStorage.setItem(CURRENT_SONG_KEY, String(currentSongIndex));
  } catch (error) {
    setStatus("Could not save setlist");
  }
}

function loadSetlist() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETLIST_KEY) || "[]");
    setlist = Array.isArray(saved) ? saved.filter((song) => song && song.title) : [];
    setlistMeta = JSON.parse(localStorage.getItem(SETLIST_META_KEY) || "{}") || {};
    const savedIndex = Number(localStorage.getItem(CURRENT_SONG_KEY));
    currentSongIndex = Math.max(0, Math.min(setlist.length - 1, Number.isFinite(savedIndex) ? savedIndex : 0));
  } catch (error) {
    setlist = [];
    setlistMeta = {};
    currentSongIndex = 0;
  }
}

function renderSetlistMetadata() {
  const title = setlistMeta.setlist_title || "Song Targets";
  const details = [
    setlistMeta.band,
    setlistMeta.venue,
    setlistMeta.performance_date,
    setlistMeta.total_duration
  ].filter(Boolean);
  setlistHeading.textContent = title;
  setlistMetadataReadout.textContent = details.join(" - ");
}

function renderSetlist() {
  setlistItems.innerHTML = "";
  renderSetlistMetadata();
  if (!setlist.length) {
    const empty = document.createElement("div");
    empty.className = "setlist-empty";
    empty.textContent = "No songs yet. Add the first song target above.";
    setlistItems.appendChild(empty);
    updatePerformanceDisplay();
    return;
  }

  setlist.forEach((song, index) => {
    const item = document.createElement("div");
    item.className = `song-item${index === currentSongIndex ? " current" : ""}`;

    const details = document.createElement("div");
    const title = document.createElement("div");
    title.className = "song-item-title";
    title.textContent = song.title;
    const meta = document.createElement("div");
    meta.className = "song-item-meta";
    meta.textContent = `${song.artist ? `${song.artist} - ` : ""}${song.targetBpm ? `${song.targetBpm} BPM` : "BPM blank"}${song.notes ? ` - ${song.notes}` : ""}`;
    details.append(title, meta);

    const bpmEdit = document.createElement("input");
    bpmEdit.type = "number";
    bpmEdit.min = "40";
    bpmEdit.max = "240";
    bpmEdit.placeholder = "BPM";
    bpmEdit.value = song.targetBpm || "";
    bpmEdit.setAttribute("aria-label", `Target BPM for ${song.title}`);
    bpmEdit.addEventListener("change", () => {
      const nextBpm = Math.round(Number(bpmEdit.value));
      setlist[index].targetBpm = nextBpm ? nextBpm : null;
      saveSetlist();
      renderSetlist();
    });

    const selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.textContent = "Play";
    selectButton.addEventListener("click", () => selectSong(index));

    const upButton = document.createElement("button");
    upButton.type = "button";
    upButton.textContent = "Up";
    upButton.disabled = index === 0;
    upButton.addEventListener("click", () => moveSong(index, -1));

    const downButton = document.createElement("button");
    downButton.type = "button";
    downButton.textContent = "Down";
    downButton.disabled = index === setlist.length - 1;
    downButton.addEventListener("click", () => moveSong(index, 1));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteSong(index));

    item.append(details, bpmEdit, selectButton, upButton, downButton, deleteButton);
    setlistItems.appendChild(item);
  });
  updatePerformanceDisplay();
}

function selectSong(index) {
  if (!setlist.length) {
    currentSongIndex = 0;
  } else {
    currentSongIndex = (index + setlist.length) % setlist.length;
  }
  saveSetlist();
  renderSetlist();
  updatePerformanceDisplay();
}

function moveSong(index, direction) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= setlist.length) {
    return;
  }

  const [song] = setlist.splice(index, 1);
  setlist.splice(nextIndex, 0, song);
  if (currentSongIndex === index) {
    currentSongIndex = nextIndex;
  } else if (currentSongIndex === nextIndex) {
    currentSongIndex = index;
  }
  saveSetlist();
  renderSetlist();
}

function deleteSong(index) {
  setlist.splice(index, 1);
  currentSongIndex = Math.max(0, Math.min(currentSongIndex, setlist.length - 1));
  saveSetlist();
  renderSetlist();
}

function addSong(event) {
  event.preventDefault();
  const title = songTitleInput.value.trim();
  const targetBpm = Math.round(Number(songBpmInput.value));
  if (!title) {
    return;
  }

  setlist.push({
    title,
    artist: songArtistInput.value.trim(),
    targetBpm: targetBpm || null,
    notes: songNotesInput.value.trim()
  });
  currentSongIndex = setlist.length - 1;
  songForm.reset();
  saveSetlist();
  renderSetlist();
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === "\"") {
      if (inQuotes && next === "\"") {
        field += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(field);
      if (row.some((value) => value.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  row.push(field);
  if (row.some((value) => value.trim() !== "")) {
    rows.push(row);
  }

  return rows;
}

function metadataValueFor(row) {
  return row.title || row.artist || row.bpm || row.position || row.set_number || "";
}

function importCsvText(text, fileName = "CSV") {
  const rows = parseCsv(text);
  if (rows.length < 2) {
    importSummaryReadout.textContent = "No rows found in CSV.";
    return;
  }

  const headers = rows[0].map((header) => header.replace(/^\uFEFF/, "").trim().toLowerCase());
  const records = rows.slice(1).map((values, index) => {
    const record = { _index: index };
    headers.forEach((header, headerIndex) => {
      record[header] = (values[headerIndex] || "").trim();
    });
    return record;
  });

  const nextMeta = {};
  for (const record of records) {
    const type = (record.type || "").toLowerCase();
    if (["band", "venue", "performance_date", "setlist_title", "total_duration"].includes(type)) {
      nextMeta[type] = metadataValueFor(record);
    }
  }

  const importedSongs = records
    .filter((record) => (record.type || "").toLowerCase() === "song")
    .sort((a, b) => {
      const aSet = Number(a.set_number) || 0;
      const bSet = Number(b.set_number) || 0;
      const aPosition = Number(a.position) || 0;
      const bPosition = Number(b.position) || 0;
      return aSet - bSet || aPosition - bPosition || a._index - b._index;
    })
    .map((record) => {
      const bpm = Math.round(Number(record.bpm));
      return {
        title: record.title || "Untitled Song",
        artist: record.artist || "",
        targetBpm: bpm || null,
        notes: "",
        setNumber: record.set_number || "",
        position: record.position || ""
      };
    });

  if (!importedSongs.length) {
    importSummaryReadout.textContent = "No song rows found in CSV.";
    return;
  }

  const missingBpm = importedSongs.filter((song) => !song.targetBpm).length;
  setlist = importedSongs;
  setlistMeta = {
    ...nextMeta,
    source_file: fileName
  };
  currentSongIndex = 0;
  saveSetlist();
  renderSetlist();
  updatePerformanceDisplay();
  importSummaryReadout.textContent = `Imported ${importedSongs.length} songs. ${missingBpm} missing BPM.`;
  setStatus(`Imported ${importedSongs.length} songs`);
}

function importCsvFile(file) {
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => importCsvText(String(reader.result || ""), file.name));
  reader.addEventListener("error", () => {
    importSummaryReadout.textContent = "Could not read CSV file.";
  });
  reader.readAsText(file);
}

function openPanel(panel) {
  setlistView.classList.toggle("hidden", panel !== "setlist");
  settingsView.classList.toggle("hidden", panel !== "settings");
}

function closePanels() {
  setlistView.classList.add("hidden");
  settingsView.classList.add("hidden");
}

function applyDebugMode() {
  const enabled = debugModeSelect.value === "on";
  debugPanel.classList.toggle("debug-hidden", !enabled);
  try {
    localStorage.setItem(DEBUG_MODE_KEY, debugModeSelect.value);
  } catch (error) {
    // Ignore storage failures; debug mode still changes for this session.
  }
}

function initUiState() {
  loadSetlist();
  try {
    debugModeSelect.value = localStorage.getItem(DEBUG_MODE_KEY) || "off";
    tempoToleranceInput.value = localStorage.getItem(TEMPO_TOLERANCE_KEY) || "2";
    targetAnchoringSelect.value = localStorage.getItem(TARGET_ANCHORING_KEY) || "strong";
  } catch (error) {
    debugModeSelect.value = "off";
    tempoToleranceInput.value = "2";
    targetAnchoringSelect.value = "strong";
  }
  applyDebugMode();
  renderSetlist();
}

function mean(values) {
  return values.length ? values.reduce((total, value) => total + value, 0) / values.length : 0;
}

function median(values) {
  if (!values.length) {
    return 0;
  }

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function getNoiseFloor() {
  return 0.001 + Number(noiseFloorSlider.value) * 0.00018;
}

function getMinConfidence() {
  const base = Number(confidenceSlider.value) || 25;
  if (tempoState === "stable" || tempoState === "holding") {
    return Math.max(45, base);
  }
  return Math.min(base, 20);
}

function getRefractoryMs() {
  return Number(refractorySlider.value) || 250;
}

function setTempoState(nextState) {
  tempoState = nextState;
  const labels = {
    acquiring: "Acquiring BPM...",
    estimating: "Acquiring BPM...",
    stabilizing: "Stabilizing...",
    stable: "Stable BPM",
    holding: "Holding BPM",
    reacquiring: "Reacquiring BPM...",
    waiting: "Waiting for rhythm..."
  };
  tempoStateReadout.textContent = labels[tempoState] || labels.waiting;
  updateMicStateIndicator();
}

function getAnalysisWindowMs() {
  if (tempoState === "stable" || tempoState === "holding") {
    return WINDOW_MS;
  }
  return 5000;
}

function getLockProfile() {
  const speed = lockSpeedSelect.value;
  if (speed === "fast") {
    return {
      earlyConfidence: 24,
      stableConfidence: 58,
      stableBeats: 7,
      stableSeconds: 2.2,
      fastWindowMs: 4500
    };
  }
  if (speed === "accurate") {
    return {
      earlyConfidence: 38,
      stableConfidence: 72,
      stableBeats: 10,
      stableSeconds: 4.2,
      fastWindowMs: 6500
    };
  }
  return {
    earlyConfidence: 30,
    stableConfidence: 65,
    stableBeats: 8,
    stableSeconds: 3,
    fastWindowMs: 5500
  };
}

function getBpmRange() {
  let min = Number(minBpmInput.value) || DEFAULT_MIN_BPM;
  let max = Number(maxBpmInput.value) || DEFAULT_MAX_BPM;
  min = Math.max(40, Math.min(220, min));
  max = Math.max(60, Math.min(240, max));
  return max <= min ? { min, max: min + 20 } : { min, max };
}

function correctIntoRange(bpm) {
  const target = getTargetAnchorBpm();
  const anchor = targetAnchorStrength();
  if (target && isNearTarget(bpm, target, anchor.range)) {
    return bpm;
  }

  const { min, max } = getBpmRange();
  let corrected = bpm;

  while (corrected < min) {
    corrected *= 2;
  }

  while (corrected > max) {
    corrected /= 2;
  }

  return corrected;
}

function setMode(nextMode) {
  mode = nextMode;
  detectionModeReadout.textContent = mode;
}

function setStreamStatus(active) {
  streamStatus.textContent = active ? "active" : "inactive";
}

function updateLevelDisplay() {
  levelMeter.style.width = `${Math.min(100, Math.round(avgLevel * 2200))}%`;
  levelReadout.textContent = avgLevel.toFixed(3);
  thresholdReadout.textContent = currentThreshold.toFixed(3);
  mixDensityReadout.textContent = `${Math.round(mixDensity * 100)}%`;
  kickConfidenceReadout.textContent = `${Math.round(kickConfidence * 100)}%`;
  snareConfidenceReadout.textContent = `${Math.round(snareConfidence * 100)}%`;
  rejectionReadout.textContent = String(rejectedHighNoiseCount);
  holdTimeReadout.textContent = holdStartTime ? `${((performance.now() - holdStartTime) / 1000).toFixed(1)}s` : "--";
}

function updateTempoReadouts(rawBpm, correctedBpm, confidence) {
  rawBpmReadout.textContent = rawBpm ? String(Math.round(rawBpm)) : "--";
  correctedBpmReadout.textContent = correctedBpm ? String(Math.round(correctedBpm)) : "--";
  finalBpmReadout.textContent = correctedBpm ? String(Math.round(correctedBpm)) : "--";
  confidenceReadout.textContent = `${Math.round(confidence)}%`;
  updateTargetErrorReadout(correctedBpm, confidence);
}

function updateCandidateReadouts(best, half, double, final) {
  bestCandidateReadout.textContent = best ? `${Math.round(best.bpm)} (${Math.round((best.combinedScore || best.score) * 100)})` : "--";
  halfCandidateReadout.textContent = half ? `${Math.round(half.bpm)} (${Math.round((half.combinedScore || half.score) * 100)})` : "--";
  doubleCandidateReadout.textContent = double ? `${Math.round(double.bpm)} (${Math.round((double.combinedScore || double.score) * 100)})` : "--";
  finalBpmReadout.textContent = final ? `${Math.round(final.bpm)} (${Math.round((final.combinedScore || final.score || 0) * 100)})` : "--";
  selectedBpmReadout.textContent = final ? String(Math.round(final.bpm)) : "--";
}

function candidateRelationship(candidate, selected) {
  if (!candidate || !selected) {
    return "direct";
  }
  if (Math.abs(candidate.bpm - selected.bpm / 2) <= 3) {
    return "half";
  }
  if (Math.abs(candidate.bpm - selected.bpm * 2) <= 3) {
    return "double";
  }
  if (Math.abs(candidate.bpm - selected.bpm) <= 2) {
    return "selected";
  }
  return "near";
}

function updateTargetErrorReadout(selectedBpm, confidence) {
  const target = getTargetBpm();
  if (!target || !selectedBpm) {
    targetErrorReadout.textContent = "--";
    return;
  }

  const diff = selectedBpm - target;
  const sign = diff >= 0 ? "+" : "";
  targetErrorReadout.textContent = `${Math.round(selectedBpm)} vs ${Math.round(target)} (${sign}${diff.toFixed(1)}, ${Math.round(confidence)}%)`;
}

function triggerPulse() {
  pulseRing.classList.remove("pulse");
  void pulseRing.offsetWidth;
  pulseRing.classList.add("pulse");

  tapButton.classList.add("active");
  window.clearTimeout(pulseTimer);
  pulseTimer = window.setTimeout(() => tapButton.classList.remove("active"), 110);
}

function triggerBeatFlash() {
  stage.classList.remove("peak-flash");
  void stage.offsetWidth;
  stage.classList.add("peak-flash");

  window.clearTimeout(flashTimer);
  flashTimer = window.setTimeout(() => stage.classList.remove("peak-flash"), 160);
}

function updateDisplayedBpm(correctedBpm, confidence, source) {
  if (locked) {
    setStatus("BPM locked");
    displaySourceReadout.textContent = "Manual Lock";
    return;
  }

  if (source !== "manual" && confidence < getMinConfidence()) {
    setStatus("Listening - low confidence");
    return;
  }

  if (source === "fast" && currentStableCandidate && currentStableCandidate.confidence >= 45) {
    const gap = Math.abs(correctedBpm - currentStableCandidate.bpm);
    if (gap > 8 || currentStableCandidate.matchesTopCluster) {
      displaySourceReadout.textContent = "Stable";
      screen(`fast estimate ignored: ${Math.round(correctedBpm)} BPM; stable candidate ${Math.round(currentStableCandidate.bpm)} BPM`);
      return;
    }
  }

  const stableCandidateIsReasonable = currentStableCandidate
    && (currentStableCandidate.confidence >= 55 || (currentStableCandidate.matchesTopCluster && currentStableCandidate.confidence >= 45));
  if (source !== "manual" && source !== "stable" && stableCandidateIsReasonable) {
    const gap = Math.abs(correctedBpm - currentStableCandidate.bpm);
    if (gap > 8 || currentStableCandidate.matchesTopCluster) {
      displaySourceReadout.textContent = "Stable";
      screen(`corrected estimate ignored: ${Math.round(correctedBpm)} BPM; stable candidate ${Math.round(currentStableCandidate.bpm)} BPM`);
      return;
    }
  }

  if (smoothedBpm === null || source === "manual" || source === "clap") {
    smoothedBpm = correctedBpm;
  } else if (source === "stable" && stableCandidateIsReasonable) {
    smoothedBpm = correctedBpm;
  } else {
    const delta = correctedBpm - smoothedBpm;
    const smoothing = tempoState === "stable" || tempoState === "holding" ? 0.07 : 0.62;
    const limit = tempoState === "stable" || tempoState === "holding" ? 5 : 24;
    smoothedBpm += Math.max(-limit, Math.min(limit, delta)) * smoothing;
  }

  renderBpm(smoothedBpm);
  displaySourceReadout.textContent = source === "manual" ? "Manual Lock" : source === "stable" ? "Stable" : source === "fast" ? "Fast" : "Corrected";
  setStatus(source === "manual" ? "Manual tempo calibrated" : tempoStateReadout.textContent);
  screen(`selected BPM: ${Math.round(correctedBpm)} (${Math.round(confidence)}%)`);
  console.log("calculated BPM", { correctedBpm, smoothedBpm, confidence, source });
}

function classifyTransient(bandFluxes, bands, strength) {
  const [lowFlux, midFlux, highFlux] = bandFluxes;
  const totalFlux = lowFlux + midFlux + highFlux || 0.0001;
  const lowRatio = lowFlux / totalFlux;
  const midRatio = midFlux / totalFlux;
  const highRatio = highFlux / totalFlux;
  const lowLevel = bands[0] / Math.max(0.0001, avgLevel);

  if (lowRatio > 0.42 && lowLevel > 0.16) {
    return { type: "kick", weight: 1.45, reason: "low pulse" };
  }
  if (midRatio > 0.34 && highRatio < 0.48) {
    return { type: "snare", weight: 1.15, reason: "mid pulse" };
  }
  if (highRatio > 0.55 && lowRatio < 0.22) {
    return { type: "hihat", weight: mixDensity > 0.55 ? 0.18 : 0.42, reason: "high transient" };
  }
  if (strength > currentThreshold * 2.6 && Math.max(lowRatio, midRatio, highRatio) < 0.46) {
    return { type: "noise", weight: 0.22, reason: "full-band spike" };
  }
  return { type: "snare", weight: 0.78, reason: "mixed mid pulse" };
}

function registerRejectedTransient(type, reason) {
  rejectedHighNoiseCount += 1;
  rejectionReadout.textContent = String(rejectedHighNoiseCount);
  screen(`rejected ${type}: ${reason}`);
}

function updateMixDensity(now, transientType = null) {
  if (transientType) {
    onsetEventHistory.push({ time: now, type: transientType });
  }
  onsetEventHistory = onsetEventHistory.filter((event) => now - event.time <= 3000);
  const highEvents = onsetEventHistory.filter((event) => event.type === "hihat" || event.type === "noise").length;
  const eventRate = onsetEventHistory.length / 3;
  const highRatio = onsetEventHistory.length ? highEvents / onsetEventHistory.length : 0;
  mixDensity = Math.max(mixDensity * 0.88, Math.min(1, eventRate / 8 + highRatio * 0.35));
}

function phaseAgreement(bpm, now, beatsToCheck = 8) {
  if (!stableAnchorTime || !bpm) {
    return { hits: 0, misses: 0, agreement: 0 };
  }

  const recent = beatHistory.filter((beat) => now - beat.time <= WINDOW_MS).slice(-beatsToCheck);
  const beatMs = 60000 / bpm;
  const tolerance = Math.min(130, beatMs * 0.2);
  let hits = 0;
  let misses = 0;

  for (const beat of recent) {
    const index = Math.round((beat.time - stableAnchorTime) / beatMs);
    const expected = stableAnchorTime + index * beatMs;
    if (Math.abs(beat.time - expected) <= tolerance) {
      hits += 1;
    } else if (beat.type === "kick" || beat.type === "snare") {
      misses += 1;
    }
  }

  return {
    hits,
    misses,
    agreement: hits / Math.max(1, hits + misses)
  };
}

function getClusterWindowMs() {
  return Math.max(200, Math.min(300, getRefractoryMs()));
}

function getMinimumBeatSpacingMs() {
  const { max } = getBpmRange();
  return 60000 / max;
}

function registerRawOnset(time, strength, nextMode, allowDebugSpacing = false, transient = { type: "snare", weight: 1, reason: "unclassified" }) {
  rawOnsetCount += 1;
  rawOnsetCounter.textContent = String(rawOnsetCount);

  const clusterWindow = getClusterWindowMs();
  if (!pendingCluster) {
    pendingCluster = {
      start: time,
      last: time,
      strongestTime: time,
      strongestStrength: strength,
      mode: nextMode,
      allowDebugSpacing,
      transient
    };
    return;
  }

  if (time - pendingCluster.start <= clusterWindow) {
    pendingCluster.last = time;
    pendingCluster.allowDebugSpacing = pendingCluster.allowDebugSpacing || allowDebugSpacing;
    if (strength > pendingCluster.strongestStrength) {
      pendingCluster.strongestTime = time;
      pendingCluster.strongestStrength = strength;
      pendingCluster.mode = nextMode;
      pendingCluster.transient = transient;
    }
    return;
  }

  finalizeBeatCluster(time);
  pendingCluster = {
    start: time,
    last: time,
    strongestTime: time,
    strongestStrength: strength,
    mode: nextMode,
    allowDebugSpacing,
    transient
  };
}

function finalizeBeatCluster(now) {
  if (!pendingCluster) {
    return;
  }

  if (now - pendingCluster.last < getClusterWindowMs()) {
    return;
  }

  const cluster = pendingCluster;
  pendingCluster = null;
  registerGroupedBeat(cluster.strongestTime, cluster.strongestStrength, cluster.mode, cluster.allowDebugSpacing, cluster.transient);
}

function ignoreDoubleHit(reason) {
  ignoredDoubleHitCount += 1;
  ignoredDoubleHitCounter.textContent = String(ignoredDoubleHitCount);
  screen(`ignored double hit: ${reason}`);
}

function registerGroupedBeat(time, strength, nextMode, allowDebugSpacing = false, transient = { type: "snare", weight: 1, reason: "unclassified" }) {
  const refractoryMs = getRefractoryMs();
  const minBeatSpacing = getMinimumBeatSpacingMs();

  if (time - lastGroupedBeatTime < refractoryMs) {
    ignoreDoubleHit(`${Math.round(time - lastGroupedBeatTime)}ms < refractory ${refractoryMs}ms`);
    return;
  }

  if (!allowDebugSpacing && time - lastGroupedBeatTime < minBeatSpacing) {
    ignoreDoubleHit(`${Math.round(time - lastGroupedBeatTime)}ms < max-BPM interval ${Math.round(minBeatSpacing)}ms`);
    return;
  }

  lastGroupedBeatTime = time;
  beatCount += 1;
  onsetCounter.textContent = String(beatCount);
  groupedBeatCounter.textContent = String(beatCount);
  beatHistory.push({
    time,
    strength: Math.max(0.01, strength) * (transient.weight || 1),
    type: transient.type || "snare"
  });
  beatHistory = beatHistory.filter((beat) => time - beat.time <= WINDOW_MS);
  setMode(nextMode);
  triggerPulse();
  triggerBeatFlash();
  screen(`grouped beat ${beatCount}: ${transient.type || nextMode}, strength ${strength.toFixed(3)}`);
  console.log("detected peak", {
    rawOnsetCount,
    groupedBeatCount: beatCount,
    ignoredDoubleHitCount,
    mode: nextMode,
    transientType: transient.type,
    strength,
    threshold: currentThreshold,
    refractoryMs
  });
  estimateTempo(time, nextMode);
}

function registerBandBeat(kind, time, strength) {
  const minSpacing = Math.max(180, getMinimumBeatSpacingMs() * 0.72);
  if (kind === "kick") {
    if (time - lastKickBeatTime < minSpacing) {
      return;
    }
    lastKickBeatTime = time;
    kickBeatHistory.push({ time, strength: Math.max(0.01, strength) });
    kickBeatHistory = kickBeatHistory.filter((beat) => time - beat.time <= WINDOW_MS);
  } else if (kind === "mid") {
    if (time - lastMidBeatTime < minSpacing) {
      return;
    }
    lastMidBeatTime = time;
    midBeatHistory.push({ time, strength: Math.max(0.01, strength) });
    midBeatHistory = midBeatHistory.filter((beat) => time - beat.time <= WINDOW_MS);
  }
}

function scoreTempoAgainstBeats(candidateBpm, now, beats) {
  if (beats.length < 3) {
    return null;
  }

  const beatMs = 60000 / candidateBpm;
  const toleranceMs = Math.min(125, beatMs * 0.22);
  const anchors = beats.slice(-Math.min(6, beats.length));
  const totalStrength = beats.reduce((total, beat) => total + beat.strength, 0) || 1;
  let bestScore = 0;
  let bestAligned = 0;

  for (const anchor of anchors) {
    let score = 0;
    let aligned = 0;

    for (const beat of beats) {
      const nearestIndex = Math.round((beat.time - anchor.time) / beatMs);
      const nearestTime = anchor.time + nearestIndex * beatMs;
      const error = Math.abs(beat.time - nearestTime);

      if (error <= toleranceMs) {
        const closeness = 1 - error / toleranceMs;
        const recency = 0.65 + 0.35 * (1 - Math.min(1, (now - beat.time) / getAnalysisWindowMs()));
        score += beat.strength * closeness * recency;
        aligned += 1;
      }
    }

    const normalized = score / totalStrength;
    if (normalized > bestScore) {
      bestScore = normalized;
      bestAligned = aligned;
    }
  }

  return { bpm: candidateBpm, score: bestScore, aligned: bestAligned, count: beats.length };
}

function scoreTempo(candidateBpm, now) {
  const windowMs = getAnalysisWindowMs();
  const fullBeats = beatHistory.filter((beat) => now - beat.time <= windowMs);
  const kickBeats = kickBeatHistory.filter((beat) => now - beat.time <= windowMs);
  const midBeats = midBeatHistory.filter((beat) => now - beat.time <= windowMs);
  const fullScore = scoreTempoAgainstBeats(candidateBpm, now, fullBeats);
  const kickScore = scoreTempoAgainstBeats(candidateBpm, now, kickBeats);
  const midScore = scoreTempoAgainstBeats(candidateBpm, now, midBeats);

  if (!fullScore && !kickScore && !midScore) {
    return null;
  }

  const kickAlignment = kickScore ? kickScore.aligned / kickScore.count : 0;
  const midAlignment = midScore ? midScore.aligned / midScore.count : 0;
  const kickReliability = kickScore && kickScore.count >= 4 ? Math.min(1, kickAlignment * 0.65 + kickScore.score * 0.35) : 0;
  const snareReliability = midScore && midScore.count >= 4 ? Math.min(1, midAlignment * 0.62 + midScore.score * 0.38) : 0;
  kickConfidence = Math.max(kickConfidence * 0.85, kickReliability);
  snareConfidence = Math.max(snareConfidence * 0.85, snareReliability);
  const denseMix = mixDensity > 0.48;
  const strongLowPulse = kickReliability > 0.58 || kickConfidence > 0.62;
  const kickWeight = denseMix || strongLowPulse ? 0.58 : 0.28;
  const midWeight = denseMix ? 0.28 : 0.18;
  const fullWeight = Math.max(0.12, 1 - kickWeight - midWeight);
  const phase = stableAnchorBpm ? phaseAgreement(candidateBpm, now, 10) : { agreement: 0 };
  const phaseBoost = stableAnchorBpm && Math.abs(candidateBpm - stableAnchorBpm) <= Math.max(3, stableAnchorBpm * 0.035)
    ? phase.agreement * (denseMix ? 0.18 : 0.1)
    : 0;
  const score = (fullScore?.score || 0) * fullWeight + (kickScore?.score || 0) * kickWeight + (midScore?.score || 0) * midWeight + phaseBoost;
  const aligned = Math.round((fullScore?.aligned || 0) * fullWeight + (kickScore?.aligned || 0) * kickWeight + (midScore?.aligned || 0) * midWeight);
  const count = Math.max(fullScore?.count || 0, kickScore?.count || 0, midScore?.count || 0);

  return {
    bpm: candidateBpm,
    score,
    aligned: Math.max(1, aligned),
    count: Math.max(1, count),
    fullScore: fullScore?.score || 0,
    kickScore: kickScore?.score || 0,
    midScore: midScore?.score || 0,
    kickReliability,
    snareReliability,
    phaseAgreement: phase.agreement
  };
}

function findClosestCandidate(scores, targetBpm) {
  return scores
    .filter((score) => Math.abs(score.bpm - targetBpm) <= 3)
    .sort((a, b) => Math.abs(a.bpm - targetBpm) - Math.abs(b.bpm - targetBpm))[0] || null;
}

function getTargetBpm() {
  const target = Number(targetBpmInput.value);
  return target >= 40 && target <= 220 ? target : null;
}

function addCandidate(candidates, bpm) {
  const target = getTargetAnchorBpm();
  if (target) {
    if (bpm < 40 || bpm > 240) {
      return;
    }
    candidates.add(Math.round(bpm * 2) / 2);
    return;
  }

  const { min, max } = getBpmRange();
  let corrected = bpm;
  while (corrected < DEFAULT_MIN_BPM) {
    corrected *= 2;
  }
  while (corrected > DEFAULT_MAX_BPM) {
    corrected /= 2;
  }
  if (corrected < min - 8 || corrected > max + 8) {
    return;
  }
  const rounded = Math.round(corrected * 2) / 2;
  candidates.add(rounded);
}

function addIntervalCandidatesFrom(candidates, beats) {
  for (let i = 0; i < beats.length; i += 1) {
    for (let j = i + 1; j < beats.length; j += 1) {
      const interval = beats[j].time - beats[i].time;
      if (interval < 180 || interval > 2400) {
        continue;
      }
      const raw = 60000 / interval;
      const variants = [
        raw,
        raw / 2,
        raw * 2,
        raw * 0.9,
        raw * 0.95,
        raw * 1.05,
        raw * 1.1,
        raw * 2 / 3,
        raw * 3 / 2,
        raw * 3 / 4,
        raw * 4 / 3
      ];
      variants.forEach((candidate) => addCandidate(candidates, candidate));
    }
  }
}

function generateCandidateBpms(now) {
  const candidates = new Set();
  const windowMs = getAnalysisWindowMs();
  const beats = beatHistory.filter((beat) => now - beat.time <= windowMs);
  const kickBeats = kickBeatHistory.filter((beat) => now - beat.time <= windowMs);
  const midBeats = midBeatHistory.filter((beat) => now - beat.time <= windowMs);
  const target = getTargetAnchorBpm();
  const anchor = targetAnchorStrength();
  const narrowCenter = expectedBpm && tempoState === "stable" ? expectedBpm : null;

  if (target) {
    for (let bpm = target - anchor.range; bpm <= target + anchor.range; bpm += 0.5) {
      addCandidate(candidates, bpm);
    }
    [target * 0.9, target * 0.95, target * 1.05, target * 1.1].forEach((candidate) => addCandidate(candidates, candidate));
  } else if (narrowCenter) {
    for (let bpm = narrowCenter - 18; bpm <= narrowCenter + 18; bpm += 0.5) {
      addCandidate(candidates, bpm);
    }
    [narrowCenter / 2, narrowCenter * 2].forEach((candidate) => addCandidate(candidates, candidate));
  } else {
    for (let bpm = DEFAULT_MIN_BPM; bpm <= DEFAULT_MAX_BPM; bpm += 1) {
      addCandidate(candidates, bpm);
    }
  }

  addIntervalCandidatesFrom(candidates, beats);
  addIntervalCandidatesFrom(candidates, kickBeats);
  addIntervalCandidatesFrom(candidates, midBeats);

  const debugTarget = getTargetBpm();
  if (debugTarget) {
    [debugTarget, debugTarget * 0.9, debugTarget * 0.95, debugTarget * 1.05, debugTarget * 1.1, debugTarget / 2, debugTarget * 2].forEach((candidate) => addCandidate(candidates, candidate));
  }

  return [...candidates].sort((a, b) => a - b);
}

function recordCandidateHistory(scoredCandidates, now) {
  for (const candidate of scoredCandidates.slice(0, 12)) {
    candidateHistory.push({
      bpm: candidate.bpm,
      score: candidate.score,
      confidence: candidate.confidence || 0,
      time: now
    });
  }
  candidateHistory = candidateHistory.filter((entry) => now - entry.time <= WINDOW_MS);
}

function historySupportFor(candidateBpm, now) {
  const matching = candidateHistory.filter((entry) => {
    return now - entry.time <= WINDOW_MS && Math.abs(entry.bpm - candidateBpm) <= 2;
  });
  if (!matching.length) {
    return { support: 0, seconds: 0 };
  }

  const support = matching.reduce((total, entry) => total + entry.score, 0) / Math.max(1, candidateHistory.length / 6);
  const firstTime = Math.min(...matching.map((entry) => entry.time));
  return {
    support: Math.min(1, support),
    seconds: (now - firstTime) / 1000
  };
}

function intervalHistogramCandidates(now) {
  const profile = getLockProfile();
  const target = getTargetAnchorBpm();
  const sources = [
    { beats: beatHistory.filter((beat) => now - beat.time <= profile.fastWindowMs), weight: mixDensity > 0.45 ? 0.55 : 1 },
    { beats: kickBeatHistory.filter((beat) => now - beat.time <= profile.fastWindowMs), weight: mixDensity > 0.45 || kickConfidence > 0.62 ? 2.15 : 1.2 },
    { beats: midBeatHistory.filter((beat) => now - beat.time <= profile.fastWindowMs), weight: mixDensity > 0.45 ? 1.15 : 0.9 }
  ];
  const bins = new Map();
  if (!sources.some((source) => source.beats.length >= 3)) {
    return [];
  }

  for (const source of sources) {
    const beats = source.beats;
    for (let i = 0; i < beats.length; i += 1) {
      for (let j = i + 1; j < beats.length; j += 1) {
        const interval = beats[j].time - beats[i].time;
        if (interval < 240 || interval > 2000) {
          continue;
        }
        const rawBpm = 60000 / interval;
        const variants = [rawBpm, rawBpm * 2, rawBpm / 2, rawBpm * 4 / 3, rawBpm * 3 / 4];
        for (const variant of variants) {
          const bpm = target ? variant : correctIntoRange(variant);
          if (bpm < 40 || bpm > 240) {
            continue;
          }
          const bucket = Math.round(bpm);
          const weight = (beats[i].strength + beats[j].strength) / 2 * (1 + (j - i === 1 ? 0.45 : 0)) * source.weight;
          bins.set(bucket, (bins.get(bucket) || 0) + weight);
        }
      }
    }
  }

  return [...bins.entries()]
    .map(([bpm, score]) => ({ bpm, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

function spectralAutocorrelationCandidates(now) {
  const target = getTargetAnchorBpm();
  const anchor = targetAnchorStrength();
  const windowMs = tempoState === "stable" || tempoState === "holding" ? 12000 : 6500;
  const recent = spectralFluxHistory.filter((entry) => now - entry.time <= windowMs);
  if (recent.length < 28) {
    return [];
  }

  const frameIntervals = [];
  for (let i = 1; i < recent.length; i += 1) {
    frameIntervals.push(recent[i].time - recent[i - 1].time);
  }
  const frameMs = median(frameIntervals) || 23;
  const baseline = median(recent.map((entry) => entry.value));
  const values = recent.map((entry) => Math.max(0, entry.value - baseline * 0.65));
  const energy = values.reduce((total, value) => total + value * value, 0);
  if (energy <= 0.000001) {
    return [];
  }

  const candidateBpms = [];
  if (target) {
    for (let bpm = target - anchor.range; bpm <= target + anchor.range; bpm += 0.5) {
      candidateBpms.push(bpm);
    }
    [target / 2, target * 2, target * 0.9, target * 0.95, target * 1.05, target * 1.1].forEach((bpm) => candidateBpms.push(bpm));
  } else {
    const { min, max } = getBpmRange();
    for (let bpm = min; bpm <= max; bpm += 1) {
      candidateBpms.push(bpm);
    }
  }

  const scores = new Map();
  for (const candidate of candidateBpms) {
    const bpm = target ? candidate : correctIntoRange(candidate);
    if (bpm < 40 || bpm > 240) {
      continue;
    }
    const lag = Math.round((60000 / bpm) / frameMs);
    if (lag < 4 || lag >= values.length - 4) {
      continue;
    }

    let correlation = 0;
    let overlapEnergy = 0;
    for (let i = lag; i < values.length; i += 1) {
      correlation += values[i] * values[i - lag];
      overlapEnergy += values[i] * values[i];
    }

    const normalized = overlapEnergy > 0 ? correlation / Math.sqrt(energy * overlapEnergy) : 0;
    const rounded = Math.round(bpm * 2) / 2;
    scores.set(rounded, Math.max(scores.get(rounded) || 0, normalized));
  }

  return [...scores.entries()]
    .map(([bpm, score]) => ({ bpm, score: Math.max(0, score), confidence: Math.round(Math.max(0, Math.min(1, score)) * 100) }))
    .filter((candidate) => candidate.score > 0.02)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

function findNearestCandidate(candidates, bpm, range = 3) {
  return candidates
    .filter((candidate) => Math.abs(candidate.bpm - bpm) <= range)
    .sort((a, b) => Math.abs(a.bpm - bpm) - Math.abs(b.bpm - bpm) || (b.combinedScore || b.score || 0) - (a.combinedScore || a.score || 0))[0] || null;
}

function findTargetAnchoredCandidate(enrichedScores, spectralCandidates, fastHistogram) {
  const target = getTargetAnchorBpm();
  if (!target) {
    return null;
  }

  const anchor = targetAnchorStrength();
  const pools = [
    ...enrichedScores.map((candidate) => ({ ...candidate, source: "multi-band", score: candidate.combinedScore || candidate.score || 0 })),
    ...spectralCandidates.map((candidate) => ({ ...candidate, source: "spectral", score: candidate.score || 0 })),
    ...fastHistogram.map((candidate) => ({ ...candidate, source: "interval", score: candidate.score || 0 }))
  ];

  const nearTarget = pools
    .filter((candidate) => Math.abs(candidate.bpm - target) <= anchor.range)
    .sort((a, b) => {
      const aDistance = Math.abs(a.bpm - target);
      const bDistance = Math.abs(b.bpm - target);
      const aWeighted = (a.score || 0) * (1 + anchor.boost * (1 - aDistance / Math.max(1, anchor.range)));
      const bWeighted = (b.score || 0) * (1 + anchor.boost * (1 - bDistance / Math.max(1, anchor.range)));
      return bWeighted - aWeighted;
    })[0];

  if (nearTarget) {
    return nearTarget;
  }

  return [target / 2, target * 2]
    .map((related) => findNearestCandidate(pools, related, Math.max(3, related * 0.035)))
    .filter(Boolean)
    .sort((a, b) => (b.score || 0) - (a.score || 0))[0] || null;
}

function buildTempoConsensus(enrichedScores, now, fastHistogram) {
  const spectralCandidates = spectralAutocorrelationCandidates(now);
  const target = getTargetAnchorBpm();
  const anchor = targetAnchorStrength();
  const multiBandCandidate = enrichedScores[0] || null;
  const kickCandidate = [...enrichedScores]
    .filter((candidate) => candidate.kickScore > 0 || candidate.kickReliability > 0)
    .sort((a, b) => ((b.kickScore || 0) + (b.kickReliability || 0)) - ((a.kickScore || 0) + (a.kickReliability || 0)))[0] || null;
  const spectralCandidate = spectralCandidates[0] || null;
  const intervalCandidate = fastHistogram[0] || null;
  const targetCandidate = findTargetAnchoredCandidate(enrichedScores, spectralCandidates, fastHistogram);
  const votes = [];

  function addVote(name, candidate, weight, confidence = null) {
    if (!candidate || !candidate.bpm) {
      return;
    }
    votes.push({
      name,
      bpm: candidate.bpm,
      weight,
      confidence: confidence ?? candidate.confidence ?? Math.round(Math.min(1, candidate.score || candidate.combinedScore || 0) * 100),
      score: candidate.combinedScore || candidate.score || 0
    });
  }

  addVote("multi-band", multiBandCandidate, mixDensity > 0.45 ? 0.28 : 0.34, multiBandCandidate?.confidence);
  addVote("kick/low", kickCandidate, kickConfidence > 0.62 || mixDensity > 0.45 ? 0.34 : 0.2, Math.round(Math.max(kickConfidence, kickCandidate?.kickReliability || 0) * 100));
  addVote("spectral", spectralCandidate, 0.3, spectralCandidate?.confidence);
  addVote("interval", intervalCandidate, 0.12, intervalCandidate ? Math.round(Math.min(1, intervalCandidate.score / Math.max(1, fastHistogram[0]?.score || 1)) * 100) : 0);
  if (target) {
    addVote("target", targetCandidate || { bpm: target, score: 0.18, confidence: 45 }, getTargetAnchoringMode() === "strong" ? 0.46 : 0.24, targetCandidate?.confidence || 52);
  }

  const consensusScores = enrichedScores.map((candidate) => {
    let voteScore = 0;
    let agreement = 0;
    const matchingVotes = [];
    for (const vote of votes) {
      const distance = Math.abs(candidate.bpm - vote.bpm);
      const tolerance = Math.max(2.5, candidate.bpm * 0.025);
      if (distance <= tolerance) {
        const closeness = 1 - distance / tolerance;
        voteScore += vote.weight * (0.35 + vote.confidence / 100 * 0.65) * closeness;
        agreement += 1;
        matchingVotes.push(vote.name);
      }
    }

    const targetDistance = target ? Math.abs(candidate.bpm - target) : null;
    const targetFactor = target
      ? targetDistance <= anchor.range
        ? 1 + anchor.boost * 0.75 * (1 - targetDistance / Math.max(1, anchor.range))
        : anchor.outsidePenalty
      : 1;
    const stability = candidate.historySupport || 0;
    const lowMid = Math.max(candidate.kickReliability || 0, candidate.snareReliability || 0);
    const phase = candidate.phaseAgreement || 0;
    const consensusScore = (candidate.combinedScore * 0.42 + voteScore * 0.38 + stability * 0.1 + lowMid * 0.06 + phase * 0.04) * targetFactor;
    const consensusConfidence = Math.min(100, Math.round(
      (candidate.confidence || 0) * 0.36
      + Math.min(1, voteScore) * 31
      + Math.min(1, agreement / 3) * 18
      + lowMid * 10
      + (target && targetDistance <= anchor.range ? 10 : 0)
    ));

    return {
      ...candidate,
      consensusScore,
      consensusConfidence,
      estimatorAgreement: agreement,
      matchingEstimators: matchingVotes
    };
  }).sort((a, b) => b.consensusScore - a.consensusScore);

  let selected = consensusScores[0] || enrichedScores[0];
  let reason = `consensus: ${selected.matchingEstimators?.join(", ") || "multi-band"}`;

  if (target) {
    const nearTarget = consensusScores.find((candidate) => Math.abs(candidate.bpm - target) <= anchor.range);
    if (nearTarget && selected && Math.abs(selected.bpm - target) > anchor.range) {
      const outsideOverwhelming = selected.consensusConfidence >= anchor.jumpConfidence
        && selected.consensusScore >= nearTarget.consensusScore * anchor.jumpScoreRatio
        && selected.estimatorAgreement >= nearTarget.estimatorAgreement + 2;
      if (!outsideOverwhelming) {
        selected = nearTarget;
        reason = `target consensus near ${Math.round(target)} BPM`;
      }
    } else if (nearTarget && selected === nearTarget) {
      reason = `target consensus near ${Math.round(target)} BPM`;
    }
  }

  multiBandBpmReadout.textContent = multiBandCandidate ? `${Math.round(multiBandCandidate.bpm)} (${Math.round(multiBandCandidate.confidence || 0)}%)` : "--";
  spectralBpmReadout.textContent = spectralCandidate ? `${Math.round(spectralCandidate.bpm)} (${Math.round(spectralCandidate.confidence || 0)}%)` : "--";
  targetAnchorBpmReadout.textContent = targetCandidate ? `${Math.round(targetCandidate.bpm)} (${Math.round(targetCandidate.confidence || 0)}%)` : target ? `${Math.round(target)} (anchor)` : "--";
  consensusReadout.textContent = selected ? `${Math.round(selected.bpm)} (${selected.consensusConfidence}%, ${selected.matchingEstimators?.join("+") || "grid"})` : "--";

  return {
    selected,
    scores: consensusScores,
    spectralCandidates,
    targetCandidate,
    multiBandCandidate,
    intervalCandidate,
    reason
  };
}

function predictionScore(candidateBpm, now) {
  const beats = beatHistory.filter((beat) => now - beat.time <= getLockProfile().fastWindowMs);
  if (beats.length < 3) {
    return { confidence: 0, hits: 0, misses: 0 };
  }

  const beatMs = 60000 / candidateBpm;
  const tolerance = Math.min(115, beatMs * 0.2);
  let hits = 0;
  let misses = 0;
  const anchor = beats[0].time;

  for (const beat of beats.slice(1)) {
    const index = Math.round((beat.time - anchor) / beatMs);
    const expected = anchor + index * beatMs;
    if (Math.abs(beat.time - expected) <= tolerance) {
      hits += 1;
    } else {
      misses += 1;
    }
  }

  return {
    confidence: Math.max(0, Math.min(1, hits / Math.max(1, hits + misses))),
    hits,
    misses
  };
}

function updateFastEstimate(now) {
  const profile = getLockProfile();
  const hist = intervalHistogramCandidates(now);
  if (!hist.length) {
    return null;
  }

  let best = hist[0];
  const anchorTarget = getTargetAnchorBpm();
  const target = anchorTarget || getTargetBpm();
  if (target) {
    const anchor = targetAnchorStrength();
    const nearTargetWindow = anchorTarget ? anchor.range : Math.max(3, target * 0.025);
    const requiredRatio = anchorTarget ? 0.55 : 0.75;
    const nearTarget = hist.find((candidate) => Math.abs(candidate.bpm - target) <= nearTargetWindow);
    if (nearTarget && nearTarget.score >= best.score * requiredRatio) {
      best = nearTarget;
    }
  }

  const prediction = predictionScore(best.bpm, now);
  predictionHits = prediction.hits;
  predictionMisses = prediction.misses;
  predictedBeat = beatHistory.length ? beatHistory[beatHistory.length - 1].time + 60000 / best.bpm : null;
  fastConfidence = Math.round(Math.min(95, (best.score / Math.max(1, hist[0].score)) * 38 + prediction.confidence * 46 + Math.min(1, beatHistory.length / 5) * 16));
  fastCandidate = best.bpm;
  fastEstimateReadout.textContent = `${Math.round(best.bpm)} (${fastConfidence}%)`;

  if (beatHistory.length >= 4 && fastConfidence >= profile.earlyConfidence) {
    let corrected = correctIntoRange(best.bpm);
    if (anchorTarget && !isNearTarget(corrected, anchorTarget, targetAnchorStrength().range)) {
      const nearTargetVariant = [best.bpm, best.bpm * 2, best.bpm / 2]
        .find((candidate) => isNearTarget(candidate, anchorTarget, targetAnchorStrength().range));
      if (nearTargetVariant) {
        corrected = nearTargetVariant;
      } else if (fastConfidence < targetAnchorStrength().jumpConfidence) {
        screen(`fast estimate withheld outside target: ${Math.round(corrected)} BPM`);
        return best;
      }
    }
    if (firstEstimateTime === null) {
      firstEstimateTime = (now - startTime) / 1000;
      firstEstimateReadout.textContent = `${firstEstimateTime.toFixed(1)}s`;
    }
    updateCandidateReadouts({ bpm: best.bpm, score: best.score }, null, null, { bpm: corrected, score: best.score });
    updateTempoReadouts(best.bpm, corrected, fastConfidence);
    selectionReasonReadout.textContent = `fast interval histogram; predicted beat hits ${prediction.hits}/${prediction.hits + prediction.misses}`;
    switchReasonReadout.textContent = "fast acquisition candidate";
    setTempoState("acquiring");
    updateDisplayedBpm(corrected, fastConfidence, "fast");
    screen(`fast estimate ${Math.round(corrected)} BPM: hits ${prediction.hits}, misses ${prediction.misses}`);
  }

  return best;
}

function withConfidence(score, allScores) {
  if (!score) {
    return null;
  }

  const runnerUp = allScores.find((candidate) => Math.abs(candidate.bpm - score.bpm) > 4);
  const separation = runnerUp ? Math.max(0, score.score - runnerUp.score) : score.score;
  const coverageTarget = tempoState === "stable" ? 10 : 4;
  const coverage = Math.min(1, score.count / coverageTarget);
  const alignment = score.aligned / score.count;
  const confidence = Math.min(100, Math.round((score.score * 0.42 + separation * 0.2 + alignment * 0.26 + coverage * 0.12) * 100));
  return { ...score, confidence };
}

function musicallyWeightedScore(candidate) {
  let weighted = candidate.combinedScore || candidate.score;
  const feel = tempoFeelSelect.value;
  const target = getTargetAnchorBpm();
  const anchor = targetAnchorStrength();

  if (target) {
    const distance = Math.abs(candidate.bpm - target);
    if (distance <= anchor.range) {
      weighted *= 1 + anchor.boost * (1 - distance / Math.max(1, anchor.range));
    } else {
      weighted *= anchor.outsidePenalty;
    }
  }

  if (candidate.bpm >= 70 && candidate.bpm <= 120) {
    weighted *= 1.12;
  }

  if (candidate.bpm >= 75 && candidate.bpm <= 90) {
    weighted *= 1.06;
  }

  if (feel === "slower") {
    weighted *= candidate.bpm <= 115 ? 1.18 : 0.9;
  } else if (feel === "faster") {
    weighted *= candidate.bpm >= 115 ? 1.15 : 0.94;
  }

  return weighted;
}

function chooseTempoCandidate(scores) {
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  const bestRaw = sorted[0];
  let selected = bestRaw;

  const half = findClosestCandidate(sorted, bestRaw.bpm / 2);
  const double = findClosestCandidate(sorted, bestRaw.bpm * 2);
  const feel = tempoFeelSelect.value;
  const target = getTargetAnchorBpm();
  const anchor = targetAnchorStrength();

  if (half) {
    const fasterClearlyBetter = bestRaw.score >= half.score * 1.28 && bestRaw.confidence >= half.confidence + 18;
    const liveMusicDoubleTime = bestRaw.bpm >= 150 && bestRaw.bpm <= 180 && half.bpm >= 75 && half.bpm <= 90;
    const similarConfidence = bestRaw.confidence <= half.confidence + 18;

    if (target && isNearTarget(bestRaw.bpm, target, anchor.range) && !isNearTarget(half.bpm, target, anchor.range)) {
      selected = bestRaw;
    } else if (target && isNearTarget(half.bpm, target, anchor.range) && !isNearTarget(bestRaw.bpm, target, anchor.range)) {
      selected = half;
    } else if (feel === "slower" || (!fasterClearlyBetter && (similarConfidence || liveMusicDoubleTime))) {
      selected = half;
    }
  }

  if (double && target && isNearTarget(selected.bpm, target, anchor.range) && !isNearTarget(double.bpm, target, anchor.range)) {
    // Keep the target-neighborhood pulse unless the later weighted stage finds overwhelming evidence.
  } else if (double && target && isNearTarget(double.bpm, target, anchor.range) && !isNearTarget(selected.bpm, target, anchor.range)) {
    selected = double;
  } else if (double && feel === "faster" && double.combinedScore >= selected.combinedScore * 0.82) {
    selected = double;
  }

  const weightedBest = [bestRaw, half, double]
    .filter(Boolean)
    .sort((a, b) => musicallyWeightedScore(b) - musicallyWeightedScore(a))[0];

  if (weightedBest && target && isNearTarget(selected.bpm, target, anchor.range) && !isNearTarget(weightedBest.bpm, target, anchor.range)) {
    const overwhelming = weightedBest.confidence >= anchor.jumpConfidence
      && (weightedBest.combinedScore || weightedBest.score) >= (selected.combinedScore || selected.score) * anchor.jumpScoreRatio;
    if (overwhelming) {
      selected = weightedBest;
    }
  } else if (weightedBest && weightedBest.combinedScore >= selected.combinedScore * 0.82) {
    selected = weightedBest;
  }

  let reason = "strongest recurring onset alignment";

  if (selected !== bestRaw && reason === "strongest recurring onset alignment") {
    reason = "musical tempo/subdivision preference";
  }
  if (target && isNearTarget(selected.bpm, target, anchor.range)) {
    reason = `target anchored near ${Math.round(target)} BPM`;
  }

  return { bestRaw, half, double, selected, reason };
}

function estimateTempo(now, source) {
  const analysisWindow = getAnalysisWindowMs();
  beatHistory = beatHistory.filter((beat) => now - beat.time <= WINDOW_MS);
  const activeBeats = beatHistory.filter((beat) => now - beat.time <= analysisWindow);
  updateFastEstimate(now);

  if (activeBeats.length >= 8 && tempoState !== "reacquiring" && tempoState !== "stable" && tempoState !== "holding") {
    setTempoState("stabilizing");
  } else if (activeBeats.length >= 4 && tempoState !== "stable" && tempoState !== "holding") {
    setTempoState(smoothedBpm ? "reacquiring" : "acquiring");
  } else if (tempoState !== "stable" && tempoState !== "holding") {
    setTempoState(smoothedBpm ? "reacquiring" : "acquiring");
  }

  if (clapMode && activeBeats.length >= 2) {
    const recent = activeBeats.slice(-6);
    const intervals = [];
    for (let i = 1; i < recent.length; i += 1) {
      intervals.push(recent[i].time - recent[i - 1].time);
    }
    const rawBpm = 60000 / mean(intervals);
    const corrected = correctIntoRange(rawBpm);
    updateTempoReadouts(rawBpm, corrected, 100);
    updateDisplayedBpm(corrected, 100, "clap");
    return;
  }

  if (activeBeats.length < 5 && fastCandidate) {
    return;
  }

  if (activeBeats.length >= 4 && activeBeats.length < 6 && !clapMode && !fastCandidate) {
    const recent = activeBeats.slice(-5);
    const intervals = [];
    for (let i = 1; i < recent.length; i += 1) {
      intervals.push(recent[i].time - recent[i - 1].time);
    }

    const rawBpm = 60000 / mean(intervals);
    const targetAnchor = getTargetAnchorBpm();
    const anchor = targetAnchorStrength();
    let corrected = correctIntoRange(rawBpm);
    if (targetAnchor && !isNearTarget(corrected, targetAnchor, anchor.range)) {
      const nearTargetVariant = [rawBpm, rawBpm * 2, rawBpm / 2]
        .find((candidate) => isNearTarget(candidate, targetAnchor, anchor.range));
      if (nearTargetVariant) {
        corrected = nearTargetVariant;
      } else {
        screen(`early estimate withheld outside target: ${Math.round(corrected)} BPM`);
        return;
      }
    }
    const confidence = 34;
    updateCandidateReadouts({ bpm: rawBpm }, { bpm: rawBpm / 2 }, { bpm: rawBpm * 2 }, { bpm: corrected });
    updateTempoReadouts(rawBpm, corrected, confidence);
    updateDisplayedBpm(corrected, confidence, source);
    screen(`fast estimate: ${Math.round(corrected)} BPM`);
    return;
  }

  const scores = [];
  for (const bpm of generateCandidateBpms(now)) {
    const score = scoreTempo(bpm, now);
    if (score) {
      scores.push(score);
    }
  }

  if (!scores.length) {
    updateTempoReadouts(null, null, 0);
    return;
  }

  scores.sort((a, b) => b.score - a.score);
  const fastHistogram = intervalHistogramCandidates(now);
  const targetAnchor = getTargetAnchorBpm();
  const anchor = targetAnchorStrength();
  const enrichedScores = scores.map((score) => {
    const confidenceScore = withConfidence(score, scores);
    const history = historySupportFor(score.bpm, now);
    const fastSupport = fastHistogram.find((candidate) => Math.abs(candidate.bpm - score.bpm) <= 2);
    const fastBoost = fastSupport ? Math.min(0.18, fastSupport.score / Math.max(1, fastHistogram[0].score) * 0.18) : 0;
    const targetDistance = targetAnchor ? Math.abs(score.bpm - targetAnchor) : null;
    const targetBoost = targetAnchor && targetDistance <= anchor.range
      ? anchor.boost * (1 - targetDistance / Math.max(1, anchor.range))
      : 0;
    const targetPenalty = targetAnchor && targetDistance > anchor.range ? anchor.outsidePenalty : 1;
    return {
      ...confidenceScore,
      historySupport: history.support,
      historySeconds: history.seconds,
      combinedScore: (score.score * 0.6 + history.support * 0.28 + fastBoost + targetBoost) * targetPenalty
    };
  }).sort((a, b) => b.combinedScore - a.combinedScore);
  recordCandidateHistory(enrichedScores, now);
  let choice = chooseTempoCandidate(enrichedScores);
  const consensus = buildTempoConsensus(enrichedScores, now, fastHistogram);
  if (consensus.selected) {
    choice = {
      ...choice,
      selected: {
        ...consensus.selected,
        confidence: consensus.selected.consensusConfidence ?? consensus.selected.confidence,
        combinedScore: consensus.selected.consensusScore ?? consensus.selected.combinedScore
      },
      reason: consensus.reason
    };
  }
  const rankedScores = consensus.scores?.length ? consensus.scores : enrichedScores;

  const continuityBpm = targetAnchor || expectedBpm;
  if (continuityBpm) {
    const nearExpected = rankedScores.find((score) => Math.abs(score.bpm - continuityBpm) <= (targetAnchor ? anchor.range : continuityBpm * 0.09));
    const requiredRatio = targetAnchor ? 0.52 : 0.78;
    const nearScore = nearExpected?.consensusScore ?? nearExpected?.combinedScore ?? 0;
    const selectedScore = choice.selected.consensusScore ?? choice.selected.combinedScore ?? 0;
    if (nearExpected && nearScore >= selectedScore * requiredRatio) {
      choice = {
        ...choice,
        selected: {
          ...nearExpected,
          confidence: nearExpected.consensusConfidence ?? nearExpected.confidence,
          combinedScore: nearExpected.consensusScore ?? nearExpected.combinedScore
        },
        reason: targetAnchor ? `target anchor near ${Math.round(targetAnchor)} BPM` : `expected tempo continuity near ${Math.round(expectedBpm)} BPM`
      };
    }
  }

  const corrected = correctIntoRange(choice.selected.bpm);
  updateCandidateReadouts(choice.bestRaw, choice.half, choice.double, choice.selected);
  updateTempoReadouts(choice.bestRaw.bpm, corrected, choice.selected.confidence);
  updateTargetErrorReadout(corrected, choice.selected.confidence);
  selectionReasonReadout.textContent = choice.reason;
  const topCandidateText = rankedScores.slice(0, 5).map((candidate) => {
    const alignment = Math.round((candidate.aligned / candidate.count) * 100);
    const score = candidate.consensusScore ?? candidate.combinedScore;
    const estimators = candidate.matchingEstimators?.length ? ` ${candidate.matchingEstimators.join("+")}` : "";
    return `${Math.round(candidate.bpm)} s${Math.round(score * 100)} a${alignment}% k${Math.round((candidate.kickReliability || 0) * 100)}${estimators} ${candidateRelationship(candidate, choice.selected)}`;
  }).join(" | ");
  topCandidatesReadout.textContent = topCandidateText;
  screen(`top candidates: ${topCandidateText}`);
  const topClusterMatch = Math.abs(choice.bestRaw.bpm - choice.selected.bpm) <= 4
    || rankedScores.slice(0, 5).some((candidate) => Math.abs(candidate.bpm - choice.selected.bpm) <= 2);
  currentStableCandidate = {
    bpm: corrected,
    confidence: choice.selected.confidence,
    matchesTopCluster: topClusterMatch
  };

  if (tempoState === "stable" || tempoState === "holding") {
    const swing = smoothedBpm ? Math.abs(corrected - smoothedBpm) : 0;
    const phase = phaseAgreement(lastStableBpm || smoothedBpm, now, 10);
    const denseHold = mixDensity > 0.45 && lastStableBpm;
    const targetHold = targetAnchor && (isNearTarget(lastStableBpm, targetAnchor, anchor.range) || isNearTarget(smoothedBpm, targetAnchor, anchor.range));
    const offTargetJump = targetAnchor && !isNearTarget(corrected, targetAnchor, anchor.range) && choice.selected.confidence < anchor.jumpConfidence;
    const unstableCandidate = offTargetJump || choice.selected.confidence < 55 || (swing > 10 && choice.selected.confidence < 72);
    if (unstableCandidate) {
      disagreementBeats += 1;
      const disagreementLimit = targetHold ? 12 : denseHold ? 10 : 7;
      if (targetHold || denseHold || phase.agreement >= 0.46 || disagreementBeats < disagreementLimit) {
        setTempoState("holding");
        holdStartTime = holdStartTime || now;
        expectedBpm = lastStableBpm || targetAnchor || expectedBpm;
        renderBpm(lastStableBpm || smoothedBpm || targetAnchor);
        displaySourceReadout.textContent = "Stable";
        lockReason = `holding ${Math.round(lastStableBpm || smoothedBpm || targetAnchor)} BPM; target ${targetAnchor ? Math.round(targetAnchor) : "--"}, phase ${Math.round(phase.agreement * 100)}%, disagreement ${disagreementBeats}/${disagreementLimit}`;
        switchReasonReadout.textContent = lockReason;
        setStatus("Holding BPM");
        screen(lockReason);
        return;
      }
      setTempoState("reacquiring");
      holdStartTime = null;
      expectedBpm = null;
      lockReason = `reacquiring after ${disagreementBeats} disagreeing beats`;
      switchReasonReadout.textContent = lockReason;
      setStatus("Reacquiring BPM...");
      screen(`${lockReason}: ${Math.round(corrected)} BPM at ${choice.selected.confidence}%`);
      return;
    }
  }

  if (tempoState === "holding" && lastStableBpm && Math.abs(corrected - lastStableBpm) <= 5 && choice.selected.confidence >= 55) {
    setTempoState("stable");
    holdStartTime = null;
    disagreementBeats = 0;
    lockReason = `stayed locked near ${Math.round(lastStableBpm)} BPM; candidate returned to phase`;
    switchReasonReadout.textContent = lockReason;
  }

  const profile = getLockProfile();
  stableCandidateReadout.textContent = `${Math.round(corrected)} (${choice.selected.confidence}%)`;
  const targetStableCandidate = targetAnchor
    && isNearTarget(corrected, targetAnchor, anchor.range)
    && choice.selected.confidence >= Math.max(48, profile.stableConfidence - 14)
    && activeBeats.length >= Math.max(6, profile.stableBeats - 2)
    && choice.selected.estimatorAgreement >= 2
    && choice.selected.historySeconds >= Math.max(1.8, profile.stableSeconds - 1.2);
  if ((choice.selected.confidence >= profile.stableConfidence && activeBeats.length >= profile.stableBeats && choice.selected.historySeconds >= profile.stableSeconds && choice.selected.historySupport >= 0.32) || targetStableCandidate) {
    setTempoState("stable");
    lastStableBpm = corrected;
    expectedBpm = corrected;
    stableAnchorBpm = corrected;
    stableAnchorTime = activeBeats[0]?.time || now;
    holdStartTime = null;
    disagreementBeats = 0;
    lockReason = `locked to ${Math.round(corrected)} BPM; kick ${Math.round(kickConfidence * 100)}%, snare ${Math.round(snareConfidence * 100)}%`;
    switchReasonReadout.textContent = lockReason;
    if (stableLockTime === null) {
      stableLockTime = (now - startTime) / 1000;
      stableLockReadout.textContent = `${stableLockTime.toFixed(1)}s`;
      switchReasonReadout.textContent = `stable after ${choice.selected.historySeconds.toFixed(1)}s dominance`;
    }
  } else if (tempoState !== "holding" && choice.selected.confidence >= 40 && activeBeats.length >= 5) {
    setTempoState("stabilizing");
    holdStartTime = null;
    if (choice.selected.historySeconds >= 1.5) {
      expectedBpm = corrected;
    }
    switchReasonReadout.textContent = `stabilizing: ${choice.selected.historySeconds.toFixed(1)}s candidate history`;
  } else if (tempoState !== "holding") {
    setTempoState(smoothedBpm ? "reacquiring" : "acquiring");
    holdStartTime = null;
    switchReasonReadout.textContent = "not enough recurring candidate evidence";
  } else {
    switchReasonReadout.textContent = lockReason;
  }
  lastTempoConfidence = choice.selected.confidence;

  const possibleDoubleTime = choice.half
    && Math.abs(corrected - choice.half.bpm * 2) <= 4
    && choice.half.bpm >= 70
    && choice.half.bpm <= 100;

  updateDisplayedBpm(corrected, choice.selected.confidence, "stable");
  if (possibleDoubleTime) {
    setStatus("Possible double-time detection");
    screen("Possible double-time detection");
  }
}

function handleFrame(frame) {
  const now = performance.now();
  framesProcessed += 1;
  const normalizedRms = Math.min(1, frame.rms * 1.8);
  const bands = frame.bands || [frame.rms * 0.45, frame.rms * 0.35, frame.rms * 0.2];
  avgLevel = avgLevel * 0.9 + normalizedRms * 0.1;
  currentPeak = frame.peak;

  const gate = Math.max(getNoiseFloor(), median(levelHistory || []) * 0.8);
  levelHistory.push(avgLevel);
  if (levelHistory.length > 100) {
    levelHistory.shift();
  }
  updateMixDensity(now);
  const highBandPenalty = mixDensity > 0.45 ? 0.32 : 0.9;
  const bandWeights = [mixDensity > 0.45 ? 1.65 : 1.35, 1.1, highBandPenalty];
  let bandFluxTotal = 0;
  const bandFluxes = [0, 0, 0];
  for (let i = 0; i < 3; i += 1) {
    const normalizedBand = Math.min(1, bands[i] * 2.4);
    const flux = Math.max(0, normalizedBand - previousBandEnergies[i]);
    bandFluxes[i] = flux;
    bandFluxHistory[i].push(flux);
    if (bandFluxHistory[i].length > 80) {
      bandFluxHistory[i].shift();
    }
    const rhythmicRepeatBoost = bandFluxHistory[i].filter((value) => value > median(bandFluxHistory[i]) * 1.35).length / Math.max(1, bandFluxHistory[i].length);
    bandFluxTotal += flux * bandWeights[i] * (1 + rhythmicRepeatBoost);
    previousBandEnergies[i] = previousBandEnergies[i] * 0.68 + normalizedBand * 0.32;
  }

  const spectralFlux = Math.max(0, bandFluxes[0] * 1.55 + bandFluxes[1] * 1.15 + bandFluxes[2] * (mixDensity > 0.45 ? 0.22 : 0.55));
  spectralFluxHistory.push({ time: now, value: spectralFlux });
  spectralFluxHistory = spectralFluxHistory.filter((entry) => now - entry.time <= WINDOW_MS);

  const energyRise = Math.max(0, normalizedRms - previousRms);
  const peakRise = Math.max(0, frame.peak - previousPeak);
  onsetStrength = avgLevel > gate ? bandFluxTotal * 2.8 + energyRise * 1.4 + peakRise * (mixDensity > 0.45 ? 0.16 : 0.35) : 0;
  previousRms = previousRms * 0.7 + normalizedRms * 0.3;
  previousPeak = previousPeak * 0.62 + frame.peak * 0.38;

  const signalMoving = avgLevel > getNoiseFloor() * 0.75 || frame.peak > getNoiseFloor() * 3;
  const secondsListening = (now - startTime) / 1000;
  if (!signalMoving) {
    setMode("no signal");
  }

  if (signalMoving && beatCount === 0 && secondsListening > 2) {
    autoThresholdMultiplier = Math.max(0.42, autoThresholdMultiplier * 0.985);
  }

  const sensitivity = Number(sensitivitySlider.value);
  const thresholdScale = 1.35 - sensitivity * 0.009;
  const adaptiveFloor = getNoiseFloor() * autoThresholdMultiplier;
  const adaptive = median(strengthHistory) + mean(strengthHistory) * thresholdScale;
  const densityGate = mixDensity > 0.45 ? 1 + mixDensity * 0.75 : 1;
  currentThreshold = Math.max(adaptiveFloor, adaptive * autoThresholdMultiplier * densityGate);

  strengthHistory.push(onsetStrength);
  if (strengthHistory.length > 80) {
    strengthHistory.shift();
  }

  const kickFlux = bandFluxes[0];
  const midFlux = bandFluxes[1];
  kickStrengthHistory.push(kickFlux);
  midStrengthHistory.push(midFlux);
  if (kickStrengthHistory.length > 90) {
    kickStrengthHistory.shift();
  }
  if (midStrengthHistory.length > 90) {
    midStrengthHistory.shift();
  }

  const kickThreshold = Math.max(getNoiseFloor() * 0.9, median(kickStrengthHistory) + mean(kickStrengthHistory) * 1.05);
  const midThreshold = Math.max(getNoiseFloor() * 0.75, median(midStrengthHistory) + mean(midStrengthHistory) * 1.15);
  if (kickStrengthHistory.length > 8 && kickFlux > kickThreshold && bands[0] > avgLevel * 0.18) {
    registerBandBeat("kick", now, kickFlux * 1.6);
  }
  if (midStrengthHistory.length > 8 && midFlux > midThreshold) {
    registerBandBeat("mid", now, midFlux);
  }

  const onsetReady = strengthHistory.length > 6;
  const onsetDetected = onsetReady && signalMoving && onsetStrength > currentThreshold;
  const fallbackEnabled = signalMoving && beatCount === 0 && secondsListening > 5;
  if (fallbackEnabled) {
    fallbackActive = true;
  }

  const fallbackThreshold = Math.max(getNoiseFloor() * 5, avgLevel * 2.1, 0.018);
  const fallbackDetected = fallbackActive && signalMoving && frame.peak > fallbackThreshold && peakRise > getNoiseFloor();
  const clapThreshold = Math.max(getNoiseFloor() * 7, avgLevel * 2.8, 0.035);
  const clapDetected = clapMode && frame.peak > clapThreshold && peakRise > getNoiseFloor() * 1.5;
  const transient = classifyTransient(bandFluxes, bands, onsetStrength);
  const denseHighOnly = mixDensity > 0.48 && (transient.type === "hihat" || transient.type === "noise");
  const lacksLowMidConfirmation = kickFlux < kickThreshold * 0.72 && midFlux < midThreshold * 0.82;

  if (clapDetected) {
    registerRawOnset(now, frame.peak, "fallback peak", true, { type: "kick", weight: 1.2, reason: "clap" });
  } else if (onsetDetected) {
    if (denseHighOnly && lacksLowMidConfirmation) {
      registerRejectedTransient(transient.type, transient.reason);
    } else {
      updateMixDensity(now, transient.type);
      registerRawOnset(now, onsetStrength, "onset/grid", false, transient);
    }
  } else if (fallbackDetected) {
    const fallbackTransient = transient.type === "hihat" && mixDensity > 0.42 ? { type: "noise", weight: 0.22, reason: "dense fallback spike" } : transient;
    if (fallbackTransient.type === "noise" && mixDensity > 0.45) {
      registerRejectedTransient(fallbackTransient.type, fallbackTransient.reason);
    } else {
      updateMixDensity(now, fallbackTransient.type);
      registerRawOnset(now, frame.peak, "fallback peak", false, fallbackTransient);
    }
  } else if (signalMoving && fallbackEnabled) {
    setMode("fallback peak");
  } else if (signalMoving) {
    setMode("onset/grid");
  }

  finalizeBeatCluster(now);
  updateLevelDisplay();
}

function resetDetectionState() {
  framesProcessed = 0;
  avgLevel = 0;
  currentPeak = 0;
  previousRms = 0;
  previousPeak = 0;
  previousBandEnergies = [0, 0, 0];
  bandFluxHistory = [[], [], []];
  spectralFluxHistory = [];
  onsetStrength = 0;
  currentThreshold = 0;
  lastGroupedBeatTime = 0;
  beatCount = 0;
  rawOnsetCount = 0;
  ignoredDoubleHitCount = 0;
  fastCandidate = null;
  fastConfidence = 0;
  firstEstimateTime = null;
  stableLockTime = null;
  predictedBeat = null;
  predictionHits = 0;
  predictionMisses = 0;
  currentStableCandidate = null;
  snareConfidence = 0;
  mixDensity = 0;
  rejectedHighNoiseCount = 0;
  onsetEventHistory = [];
  stableAnchorBpm = null;
  stableAnchorTime = null;
  holdStartTime = null;
  disagreementBeats = 0;
  lockReason = "--";
  beatHistory = [];
  kickBeatHistory = [];
  midBeatHistory = [];
  candidateHistory = [];
  strengthHistory = [];
  levelHistory = [];
  kickStrengthHistory = [];
  midStrengthHistory = [];
  lastKickBeatTime = 0;
  lastMidBeatTime = 0;
  kickConfidence = 0;
  pendingCluster = null;
  autoThresholdMultiplier = 1;
  fallbackActive = false;
  screenLogTimer = 0;
  setTempoState("acquiring");
  onsetCounter.textContent = "0";
  rawOnsetCounter.textContent = "0";
  groupedBeatCounter.textContent = "0";
  ignoredDoubleHitCounter.textContent = "0";
  refractoryReadout.textContent = `${getRefractoryMs()}ms`;
  updateTempoReadouts(null, null, 0);
  updateCandidateReadouts(null, null, null, null);
  selectionReasonReadout.textContent = "--";
  targetErrorReadout.textContent = "--";
  topCandidatesReadout.textContent = "--";
  multiBandBpmReadout.textContent = "--";
  spectralBpmReadout.textContent = "--";
  targetAnchorBpmReadout.textContent = "--";
  consensusReadout.textContent = "--";
  fastEstimateReadout.textContent = "--";
  stableCandidateReadout.textContent = "--";
  displaySourceReadout.textContent = "--";
  mixDensityReadout.textContent = "0%";
  kickConfidenceReadout.textContent = "0%";
  snareConfidenceReadout.textContent = "0%";
  rejectionReadout.textContent = "0";
  holdTimeReadout.textContent = "--";
  firstEstimateReadout.textContent = "--";
  stableLockReadout.textContent = "--";
  switchReasonReadout.textContent = "--";
  updateLevelDisplay();
  setMode("no signal");
  screenLog.textContent = "Acquiring BPM... Clap or play steady rhythm near the iPhone.";
}

async function setupAudioWorklet() {
  if (!audioContext.audioWorklet || !window.AudioWorkletNode) {
    return false;
  }

  const workletCode = `
    class BpmPrompterProcessor extends AudioWorkletProcessor {
      constructor() {
        super();
        this.samples = [];
        this.lowState = 0;
        this.prev = 0;
      }
      process(inputs, outputs) {
        const input = inputs[0] && inputs[0][0];
        const output = outputs[0] && outputs[0][0];
        if (output) output.fill(0);
        if (!input) return true;
        for (let i = 0; i < input.length; i++) {
          this.samples.push(input[i]);
        }
        while (this.samples.length >= ${FRAME_SIZE}) {
          let sum = 0;
          let peak = 0;
          let lowEnergy = 0;
          let midEnergy = 0;
          let highEnergy = 0;
          for (let i = 0; i < ${FRAME_SIZE}; i++) {
            const sample = Math.max(-1, Math.min(1, this.samples[i] * 1.6));
            this.lowState = this.lowState * 0.982 + sample * 0.018;
            const high = sample - this.prev;
            const mid = sample - this.lowState - high * 0.45;
            this.prev = sample;
            sum += sample * sample;
            const abs = Math.abs(sample);
            if (abs > peak) peak = abs;
            lowEnergy += this.lowState * this.lowState;
            midEnergy += mid * mid;
            highEnergy += high * high;
          }
          this.samples.splice(0, ${FRAME_SIZE});
          this.port.postMessage({
            rms: Math.sqrt(sum / ${FRAME_SIZE}),
            peak,
            bands: [
              Math.sqrt(lowEnergy / ${FRAME_SIZE}),
              Math.sqrt(midEnergy / ${FRAME_SIZE}),
              Math.sqrt(highEnergy / ${FRAME_SIZE})
            ]
          });
        }
        return true;
      }
    }
    registerProcessor("bpm-prompter-processor", BpmPrompterProcessor);
  `;

  const blob = new Blob([workletCode], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  await audioContext.audioWorklet.addModule(url);
  URL.revokeObjectURL(url);

  processorNode = new AudioWorkletNode(audioContext, "bpm-prompter-processor");
  processorNode.port.onmessage = (event) => handleFrame(event.data);
  sourceNode.connect(processorNode);
  processorNode.connect(audioContext.destination);
  return true;
}

function setupScriptProcessor() {
  let lowState = 0;
  let prev = 0;
  processorNode = audioContext.createScriptProcessor(FRAME_SIZE, 1, 1);
  processorNode.onaudioprocess = (event) => {
    const input = event.inputBuffer.getChannelData(0);
    const output = event.outputBuffer.getChannelData(0);
    output.fill(0);

    let sum = 0;
    let peak = 0;
    let lowEnergy = 0;
    let midEnergy = 0;
    let highEnergy = 0;
    for (let i = 0; i < input.length; i += 1) {
      const sample = Math.max(-1, Math.min(1, input[i] * 1.6));
      lowState = lowState * 0.982 + sample * 0.018;
      const high = sample - prev;
      const mid = sample - lowState - high * 0.45;
      prev = sample;
      sum += sample * sample;
      peak = Math.max(peak, Math.abs(sample));
      lowEnergy += lowState * lowState;
      midEnergy += mid * mid;
      highEnergy += high * high;
    }

    handleFrame({
      rms: Math.sqrt(sum / input.length),
      peak,
      bands: [
        Math.sqrt(lowEnergy / input.length),
        Math.sqrt(midEnergy / input.length),
        Math.sqrt(highEnergy / input.length)
      ]
    });
  };
  sourceNode.connect(processorNode);
  processorNode.connect(audioContext.destination);
}

async function startListening() {
  if (listening) {
    return;
  }

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass || !navigator.mediaDevices?.getUserMedia) {
      setStatus("Microphone is not available in this browser");
      return;
    }

    audioContext = new AudioContextClass();
    await audioContext.resume();
    console.log("audio context started", audioContext.state);

    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }
    });
    console.log("microphone permission granted");

    sourceNode = audioContext.createMediaStreamSource(mediaStream);
    useAudioWorklet = false;
    try {
      useAudioWorklet = await setupAudioWorklet();
    } catch (error) {
      console.warn("AudioWorklet failed, using ScriptProcessorNode", error);
      setupScriptProcessor();
    }

    if (!useAudioWorklet && !processorNode) {
      setupScriptProcessor();
    }

    listening = true;
    startTime = performance.now();
    setStreamStatus(mediaStream.active);
    startButton.disabled = true;
    stopButton.disabled = false;
    resetDetectionState();
    setStatus("Listening to room audio");
    screen(`mic active: ${mediaStream.active}`);
    screen(`audio engine: ${useAudioWorklet ? "AudioWorklet" : "ScriptProcessor"}`);

    mediaStream.getAudioTracks().forEach((track) => {
      track.addEventListener("ended", () => {
        setStreamStatus(false);
        setStatus("Microphone stream ended");
        screen("mic active: false");
      });
    });

    detectLoop();
  } catch (error) {
    stopListening();
    setStatus(error.name === "NotAllowedError" ? "Microphone permission denied" : "Could not start microphone");
    screen(`error: ${error.message || error.name}`);
  }
}

function stopListening() {
  listening = false;
  startButton.disabled = false;
  stopButton.disabled = true;

  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  if (sourceNode) {
    sourceNode.disconnect();
    sourceNode = null;
  }

  if (processorNode) {
    processorNode.disconnect();
    if (processorNode.port) {
      processorNode.port.onmessage = null;
    }
    processorNode.onaudioprocess = null;
    processorNode = null;
  }

  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
    mediaStream = null;
  }

  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }

  setStreamStatus(false);
  setMode("no signal");
  updateLevelDisplay();
  setStatus("Stopped");
  updateMicStateIndicator();
}

function detectLoop() {
  if (!listening) {
    return;
  }

  const now = performance.now();
  const msSinceBeat = lastGroupedBeatTime ? now - lastGroupedBeatTime : now - startTime;
  if (msSinceBeat > 4200) {
    setTempoState("waiting");
    setStatus("Waiting for rhythm...");
  } else if (tempoState === "stable" && lastTempoConfidence < 45) {
    setTempoState("reacquiring");
    setStatus("Reacquiring BPM...");
  }

  if (now - screenLogTimer > 700) {
    refractoryReadout.textContent = `${getRefractoryMs()}ms`;
    screen(`frames: ${framesProcessed} | level: ${avgLevel.toFixed(3)} | density: ${Math.round(mixDensity * 100)}% | strength: ${onsetStrength.toFixed(3)} | threshold: ${currentThreshold.toFixed(3)} | grouped: ${beatCount} | kick: ${kickBeatHistory.length} (${Math.round(kickConfidence * 100)}%) | snare: ${Math.round(snareConfidence * 100)}% | rejected: ${rejectedHighNoiseCount} | state: ${tempoStateReadout.textContent}`);
    console.log("current input level", {
      micActive: Boolean(mediaStream?.active),
      audioFramesProcessed: framesProcessed,
      avgInputLevel: Number(avgLevel.toFixed(4)),
      onsetStrength: Number(onsetStrength.toFixed(4)),
      currentThreshold: Number(currentThreshold.toFixed(4)),
      rawOnsetCount,
      groupedBeatCount: beatCount,
      ignoredDoubleHitCount,
      refractoryMs: getRefractoryMs(),
      mixDensity: Number(mixDensity.toFixed(3)),
      kickConfidence: Number(kickConfidence.toFixed(3)),
      snareConfidence: Number(snareConfidence.toFixed(3)),
      rejectedHighNoiseCount,
      holdReason: lockReason,
      selectedBpm: smoothedBpm ? Math.round(smoothedBpm) : null
    });
    screenLogTimer = now;
  }

  rafId = requestAnimationFrame(detectLoop);
}

function tapTempo() {
  const now = performance.now();
  tapTimes = tapTimes.filter((time) => now - time < 5000);
  tapTimes.push(now);

  triggerPulse();
  triggerBeatFlash();

  if (tapTimes.length < 2) {
    setStatus("Keep tapping");
    return;
  }

  if (tapTimes.length > 8) {
    tapTimes.shift();
  }

  const intervals = [];
  for (let i = 1; i < tapTimes.length; i += 1) {
    intervals.push(tapTimes[i] - tapTimes[i - 1]);
  }

  const rawBpm = 60000 / mean(intervals);
  const correctedBpm = correctIntoRange(rawBpm);
  if (tapTimes.length >= 3) {
    expectedBpm = correctedBpm;
    minBpmInput.value = String(Math.max(40, Math.round(correctedBpm - 18)));
    maxBpmInput.value = String(Math.min(220, Math.round(correctedBpm + 18)));
    rangePresetSelect.value = "custom";
    setTempoState("estimating");
    screen(`tap seed range: ${minBpmInput.value}-${maxBpmInput.value}`);
  }
  updateTempoReadouts(rawBpm, correctedBpm, 100);
  updateDisplayedBpm(correctedBpm, 100, "manual");
}

function tapTempoCalibrate() {
  const now = performance.now();
  calibrateTapTimes = calibrateTapTimes.filter((time) => now - time < 6000);
  calibrateTapTimes.push(now);

  triggerPulse();
  triggerBeatFlash();

  if (calibrateTapTimes.length < 2) {
    setStatus("Tap calibrate a few times");
    return;
  }

  if (calibrateTapTimes.length > 8) {
    calibrateTapTimes.shift();
  }

  const intervals = [];
  for (let i = 1; i < calibrateTapTimes.length; i += 1) {
    intervals.push(calibrateTapTimes[i] - calibrateTapTimes[i - 1]);
  }

  const rawBpm = 60000 / mean(intervals);
  expectedBpm = correctIntoRange(rawBpm);
  updateTempoReadouts(rawBpm, expectedBpm, 100);
  updateDisplayedBpm(expectedBpm, 100, "manual");
  setStatus(`Calibrated near ${Math.round(expectedBpm)} BPM`);
}

function applyRangePreset() {
  const preset = rangePresetSelect.value;
  if (preset === "slow") {
    minBpmInput.value = "60";
    maxBpmInput.value = "100";
  } else if (preset === "medium") {
    minBpmInput.value = "80";
    maxBpmInput.value = "140";
  } else if (preset === "fast") {
    minBpmInput.value = "120";
    maxBpmInput.value = "180";
  }
}

function toggleClapMode() {
  clapMode = !clapMode;
  clapModeButton.classList.toggle("active", clapMode);
  clapModeButton.textContent = clapMode ? "Exit Clap Mode" : "Test Clap Mode";
  setStatus(clapMode ? "Clap mode: clap steady quarter notes" : "Clap mode off");
  screen(clapMode ? "Test Clap Mode on" : "Test Clap Mode off");
}

function toggleLock() {
  if (!locked && smoothedBpm === null) {
    setStatus("No BPM to lock yet");
    return;
  }

  locked = !locked;
  lockButton.classList.toggle("locked", locked);
  lockButton.textContent = locked ? "Unlock BPM" : "Lock BPM";
  displaySourceReadout.textContent = locked ? "Manual Lock" : "--";
  setStatus(locked ? "BPM locked" : "BPM unlocked");
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      fullscreenButton.textContent = "Exit Fullscreen";
    } else {
      await document.exitFullscreen();
      fullscreenButton.textContent = "Fullscreen";
    }
  } catch (error) {
    setStatus("Fullscreen is not available here");
  }
}

function applyOrientation(value) {
  stage.classList.remove("orientation-cw", "orientation-ccw", "orientation-upside-down");
  document.querySelector(".app-shell").classList.toggle("portrait-rotated", value === "cw" || value === "ccw");

  if (value === "cw") {
    stage.classList.add("orientation-cw");
  } else if (value === "ccw") {
    stage.classList.add("orientation-ccw");
  } else if (value === "upside-down") {
    stage.classList.add("orientation-upside-down");
  }

  try {
    localStorage.setItem(ORIENTATION_KEY, value);
  } catch (error) {
    setStatus("Orientation changed");
  }

  updatePortraitScale();
}

function initOrientation() {
  let saved = "normal";
  let savedFill = "fit";
  try {
    saved = localStorage.getItem(ORIENTATION_KEY) || "normal";
    savedFill = localStorage.getItem(PORTRAIT_FILL_KEY) || "fit";
  } catch (error) {
    saved = "normal";
    savedFill = "fit";
  }

  orientationSelect.value = saved;
  portraitFillSelect.value = savedFill;
  applyOrientation(saved);
}

function updatePortraitScale() {
  const orientation = orientationSelect.value;
  const isPortraitRotation = orientation === "cw" || orientation === "ccw";
  const fillMode = portraitFillSelect.value;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  let scale = 1;

  if (isPortraitRotation && viewportWidth > 0 && viewportHeight > 0) {
    const rotatedWidth = viewportHeight;
    const rotatedHeight = viewportWidth;
    const fitScale = Math.min(viewportWidth / rotatedWidth, viewportHeight / rotatedHeight);
    const fillScale = Math.max(viewportWidth / rotatedWidth, viewportHeight / rotatedHeight);
    scale = fillMode === "fill" ? Math.min(fillScale, fitScale * 1.32) : fitScale;
    scale = Math.max(0.45, Math.min(1.9, scale));
  }

  const portraitBpmVmin = fillMode === "fill" && isPortraitRotation ? 55 : isPortraitRotation ? 48 : 36;
  document.documentElement.style.setProperty("--portrait-scale", scale.toFixed(3));
  document.documentElement.style.setProperty("--portrait-bpm-size", `clamp(7rem, ${portraitBpmVmin}vmin, 38rem)`);
}

function validateDomReferences() {
  const requiredIds = [
    "confidenceSlider",
    "tempoStateReadout",
    "targetBpmInput",
    "lockSpeedSelect",
    "topCandidatesReadout",
    "selectionReasonReadout",
    "multiBandBpmReadout",
    "spectralBpmReadout",
    "targetAnchorBpmReadout",
    "consensusReadout",
    "fastEstimateReadout",
    "stableCandidateReadout",
    "displaySourceReadout",
    "mixDensityReadout",
    "kickConfidenceReadout",
    "snareConfidenceReadout",
    "rejectionReadout",
    "holdTimeReadout",
    "firstEstimateReadout",
    "stableLockReadout",
    "switchReasonReadout",
    "screenLog",
    "openSetlistButton",
    "openSettingsButton",
    "setlistView",
    "settingsView",
    "songTitleReadout",
    "songPositionReadout",
    "targetBpmLine",
    "tempoDiffReadout",
    "micStateDot",
    "micStateText",
    "songForm",
    "setlistItems",
    "importCsvButton",
    "importCsvInput",
    "importSummaryReadout",
    "setlistHeading",
    "setlistMetadataReadout",
    "tempoToleranceInput",
    "debugModeSelect",
    "targetAnchoringSelect",
    "debugPanel"
  ];
  const missing = requiredIds.filter((id) => !document.getElementById(id));
  const duplicates = requiredIds.filter((id) => document.querySelectorAll(`#${id}`).length > 1);

  if (missing.length || duplicates.length) {
    const message = `DOM check failed. Missing: ${missing.join(", ") || "none"}; duplicate: ${duplicates.join(", ") || "none"}`;
    console.error(message);
    screen(message);
  } else {
    console.log("DOM check passed for BPM Prompter UI");
  }
}

startButton.addEventListener("click", startListening);
stopButton.addEventListener("click", stopListening);
tapButton.addEventListener("click", tapTempo);
calibrateButton.addEventListener("click", tapTempoCalibrate);
clapModeButton.addEventListener("click", toggleClapMode);
lockButton.addEventListener("click", toggleLock);
fullscreenButton.addEventListener("click", toggleFullscreen);
openSetlistButton.addEventListener("click", () => openPanel("setlist"));
closeSetlistButton.addEventListener("click", closePanels);
openSettingsButton.addEventListener("click", () => openPanel("settings"));
closeSettingsButton.addEventListener("click", closePanels);
previousSongButton.addEventListener("pointerdown", (event) => handleNavPointer(event, -1, "Prev", previousSongButton));
nextSongButton.addEventListener("pointerdown", (event) => handleNavPointer(event, 1, "Next", nextSongButton));
previousSongButton.addEventListener("pointerup", (event) => {
  event.preventDefault();
  event.stopPropagation();
});
nextSongButton.addEventListener("pointerup", (event) => {
  event.preventDefault();
  event.stopPropagation();
});
previousSongButton.addEventListener("pointercancel", () => previousSongButton.classList.remove("pressed"));
nextSongButton.addEventListener("pointercancel", () => nextSongButton.classList.remove("pressed"));
previousSongButton.addEventListener("click", (event) => handleNavClick(event, -1, "Prev", previousSongButton));
nextSongButton.addEventListener("click", (event) => handleNavClick(event, 1, "Next", nextSongButton));
songForm.addEventListener("submit", addSong);
importCsvButton.addEventListener("click", () => importCsvInput.click());
importCsvInput.addEventListener("change", () => {
  importCsvFile(importCsvInput.files[0]);
  importCsvInput.value = "";
});
debugModeSelect.addEventListener("change", applyDebugMode);
targetAnchoringSelect.addEventListener("change", () => {
  try {
    localStorage.setItem(TARGET_ANCHORING_KEY, targetAnchoringSelect.value);
  } catch (error) {
    setStatus("Target anchoring changed");
  }
  candidateHistory = [];
  fastCandidate = null;
  stableLockTime = null;
  stableLockReadout.textContent = "--";
  setTempoState(smoothedBpm ? "reacquiring" : "acquiring");
  screen(`target anchoring changed: ${targetAnchoringSelect.value}`);
});
tempoToleranceInput.addEventListener("change", () => {
  try {
    localStorage.setItem(TEMPO_TOLERANCE_KEY, tempoToleranceInput.value);
  } catch (error) {
    setStatus("Tempo tolerance changed");
  }
  updatePerformanceDisplay();
});
performanceTapZone.addEventListener("click", (event) => {
  if (event.target.closest(".nav-button")) {
    return;
  }
  if (event.detail > 1) {
    return;
  }
  window.clearTimeout(performanceTapTimer);
  performanceTapTimer = window.setTimeout(toggleListeningFromPerformance, 220);
});
performanceTapZone.addEventListener("dblclick", () => {
  window.clearTimeout(performanceTapTimer);
  toggleFullscreen();
});
stage.addEventListener("pointerdown", (event) => {
  swipeStartedOnNav = Boolean(event.target.closest(".nav-button"));
  if (swipeStartedOnNav) {
    return;
  }
  swipePointerId = event.pointerId;
  pointerStartX = event.clientX;
  pointerStartY = event.clientY;
});
stage.addEventListener("pointerup", (event) => {
  if (swipeStartedOnNav || swipePointerId !== event.pointerId) {
    swipePointerId = null;
    swipeStartedOnNav = false;
    return;
  }

  const dx = event.clientX - pointerStartX;
  const dy = event.clientY - pointerStartY;
  swipePointerId = null;
  if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.45) {
    navigateSong(dx < 0 ? 1 : -1, dx < 0 ? "Next swipe" : "Prev swipe", dx < 0 ? nextSongButton : previousSongButton);
  }
});
stage.addEventListener("pointercancel", () => {
  swipePointerId = null;
  swipeStartedOnNav = false;
});
refractorySlider.addEventListener("input", () => {
  refractoryReadout.textContent = `${getRefractoryMs()}ms`;
});
orientationSelect.addEventListener("change", (event) => applyOrientation(event.target.value));
portraitFillSelect.addEventListener("change", (event) => {
  try {
    localStorage.setItem(PORTRAIT_FILL_KEY, event.target.value);
  } catch (error) {
    setStatus("Portrait fill changed");
  }
  updatePortraitScale();
});
minBpmInput.addEventListener("change", () => {
  const { min, max } = getBpmRange();
  minBpmInput.value = String(min);
  maxBpmInput.value = String(max);
  rangePresetSelect.value = "custom";
});
maxBpmInput.addEventListener("change", () => {
  const { min, max } = getBpmRange();
  minBpmInput.value = String(min);
  maxBpmInput.value = String(max);
  rangePresetSelect.value = "custom";
});
rangePresetSelect.addEventListener("change", applyRangePreset);
targetBpmInput.addEventListener("change", () => {
  const target = getTargetBpm();
  if (!target) {
    selectionReasonReadout.textContent = "--";
    targetErrorReadout.textContent = "--";
    screen("target BPM assist cleared");
    return;
  }

  screen(`target BPM assist set for debug only: ${Math.round(target)} BPM`);
});
lockSpeedSelect.addEventListener("change", () => {
  candidateHistory = [];
  fastCandidate = null;
  stableLockTime = null;
  stableLockReadout.textContent = "--";
  setTempoState(smoothedBpm ? "reacquiring" : "acquiring");
  screen(`lock speed changed: ${lockSpeedSelect.value}`);
});
document.addEventListener("fullscreenchange", () => {
  fullscreenButton.textContent = document.fullscreenElement ? "Exit Fullscreen" : "Fullscreen";
  updatePortraitScale();
});
window.addEventListener("resize", updatePortraitScale);
window.addEventListener("orientationchange", () => window.setTimeout(updatePortraitScale, 250));

initOrientation();
initUiState();
validateDomReferences();
renderBpm(null);
updateTempoReadouts(null, null, 0);
setMode("no signal");
updateMicStateIndicator();
