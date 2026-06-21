# NBBA Broadcast Graphics System

**National Backyard Basketball Association - Professional Broadcast Graphics Suite**

A complete, production-ready web-based broadcast graphics system for basketball. Control panel + real-time OBS overlays powered by Firebase.

## Quick Links

- [Installation Guide](./docs/INSTALLATION.md)
- [Firebase Setup](./docs/FIREBASE_SETUP.md)
- [OBS Studio Integration](./docs/OBS_SETUP.md)
- [Architecture Documentation](./docs/ARCHITECTURE.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)

## Features

### Control Panel
- Real-time game management
- Live score and clock controls
- Player and team statistics
- Play-by-play tracking
- Graphic controls and animations
- Multi-role authentication

### OBS Overlays
- Scorebug with team logos
- Lower thirds for player/coach identification
- Full-screen graphics (lineups, stats, final scores)
- Player stat displays
- Box score with sorting/filtering
- Live leaderboards
- Smooth GSAP animations

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
- **Backend**: Firebase (Authentication, Firestore, Storage, Hosting)
- **Animation**: GSAP (GreenSock Animation Platform)
- **Fonts**: Google Fonts

## Project Structure

```
NBBA-Broadcast/
├── index.html                          # Landing page
├── control.html                        # Control panel (operator dashboard)
├── overlay.html                        # Master overlay (OBS source)
├── scorebug.html                       # Scorebug overlay (OBS source)
├── lowerthird.html                     # Lower third overlay (OBS source)
├── fullscreen.html                     # Full-screen graphics (OBS source)
├── playerstats.html                    # Player stats overlay (OBS source)
├── teamstats.html                      # Team stats overlay (OBS source)
├── boxscore.html                       # Live box score overlay (OBS source)
├── leaderboards.html                   # Live leaderboards overlay (OBS source)
├── pregame.html                        # Pre-game graphics (OBS source)
├── halftime.html                       # Halftime graphics (OBS source)
├── postgame.html                       # Post-game graphics (OBS source)
├── standings.html                      # League standings overlay (OBS source)
├── settings.html                       # Settings panel
├── teams.html                          # Team management
├── players.html                        # Player management
├── games.html                          # Game management
├── css/
│   ├── global.css                      # Global styles, reset, variables
│   ├── control-panel.css               # Control panel styling
│   ├── scorebug.css                    # Scorebug styling
│   ├── lowerthird.css                  # Lower third styling
│   ├── fullscreen.css                  # Full-screen graphics styling
│   ├── playerstats.css                 # Player stats styling
│   ├── teamstats.css                   # Team stats styling
│   ├── boxscore.css                    # Box score styling
│   ├── leaderboards.css                # Leaderboards styling
│   ├── overlay-base.css                # Base styles for all overlays
│   ├── animations.css                  # Keyframe animations
│   ├── responsive.css                  # Responsive breakpoints
│   └── theme-dark.css                  # Dark mode theme
├── js/
│   ├── modules/
│   │   ├── auth.js                     # Firebase authentication
│   │   ├── firestore.js                # Firestore real-time listeners
│   │   ├── storage.js                  # Firebase storage utilities
│   │   ├── animations.js               # GSAP animation handlers
│   │   ├── dom.js                      # DOM manipulation utilities
│   │   ├── utils.js                    # General utilities
│   │   ├── scorebug-controller.js      # Scorebug data/logic
│   │   ├── lowerthird-controller.js    # Lower third data/logic
│   │   ├── graphics-controller.js      # Full-screen graphics logic
│   │   ├── stats-controller.js         # Player/team stats logic
│   │   ├── clock-controller.js         # Game clock controller
│   │   ├── shotclock-controller.js     # Shot clock controller
│   │   ├── playbyplay-controller.js    # Play-by-play tracking
│   │   └── leaderboards-controller.js  # Leaderboard generation
│   ├── pages/
│   │   ├── control-panel.js            # Control panel page logic
│   │   ├── overlay.js                  # Master overlay logic
│   │   ├── scorebug-overlay.js         # Scorebug overlay logic
│   │   ├── lowerthird-overlay.js       # Lower third overlay logic
│   │   ├── fullscreen-overlay.js       # Full-screen overlay logic
│   │   ├── playerstats-overlay.js      # Player stats overlay logic
│   │   ├── teamstats-overlay.js        # Team stats overlay logic
│   │   ├── boxscore-overlay.js         # Box score overlay logic
│   │   ├── leaderboards-overlay.js     # Leaderboards overlay logic
│   │   ├── pregame-overlay.js          # Pre-game overlay logic
│   │   ├── halftime-overlay.js         # Halftime overlay logic
│   │   ├── postgame-overlay.js         # Post-game overlay logic
│   │   ├── standings-overlay.js        # Standings overlay logic
│   │   ├── teams.js                    # Team management page
│   │   ├── players.js                  # Player management page
│   │   ├── games.js                    # Game management page
│   │   └── settings.js                 # Settings page
│   └── config.js                       # Firebase config & app initialization
├── firebase/
│   ├── firestore-schema.json           # Firestore collection structure
│   └── security-rules.txt              # Firestore security rules
├── assets/
│   ├── images/
│   │   ├── logos/
│   │   │   └── nbba-logo.png           # Main league logo
│   │   ├── players/                    # Player photos directory
│   │   ├── teams/                      # Team logos directory
│   │   └── sponsors/                   # Sponsor logos directory
│   ├── sounds/
│   │   ├── clock-start.mp3             # Clock start sound
│   │   ├── clock-end.mp3               # Clock end sound
│   │   ├── timeout.mp3                 # Timeout sound
│   │   ├── score.mp3                   # Score sound
│   │   └── whistle.mp3                 # Whistle sound
│   └── fonts/                          # Custom fonts directory
└── docs/
    ├── INSTALLATION.md                 # Installation guide
    ├── FIREBASE_SETUP.md               # Firebase setup instructions
    ├── OBS_SETUP.md                    # OBS Studio integration guide
    ├── ARCHITECTURE.md                 # System architecture documentation
    ├── API_REFERENCE.md                # Module API reference
    ├── FIRESTORE_SCHEMA.md             # Database schema documentation
    ├── TROUBLESHOOTING.md              # Troubleshooting guide
    └── DEPLOYMENT.md                   # Deployment guide
```

