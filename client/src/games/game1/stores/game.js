// import { create } from "zustand";
// import useMapStore from "./map";
// import { reset as resetPlayerStore } from "./player";

// const useStore = create((set) => ({
//   status: "running",
//   score: 0,
//   updateScore: (rowIndex) => {
//     set((state) => ({ score: Math.max(rowIndex, state.score) }));
//   },
//   endGame: () => {
//     set({ status: "over" });
//   },
//   reset: () => {
//     useMapStore.getState().reset();
//     resetPlayerStore();
//     set({ status: "running", score: 0 });
//   },
// }));

// export default useStore;

import { create } from "zustand";
import useMapStore from "./map";
import { reset as resetPlayerStore } from "./player";

const useStore = create((set) => ({
  status: "running",
  score: 0,
  videoWatched: false,
  quizCompleted: false,

  updateScore: (rowIndex) => {
    set((state) => ({ score: Math.max(rowIndex, state.score) }));
  },

  endGame: () => {
    set({ status: "over" });
  },

  markVideoWatched: () => set({ videoWatched: true }),
  markQuizCompleted: () => set({ quizCompleted: true }),

  canRetry: (get) => {
    const state = get();
    return state.videoWatched && state.quizCompleted;
  },

  reset: () => {
    useMapStore.getState().reset();
    resetPlayerStore();
    set({
      status: "running",
      score: 0,
      videoWatched: false,
      quizCompleted: false,
    });
  },
}));

export default useStore;
