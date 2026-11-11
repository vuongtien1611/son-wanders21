/**
 * Compatibility wrapper delegating to the canonical build orchestrator (tools/build.js).
 */
const { runBuild } = require('./build');

runBuild();