## Installation

1. Clone the repository
2. Create a Firebase project
3. Configure Firebase credentials
4. Deploy to Firebase Hosting
5. Load overlay pages as OBS Browser Sources

See [Installation Guide](./docs/INSTALLATION.md) for detailed steps.

## Firebase Setup

This system requires:
- Firebase Authentication (email/password)
- Firestore Database
- Firebase Storage (images)
- Firebase Hosting

See [Firebase Setup Guide](./docs/FIREBASE_SETUP.md) for configuration.

## OBS Integration

Add as Browser Sources:
- `https://your-app.web.app/scorebug.html`
- `https://your-app.web.app/lowerthird.html`
- `https://your-app.web.app/fullscreen.html`
- Additional overlays as needed

See [OBS Setup Guide](./docs/OBS_SETUP.md) for complete instructions.

## User Roles

- **Administrator**: Full system access, user management
- **Broadcast Operator**: Control panel access, graphics control
- **Statistician**: Stats entry and tracking
- **Guest Viewer**: Read-only overlay viewing

## Development

### Local Development
```bash
npm install -g firebase-tools
firebase login
firebase serve
```

Access at `http://localhost:5000`

### Deployment
```bash
firebase deploy
```

## Code Quality

- ✅ Vanilla JavaScript (no frameworks)
- ✅ ES6 modules
- ✅ No duplicated code
- ✅ Clean architecture
- ✅ Reusable components
- ✅ Comprehensive documentation

## License

NBBA Broadcast Graphics System © 2026
