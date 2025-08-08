# 🎨 Figma Design System Generator

A modern web application for generating comprehensive design system components that can be exported to Figma as JSON files.

## ✨ Features

### 🎨 Color Palette Generator
- Generate color palettes from primary, secondary, and accent colors
- Automatic shade generation (50-900) for each color
- Built-in semantic colors (gray, success, warning, error)
- Visual color swatches with hex values
- Click to copy color values to clipboard

### 📝 Type Scale Generator
- Create consistent typography scales using mathematical ratios
- Multiple scale options (Minor Second, Major Second, Golden Ratio, etc.)
- Support for popular font families (Inter, Roboto, Open Sans, etc.)
- Visual preview of type scales with actual font rendering
- Configurable base font size

### 🔧 Variables Generator
- Generate spacing scales based on a base unit
- Create border radius scales
- Generate shadow scales with multiple levels
- All variables follow consistent naming conventions

### 📤 Export Functionality
- Export complete design system as JSON
- Preview generated JSON before download
- Figma-compatible format
- Includes metadata and versioning

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start generating your design system!

## 📖 How to Use

### 1. Color Palette Generation
1. Navigate to the "Color Palette" section
2. Choose your primary, secondary, and accent colors using the color pickers
3. Click "Generate Palette" to create the color system
4. View the generated color swatches with their hex values
5. Click on any color swatch to copy its hex value to clipboard

### 2. Type Scale Generation
1. Navigate to the "Type Scale" section
2. Set your base font size (default: 16px)
3. Choose a scale ratio (recommended: 1.250 for Major Third)
4. Select your preferred font family
5. Click "Generate Type Scale" to create the typography system
6. Preview the actual font rendering for each size

### 3. Variables Generation
1. Navigate to the "Variables" section
2. Set your spacing base unit (default: 4px)
3. Configure border radius base (default: 4px)
4. Choose the number of shadow levels (default: 4)
5. Click "Generate Variables" to create the variable system
6. Review the generated spacing, border radius, and shadow scales

### 4. Export to Figma
1. Generate all three sections (colors, typography, variables)
2. Click "Export to Figma JSON" to download the complete design system
3. Or click "Preview JSON" to review the generated data before downloading
4. Import the JSON file into your Figma project

## 🎯 Design System Structure

The generated JSON follows this structure:

```json
{
  "name": "Design System",
  "description": "Generated design system for Figma",
  "colors": {
    "primary": { "50": "#...", "100": "#...", ... },
    "secondary": { "50": "#...", "100": "#...", ... },
    "accent": { "50": "#...", "100": "#...", ... },
    "gray": { "50": "#...", "100": "#...", ... },
    "success": { "50": "#...", "100": "#...", ... },
    "warning": { "50": "#...", "100": "#...", ... },
    "error": { "50": "#...", "100": "#...", ... }
  },
  "typography": {
    "fontFamily": "Inter",
    "typeScale": {
      "xs": 12,
      "sm": 14,
      "base": 16,
      "lg": 20,
      "xl": 25,
      "2xl": 31,
      "3xl": 39,
      "4xl": 49,
      "5xl": 61
    },
    "weights": [300, 400, 500, 600, 700]
  },
  "variables": {
    "spacing": { "0": 0, "1": 4, "2": 8, ... },
    "borderRadius": { "none": 0, "sm": 2, "base": 4, ... },
    "shadows": { "1": "0 2px 4px rgba(0, 0, 0, 0.1)", ... }
  },
  "metadata": {
    "generatedAt": "2024-01-01T00:00:00.000Z",
    "version": "1.0.0"
  }
}
```

## 🎨 Color System

The color system generates 10 shades for each color:
- **50-400**: Lighter shades
- **500**: Base color
- **600-900**: Darker shades

### Semantic Colors
- **Gray**: Neutral colors for text and backgrounds
- **Success**: Green shades for positive actions
- **Warning**: Yellow/Orange shades for caution states
- **Error**: Red shades for error states

## 📝 Typography System

### Scale Ratios
- **Minor Second (1.067)**: Subtle size differences
- **Major Second (1.125)**: Balanced progression
- **Minor Third (1.200)**: Clear hierarchy
- **Major Third (1.250)**: Strong hierarchy
- **Perfect Fourth (1.333)**: Musical scale
- **Augmented Fourth (1.414)**: Geometric progression
- **Perfect Fifth (1.500)**: Bold contrast
- **Golden Ratio (1.618)**: Classic proportion

### Font Weights
- **300**: Light
- **400**: Regular
- **500**: Medium
- **600**: Semi-bold
- **700**: Bold

## 🔧 Variable System

### Spacing Scale
Based on a base unit (default: 4px), generates:
- 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48px

### Border Radius Scale
Based on a base unit (default: 4px), generates:
- none: 0px
- sm: 2px
- base: 4px
- md: 6px
- lg: 8px
- xl: 12px
- full: 9999px

### Shadow Scale
Generates multiple shadow levels with increasing intensity:
- Level 1: Subtle shadow
- Level 2: Medium shadow
- Level 3: Strong shadow
- Level 4: Very strong shadow

## 🛠️ Technical Details

### Built With
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **Google Fonts**: Inter font family

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Structure
```
figma-design-system-generator/
├── index.html          # Main application file
├── styles.css          # Application styles
├── script.js           # Application logic
└── README.md           # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by modern design system practices
- Built for the Figma design community
- Uses mathematical color theory for shade generation
- Implements typographic scale principles

## 📞 Support

If you have any questions or need help, please:
1. Check the documentation above
2. Open an issue on GitHub
3. Contact the maintainers

---

**Happy designing! 🎨**
