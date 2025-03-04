# Poker Genius AI 🎲

A sophisticated web-based poker probability calculator leveraging Game Theory Optimal (GTO) strategies and OpenAI's ChatGPT API to provide real-time poker decision recommendations.

## Features 🚀

- Real-time probability calculations for poker hands
- GTO-based decision making (fold, call, raise)
- Dynamic bet sizing recommendations
- Progressive hand analysis (pre-flop through river)
- Intuitive card selection interface
- Mobile-responsive design
- Dark mode support

## Tech Stack 💻

- **Frontend**: React.js
- **Styling**: TailwindCSS
- **State Management**: React Context API
- **API Integration**: OpenAI ChatGPT
- **Deployment**: Vercel/Netlify

## Prerequisites 📋

- Node.js (v14.0.0 or higher)
- npm or yarn
- OpenAI API key

## Installation 🛠️

1. Clone the repository:
```bash
git clone https://github.com/yourusername/PokerGeniusAI.git
cd PokerGeniusAI
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```env
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Usage 📱

1. **Start Screen**: Click the "Start" button to begin analysis
2. **Hole Cards**: Select your two hole cards
3. **Community Cards**: Input flop, turn, and river cards as they appear
4. **Results**: View probability calculations and recommended actions

## API Integration 🔌

The application uses OpenAI's ChatGPT API for probability calculations. Example request:

```json
{
  "hole_cards": ["Ah", "Ks"],
  "community_cards": ["", "", "", "", ""],
  "pot_size": 100,
  "player_stack": 1000
}
```

## Error Handling ⚠️

- Rate limiting: Maximum 1 request per minute
- Automatic retry on API failure
- Graceful error messaging
- Session management

## Testing 🧪

Run the test suite:
```bash
npm test
# or
yarn test
```

The project includes:
- Unit tests for UI components
- Integration tests for API
- Mobile responsiveness tests

## Building for Production 🏗️

Create a production build:
```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 👏

- OpenAI for API integration
- Create React App team
- TailwindCSS community

## Contact 📧

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/PokerGeniusAI](https://github.com/yourusername/PokerGeniusAI)
