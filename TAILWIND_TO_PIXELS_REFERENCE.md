# Référence Tailwind CSS vers Pixels

## Système de Spacing Tailwind

| Classe | Valeur rem | Pixels (16px base) |
| ------ | ---------- | ------------------ |
| h-12   | 3rem       | 48px               |
| h-16   | 4rem       | 64px               |
| h-32   | 8rem       | 128px              |

## Dimensions des StepCard par variante

### Default

- **Header:** `h-32` = 128px
- **Content:** ~52px (padding + texte + éléments)
- **Total estimé:** ~180px hauteur
- **Largeur:** ~200px (basé sur le contenu)

### Compact

- **Header:** `h-16` = 64px
- **Content:** ~56px (padding + texte réduit)
- **Total estimé:** ~120px hauteur
- **Largeur:** ~170px

### Mini

- **Header:** caché (0px)
- **Content:** ~80px (padding minimal + titre seulement)
- **Total estimé:** ~80px hauteur
- **Largeur:** ~140px

## Correspondance dans workflow-journey.astro

```javascript
const CARD_DIMENSIONS = {
	default: { width: 200, height: 180 }, // Aligné avec h-32 + contenu
	compact: { width: 170, height: 120 }, // Aligné avec h-16 + contenu
	mini: { width: 140, height: 80 }, // Aligné avec contenu seul
}
```

## ViewBox et conversion en pourcentages

- **ViewBox:** `"0 -50 1000 500"` (hauteur totale: 550 unités)
- **Conversion:** `(dimension_svg / viewbox_dimension) * 100`
- **Exemple:** Une carte de 200px dans une ViewBox de 1000px = 20%
