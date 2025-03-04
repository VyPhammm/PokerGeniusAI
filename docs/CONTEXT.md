# Poker Probability Calculator
## Technical Specification Document

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [User Interface Flow](#user-interface-flow)
4. [API Integration](#api-integration)
5. [Error Handling](#error-handling)
6. [Quality Assurance](#quality-assurance)

## Project Overview

A web-based poker probability calculator that leverages Game Theory Optimal (GTO) strategies to provide action recommendations (fold, call, raise) using precomputed data and OpenAI's ChatGPT API integration.

## Technical Architecture

### Frontend Stack
- **Framework**: React
- **Styling**: TailwindCSS
- **State Management**: React useState & useContext
- **Deployment**: Vercel/Netlify

### Backend Integration
- OpenAI ChatGPT API for probability calculations and decision making

## User Interface Flow

### 1. Start Screen
- Initial "Start" button
- Transitions to hole card selection

### 2. Hole Card Selection
- Components:
  - Two card selection dropdowns (rank & suit)
  - "Calculate" button for API request
  - "Next" button for flop selection

### 3. Flop Selection
- Components:
  - Three community card dropdowns
  - "Calculate" button
  - Loading animation
- Displays:
  - Recommended action (fold/call/raise)
  - Win probability percentage
  - Suggested bet size
  - "Continue" button for turn selection

### 4. Turn & River Selection
- Sequential card selection process
- Real-time probability recalculation
- Final decision display

### UI/UX Features
- Progress Indicator (e.g., "Step 1/5: Select Hole Cards")
- Action Color Coding:
  - Green: Call/Raise
  - Yellow: Neutral Decision
  - Red: Fold
- Contextual Action Explanations
- Navigation:
  - Back Button functionality
  - Dark Mode toggle
- Responsive Mobile Design

## API Integration

### Request Schema
```json
{
  "hole_cards": ["Ah", "Ks"],
  "community_cards": ["", "", "", "", ""],
  "pot_size": 100,
  "player_stack": 1000
}
```

### Response Schema
```json
{
  "action": "raise",
  "win_probability": 68.5,
  "bet_size": 150,
  "explanation": "Your hand dominates opponent ranges. Raising is optimal."
}
```

## Error Handling

### Rate Limiting
- Maximum 1 request per minute

### API Request Management
- Loading animation during processing
- Error handling with one retry attempt
- Fallback error message: "Error retrieving recommendation. Please try again."
- No response caching
- Session reset on page refresh

## Quality Assurance

### Testing Strategy
1. Unit Testing
   - UI component rendering
   - API integration validation

2. Integration Testing
   - Complete user flow validation
   - API failure scenario testing

3. Mobile Testing
   - Responsive design verification
   - Touch interface optimization
   - Cross-device compatibility

✅ Final Confirmation
