import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePreviewPostStore = create(
  persist(
    set => ({
      previewPostData: null,

      setPreviewPostData: data => {
        set({ previewPostData: data });
      },
    }),
    { name: "preview-post" }
  )
);

export default usePreviewPostStore;
