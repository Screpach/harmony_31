export interface PlaybackEvent { t:number; frequency:number; duration:number }
export const scheduleAudioEvents=(events:PlaybackEvent[])=>events.sort((a,b)=>a.t-b.t);
