# Forge → APK (Capacitor)

1. `npm install`
2. `npx cap add android`
3. `npx cap sync`
4. `npx cap open android` → Android Studio → Build > Build APK(s)

## AI generation
Deploy `proxy/server.js` (any Node host, set ANTHROPIC_API_KEY). Use its HTTPS URL
when the app asks for the proxy URL on first Generate. Never put your API key in the app.

## Notes
- Projects/versions are stored in WebView localStorage.
- Export uses Capacitor Filesystem + Share.
- Signed release APKs: create a keystore in Android Studio (Build > Generate Signed Bundle / APK).
