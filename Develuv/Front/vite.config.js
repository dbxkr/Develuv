import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 백엔드 스프링 서버 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

//프론트랑 백이랑 서버 통신할 수 있도록 vite프록시 설정 추가
