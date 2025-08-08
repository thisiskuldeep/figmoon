# Figmoon - Design Systems made easy

A modern design system generator that creates comprehensive color palettes, type scales, and design variables for Figma. Built with Tailwind CSS and shadcn/ui-inspired components.

## Features

- 🎨 **Color Palette Generator** - Create comprehensive color systems with primary, secondary, and semantic colors
- 📝 **Type Scale Generator** - Generate consistent typography scales with various ratios and font families
- 📏 **Variables Generator** - Create design tokens for spacing, border radius, and shadows
- 📤 **Figma Export** - Export your design system as JSON for Figma
- 🎯 **Modern UI** - Beautiful interface built with Tailwind CSS and shadcn/ui components
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd figmoon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the CSS**
   ```bash
   npm run build
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in your browser**
   Navigate to `index.html` in your browser or use a local server.

## Usage

### Color Palette Generator
1. Select your primary, secondary, and accent colors
2. Click "Generate Palette" to create a comprehensive color system
3. View the generated color swatches with hex values
4. Click any color swatch to copy the hex value to clipboard

### Type Scale Generator
1. Set your base font size (default: 16px)
2. Choose a scale ratio (Golden Ratio, Perfect Fourth, etc.)
3. Select your font family (Inter, Fraunces, Roboto, etc.)
4. Click "Generate Type Scale" to see the typography system

### Variables Generator
1. Configure spacing base, border radius base, and shadow levels
2. Click "Generate Variables" to create design tokens
3. View the generated spacing, border radius, and shadow scales

### Export to Figma
1. Generate your design system components
2. Click "Export to Figma JSON" to download the JSON file
3. Use "Preview JSON" to see the generated data structure

## Tech Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Vanilla JavaScript** - No framework dependencies
- **Google Fonts** - Inter and Fraunces font families

## Project Structure

```
figmoon/
├── index.html          # Main application
├── script.js           # JavaScript functionality
├── styles.css          # Compiled Tailwind CSS
├── src/
│   └── input.css       # Tailwind input file
├── tailwind.config.js  # Tailwind configuration
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Customization

### Adding New Fonts
1. Add the font to Google Fonts link in `index.html`
2. Add the font option to the font family select dropdown
3. The font will be available in the type scale generator

### Modifying Design Tokens
Edit the `tailwind.config.js` file to customize:
- Color palette
- Typography scales
- Spacing values
- Border radius values
- Shadow definitions

### Styling Components
- Modify `src/input.css` for component styles
- Use Tailwind utility classes in HTML
- Add custom CSS variables for theming

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the component design inspiration
- [Google Fonts](https://fonts.google.com/) for the beautiful typography
- [Figma](https://figma.com/) for the design system export format
