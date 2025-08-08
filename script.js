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
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Initialize with default color palette
    generateColorPalette();
});

// Color utility functions
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
    
    percentages.forEach(percent => {
        if (percent === 500) {
            shades[percent] = baseColor;
        } else if (percent < 500) {
            // Lighter shades
            const factor = (500 - percent) / 500;
            shades[percent] = adjustBrightness(baseColor, factor * 100);
        } else {
            // Darker shades
            const factor = (percent - 500) / 500;
            shades[percent] = adjustBrightness(baseColor, -factor * 100);
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
        
        const colorTitle = document.createElement('h3');
        colorTitle.textContent = colorName.charAt(0).toUpperCase() + colorName.slice(1);
        colorTitle.style.marginBottom = '15px';
        colorTitle.style.color = '#333';
        colorGroup.appendChild(colorTitle);
        
        Object.entries(shades).forEach(([shade, color]) => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            swatch.setAttribute('data-color', `${colorName}-${shade}: ${color}`);
            swatch.title = `${colorName}-${shade}: ${color}`;
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
        typeItem.className = 'type-scale-item';
        
        const heading = document.createElement('h3');
        heading.textContent = `${size.toUpperCase()} - ${fontSize}px`;
        heading.style.fontSize = `${fontSize}px`;
        heading.style.fontFamily = fontFamily;
        heading.style.fontWeight = '600';
        heading.style.marginBottom = '5px';
        
        const description = document.createElement('p');
        description.textContent = `Font size: ${fontSize}px | Line height: ${Math.round(fontSize * 1.5)}px`;
        
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
        item.className = 'variable-item';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'variable-name';
        nameSpan.textContent = name;
        
        const valueSpan = document.createElement('span');
        valueSpan.className = 'variable-value';
        valueSpan.textContent = typeof value === 'string' ? value : `${value}px`;
        
        item.appendChild(nameSpan);
        item.appendChild(valueSpan);
        return item;
    };
    
    // Spacing section
    const spacingTitle = document.createElement('h3');
    spacingTitle.textContent = 'Spacing Scale';
    spacingTitle.style.marginBottom = '15px';
    spacingTitle.style.color = '#333';
    variablesPreview.appendChild(spacingTitle);
    
    Object.entries(spacing).forEach(([key, value]) => {
        variablesPreview.appendChild(createVariableItem(`spacing-${key}`, value));
    });
    
    // Border radius section
    const borderRadiusTitle = document.createElement('h3');
    borderRadiusTitle.textContent = 'Border Radius Scale';
    borderRadiusTitle.style.marginTop = '30px';
    borderRadiusTitle.style.marginBottom = '15px';
    borderRadiusTitle.style.color = '#333';
    variablesPreview.appendChild(borderRadiusTitle);
    
    Object.entries(borderRadius).forEach(([key, value]) => {
        variablesPreview.appendChild(createVariableItem(`border-radius-${key}`, value));
    });
    
    // Shadows section
    const shadowsTitle = document.createElement('h3');
    shadowsTitle.textContent = 'Shadow Scale';
    shadowsTitle.style.marginTop = '30px';
    shadowsTitle.style.marginBottom = '15px';
    shadowsTitle.style.color = '#333';
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
    modal.style.display = 'block';
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
    modal.style.display = 'none';
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
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    if (type === 'success') {
        notification.style.backgroundColor = '#10B981';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#EF4444';
    } else {
        notification.style.backgroundColor = '#667eea';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
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
