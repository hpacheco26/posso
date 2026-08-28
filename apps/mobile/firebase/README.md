# Firebase credentials

These files are **gitignored** — they are downloaded per environment and must be
present locally (and provided as EAS secrets/file env vars for builds).

| File                            | Firebase project | Platform |
| ------------------------------- | ---------------- | -------- |
| `google-services.dev.json`      | `posso-dev`      | Android  |
| `GoogleService-Info.dev.plist`  | `posso-dev`      | iOS      |
| `google-services.prod.json`     | `posso-prod`     | Android  |
| `GoogleService-Info.prod.plist` | `posso-prod`     | iOS      |

`app.config.ts` selects the pair based on `APP_ENV` (`development` → dev,
`production` → prod).

## How to obtain them

- **Android** (CLI): `firebase apps:sdkconfig ANDROID <appId> --project <project> --out <file>`
- **iOS** (console): Project settings → _Your apps_ → iOS app → **GoogleService-Info.plist**,
  then save it here with the `.dev` / `.prod` suffix shown above.
