# Destination Images

This directory contains images of destinations organized by continent, country, and city.

## Structure

```
[continent]/
├── [country]/
│   ├── [city-slug]/
│   │   ├── aerial/
│   │   │   ├── [city-slug]-aerial-1.jpg
│   │   │   └── ...
│   │   ├── landmarks/
│   │   │   ├── [city-slug]-landmark-[name].jpg
│   │   │   └── ...
│   │   ├── airport/
│   │   │   ├── [airport-code]-terminal.jpg
│   │   │   ├── [airport-code]-runway.jpg
│   │   │   └── ...
│   │   └── lifestyle/
│   │       ├── [city-slug]-lifestyle-dining.jpg
│   │       ├── [city-slug]-lifestyle-nightlife.jpg
│   │       └── ...
```

## Naming Convention

- All lowercase
- Use hyphens instead of spaces or underscores
- Include descriptive keywords
- Follow pattern: `[city-slug]-[category]-[descriptor].extension`

Example: `london-aerial-thames-sunset.jpg`
