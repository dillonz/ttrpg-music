// Used for moving a song from one group to another
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

// Used for playing/pausing a group
export const PLAY_GROUP = 'PLAY_GROUP';
export const playGroup = (payload: number) => {
  return {
    type: PLAY_GROUP,
    payload,
  };
};

// Deleting audio
export const DELETE_AUDIO = 'DELETE_AUDIO';
export interface DeleteAudioPL {
  groupIndex: number;
  audioIndex: number;
}
export const deleteAudio = (payload: DeleteAudioPL) => {
  return {
    type: DELETE_AUDIO,
    payload,
  }
}

// Deleting audio
export const ADD_AUDIO = 'ADD_AUDIO';
export interface AddAudioPL {
  groupIndex: number;
  audioName: string;
  audioPath: string;
}
export const addAudio = (payload: AddAudioPL) => {
  return {
    type: ADD_AUDIO,
    payload,
  }
}

// Deleting group
export const DELETE_GROUP = 'DELETE_GROUP';
export interface DeleteGroupPL {
  groupIndex: number;
}
export const deleteGroup = (payload: DeleteGroupPL) => {
  return {
    type: DELETE_GROUP,
    payload,
  }
}

// Creating group
export const CREATE_GROUP = 'CREATE_GROUP';
export interface CreateGroupPL {
  groupName: string;
  bgColor: string;
}
export const createGroup = (payload: CreateGroupPL) => {
  return {
    type: CREATE_GROUP,
    payload,
  }
}

// Editing group
export const EDIT_GROUP = 'EDIT_GROUP';
export interface EditGroupPL {
  groupIndex: number
  groupName: string;
  bgColor: string;
}
export const editGroup = (payload: EditGroupPL) => {
  return {
    type: EDIT_GROUP,
    payload,
  }
}