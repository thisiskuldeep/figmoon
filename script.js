// Global state to store generated design system data
let designSystemData = {
    colors: {},
    typography: {},
    variables: {}
};

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Update active nav button
            navButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('bg-white/25');
                btn.classList.add('bg-white/10');
            });
            button.classList.add('active');
            button.classList.remove('bg-white/10');
            button.classList.add('bg-white/25');
            
            // Show target section
            sections.forEach(section => {
                section.classList.add('hidden');
                section.classList.remove('active');
            });
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.remove('hidden');
                targetElement.classList.add('active');
            }
        });
    });

    // Initialize with random colors
    setRandomColors();
    generateColorPalette();
});

// Color utility functions
function generateRandomColor() {
    // Generate a random hue (0-360) and saturation (30-80%), but fixed 50% lightness
    const hue = Math.floor(Math.random() * 360);
    const saturation = 30 + Math.floor(Math.random() * 50); // 30-80% saturation
    const lightness = 50; // Fixed 50% lightness for consistent palettes
    
    return hslToHex(hue, saturation, lightness);
}

function hexToHsl(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    
    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };
    
    let r, g, b;
    
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    
    const toHex = (c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generateSplitComplementaryColors(primaryColor) {
    const hsl = hexToHsl(primaryColor);
    if (!hsl) return { secondary: primaryColor, accent: primaryColor };
    
    // Split complementary: 30° and 195° from the primary color
    const secondaryHue = (hsl.h + 30) % 360;
    const accentHue = (hsl.h + 195) % 360;
    
    // Keep the same saturation and 50% lightness for consistent palettes
    const secondary = hslToHex(secondaryHue, hsl.s, 50);
    const accent = hslToHex(accentHue, hsl.s, 50);
    
    return { secondary, accent };
}

function setRandomColors() {
    // Generate a random primary color
    const primaryColor = generateRandomColor();
    
    // Generate harmonious secondary and accent colors using split complementary
    const { secondary, accent } = generateSplitComplementaryColors(primaryColor);
    
    // Set the colors
    document.getElementById('primary-color').value = primaryColor;
    document.getElementById('secondary-color').value = secondary;
    document.getElementById('accent-color').value = accent;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function adjustBrightness(hex, percent) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const factor = 1 + percent / 100;
    const r = Math.min(255, Math.max(0, Math.round(rgb.r * factor)));
    const g = Math.min(255, Math.max(0, Math.round(rgb.g * factor)));
    const b = Math.min(255, Math.max(0, Math.round(rgb.b * factor)));
    
    return rgbToHex(r, g, b);
}

function generateColorShades(baseColor, name) {
    const shades = {};
    const percentages = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    
    // Convert base color to HSL for better shade generation
    const baseHsl = hexToHsl(baseColor);
    if (!baseHsl) return { 500: baseColor };
    
    percentages.forEach(percent => {
        if (percent === 500) {
            shades[percent] = baseColor; // Base color at 50% lightness
        } else if (percent < 500) {
            // Lighter shades: increase lightness
            const lightnessIncrease = (500 - percent) * 0.1; // 0-45% increase
            const newLightness = Math.min(95, baseHsl.l + lightnessIncrease);
            shades[percent] = hslToHex(baseHsl.h, baseHsl.s, newLightness);
        } else {
            // Darker shades: decrease lightness
            const lightnessDecrease = (percent - 500) * 0.1; // 0-40% decrease
            const newLightness = Math.max(5, baseHsl.l - lightnessDecrease);
            shades[percent] = hslToHex(baseHsl.h, baseHsl.s, newLightness);
        }
    });
    
    return shades;
}

// Color Palette Generation
function generateColorPalette() {
    const primaryColor = document.getElementById('primary-color').value;
    const secondaryColor = document.getElementById('secondary-color').value;
    const accentColor = document.getElementById('accent-color').value;
    
    const colorPreview = document.getElementById('color-preview');
    colorPreview.innerHTML = '';
    
    // Generate color data
    const colors = {
        primary: generateColorShades(primaryColor, 'primary'),
        secondary: generateColorShades(secondaryColor, 'secondary'),
        accent: generateColorShades(accentColor, 'accent'),
        gray: generateColorShades('#6B7280', 'gray'),
        success: generateColorShades('#10B981', 'success'),
        warning: generateColorShades('#F59E0B', 'warning'),
        error: generateColorShades('#EF4444', 'error')
    };
    
    // Store in global state
    designSystemData.colors = colors;
    
    // Create visual preview
    Object.entries(colors).forEach(([colorName, shades]) => {
        const colorGroup = document.createElement('div');
        colorGroup.className = 'color-group';
        colorGroup.style.marginBottom = '30px';
        
        const colorTitle = document.createElement('p');
        colorTitle.textContent = colorName.charAt(0).toUpperCase() + colorName.slice(1);
        colorTitle.style.marginBottom = '15px';
        colorTitle.style.color = '#333';
        colorGroup.appendChild(colorTitle);
        
        Object.entries(shades).forEach(([shade, color]) => {
            const swatch = document.createElement('div');
            swatch.className = 'inline-block w-20 h-20 rounded-lg m-2 relative cursor-pointer transition-transform hover:scale-110 shadow-lg';
            swatch.style.backgroundColor = color;
            swatch.setAttribute('data-color', `${colorName}-${shade}: ${color}`);
            swatch.title = `${colorName}-${shade}: ${color}`;
            
            // Add color value label
            const label = document.createElement('div');
            label.className = 'absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap';
            label.textContent = `${colorName}-${shade}`;
            swatch.appendChild(label);
            
            colorGroup.appendChild(swatch);
        });
        
        colorPreview.appendChild(colorGroup);
    });
}

// Type Scale Generation
function generateTypeScale() {
    const baseSize = parseInt(document.getElementById('base-size').value);
    const scaleRatio = parseFloat(document.getElementById('scale-ratio').value);
    const fontFamily = document.getElementById('font-family').value;
    
    const typePreview = document.getElementById('type-preview');
    typePreview.innerHTML = '';
    
    // Generate type scale
    const typeScale = {
        xs: Math.round(baseSize * Math.pow(scaleRatio, -2)),
        sm: Math.round(baseSize * Math.pow(scaleRatio, -1)),
        base: baseSize,
        lg: Math.round(baseSize * Math.pow(scaleRatio, 1)),
        xl: Math.round(baseSize * Math.pow(scaleRatio, 2)),
        '2xl': Math.round(baseSize * Math.pow(scaleRatio, 3)),
        '3xl': Math.round(baseSize * Math.pow(scaleRatio, 4)),
        '4xl': Math.round(baseSize * Math.pow(scaleRatio, 5)),
        '5xl': Math.round(baseSize * Math.pow(scaleRatio, 6))
    };
    
    // Store in global state
    designSystemData.typography = {
        fontFamily,
        typeScale,
        weights: [300, 400, 500, 600, 700]
    };
    
    // Create visual preview
    Object.entries(typeScale).forEach(([size, fontSize]) => {
        const typeItem = document.createElement('div');
        typeItem.className = 'mb-5 p-4 rounded-lg bg-white border-l-4 border-blue-500';
        
        const heading = document.createElement('h3');
        heading.textContent = `${size.toUpperCase()} - ${fontSize}px`;
        heading.style.fontSize = `${fontSize}px`;
        heading.style.fontFamily = fontFamily;
        heading.className = 'font-semibold mb-2 text-gray-900';
        
        const description = document.createElement('p');
        description.textContent = `Font size: ${fontSize}px | Line height: ${Math.round(fontSize * 1.5)}px`;
        description.className = 'text-gray-600 text-sm';
        
        typeItem.appendChild(heading);
        typeItem.appendChild(description);
        typePreview.appendChild(typeItem);
    });
}

// Variables Generation
function generateVariables() {
    const spacingBase = parseInt(document.getElementById('spacing-base').value);
    const borderRadiusBase = parseInt(document.getElementById('border-radius-base').value);
    const shadowLevels = parseInt(document.getElementById('shadow-levels').value);
    
    const variablesPreview = document.getElementById('variables-preview');
    variablesPreview.innerHTML = '';
    
    // Generate spacing scale
    const spacing = {};
    for (let i = 0; i <= 12; i++) {
        spacing[i] = i * spacingBase;
    }
    
    // Generate border radius scale
    const borderRadius = {
        none: 0,
        sm: borderRadiusBase / 2,
        base: borderRadiusBase,
        md: borderRadiusBase * 1.5,
        lg: borderRadiusBase * 2,
        xl: borderRadiusBase * 3,
        full: 9999
    };
    
    // Generate shadow scale
    const shadows = {};
    for (let i = 1; i <= shadowLevels; i++) {
        const blur = i * 4;
        const y = i * 2;
        const opacity = 0.1 + (i * 0.05);
        shadows[i] = `0 ${y}px ${blur}px rgba(0, 0, 0, ${opacity})`;
    }
    
    // Store in global state
    designSystemData.variables = {
        spacing,
        borderRadius,
        shadows
    };
    
    // Create visual preview
    const createVariableItem = (name, value) => {
        const item = document.createElement('div');
        item.className = 'flex justify-between items-center p-4 mb-3 bg-white rounded-lg border border-gray-200';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'font-medium text-gray-900';
        nameSpan.textContent = name;
        
        const valueSpan = document.createElement('span');
        valueSpan.className = 'text-blue-600 font-mono text-sm';
        valueSpan.textContent = typeof value === 'string' ? value : `${value}px`;
        
        item.appendChild(nameSpan);
        item.appendChild(valueSpan);
        return item;
    };
    
    // Spacing section
    const spacingTitle = document.createElement('h3');
    spacingTitle.textContent = 'Spacing Scale';
    spacingTitle.className = 'text-lg font-semibold mb-4 text-gray-900';
    variablesPreview.appendChild(spacingTitle);
    
    Object.entries(spacing).forEach(([key, value]) => {
        variablesPreview.appendChild(createVariableItem(`spacing-${key}`, value));
    });
    
    // Border radius section
    const borderRadiusTitle = document.createElement('h3');
    borderRadiusTitle.textContent = 'Border Radius Scale';
    borderRadiusTitle.className = 'text-lg font-semibold mt-8 mb-4 text-gray-900';
    variablesPreview.appendChild(borderRadiusTitle);
    
    Object.entries(borderRadius).forEach(([key, value]) => {
        variablesPreview.appendChild(createVariableItem(`border-radius-${key}`, value));
    });
    
    // Shadows section
    const shadowsTitle = document.createElement('h3');
    shadowsTitle.textContent = 'Shadow Scale';
    shadowsTitle.className = 'text-lg font-semibold mt-8 mb-4 text-gray-900';
    variablesPreview.appendChild(shadowsTitle);
    
    Object.entries(shadows).forEach(([key, value]) => {
        variablesPreview.appendChild(createVariableItem(`shadow-${key}`, value));
    });
}

// Export to Figma JSON
function exportToFigma() {
    const figmaData = {
        name: "Design System",
        description: "Generated design system for Figma",
        colors: designSystemData.colors,
        typography: designSystemData.typography,
        variables: designSystemData.variables,
        metadata: {
            generatedAt: new Date().toISOString(),
            version: "1.0.0"
        }
    };
    
    const jsonString = JSON.stringify(figmaData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'figma-design-system.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    showNotification('Design system exported successfully!', 'success');
}

// Preview JSON
function previewJSON() {
    const figmaData = {
        name: "Design System",
        description: "Generated design system for Figma",
        colors: designSystemData.colors,
        typography: designSystemData.typography,
        variables: designSystemData.variables,
        metadata: {
            generatedAt: new Date().toISOString(),
            version: "1.0.0"
        }
    };
    
    const jsonPreview = document.getElementById('json-preview');
    jsonPreview.textContent = JSON.stringify(figmaData, null, 2);
    
    const modal = document.getElementById('json-modal');
    modal.classList.remove('hidden');
}

// Download JSON from modal
function downloadJSON() {
    const jsonPreview = document.getElementById('json-preview');
    const jsonString = jsonPreview.textContent;
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'figma-design-system.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    closeModal();
    showNotification('JSON file downloaded successfully!', 'success');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('json-modal');
    modal.classList.add('hidden');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('json-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-5 right-5 p-3 rounded-lg text-white font-medium z-50 transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Copy color value to clipboard
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('color-swatch')) {
        const colorValue = e.target.getAttribute('data-color').split(': ')[1];
        navigator.clipboard.writeText(colorValue).then(() => {
            showNotification(`Color ${colorValue} copied to clipboard!`, 'success');
        });
    }
});
