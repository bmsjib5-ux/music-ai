# โน้ตแต่งเพลง (แอปมือถือ)

แอป React Native ของ [โน้ตแต่งเพลง](https://bmsjib5-ux.github.io/music-ai/) ทำด้วย Expo SDK 57, Expo Router, NativeWind และ TypeScript
หน้าตาใช้ components จาก [NativeShad](https://github.com/chvvkrishnakumar/NativeShad) (MIT, ดู `LICENSE-NativeShad`) และรองรับธีมมืดตามเครื่อง

## หน้าจอ
- **แต่งเพลง**: เลือกแนวเพลง อารมณ์ เครื่องดนตรี จังหวะ (BPM) การสัมผัส โครงสร้างเพลง เสียงร้อง ภาษา และเรื่องราว
- **Prompt**: prompt สำหรับเขียนเนื้อเพลง และแท็กสไตล์สำหรับ Suno/Udio พร้อมปุ่มคัดลอกและแชร์

## ลองบนมือถือด้วย Expo Go
1. ติดตั้งแอป **Expo Go** จาก Play Store หรือ App Store
2. บนคอมพิวเตอร์ (ต้องมี Node.js 20 ขึ้นไป):
   ```bash
   cd mobile
   npm install
   npx expo start
   ```
3. สแกน QR code ที่ขึ้นในหน้าจอ (Android สแกนในแอป Expo Go, iPhone สแกนด้วยกล้อง)
   ถ้ามือถือกับคอมไม่ได้อยู่ Wi-Fi เดียวกัน ใช้ `npx expo start --tunnel`

## คำสั่งอื่น
- `npm run web` เปิดในเบราว์เซอร์
- `npm run typecheck` ตรวจ TypeScript

## เปิดเป็นเว็บบน Render
repo นี้มี `render.yaml` ที่ root อยู่แล้ว
1. เข้า https://dashboard.render.com → **New +** → **Blueprint**
2. เลือก repo `bmsjib5-ux/music-ai` แล้วกด **Apply**

Render จะ build เวอร์ชันเว็บของแอปนี้เป็น Static Site (ฟรี) และ build ใหม่เองเมื่อไฟล์ใน `mobile/` บน `main` เปลี่ยน

## สร้างไฟล์ติดตั้ง (APK / App Store)
ใช้ [EAS Build](https://docs.expo.dev/build/setup/) ต้องมีบัญชี Expo:
```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview   # ได้ไฟล์ .apk
```

## โครงสร้างโค้ด
- `app/` หน้าจอ (Expo Router) — `(tabs)/index.tsx` หน้าแต่งเพลง, `(tabs)/prompt.tsx` หน้า prompt
- `components/ui/` components จาก NativeShad
- `components/song/` components ของแอปนี้ (chip, ตัวเลือกสัมผัส, ปรับ BPM)
- `lib/song-data.ts` ข้อมูลแนวเพลง อารมณ์ เครื่องดนตรี และการสัมผัส
- `lib/build-prompt.ts` ตัวสร้างข้อความ prompt
- `global.css` สีของธีมสว่างและมืด
