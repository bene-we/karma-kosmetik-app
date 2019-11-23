import { Product } from './models/product.model';

export const product1: Product = {
    id: '8GHWbSqWS3G13BzuJuAx',
    name: 'Mandelgenuss',
    claim: 'Erfrischende Gesichtsmaske mit geriebenen Mandeln für reine Haut',
    description: 'Die pflegende Gesichtsmaske mit ausgewählten veganen und fair gehandelten Inhaltsstoffen\n' +
        'ist besonders auf die Ansprüche sensibler Haut von Gesicht und Hals abgestimmt. Der\n' +
        'Amaranth und die fein geriebenen Mandeln aus biologischem Anbau tragen sanft\n' +
        'abgestorbene Hautzellen ab. Das Camu Camu Frucht-Pulver wird aus der Camu Camu\n' +
        'Pflanze gewonnen. Die rot-orangen Beeren haben den weltweit höchsten Vitamin C-Gehalt\n' +
        'und verleihen der Haut ein Vitamin-Boost. Das Maca Pulver pflegt intensiv und die\n' +
        'beigesetzte rote Tonerde wirkt antibakteriell. Durch das beifügen des Kokosnussöls entsteht\n' +
        'eine cremige und natürlich duftende Textur.',
    price: 6,
    points: 2,
    ingredients: [
        'Fein geriebene Mandeln',
        'Camu Camu Pulver (Pflanze mit hohem Vitamin C-Gehalt)',
        'Rote Tonerde',
        'Maca Pulver (Wurzel)',
        'Amaranth'
    ],
    capacity: 85,
    additionalIngredients: ['4 EL Wasser', '3 EL Kokosnussöl'],
    application: [
        {
            step: 1,
            text: 'Die bereits vorbereitete Rezeptur in einem Gefäß mit 4 EL Wasser und' +
                ' 3 EL Kokosöl vermischen bis eine cremige, feinkörnige Masse entsteht'
        },
        {
            step: 2,
            text: 'In mehreren aufeinander folgenden Schritten haselnussgroße Mengen im gesamten Gesicht auftragen und einmassieren'
        },
        {
            step: 3,
            text: 'Nach einer Einwirkzeit von 15 Minuten können die Rückstände der Maske mit lauwarmem Wasser entfernt werden'
        }
    ]
};

export const product2: Product = {
    id: 'pjSVRk9Dy71TdXevREB9',
    name: 'Sanftes Allerlei',
    claim: 'Pflegende Körperseife mit Lavendelduft für die sanfte Reinigung der Haut',
    description: 'Die reinigende Körperseife mit ausgewählten veganen und fair gehandelten Inhaltsstoffen entspannt Körper und Geist mit' +
        ' ihrem beruhigenden Lavendelduft. Durch die milden Bestandteile ist die Körperseife besonders gut für den täglichen ' +
        'Gebrauch geeignet. Der enthaltene Aloe Vera Saft spendet der Haut zusätzlich wertvolle Feuchtigkeit und das kaltgepresste ' +
        'Lavendelduft-Öl sorgt als natürliches Konservierungsmittel für die lange Haltbarkeit der Seife. ',
    price: 13,
    points: 5,
    ingredients: [
        'Weiße oder transparente Glycerin- oder Kernseife',
        'Lavendelblüten',
        'Vanillezucker',
        'Aloe Vera Saft pulverisiert (spendet Feuchtigkeit)',
        'Sodium Chloride (Kochsalz)'
    ],
    capacity: 150,
    additionalIngredients: [
        '6 Tropfen natürliches Lavendelduft-Öl (dient als Konservierungsmittel)',
        'Zutaten-Tipp: Ein paar getrocknete Rosmarinblätter'
    ],
    creation: [
        {
            step: 1,
            text: 'Die bereits vorbereitete Rezeptur in einem Gefäß langsam im Wasserbad erhitzen, ' +
                'bis diese vollständig geschmolzen ist (Dauer bis zu 2 Stunden)'
        },
        {
            step: 2,
            text: 'Die geschmolzene Seife mit Lavendelöl versetzen und in eine beliebige Form zum Auskühlen abfüllen ' +
                'oder nachdem die Masse heruntergekühlt ist selbst mit den Händen eine individuelle Form herstellen'
        },
        {
            step: 3,
            text: 'Vor der Verwendung sollte die Seife ein bis zwei Wochen bei Zimmertemperatur reifen. ' +
                'Dadurch kann sich der enthaltene PH-Wert neutralisieren'
        }
    ]
};

export const product3: Product = {
    id: 'rMhHuCOlqEsMV9HdcMVa',
    name: 'Tutti Frutti',
    claim: 'Fruchtiges Erdbeer-Körperpeeling zur Vitalisierung der Haut',
    description: 'Das erfrischende Erdbeer-Körperpeeling mit ausgewählten veganen und fair gehandelten ' +
        'Inhaltsstoffen trägt sanft abgestorbene Hautzellen ab. Die Poren können sich öffnen und angesammelter Schmutz, ' +
        'sowie Schadstoffe aus der Umwelt können austreten. Gleichzeitig regt die grobkörnige Textur aus braunem Zucker und Mandelkleie ' +
        'die Durchblutung der Haut an. Die wertvollen Mineralien Zink und Magnesium füllen zusätzlich das Depot der Haut auf und ' +
        'Urea-Pulver spendet ausreichend Feuchtigkeit.',
    price: 17,
    points: 6,
    ingredients: [
        'Mandelkleie',
        'Magnesium',
        'Zink',
        'Urea-Pulver',
        'Brauner Zucker',
        'Dehydroacet-Säure Pulver'
    ],
    capacity: 120,
    additionalIngredients: [
        '3 EL Joghurt',
        'Eine Hand voll pürierte Erdbeeren'
    ],
    application: [
        {
            step: 1,
            text: 'Vor der Behandlung die Haut mit einer Waschlotion reinigen, um Schmutz und lose Hautschuppen zu entfernen'
        },
        {
            step: 2,
            text: 'Die bereits vorbereitete Rezeptur in einem Gefäß mit 3 EL Joghurt und einer Hand voll pürierter Erdbeern ' +
                'vermischen bis eine grobkörnige Masse entsteht'
        },
        {
            step: 3,
            text: 'Auf die noch angefeuchtete Haut die Peeling-Rezeptur auftragen und 5 Minuten einmassieren ' +
                '(Empfindliche Hautpartien aussparen)'
        },
        {
            step: 4,
            text: 'Nach einer anschließenden Einwirkzeit von 10 Minuten können Rückstände des Peelings mit ' +
                'lauwarmem Wasser entfernt werden'
        }
    ]
};
