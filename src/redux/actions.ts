export const MOVE_AUDIO = 'MOVE_AUDIO';

export interface MoveAudioPL {
    groupIndex: number;
    audioIndex: number;
    newGroupIndex: number;
}

export const moveAudio = (payload: MoveAudioPL) => {
  return {
    type: MOVE_AUDIO,
    payload,
  };
};
