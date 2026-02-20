import { setAudioModeAsync } from "expo-audio";

let countdownPlayer = null;
let audioReady = false;

export async function initSound() {
  if (audioReady) return;

  // set audio mode once
  await setAudioModeAsync({ playsInSilentMode: true });
  audioReady = true;
}

/**
 * Attach the player created by useAudioPlayer in your component.
 * This keeps all "sound operations" in one place.
 */
export function setCountdownPlayer(player) {
  countdownPlayer = player;
}

export async function playCountdown() {
  const player = countdownPlayer;
  if (!player?.isLoaded) return;

  try {
    await player.seekTo(0);
    player.play();
  } catch (e) {
    console.warn("Countdown sound play error", e);
  }
}

/**
 * Call this when ending/unmounting to avoid "null" player issues.
 */
export function detachPlayers() {
  countdownPlayer = null;
}
